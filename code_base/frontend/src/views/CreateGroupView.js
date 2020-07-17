"use strict";

import React from "react";
import CreateGroupForm from "../components/group/CreateGroupForm";
import GroupInfo from "../components/group/Group_info";
import Share from "../components/group/Share";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import { Card, CardTitle } from "react-md";
import LoadingOverlay from "react-loading-overlay";
import GroupService from "../services/GroupService";

export class CreateGroupView extends React.Component {
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
			is_successful: false,
			is_details: false,
			groupId: "",
		};
	}
	async handleSubmit(data) {
		await this.setState({ errors: [] });
		await this.setState(data);
		(async () => {
			try {
				let resp = await GroupService.createGroup(data);
				this.setState({ groupId: resp.group, is_successful: true, is_details: true });
			} catch (errors) {
				this.setState({ errors: errors });
				window.scrollTo({ top: 0, behavior: "smooth" });
			} finally {
				this.setState({ isLoading: false });
			}
		})();
	}

	render() {
		let is_successful = this.state.is_successful;
		let is_details = this.state.is_details;
		return (
			<LoadingOverlay active={this.state.isLoading} spinner text="Loading...">
				<Container>
					<Row>
						<Col xs={1}></Col>
						<Col xs={10}>
							{is_successful && (
									<Alert variant="success" style={{ marginTop: "10px" }}>
										<Alert.Heading>Great! Your Group Ticket is Created!</Alert.Heading>
										<p>
											Aww yeah, you successfully created a group for others to join and have fun
											together
										</p>
										<hr />
										<p className="mb-0">You might want to share your link ;)</p>
									</Alert>
							)}
							{is_details && (
								<div>
									<GroupInfo id={this.state.groupId}></GroupInfo>
									<Share></Share>
								</div>
							)}
							{!is_successful && (
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
							)}
						</Col>
						<Col xs={1}></Col>
					</Row>
				</Container>
			</LoadingOverlay>
		);
	}
}

export default CreateGroupView;
