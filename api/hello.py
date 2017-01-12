from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)


@app.route('/')
def hello_world():
	return 'Hello, World!'


@app.route('/name/<name>')
def nameindex(name='Stranger'):
		return '<strong>Hello, %s!</strong>' % name


@app.route("/ws/parks")
def parks():
	# setup the connection
	client = MongoClient()
	db = client['london-sky']
	arrivalsCollection = db.arrivals

	# query the DB for all the parkpoints
	result = arrivalsCollection.find()

	# Now turn the results into valid JSON
	return jsonify({'results':list(result)})