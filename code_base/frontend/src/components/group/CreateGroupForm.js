"use strict";

import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import CurrencyDropdown from "./CurrencyDropdown";
import {
	TextField,
	SelectionControl,
	CardTitle,
	DatePicker,
	FontIcon,
} from "react-md";

const select_style = {
	marginTop: "1rem",
};

class CreateGroupForm extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Form>
				<CardTitle title="Basic Information"  subtitle="Required"/>
				<Row>
					<Col>
						<Form.Group controlId="group_name">
							{/* <Form.Label>Group Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="z.B Bavarian Group Ticket"
							/> */}
							<TextField
								required
								id="group_name"
								type="text"
								label="Group Name"
								placeholder="z.B Bavarian Group Ticket"
							></TextField>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="group_type">
							{/* <Form.Label>Group Type</Form.Label>
							<Form.Control type="text" placeholder="z.B Travel, Concert" /> */}
							<TextField
								required
								id="group_type"
								type="text"
								label="Group Type"
								placeholder="z.B Travel, Concert"
							></TextField>
						</Form.Group>
					</Col>
				</Row>
				<Form.Group controlId="group_desc">
					{/* <Form.Label>Group Description</Form.Label>
					<Form.Control as="textarea" rows="3" /> */}
					<TextField
						optional
						id="group_desc"
						label="Group Description"
						lineDirection="right"
						rows={2}
						placeholder="eg. Travel by train with a group of photographers"
					/>
				</Form.Group>
				<Form.Group controlId="is_public">
					{/* <Form.Check
						type="checkbox"
						label="Share your information in search results?"
					/>
					<Form.Text>
						Will be only visible after someone joins the group
					</Form.Text> */}
					<SelectionControl
						id="is_public"
						type="switch"
						label="Share your information with people who join your group?"
						name="is_public"
					/>
				</Form.Group>

				<CardTitle title="Ticket Information" subtitle="Required"/>
				<Row>
					<Col>
						<Form.Group controlId="maxCoveredPeople">
							<TextField
								required
								id="maxCoveredPeople"
								name="maxCoveredPeople"
								type="number"
								label="Total People"
							></TextField>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="initialFreeSlotsLeft">
							<TextField
								required
								id="initialFreeSlotsLeft"
								name="initialFreeSlotsLeft"
								type="number"
								label="Free Slots"
							></TextField>
						</Form.Group>
					</Col>
				</Row>

				
				<Row>
					<Col>
						<Form.Group controlId="currency">
							<CurrencyDropdown
								name="currency"
								id="currency"
								style={select_style}
							></CurrencyDropdown>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="amount">
							<TextField
								required
								id="amount"
								name="amount"
								type="number"
								label="Total Price"
								step="0.01"
							></TextField>
						</Form.Group>
					</Col>
				</Row>
				<Form.Text>Note: Total Price is the Combined Price of Ticket.</Form.Text>
				<Form.Text>100 Euros for 10 people: Total Price = 100</Form.Text>
				
				<CardTitle title="Event Information" subtitle="Optional"/>
				<Row>
					<Col>
						<Form.Group controlId="event_name">
							{/* <Form.Label>Event Name</Form.Label>
					<Form.Control type="text" placeholder="z.B Daddy Yankee Concert" /> */}
							<TextField
								id="event_name"
								type="text"
								label="Event Name"
								placeholder="eg. Daddy Yankee Concert"
							></TextField>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="event_name">
							{/* <Form.Label>Short Event Description</Form.Label>
					<Form.Control
						type="text"
						placeholder="z.B Concert of the latin pop star"
					/> */}
							<TextField
								id="event_type"
								type="text"
								label="Event Type"
								placeholder="Concert of the latin pop star"
							></TextField>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col>
						<Row>
							<DatePicker
								id="inline-date-picker-auto"
								label="Event Start Date"
								inline
								fullWidth={false}
								className="col"
							/>
							<DatePicker
								id="inline-date-picker-portait"
								label="Event End Date"
								inline
								displayMode="portrait"
								fullWidth={false}
								className="col"
							/>
						</Row>
					</Col>
					<Col>
						<TextField
							id="linkToEvent"
							label="Weblink of Event"
							type="text"
							rightIcon={<FontIcon>link</FontIcon>}
							fullWidth={true}
						/>
					</Col>
				</Row>
			</Form>
		);
	}
}

export default CreateGroupForm;
