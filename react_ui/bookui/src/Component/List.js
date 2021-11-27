import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./List.css"

class List extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			books: []
		}
	}

	componentDidMount() {
		//
		axios.get("http://localhost:3001/books")
		.then((results) => {
			this.setState({books: results.data["books"]})
		})
		.catch((data) => {
			console.log(data)
		})
	}

	render() {
		const {books} = this.state
		return (
		<div>
			<table className="table">
				<tbody>
					{books.map((book) => {
						const book_url = "/books/" + book.id
						return(
							<tr className="each_book" key={book.id}>
								<th> {book.id} </th>
								<td>{ book.name } </td>
								<td>{ book.page }pages</td>
								<td>
									<Link to={book_url}>詳細を見る</Link>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
		);
	}
}

export default List;