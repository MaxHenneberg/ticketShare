"use strict";
import React from 'react';
import SearchGroup from "../components/SearchGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {ListGroup} from "../components/ListGroup";
import GroupService from "../services/GroupService";

export class ListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }
    componentWillMount() {
        this.setState({
            loading: true
        });

        GroupService.getGroupIds().then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <div>
                <Row>
                    <Col xs={1}/>
                    <Col xs={10}>
                        <SearchGroup/>
                    </Col>
                    <Col xs={1}/>
                </Row>
                <Row>
                    <Col xs={1}/>
                    <Col xs={10}>
                        <ListGroup data={this.state.data} />
                    </Col>
                    <Col xs={1}/>
                </Row>
            </div>
    );
  }
}

export default ListView;
