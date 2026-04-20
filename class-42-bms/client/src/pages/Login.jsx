import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// API
import { loginUser } from "../api/users";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleUserLogin = async (values) => {
        try {
            setLoading(true);

            const response = await loginUser(values);

            if (response.success) {
                message.success("Login successful");
                const token = response.data?.token;
                if (token) {
                    localStorage.setItem("token", token);
                }

                // For now, just redirect
                navigate("/");
            } else {
                message.error(response.message);
            }
        } catch (err) {
            message.error(err.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <header className="App-header">
                <main className="main-area mw-500 text-center px-3">
                    <section className="left-section">
                        <h1>Login to BMS</h1>
                    </section>

                    <section className="right-section">
                        <Form layout="vertical" onFinish={handleUserLogin}>
                            <Form.Item
                                label="Email"
                                htmlFor="email"
                                name="email"
                                className="d-block"
                                rules={[{ required: true, message: "Email is required" }]}
                            >
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="Enter your text"
                                ></Input>
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                htmlFor="password"
                                name="password"
                                className="d-block"
                                rules={[{ required: true, message: "Password is required" }]}
                            >
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your Password"
                                ></Input>
                            </Form.Item>

                            <Form.Item className="d-block">
                                <Button
                                    type="primary"
                                    block
                                    htmlType="submit"
                                    style={{ fontSize: "1rem", fontWeight: "600" }}
                                >
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>

                        <div>
                            <p>
                                New User? <Link to="/register">Register Here</Link>
                            </p>
                            <p>
                                Forgot password? <Link to="/forget">Click Here</Link>
                            </p>
                        </div>
                    </section>
                </main>
            </header>
        </div>
    )
};

export default Login;