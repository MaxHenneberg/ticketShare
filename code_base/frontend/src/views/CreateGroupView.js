"use strict";

import React from "react";
import CreateGroupForm from "../components/group/CreateGroupForm";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import { Card, CardTitle } from "react-md";
import LoadingOverlay from "react-loading-overlay";

export class CreateGroupView extends React.Component {
	static baseURL() {
		return "http://localhost:8080/group/create";
	}

	constructor(props) {
		super(props);
		this.myRef = React.createRef();
		//only allowed in Constructor otherwise use this.setState to not interfere with Reacts logic
		this.state = {
			errors: [],
			isLoading: false,
			name: "",
			type: "",
			desc: "No Description Available",
			joinDeadline: "",
			is_public: false,
			eventInformation: {
				name: "",
				desc: "No Description Available",
				eventStart: "",
				eventEnd: "",
				linkToEvent: "",
			},
			ticketInfo: {
				fullPrice: null,
				maxCoveredPeople: null,
				initialFreeSlotsLeft: null,
				currency: "",
			},
		};
	}
	async handleSubmit(data) {
		await this.setState({ errors: [] });
		await this.setState(data);

		var request_options = {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		};
		try {
			let response = await fetch(CreateGroupView.baseURL(), request_options);
			response = await response.json();
			if (response.errors) throw response.errors;
		} catch (errors) {
			this.setState({ errors: errors });
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
		finally{
			this.setState({ isLoading: false });
		}
	}

	render() {
		return (
			<LoadingOverlay active={this.state.isLoading} spinner text="Loading...">
				<Container>
					<Row>
						<Col xs={1}></Col>
						<Col xs={10}>
							<Card>
								<CardTitle title="Create Group" />
								<hr></hr>
								<Row>
									<Col xs={1}></Col>
									<Col xs={10}>
										<Row>
											<Col>
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
			</LoadingOverlay>
		);
	}
}

export default CreateGroupView;
