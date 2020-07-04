"use strict";

import React from "react";
import { withRouter } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

class GroupComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = { ticket: { currency: {} } };
	}
	componentDidMount() {
		fetch("http://localhost:8080/group/" + this.props.group_id)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.setState(data);
				this.populatePricePerPerson();
				this.convertDate();
				console.log(this.state);
			})
			.catch((error) => {
				console.log(error);
			});
	}
	populatePricePerPerson() {
		var price_per_person =
			this.state.ticket.fullPrice / this.state.ticket.maxCoveredPeople;
		this.setState({ price_per_person: price_per_person });
		return;
	}
	convertDate() {
		var d = new Date(this.state.joinDeadline).toDateString();
		this.setState({ joinDeadline: d });
		return;
	}
	render() {
		return (
			<Row>
				<Col>
					<Card>
						<h2 style={{ paddingTop: "10px" }}>{this.state.name}</h2>
						<Card.Body>
							<Col>
								<Row>
									<Col>
										Price per Person:
										<h3>
											{this.state.ticket.currency.symbol}{" "}
											{this.state.price_per_person}
										</h3>
									</Col>
									<Col>
										Join Last Date: <h3>{this.state.joinDeadline}</h3>
									</Col>
									<Col>TODO. places remaining</Col>
								</Row>
							</Col>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		);
	}
}
export default withRouter(GroupComponent);
