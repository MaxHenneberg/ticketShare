"use strict";

import React from "react";
import { withRouter } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import GroupService from "../../services/GroupService";

class GroupComponent extends React.Component {
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
			},
			emptySlots: "Loading.."
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
									<Col>
										Places Remaining:{" "}
										<h3>
											{" "}
											{this.state.emptySlots}{" "}/{" "}
											{this.state.ticket.maxCoveredPeople}
										</h3>
									</Col>
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
