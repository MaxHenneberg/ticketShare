"use strict";

import React from 'react';
import Header from "../Header";
import {Card} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {Check, CloudFill} from "react-bootstrap-icons";
import Col from "react-bootstrap/Col";

export class GroupComponentDummy extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="listItem" key={this.props.key}>
                <Row>
                    <Col xs={2}>
                        <CloudFill/>
                    </Col>
                    <Col xs={10}>
                        <Row>
                            <Col>
                                {this.props.group.name}
                            </Col>
                            <Col>
                                <div className="float-sm-right">
                                    Already bought <Check/>
                                </div>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                11,6€/Person
                            </Col>
                            <Col>
                                23/05/2020
                            </Col>
                            <Col>
                                <div className="float-sm-right">
                                    XXX/00
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            // <Card border="primary" style={{ width: '18rem' }}>
            //     <Card.Body>
            //         <div>
            //             <Card.Title>{this.props.group.title}</Card.Title>
            //             <Card.Text>
            //
            //             </Card.Text>
            //         </div>
            //     </Card.Body>
            // </Card>

        );
    }
}
export default GroupComponentDummy;