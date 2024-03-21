import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import { GrStatusGood } from "react-icons/gr";

const SuccessfulScreen = () => {
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
              <Card.Title>Payment Successful</Card.Title>

              <GrStatusGood className="success payment-icon" />
              <Card.Text>Thank you for your payment.</Card.Text>
              <Link to="/">
                <Button variant="btn btn-success">Continue Shopping</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export { SuccessfulScreen };
