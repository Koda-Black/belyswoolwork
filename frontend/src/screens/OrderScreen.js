import React, { useContext, useEffect, useReducer } from "react";
// import useDeepCompareEffect from "use-deep-compare-effect";
import { PaystackButton } from "react-paystack";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Button from "react-bootstrap/Button";
import { Store } from "../Store";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { getError } from "../utils";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { loadStripe } from "@stripe/stripe-js";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
export default function OrderScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    console.log("Fetching order...");
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        console.log("FETCH_REQUEST dispatched");
        const { data } = await axios.get(`/api/v1/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.user.token}` },
        });
        console.log("Authorization Token:", userInfo.user.token);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        console.log("FETCH_SUCCESS dispatched with data:", data);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
        console.log("FETCH_FAIL dispatched with error:", getError(err));
      }
    };

    if (!userInfo) {
      return navigate("/login");
    }

    if (Object.keys(order).length === 0 || order.id !== orderId) {
      fetchOrder();
    }
  }, [order, userInfo, orderId, navigate]);

  const handleStripePayment = async () => {
    const apiURL = "/api/v1/orders"; // Initialize useNavigate hook
    const stripe = await loadStripe(
      "pk_test_51OwXukB9RrPApwN7z0mMopeph1kVUi6hsejateWYMSdcgtKSwkojQQZHO9Z4o98Gsnfkp20S0r1akoJdlQ4joOZI00oglnPQTN"
    );

    const body = {
      products: order.orderItems,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(`${apiURL}/create-checkout-session`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const session = await response.json();

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
      } else {
        // Redirect to a new route without the /order prefix
        // navigate("/api/v1/orders/create-checkout-session");
        if (
          session.payment_status === "paid" &&
          session.state === "succeeded"
        ) {
          const updatedOrder = {
            ...order,
            isPaid: true,
            paidAt: new Date.now(),
          };

          await axios.put(`${apiURL}/${orderId}`, updatedOrder, {
            headers: { authorization: `Bearer ${userInfo.user.token}` },
          });

          dispatch({ type: "FETCH_SUCCESS", payload: updatedOrder });
        } else {
          toast.error(
            getError("Payment failed. Check your network and try again")
          );
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePaystackPaymentSuccess = async ({ reference }) => {
    const apiURL = "/api/v1/orders";
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await fetch(`${apiURL}/verify-payment`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(reference),
      });
      const data = await response.json();
      navigate("/payment/success");
    } catch (error) {
      toast.error(getError("Payment failed. Check your network and try again"));
    }
  };

  const handlePaymentClose = () => {
    navigate("/payment/cancel");
  };

  const makePayment = async () => {
    if (order.paymentMethod === "Stripe") {
      await handleStripePayment();
    } else if (order.paymentMethod === "Paystack") {
      await handlePaystackPaymentSuccess();
    } else {
      console.error("Unsupported payment method:", order.paymentMethod);
    }
  };

  const [amount, setAmount] = useState(order.totalPrice || 0);
  const [firstname, setFirstname] = useState(
    userInfo.user.name.split(" ")[0] || ""
  );
  const [lastname, setLastname] = useState(
    userInfo.user.name.split(" ")[1] || ""
  );

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="container small-container">
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1 className="my-3">Order {orderId}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {order.shippingAddress?.fullName} <br />
                <strong>Address:</strong>
                {order.shippingAddress?.address},{order.shippingAddress?.city},
                {order.shippingAddress?.postalCode},
                {order.shippingAddress?.country}
              </Card.Text>
              {order.isDeliverd ? (
                <MessageBox variant="success">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Delivered</MessageBox>
              )}
            </Card.Body>
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {order.paymentMethod}
                <Card.Text>
                  {order.isPaid ? (
                    <MessageBox variant="success">
                      Paid at {order.paidAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not Paid</MessageBox>
                  )}
                </Card.Text>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems?.map((item) => (
                  <ListGroup.Item key={item.id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={`http://localhost:5202/public/uploads/${item.image}`}
                          className="img-fluid rounded img-thumbnail"
                          style={{ width: "70px" }}
                          alt={item.product.name}
                        ></img>{" "}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>{item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>₦ {order.itemsPrice?.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>₦ {order.shippingPrice?.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>₦ {order.taxPrice?.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Order Total</Col>
                    {order.paymentMethod === "Paystack" ? (
                      <PaystackButton
                        text={`Pay ₦ ${
                          order.totalPrice === 0
                            ? "0"
                            : order.totalPrice.toFixed(2)
                        }`}
                        className="paystack-button"
                        firstname={firstname}
                        lastname={lastname}
                        amount={amount * 100} // Convert amount to kobo for Paystack
                        publicKey={
                          "pk_test_5b074168287807018627f691eb329fa4c3bb200c"
                        }
                        onSuccess={handlePaystackPaymentSuccess}
                        onClose={handlePaymentClose}
                      />
                    ) : (
                      <Button
                        onClick={makePayment}
                        className={`btn ${
                          order.totalPrice === 0 ? "btn-primary" : "btn-success"
                        }`}
                        type="button"
                      >
                        Pay ₦{" "}
                        {order.totalPrice === 0
                          ? "0"
                          : order.totalPrice.toFixed(2)}
                      </Button>
                    )}
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
