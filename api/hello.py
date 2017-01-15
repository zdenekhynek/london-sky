from flask import Flask, request
from datetime import datetime
from pymongo import MongoClient
from bson.json_util import dumps

app = Flask(__name__)


@app.route('/')
def hello_world():
	return 'Hello, World!'


@app.route('/name/<name>')
def nameindex(name='Stranger'):
		return '<strong>Hello, %s!</strong>' % name


@app.route("/arrivals/")
def arrivals():
	# setup the connection
	client = MongoClient()
	db = client['london-sky']
	arrivalsCollection = db.arrivals

	args = request.args
	dateFormat = '%Y-%m-%d'
	startDate= datetime.strptime(args.get('start'), dateFormat)
	endDate = datetime.strptime(args.get('end'), dateFormat)

	# query the DB for all the parkpoints
	result = arrivalsCollection.find({
		'date': {
			'$gte': startDate,
			'$lt': endDate
		}
	})

	# Now turn the results into valid JSON
	return dumps({'results':list(result)})
