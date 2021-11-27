const express = require("express");
const cors = require('cors');
const app = express();

const book_db = require("./lib/book_db")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

var server  = app.listen(3001, function(){
	console.log("Node.js is listening to PORT:" + server.address().port);
});

const corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200
}

book_db.create_db_table();
const db = book_db.initialize_db("./db/experss_api.db");

app.get("/", (req, res) => {
	res.send("Welcome")
});

app.get("/books", cors(corsOptions), (req, res) => {
	book_db.select_whole_data(db, res);
	// book_db.close_db(db)
});

app.get("/books/:id", cors(corsOptions), (req, res) => {
	const book_id = req.params.id;
	book_db.select_single_book_data(db, book_id, res)
});

app.post("/books", cors(corsOptions), (req, res) => {
	const book_name = req.body.name;
	const book_page = req.body.page;
	const book_params = {"name": book_name, "page": book_page}
	book_db.add_single_book_data(db, book_params, res)
});

app.post("/books/:id", cors(corsOptions), (req, res) => {
	const book_name = req.body.name;
	const book_page = req.body.page;
	const book_id 	= req.params.id;
	const book_params = {"name": book_name, "page": book_page}
	book_db.update_single_book_data(db, book_id, book_params, res)
});

app.delete("/books/:id", cors(corsOptions), (req, res) => {
	const book_id 	= req.params.id;
	book_db.delete_single_book_data(db, book_id, res)
})