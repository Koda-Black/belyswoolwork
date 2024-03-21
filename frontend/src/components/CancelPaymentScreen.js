import React from "react";
import { Link } from "react-router-dom";
import { TbCreditCardOff } from "react-icons/tb";
import { Row, Col, Card, Button } from "react-bootstrap";

const CancelScreen = () => {
  return (
    <div className="full-height-container d-flex align-items-center ">
      {" "}
      {/* Added class for full height */}
      <Row className="justify-content-center">
        {" "}
        {/* Center content */}
        <Col md={6} className="custom-centered-col">
          <Card className="square-card shadow">
            {" "}
            {/* Added classes for square and shadow */}
            <Card.Body className="text-center">
              <Card.Title>Payment Cancelled</Card.Title>

              <TbCreditCardOff className="cancel payment-icon" />
              <Card.Text>Your payment has been cancelled.</Card.Text>
              <Link to="/cart">
                <Button variant="btn btn-success">Return to Cart</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export { CancelScreen };
