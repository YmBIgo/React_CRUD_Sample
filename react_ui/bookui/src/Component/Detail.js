import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import "./Detail.css"

const Detail = () => {
	const params = useParams();
	const [book, setBook] = useState(params.id)
	const book_update_url = "/books/update/" + book.id
	const book_destroy_url = "/books/destroy/" + book.id

	useEffect(() => {
		handleGetBook();
	}, [params]);

	const handleGetBook = () => {
		const book_api_url = "http://localhost:3001/books/" + params.id
		axios({
			method: "GET",
			url: book_api_url
		})
		.then((response) => {
			console.log(response.data["books"])
			setBook(response.data["books"])
		})
		.catch((error) => {
			console.log(error)
		});
	}

	return (
		<div className="detail-section">
			<h4> {book.id} : {book.name} </h4>
			<p>
				{ book.page }ページ
				<br />
				<div>
					<Link to={book_update_url} className="button is-success">更新する</Link>
					<Link to={book_destroy_url} className="button is-danger">削除する</Link>
				</div>
			</p>
		</div>
	)
}

export default Detail;