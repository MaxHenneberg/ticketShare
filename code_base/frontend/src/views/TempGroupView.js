
import React from 'react';
import GroupComponent from "../components/group/GroupComponent";


export class TempGroupView extends React.Component {

    constructor(props) {
      super(props);
      //only allowed in Constructor otherwise use this.setState to not interfere with Reacts logic
      this.state = {};
    }
  
    render() {
      return (
          <GroupComponent group_id="5f009518a7c6f612486e20cb"></GroupComponent>
      );
    }
  }
export default TempGroupView;
