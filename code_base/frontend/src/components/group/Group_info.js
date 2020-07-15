"use strict";

import React from "react";
import { withRouter } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import GroupService from "../../services/GroupService";

const select_style = {
	marginTop: "1rem",
};

class GroupInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			_id: "",
			name: "Loading...",
			type: "Loading...",
			desc: "No Description Available",
			joinDeadline: "Loading...",
			public: "Loading...",
			creator: "Loading...",
			ticket: {
				_id: "",
				fullPrice: "Loading...",
				maxCoveredPeople: "Loading...",
				currency: {
					_id: "",
					symbol: "Loading...",
				},
				eventInformation: {
					_id: "Loading...",
					name: "Loading...",
					desc: "Loading...",
					eventStart: "Loading...",
					eventEnd: "Loading...",
					linkToEvent: "",
					createdAt: "Loading...",
					updatedAt: "Loading...",
					__v: 0,
				},
			},
			emptySlots: "Loading..",
			eventStart: "Loading",
			eventEnd: "Loading",
		};
	}
	componentDidMount() {
		let id = this.props.id;
		(async () => {
			try {
				let group = await GroupService.getGroup(id);
				this.setState(group);
				this.populatePricePerPerson();
				this.convertDate();
				this.getEmptySlots(id);
			} catch (err) {
				console.error(err);
			}
		})();
	}
	populatePricePerPerson() {
		var price_per_person = this.state.ticket.fullPrice / this.state.ticket.maxCoveredPeople;
		this.setState({ price_per_person: price_per_person });
		return;
	}
	convertDate() {
		var d = new Date(this.state.joinDeadline).toDateString().split(" ").slice(1).join(" ");
		this.setState({
			joinDeadline: d,
		});
		return;
	}
	async getEmptySlots(id) {
		let response = await GroupService.getFreeSlots(id);
		this.setState({ emptySlots: response.free_slots });
		return;
	}

	render() {
		return (
			<Row>
				<Col>
					<Card>
						<Row style={{ paddingTop: "10px" }}>
							<Col xs={1}></Col>
							<Col xs={8}>
								<h2>
									<b>{this.state.name}</b>
								</h2>
							</Col>
							<Col xs={3}></Col>
						</Row>
						<Card.Body>
							<Row>
								<Col>
									<center>
										Price per Person:
										<h3>
											{this.state.ticket.currency.symbol} {this.state.price_per_person}
										</h3>
									</center>
								</Col>
								<Col>
									<center>
										Join Last Date:
										<h3>{this.state.joinDeadline}</h3>
									</center>
								</Col>
								<Col>
									<center>
										Places Remaining:{" "}
										<h3>
											{" "}
											{this.state.emptySlots} / {this.state.ticket.maxCoveredPeople}
										</h3>
									</center>
								</Col>
								<Col>
									<center>
										Event Name: <h3> {this.state.ticket.eventInformation.name}</h3>
									</center>
								</Col>
							</Row>
							<br></br>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		);
	}
}

export default GroupInfo;
