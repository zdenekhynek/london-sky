#!/usr/bin/env python
from pymongo import MongoClient
import datetime
import os
import googlemaps

from BaArrivalsScraper import BaArrivalsScraper


def geocode_address(address):
	api_key = os.environ['GOOGLE_MAP_API_KEY']
	gmaps = googlemaps.Client(key=api_key)
	geocode_result = gmaps.geocode(address)

	if len(geocode_result) > 0:
		return geocode_result[0]['geometry']['location']


def add_arrival_location(arrival):
	placeName = arrival['from']
	arrival['from'] = {'name': placeName, 'loc': geocode_address(placeName)}
	return arrival


def geocode_arrivals(arrivals):
	return map(add_arrival_location, arrivals)


def parse_time_string(time_string):
	# parse schedule string (hh:mm) into hours and minutes
	list = time_string.split(':')
	if len(list) > 1:
		return {'hour': int(list[0]), 'minute': int(list[1])}

	return {'hour': 0, 'minute': 0}


def add_arrival_date(arrival):
	scheduled = arrival['scheduled']

	time_list = parse_time_string(scheduled)
	print time_list

	nowDate = datetime.datetime.now()
	arrivalDate = nowDate.replace(
		hour=time_list['hour'], minute=time_list['minute'])

	arrival['date'] = arrivalDate
	return arrival


def create_arrivals_date(arrivals):
	return map(add_arrival_date, arrivals)


def insert_arrivals(arrivals):
	client = MongoClient()
	db = client['london-sky']
	arrivalsCollection = db.arrivals

	# insert arrivals into the mongo connection
	arrivalsCollection.insert_many(arrivals)


if __name__ == '__main__':
	scr = BaArrivalsScraper()
	arrivals = scr.scrape()

	arrivals = geocode_arrivals(arrivals)
	arrivals = create_arrivals_date(arrivals)

	insert_arrivals(arrivals)
