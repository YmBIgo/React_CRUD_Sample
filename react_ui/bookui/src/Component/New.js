import React, { Component } from 'react';
import axios from 'axios'
import "./New.css"

class New extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			page: 0
		};
	}

	handleInputValue = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();
		axios({
			method : "POST",
			url : "http://localhost:3001/books",
			data : { name: this.state.name, page: this.state.page }
		})
		.then((response) => {
			console.log(this.props)
			window.location.assign("http://localhost:3000")
		})
		.catch((error) => {
			console.log(error);
		})
	}

	render() {
		const { name, page } = this.state
		return(
			<div className="new-section">
				<p>新規本情報登録</p>
				<hr />
				<div>
					<label>名前　　 : </label>
					<input type="text" name="name" className="input new-section-input" value={ name } onChange={ this.handleInputValue } />
					<br />
					<label>ページ数 : </label>
					<input type="text" name="page" className="input new-section-input" value={ page } onChange={ this.handleInputValue } />
					<br />
					<input type="button" className="button new-section-button" onClick={this.handleSubmit} value="Submit" />
				</div>
			</div>
		)
	}
}

export default New;