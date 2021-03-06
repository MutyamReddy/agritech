import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords Do not match");
        }

        const promises = [];
        setLoading(true);
        setError("");
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }

        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises)
            .then(() => {
                history.push("/");
            })
            .catch(() => {
                setError("Failed to Update Profile");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <>
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
            >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Update Profile</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        ref={emailRef}
                                        defaultValue={currentUser.email}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        ref={passwordRef}
                                        placeholder="Leave empty to use old Password"
                                    />
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <Form.Label>Password Confirm</Form.Label>
                                    <Form.Control
                                        type="password"
                                        ref={passwordConfirmRef}
                                        placeholder="Leave empty to use old Password"
                                    />
                                </Form.Group>
                                <Button
                                    disabled={loading}
                                    className="w-100"
                                    type="submit"
                                >
                                    UPDATE
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        <Link to="/">Cancel</Link>
                    </div>
                </div>
            </Container>
        </>
    );
}
