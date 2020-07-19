"use strict";

import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {PlusCircleFill} from "react-bootstrap-icons";

class CreateGroupHome extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Link to={"/group/create"}>
				<Button renderAs="button" variant={"success"}>
					<span>Create Group <PlusCircleFill className={"float-right popoverIcon"}/></span>
				</Button>
			</Link>
		);
	}
}

export default CreateGroupHome;
