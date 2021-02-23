// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express=require('express');
// Start up an instance of app
const app=express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());
//const { listenerCount } = require('events');

// Initialize the main project folder

app.use(express.static('website'));
const port=3000;

// Setup Server

const server=app.listen(port,listening);
function listening(){
    console.log('the server is running');
    
    console.log(`running on http://localhost:${port}`);
};
app.get('/all',sendData);
function sendData(req,res){
	res.send(projectData).status(200).end();
	 projectData=[];
	
}
app.post('/add',addData);
function addData(req,res){
	const newEntry={
		date:req.body.date,
		temp:req.body.temp,
		content:req.body.content
	}
	res.send(newEntry).status(200).end();
	projectData.push(newEntry);
}