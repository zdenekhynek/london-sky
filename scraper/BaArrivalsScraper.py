#!/usr/bin/env python
from selenium import webdriver
from bs4 import BeautifulSoup

link = 'https://www.heathrow.com/arrivals'


class BaArrivalsScraper():
	def __init__(self):
		self.driver = webdriver.PhantomJS()
		self.driver.set_window_size(1120, 550)

	def scrape_arrivals(self):
		# arrivadatagrid > tr > td
		self.driver.get(link)

		s = BeautifulSoup(self.driver.page_source)

		arrivals = []

		# find parent data grid
		xpath = {'id': 'arrivadatagrid'}
		table = s.find('table', xpath)
		arrivalsRows = table.findAll('tr')

		for arrivalRow in arrivalsRows:
			cols = arrivalRow.findAll('td')

			if len(cols) > 3:
				arrival = {}
				arrival['scheduled'] = cols[0].getText()
				arrival['flightNo'] = cols[1].getText()
				arrival['from'] = cols[2].getText()
				arrival['status'] = cols[3].getText()
				arrivals.append(arrival)

		return arrivals

	def scrape(self):
		arrivals = self.scrape_arrivals()

		# try to quit everything
		self.driver.close()
		self.driver.quit()

		return arrivals

if __name__ == '__main__':
	scraper = BaArrivalsScraper()
	scraper.scrape()
