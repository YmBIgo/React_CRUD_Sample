import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./Destroy.css"

const Destroy = () => {

	const [ book, setBook ] = useState(0);
	const query = useParams();
	const book_url = "/books/" + query.id

	// useEffect を使うべきか分からない
	useEffect(() => {
		display_book();
	}, [query])

	const display_book = () => {
		axios({
			method: "GET",
			url: "http://localhost:3001/books/" + query.id
		}).then((response) => {
			setBook(response.data["books"])
		})
	}

	const delete_book = (event) => {
		event.preventDefault();
		axios({
			method: "DELETE",
			url: "http://localhost:3001/books/" + query.id
		}).then((response) => {
			console.log(response)
		})
		window.location.assign("http://localhost:3000/")
	}

	return (
		<div>
			<p className="destroy-section-margin">削除してもいいですか？</p>
			<div className="book-detail-border">
				<h4>{book.id} : {book.name}</h4>
				<p>
					{book.page} ページ
					<br />
					<Link to={book_url} className="button is-primary">詳細を見る</Link>
				</p>
			</div>
			<input type="button" className="button is-danger destroy-section-margin" value="削除する" onClick={delete_book} />
		</div>
	)
}
export default Destroy;