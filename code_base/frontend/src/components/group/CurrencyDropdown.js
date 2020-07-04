"use strict";

import React from "react";
import { withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";

class CurrencyDropdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currencies: [],
			selectedCurrency: "",
			validationError: "",
		};
	}
	componentDidMount() {
		fetch("http://localhost:8080/currency")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				let currenciesFromApi = data.map((c) => {
					return { value: c._id, display: c.name };
				});
				this.setState({
					currencies: [
						{
							value: "",
							display: "Currency of Ticket",
						},
					].concat(currenciesFromApi),
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<Form.Control
				as="select"
				name={this.props.name}
				onChange={this.props.onChange}
			>
				{this.state.currencies.map((c) => (
					<option key={c.value} value={c.value}>
						{c.display}
					</option>
				))}
			</Form.Control>
		);
	}
}
export default withRouter(CurrencyDropdown);
