const express= require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const username=process.env.DM_USER
const passwd=process.env.DB_PASSWORD
const uri = "mongodb+srv://"+username+":"+passwd+"@data.psveh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const dev_db=client.db("dev_pawsup")

	const test_collection = dev_db.collection("test");
    // perform actions on the collection object

});
const port =8080;
const server =express()


server.use(bodyParser.urlencoded({extended: true}));

server.listen(port, () => {  console.log('We are live on ' + port);});

server.get('/health',(req,res)=>{res.send("Endpoint is up and running")});

server.post('/create',(req,res)=>{
	test_collection.insertOne(req.body)
	.catch(error){console.error(error)
	}});