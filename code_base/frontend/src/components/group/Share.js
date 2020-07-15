"use strict";

import React from "react";
import { withRouter } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import {
	EmailShareButton,
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	FacebookIcon,
	TwitterIcon,
	WhatsappIcon,
	LinkedinIcon,
	EmailIcon,
} from "react-share";

class Share extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card>
				<Row style={{ padding: "10px" }}>
					<Col xs={3}></Col>
					<Col xs={6}>
						<Row>
							<Col>
								<FacebookShareButton className={"btn"} url={"TicketShare.com"}>
									<FacebookIcon round size={50} />
								</FacebookShareButton>
							</Col>
							<Col>
								<TwitterShareButton className={"btn"} url={"TicketShare.com"}>
									<TwitterIcon round size={50} />
								</TwitterShareButton>
							</Col>
							<Col>
								<WhatsappShareButton className={"btn"} url={"TicketShare.com"}>
									<WhatsappIcon round size={50} />
								</WhatsappShareButton>
							</Col>
							<Col>
								<LinkedinShareButton className={"btn"} url={"TicketShare.com"}>
									<LinkedinIcon round size={50} />
								</LinkedinShareButton>
							</Col>
							<Col>
								<EmailShareButton className={"btn"} url={"TicketShare.com"}>
									<EmailIcon round size={50} />
								</EmailShareButton>
							</Col>
						</Row>
					</Col>
					<Col xs={3}></Col>
				</Row>
			</Card>
		);
	}
}

export default Share;
