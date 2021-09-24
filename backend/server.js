const express = require("express");
const { urlencoded } = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

const username = process.env.DB_USER;
const passwd = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;

const uri = `mongodb+srv://${username}:${passwd}@data.psveh.mongodb.net/${db_name}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion?.v1 });

let db;
let test_collection;

client.connect(err => {
	db = client.db(db_name)
	test_collection = db.collection("test");
	// perform actions on the collection object
});

const port = 8080;
const server = express()

server.use(urlencoded({ extended: true }));

server.listen(port, () => { console.log('We are live on ' + port); });

server.get('/health', (req, res) => { res.send("Endpoint is up and running") });

server.post('/create', (req, res) => {
	test_collection.insertOne({"message": "I have been born!"})
		.catch(error => {
			console.error(error)
		})
	res.send({message: "Item added to database."})
});
