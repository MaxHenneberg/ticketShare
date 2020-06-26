import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import Spinner from "react-bootstrap/Spinner";

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

  createOrder(data, actions) {
    //https://developer.paypal.com/docs/api/orders/v2/
    return actions.order.create({
      purchase_units: [
        {
          description: +"Mercedes G-Wagon",
          amount: {
            currency: "USD",
            value: 200
          },
          invoice_number: "INV5511231",
          payment_descriptor: "My Shop"
        }
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
        brand_name: "Seba Test"
      },
      payer:{
        name:{
          given_name: "This",
          surname: "Name"
        },
        address: {
          address_line_1: "Jochbergweg 7",
          address_line_2: "7",
          admin_area_2: "Garching",
          admin_area_1: "Germany",
          postal_code: "85748",
          country_code: "DE"
        }
      }
    });
  };

  onApprove(data, actions) {
    actions.order.capture().then(details => {
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID
      };
      console.log("Payment Approved: ", paymentData);
      this.setState({showButtons: false, paid: true});
    });
    this.props.successCallBack();
  };

  render() {
    const {showButtons, loading, paid} = this.state;

    return (
        <div className="main">
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
    `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`)(PaypalButton);
