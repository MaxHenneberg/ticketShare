"use strict";

import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

class CreateGroupHome extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Link to={"/group/create"}>
				<Button renderAs="button" size="lg" variant={"success"}>
					<span>+ Create Group</span>
				</Button>
			</Link>
		);
	}
}

export default CreateGroupHome;
