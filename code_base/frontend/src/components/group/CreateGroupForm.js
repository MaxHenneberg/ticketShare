"use strict";

import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import CurrencyDropdown from "./CurrencyDropdown";
import { CardTitle, Button } from "react-md";

const select_style = {
	marginTop: "1rem",
};

class CreateGroupForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = props.state;
	}
	async handleSendData(event) {
		event.preventDefault();
		await this.setState({ isLoading: true });
		await this.props.onSubmit(this.state);
		this.setState({ isLoading: false });
	}
	handleChangeGroup(field_name, event) {
		let fields = this.state;
		if (field_name == "is_public") {
			fields[field_name] = event.target.checked;
		} else {
			fields[field_name] = event.target.value;
		}
		this.setState({ fields });
	}
	handleChangeTicket(field_name, event) {
		let fields = this.state.ticketInfo;
		fields[field_name] = event.target.value;
		this.setState({ fields });
	}
	handleChangeEventInfo(field_name, event) {
		let fields = this.state.eventInformation;
		fields[field_name] = event.target.value;
		this.setState({ fields });
	}
	render() {
		return (
			<Form onSubmit={this.handleSendData.bind(this)}>
				<CardTitle title="Basic Information" subtitle="" />
				<Row>
					<Col>
						<Form.Group>
							<Form.Label>Group Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="z.B Bavarian Group Ticket"
								onChange={this.handleChangeGroup.bind(this, "name")}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.Label>Group Type</Form.Label>
							<Form.Control
								type="text"
								placeholder="z.B Travel, Concert"
								onChange={this.handleChangeGroup.bind(this, "type")}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Form.Group>
					<Form.Label>Group Description</Form.Label>
					<Form.Control
						as="textarea"
						rows="3"
						placeholder="eg. Travel by train with a group of photographers"
						onChange={this.handleChangeGroup.bind(this, "desc")}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Check
						id="is_public"
						type="switch"
						label="Share your information with people who join your group?"
						onChange={this.handleChangeGroup.bind(this, "is_public")}
					/>
					<Form.Text>
						Will be only visible after someone joins the group
					</Form.Text>
				</Form.Group>

				<CardTitle title="Ticket Information" subtitle="" />
				<Row>
					<Col>
						<Form.Group>
							<Form.Label>People Covered</Form.Label>
							<Form.Control
								type="number"
								placeholder="Numbers only"
								onChange={this.handleChangeTicket.bind(
									this,
									"maxCoveredPeople"
								)}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.Label>Free Slots</Form.Label>
							<Form.Control
								type="number"
								placeholder="Numbers only"
								onChange={this.handleChangeTicket.bind(
									this,
									"initialFreeSlotsLeft"
								)}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col>
						<Form.Group>
							<Form.Label>Currency</Form.Label>
							<CurrencyDropdown
								name="currency"
								id="currency"
								style={select_style}
								onChange={this.handleChangeTicket.bind(this, "currency")}
							></CurrencyDropdown>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.Label>Total Price</Form.Label>
							<Form.Control
								type="number"
								step="0.01"
								placeholder="Price of combined ticket"
								onChange={this.handleChangeTicket.bind(this, "fullPrice")}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Form.Text>
					Note: Total Price is the Combined Price of Ticket.
				</Form.Text>
				<Form.Text>100 Euros for 10 people: Total Price = 100</Form.Text>

				<CardTitle title="Event Information"/>
				<Row>
					<Col>
						<Form.Group>
							<Form.Label>Event Name</Form.Label>
							<Form.Control
								id="name"
								type="text"
								placeholder="z.B Daddy Yankee Concert"
								onChange={this.handleChangeEventInfo.bind(this, "name")}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.Label>Short Event Description</Form.Label>
							<Form.Control
								type="text"
								placeholder="z.B Concert of the latin pop star"
								onChange={this.handleChangeEventInfo.bind(this, "desc")}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col>
						<Form.Group>
							<Form.Label>Event Start Date</Form.Label>
							<Form.Control
								type="date"
								placeholder="StartDate"
								onChange={this.handleChangeEventInfo.bind(this, "eventStart")}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.Label>Event End Date</Form.Label>
							<Form.Control
								type="date"
								placeholder="EndDate"
								onChange={this.handleChangeEventInfo.bind(this, "eventEnd")}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Button raised primary disabled={this.state.isLoading} type="submit">
					{this.state.isLoading ? "Loading..." : "Submit"}
				</Button>
			</Form>
		);
	}
}

export default CreateGroupForm;
