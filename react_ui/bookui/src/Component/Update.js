import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import "./Update.css"

const Update = () => {
	const query = useParams();
	const location = useLocation();
	const [name, setName] = useState("")
	const [page, setPage] = useState("")

	useEffect(() => {
		display_input();
	}, [query]);

	const display_input = () => {
		console.log(query.id)
		const book_api_url = "http://localhost:3001/books/" + query.id
		axios({
			method: "GET",
			url: book_api_url
		})
		.then((response) => {
			setName(response.data["books"]["name"])
			setPage(response.data["books"]["page"])
		})
	}

	const changeInput = (event) => {
		let inputted_name = document.getElementsByClassName("name-input")[0]
		let inputted_page = document.getElementsByClassName("page-input")[0]
		setName(inputted_name.value)
		setPage(inputted_page.value)
	}

	const updateBook = (event) => {
		//
		event.preventDefault();
		console.log(name, page);
		const book_url = "http://localhost:3000/books/" + query.id
		const book_api_post_url = "http://localhost:3001/books/" + query.id
		const book_query = {"name": name, "page": page}
		axios({
			method: "POST",
			url: book_api_post_url,
			data: book_query
		})
		.then((response) => {
			//
			// console.log(response)
			window.location.assign(book_url)
		}).catch((error) => {
			console.log(error)
		})
	}

	return (
		<div className="update-section">
			<p>本情報更新</p>
			<hr />
			<label>名前</label>
			<input type="text" name="name" className="input name-input" value={name} onChange={(e) => changeInput(e)} />
			<label>ページ数</label>
			<input type="text" name="page" className="input page-input" value={page} onChange={changeInput} />
			<input type="button" className="button update-section-button" value="送信する" onClick={updateBook} />
		</div>
	)
}

export default Update;