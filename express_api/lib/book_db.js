const sqlite3 = require("sqlite3");

function initialize_db(db_path){
	const db = new sqlite3.Database(db_path);
	return db
}

function close_db(db){
	db.close();
}

function drop_db_table(){
	const db = initialize_db();
	db.run("DROP TABLE IF EXISTS BOOKS", (err) => {
		if (err) {
			console.log("DropTable error : " + err.message);
		}
	})
}

function create_db_table(){
	// create の場合のみ、initialize_db を使用しない
	const db = new sqlite3.Database("./db/experss_api.db", (err) => {
		if (err) {
			console.log("Database error: " + err.message);
		} else {
			db.serialize(() => {
				db.run("CREATE TABLE if not exists BOOKS( \
					id integer primary key autoincrement, \
					name varchar(32), \
					page integer \
					)", (err) => {
						if (err) {
							console.log("Table error : " + err.message);
						}
					});
				db.each("SELECT COUNT(name) FROM BOOKS", (err, row) => {
					if (err) {
						console.log("Count error : " + err.message);
					} else {
						let row_length = row["COUNT(name)"];
						if ( row_length == 0 ) {
							// insert seed
							let seed_data = [{name: "book1", page: 199},
											 {name: "book2", page: 240},
											 {name: "book3", page: 187}]
							seed_data.forEach((item) => {
								add_single_book_data(db, item)
							});
						}
					}
				})
			});
		}
	});
}

function select_whole_data(db, res){
	console.log("--- SELECT ALL TABLE DATA ---")
	db.all("SELECT * FROM BOOKS", [], (err, rows) => {
		if ( err ) {
			console.log("SELECT ALL error : " + err.message)
			// return {"status":"error", "message":err.message}
			return res.status(400).json({
				"status": "error",
				"message": err.message
			})
		} else {
			console.log(rows)
			return res.status(200).json({
				"status": "ok",
				"books": rows
			})
		}
	});
}

function select_single_book_data(db, book_id, res){
	console.log("--- SELECT ID " + book_id + " ---")
	db.get("SELECT * FROM BOOKS WHERE id = ?", book_id, (err, row) => {
		if ( err ){
			console.log("SELECT ID error : " + err.message)
			return res.status(400).json({
				"status": "error",
				"message": err.message
			})
		} else {
			console.log(row)
			return res.status(200).json({
				"status": "ok",
				"books": row
			})
		}
	})
}

function add_single_book_data(db, book_data, res){
	let { name, page } = book_data
	console.log("--- INSERT DATA " + name + "/" + page + " ---")
	if ( name == undefined ) { name = "" }
	if ( page == undefined ) { page = "" }
	const book_db_insert_state = db.prepare("INSERT INTO BOOKS(name, page) VALUES(?, ?)")
	book_db_insert_state.run(name, page, (err) => {
		if ( err ) {
			console.log("Insertion error : " + err.message);
			return res.status(400).json({
				"status": "error",
				"message": err.message
			})
			// return {"status":"error", "message":err.message}
		} else {
			console.log(book_db_insert_state.lastID)
			return res.status(200).json({
				"status": "ok",
				"lastID": book_db_insert_state.lastID
			})
		}
	})
}

function update_single_book_data(db, book_id, book_data, res){
	let { name, page } = book_data
	console.log("--- UPDATE DATA ID " + book_id + " " + name + "/" + page + " ---");
	if ( name == undefined ) { name = "" }
	if ( page == undefined ) { page = "" }
	const book_db_update_state = db.prepare("UPDATE BOOKS SET NAME = ? , PAGE = ? WHERE ID = ?")
	book_db_update_state.run(name, page, book_id, (err, result) => {
		if (err) {
			console.log("Update error : " + err.message);
			// return {"status":"error", "message":err.message}
			return res.status(400).json({
				"status": "error",
				"message": err.message
			});
		} else {
			console.log(book_db_update_state.changes)
			return res.status(200).json({
				"status": "ok",
				"changes": book_db_update_state.changes
			});
		}
	})
}

function delete_single_book_data(db, book_id, res){
	console.log("--- DELETE DATA ID " + book_id + " ---")
	const book_db_delete_state = db.prepare("DELETE FROM BOOKS WHERE ID = ?");
	book_db_delete_state.run(book_id, (err, result) => {
		if ( err ) {
			console.log("Delete error : " + err.message);
			// return {"status":"error", "message":err.message}
			return res.status(400).json({
				"status": "error",
				"message": err.message
			})
		} else {
			console.log(book_db_delete_state.changes);
			return res.status(200).json({
				"status": "ok",
				"changes": book_db_delete_state.changes
			})
		}
	});
}

// drop_db_table()
// create_db_table()
// const db = initialize_db()
// let first_data = {name: "book4", page: 250}
// add_single_book_data(db, first_data)
// select_single_book_data(db, 6)

// let update_data = {name: "book5", page: 350}
// update_single_book_data(db, 4, update_data);
// delete_single_book_data(db, 5);
// let book_whole_data = select_whole_data(db)
// console.log(book_whole_data)

module.exports.create_db_table 	= create_db_table;
module.exports.initialize_db 	= initialize_db;
module.exports.close_db 		= close_db;
module.exports.select_whole_data = select_whole_data;
module.exports.select_single_book_data	= select_single_book_data;
module.exports.add_single_book_data 	= add_single_book_data
module.exports.update_single_book_data	= update_single_book_data
module.exports.delete_single_book_data	= delete_single_book_data
