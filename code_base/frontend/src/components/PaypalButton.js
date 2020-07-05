import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GroupService from "../services/GroupService";

const CLIENT = {
  sandbox:
      "ATlNCZUwt18yeGBxkLE-3ZBu6CSvejPLX3T-rXs4VTdCSg1e2L0DVewN6jC709L_6fafzyz4XOR5VM4J",
  production:
      "your_production_key"
};

const CLIENT_ID =
    process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let PayPalButton = null;

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paymentPending: false,
      paid: false
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const {isScriptLoaded, isScriptLoadSucceed} = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", {React, ReactDOM});
      this.setState({loading: false, showButtons: true});
    }
  }

  componentWillReceiveProps(nextProps) {
    const {isScriptLoaded, isScriptLoadSucceed} = nextProps;

    const scriptJustLoaded =
        !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = paypal.Buttons.driver("react", {
          React,
          ReactDOM,
        });
        this.setState({loading: false, showButtons: true});
      }
    }
  }

  buildOrder(){
    console.log("JoinInfo ID: "+this.props.joinInformation._id);
    let order = {
      purchase_units: [
        {
          description: this.props.group.name,
          amount: {
            currency_code: this.props.group.ticket.currency.short_form,
            value: this.props.pricePerPerson,
            breakdown:{
              item_total: {
                currency_code: this.props.group.ticket.currency.short_form,
                value: this.props.pricePerPerson
              }
            }
          },
          reference_id: this.props.joinInformation._id,
          invoice_number: this.props.joinInformation._id,
          payment_descriptor: "Ticket Share"
        }
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
        brand_name: "Ticket Share"
      },
      payer: {
        name: {
          given_name: "This",
          surname: "Name"
        },
        address: {
          address_line_1: this.props.selectedAddress.street,
          address_line_2: this.props.selectedAddress.streetNumber,
          admin_area_2: this.props.selectedAddress.city,
          admin_area_1: this.props.selectedAddress.country,
          postal_code: this.props.selectedAddress.countryCode,
          country_code: "DE"
        }
      }
    };
    console.log(order);
    return order;
  }

  createOrder(data, actions) {
    //https://developer.paypal.com/docs/api/orders/v2/
    console.log("Paypal Desc: "+this.props.group.name);
    try{
      return actions.order.create(this.buildOrder());
    }catch (e) {
      console.error(e);
    }

  };

  async onApprove(data, actions) {
    console.log("On Approve");
    actions.order.capture().then(details => {
      console.log("Details:"+details);
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID
      };
      console.log("Payment Approved: ", paymentData);
      this.setState({showButtons: false, paid: true});
      let joinInfo = GroupService.verifyPayment(paymentData.orderID,paymentData.payerID);
    }).catch(e => console.error(e));
  };

  render() {
    const {showButtons, loading, paid} = this.state;

    return (
        <div className="main">
          {!showButtons && <Row> <Col xs={4}/><Col><Spinner animation="border"/></Col><Col
              xs={4}/></Row>}
          {showButtons && (
              <PayPalButton
                  createOrder={(data, actions) => this.createOrder(data,
                      actions)}
                  onApprove={(data, actions) => this.onApprove(data, actions)}
              />)}
        </div>
    );
  }
}

export default scriptLoader(
    `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&currency=EUR`)(PaypalButton);
