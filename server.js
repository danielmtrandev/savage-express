const express = require('express');
const app = express();
// lets us read the body of request => is now built in to express
const bodyParser = require('body-parser');
// connecting to DB
const MongoClient = require('mongodb').MongoClient;
// require('dotenv').config({ path: './config/.env' });
// url stored in .env
// const url = process.env.url;

const url = 'mongodb+srv://Daniel:SzHInKisNNrW1sfq@cluster0.bbitw.mongodb.net/demo?retryWrites=true&w=majority'

// intentional use of var, for scoping
var db;

const dbName = 'demo';

// setting up server to listen on 3000 + everything it needs to connect to DB then logs confirmations
app.listen(3000, () => {
	MongoClient.connect(
		url,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		(error, client) => {
			if (error) {
				throw error;
			}
			db = client.db(dbName);
			console.log({db})
			console.log('Connected to `' + dbName + '`!');
		}
	);
});

// setting ejs as our templating lang
app.set('view engine', 'ejs');
// so we can "look" at the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// any of our static files -> so long as theyre in a public folder, they'll work
// no need to explicitly create routes for each static file
app.use(express.static('public'));

// ***C.R.U.D***

// READ: get data so it can load on the page
// triggered by page load
//  '/' aka ROOT page for every website
app.get('/', (req, res) => {
	
	//Because we are using Express + MongoDB framework, app can go into DB and find all documents in collection called 'messages' then turn them into an array
	db.collection('messages')
		.find() 
		// result is the variable that holds the array, which has all documents from database
		.toArray((err, result) => {
			if (err) return console.log(err); 
			// pass in an object named messages containing our array of DB documents, into EJS, this is rendering an html response (shown as 'messages' in EJS file)
			res.render('index.ejs', { messages: result });
		});

});

// triggered by form submission, send info to EJS
app.post('/messages', (req, res) => {
	// app goes to db, found messages collection, inserted object (document) into messages collection
	db.collection('messages').insertOne(
		{

			name: req.body.name,
			msg: req.body.msg,
			count: 0,
		},
		(err, result) => {
			if (err) return console.log(err);
			console.log('saved to database');
			res.redirect('/');
		}
	);
});

// triggered by client-side javascript, event listeners
app.put('/upVote', (req, res) => {
	db.collection('messages').findOneAndUpdate(
		{ name: req.body.name, msg: req.body.msg },
		{
			$set: {
				count: req.body.count + 1,
			},
		},
		{
			sort: { _id: -1 },
			upsert: true,
		},
		(err, result) => {
			if (err) return res.send(err);
			res.send(result);
		}
	);
});

app.put('/downVote', (req, res) => {
	db.collection('messages').findOneAndUpdate(
		{ name: req.body.name, msg: req.body.msg },
		{
			$set: {
				count: req.body.count - 1,
			},
		},
		{
			sort: { _id: -1 },
			upsert: true,
		},
		(err, result) => {
			if (err) return res.send(err);
			res.send(result);
		}
	);
});

// triggered by client-side javascript, event listeners
app.delete('/messages', (req, res) => {
	db.collection('messages').findOneAndDelete(
		{ name: req.body.name, msg: req.body.msg },
		(err, result) => {
			if (err) return res.send(500, err);
			res.send('Message deleted!');
		}
	);
});
