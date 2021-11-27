import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./Destroy.css"

const Destroy = () => {

	const { book, setBook } = useState();
	const query = useParams();

	const display_book = () => {
		console.log(query.id)
		axios({
			method: "GET",
			url: "http://localhost:3001/books/" + query.id
		}).then((response) => {
			console.log(response)
		})
	}

	return (
		<div>
		</div>
	)
}
export default Destroy;