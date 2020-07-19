import {PersonCircle} from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import React from "react";
import LoginModal from "./LoginModal";
import "./Login.css";

function LoginButton(props) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const successCallback = () => {
    setModalVisible(false);
  };
  return (
      <div>
        <Button onClick={() => setModalVisible(true)}>><PersonCircle/></Button>
        <LoginModal visible={modalVisible} successCallback={successCallback} cancelCallback={() => setModalVisible(false)}/>
      </div>
  )
}

export default LoginButton;
