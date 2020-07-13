"use strict";

import React from 'react';
import "./ListGroup.css"
import GroupComponentDummy from "./group/GroupComponentDummy";

export const ListGroup = ({data}) => (
        <div>
            {data.map((group, i) =>
                <div key={i}>
                        <GroupComponentDummy group={group}/>
                        <br />
                </div>)}
        </div>
);


