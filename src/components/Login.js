/* eslint-disable no-undef */
import { React, useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function LogIn() {
  const emailref = useRef();
  const passwordref = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      console.log(emailref.current.value, passwordref.current.value);
      await login(emailref.current.value, passwordref.current.value);
      setMessage("Logged in successfully.");
      navigate("/");
    } catch {
      setError("Failed to sign in.");
    }
    setLoading(false);
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "79vh", paddingTop: "1.9rem" }}
    >
      <Card style={{ borderRadius: "2rem" }}>
        <Card.Body
          style={{
            minWidth: "65.4rem",
            padding: "4rem",
          }}
        >
          <h1 className="text-center mb-3 pd-auto fs-1 fw-bold">Sign In</h1>
          {error && <Alert variant="danger">{error}</Alert>}

          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit} className="fs-3">
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailref}
                style={{ marginBottom: "1rem", fontSize: "1.2rem" }}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                style={{ marginBottom: "1rem", fontSize: "1.2rem" }}
                type="password"
                ref={passwordref}
                required
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              disabled={loading}
              className="login-bh"
              style={{
                fontSize: "2rem",
                padding: "0.7rem 1rem",
                minWidth: "65.4rem",
                marginBottom: "1rem",
              }}
            >
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3 fs-5 log-text">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <div className="w-100 text-center mt-2 fs-5  log-text">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LogIn;
