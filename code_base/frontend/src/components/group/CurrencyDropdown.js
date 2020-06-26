"use strict";

import React from "react";
import { withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { SelectField } from "react-md";

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
					return { value: c._id, label: c.name };
				});
				this.setState({
					currencies: [
						{
							value: "",
							label: "Currency of Ticket",
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
			// <Form.Control as="select"
			// 	name={this.props.name}
			// 	value={this.state.selectedCurrency}
			// 	onChange={(e) =>
			// 		this.setState({
			// 			selectedCurrency: e.target.value,
			// 			// validationError:
			// 			// 	e.target.value === "" ? "You must select a currency" : "",
			// 		})
			// 	}
			// >
			// 	{this.state.currencies.map((c) => (
			// 		<option key={c.value} value={c.value}>
			// 			{c.display}
			// 		</option>
			// 	))}
			// </Form.Control>
			<SelectField
				required
				id={this.props.id}
				name={this.props.name}
				placeholder="Currency"
				fullWidth={true}
				menuItems={this.state.currencies}
				style={this.props.style}
			></SelectField>
			// <div
			// 	style={{
			// 		color: "red",
			// 		marginTop: "5px",
			// 	}}
			// >
			// 	{this.state.validationError}
			// </div>
		);
	}
}
export default withRouter(CurrencyDropdown);
