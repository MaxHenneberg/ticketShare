"use strict";

import React from "react";
import CreateGroupForm from "../components/group/CreateGroupForm";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import { Card, CardTitle } from "react-md";

export class CreateGroupView extends React.Component {
	static baseURL() {
		return "";
	}

	constructor(props) {
		super(props);
		this.myRef = React.createRef();
		//only allowed in Constructor otherwise use this.setState to not interfere with Reacts logic
		this.state = {
			errors: [],
			name: "",
			type: "",
			desc: "ss",
			is_public: false,
			eventInformation: {
				name: "",
				desc: "",
				eventStart: "",
				eventEnd: "",
				linkToEvent: "",
			},
			ticketInfo: {
				fullPrice: 0,
				maxCoveredPeople: 0,
				initialFreeSlotsLeft: 0,
				currency: "",
			},
		};
	}
	componentDidMount() {
		this.myRef.current.scrollTo(0, 0);
	}
	async handleSubmit(data) {
		await this.setState({ errors: [] });
		console.log(this.state.errors.length);
		await this.setState(data);

		var request_options = {
			method: "POST",
			body: data,
		};
		try {
			let response = await fetch(
				"http://localhost:8080/group/create",
				request_options
			);
			response = await response.json();
			// console.log(response);

			if (response.errors) throw response.errors;
		} catch (errors) {
			console.log("Eror occur");
			this.setState({ errors: errors });
			// console.log(this.state.errors);
		}
	}

	render() {
		return (
			<Container>
				<Row>
					<Col xs={1}></Col>
					<Col xs={10}>
						<Card>
							<CardTitle title="Create Group" />
							<Row>
								<Col xs={1}></Col>
								<Col xs={10}>
									<Row>
										<Col>
											<div ref={this.myRef}></div>
											{this.state.errors.length > 0 && (
												<Alert variant="danger">
													<Alert.Heading>Oops!</Alert.Heading>
													<ul>
														{this.state.errors.map((error, idx) => (
															<li key={idx}>{error.msg}</li>
														))}
													</ul>
												</Alert>
											)}
										</Col>
									</Row>
									<CreateGroupForm
										state={this.state}
										onSubmit={this.handleSubmit.bind(this)}
										handleChangeGroup={this.handleChangeGroup}
										handleChangeTicket={this.handleChangeTicket}
										handleChangeEventInfo={this.handleChangeEventInfo}
									></CreateGroupForm>
								</Col>
								<Col xs={1}></Col>
							</Row>
						</Card>
					</Col>
					<Col xs={1}></Col>
				</Row>
			</Container>
		);
	}
}

export default CreateGroupView;
