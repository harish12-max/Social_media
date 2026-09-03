import { Link } from "react-router-dom";
import { useState } from "react";
import "./signup.css";
import axiosInstance from '../../axiosCalls/axios'

function Signup() {

    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({ name: "", username: "", email: "", password: "" })
    const [err, seterror] = useState("")
    const [loader, setloader] = useState(false)

    const handlechange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handlesubmit = async (e) => {
        e.preventDefault()
        seterror("")
        setloader(true)

        try {
            await axiosInstance.post("/user/register", form)
            console.log("User Registered")

            setForm({
                name: "",
                username: "",
                email: "",
                password: ""
            })

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="signup-page">

            {/* Background glow */}
            <div className="signup-glow signup-glow-one"></div>
            <div className="signup-glow signup-glow-two"></div>
            <div className="signup-glow signup-glow-three"></div>


            <div className="signup-container">

                {/* LEFT SIDE */}
                <div className="signup-intro">

                    <div className="signup-logo">
                        <span>✦</span> SOCIAL
                    </div>

                    <div className="signup-intro-content">

                        <p className="signup-small-text">
                            JOIN THE COMMUNITY
                        </p>

                        <h1>
                            Create your
                            <br />
                            <span>own space.</span>
                        </h1>

                        <p className="signup-description">
                            Your people are waiting.
                            Create your identity, share your
                            world and start connecting.
                        </p>

                    </div>

                    <p className="signup-copyright">
                        © 2026 Social
                    </p>

                </div>


                {/* RIGHT SIDE */}
                <div className="signup-card">

                    <div className="signup-card-header">

                        <p className="signup-welcome">
                            ✦ LET'S GET STARTED
                        </p>

                        <h2>Create account</h2>

                        <p>
                            Join thousands of people already here.
                        </p>

                    </div>


                    <form>

                        {/* NAME + USERNAME */}

                        <div className="signup-row">

                            <div className="signup-input-group">

                                <label>Name</label>

                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    placeholder="Your name"
                                    onChange={handlechange}
                                />

                            </div>


                            <div className="signup-input-group">

                                <label>Username</label>

                                <input
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    placeholder="@username"
                                    onChange={handlechange}
                                />

                            </div>

                        </div>


                        {/* EMAIL */}

                        <div className="signup-input-group">

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                placeholder="you@example.com"
                                onChange={handlechange}
                            />

                        </div>


                        {/* PASSWORD */}

                        <div className="signup-input-group">

                            <label>Password</label>

                            <div className="signup-password-box">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter password"
                                    name="password"
                                    value={form.password}
                                    onChange={handlechange}

                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>

                            </div>

                        </div>


                        {/* TERMS */}

                        <label className="terms">

                            <input type="checkbox" />

                            <span>
                                I agree to the
                                <a href="#">
                                    Terms & Conditions
                                </a>
                            </span>

                        </label>


                        {/* BUTTON */}

                        <button
                            className="signup-button"
                            type="submit"
                            onClick={handlesubmit}
                        >
                            Create account
                            <span>→</span>
                        </button>

                    </form>


                    {/* DIVIDER */}

                    <div className="signup-divider">
                        <span>OR</span>
                    </div>


                    {/* LOGIN */}

                    <p className="login-text">

                        Already have an account?

                        <Link to="/login">
                            Log in
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Signup;