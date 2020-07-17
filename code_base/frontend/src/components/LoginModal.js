import Modal from "react-bootstrap/Modal";
import React from "react";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalTitle from "react-bootstrap/ModalTitle";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FormText from "react-bootstrap/FormText";

import "./Login.css";
import Alert from "react-bootstrap/Alert";
import {debounce} from "throttle-debounce";
import UserService from "../services/UserService";

import {UserContext} from "../App";

class LoginModal extends React.Component{

  static contextType;

  constructor(props) {
    super(props);

    LoginModal.contextType = UserContext;

    this.state = {
      validated: false,
      errors: [],
      formFields:{
        username: null,
        password: null
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormInputDebounced = debounce(300, this.handleFormInput)
  }

  async handleLogin(){
    console.log(`Try login with: ${this.state.formFields.username}:${this.state.formFields.password}`);
    if(this.state.formFields.username && this.state.formFields.password){
      try{
        const resp =  await UserService.login(this.state.formFields.username, this.state.formFields.password);
        if(resp){
          await this.context.setUser(resp);
          this.props.successCallback(resp);
        }
      }catch (e) {
        console.error("LoginError:"+e);
        await this.setState({errors: [{msg:"Username or Password are incorrect!"}]});
      }

    }else{
      console.error("oops");
      let nErrors = [{msg:"Validation Failed"}];
      this.setState({errors: nErrors});
    }

  }

  handleFormInput(fieldName, value) {
    console.log(`${fieldName}: ${value}`);
    let fields = this.state.formFields;
    fields[fieldName] = value;
    this.setState({searchFields: fields});
  }

  async handleSubmit(event){
    const form = event.currentTarget;
    event.preventDefault();
    form.checkValidity();
    this.setState({validated:true});
    this.handleLogin();
  }

  render (){
    return (
        <Modal centered animation={false} backdrop="static" backdropClassName={"backdrop"}
               show={this.props.visible}>
          <ModalHeader>
            <ModalTitle>Login</ModalTitle>
          </ModalHeader>
          <ModalBody>
            {this.state.errors.length > 0 && (
                <Alert variant="danger">
                  <Alert.Heading>Login Failed!</Alert.Heading>
                  <ul>
                    {this.state.errors.map((error, idx) => (
                        <li key={idx}>{error.msg}</li>
                    ))}
                  </ul>
                </Alert>
            )}
            <Form onSubmit={this.handleSubmit} noValidate validated={this.state.validated}>
              <Form.Row>
                <FormGroup as={Col}>
                  <FormLabel>Username</FormLabel>
                  <FormControl required type={"text"} placeholder={"Username"} onChange={(event) => this.handleFormInputDebounced("username", event.target.value)}/>
                  <Form.Control.Feedback type={"invalid"}>Username is required!</Form.Control.Feedback>
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col}>
                  <FormLabel>Password</FormLabel>
                  <FormControl required type={"password"} placeholder={"Password"} onChange={(event) => this.handleFormInputDebounced("password", event.target.value)}/>
                  <Form.Control.Feedback type={"invalid"}>Password is required!</Form.Control.Feedback>
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col}>
                  <FormText muted><div>No Account <span className={"registerText"}>Register here!</span></div></FormText>
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup>
                  <Button className={"margin-right-small"} variant={"primary"} type={"submit"}>Login</Button>
                  <Button variant={"secondary"} onClick={this.props.cancelCallback}>Cancel</Button>
                </FormGroup>
              </Form.Row>
            </Form>
          </ModalBody>
        </Modal>
    )
  }
}



export default LoginModal;
