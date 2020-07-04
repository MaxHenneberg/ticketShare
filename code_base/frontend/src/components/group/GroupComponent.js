"use strict";

import React from "react";
import { withRouter } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

class GroupComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		fetch("http://localhost:8080/group/" + this.props.group_id)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.setState(data);
				console.log(this.state);
			})
			.catch((error) => {
				console.log(error);
			});
	}
	render() {
		return (
			<Row>
				<Col>
					<Card>
						<Card.Title style={{ paddingTop: "10px" }}>
							{this.state.name}
						</Card.Title>
						<hr></hr>
						<Card.Body>
							<Col>
							
							</Col>
							<Col>
								Temp 3 places remain
							</Col>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		);
	}
}
export default withRouter(GroupComponent);
