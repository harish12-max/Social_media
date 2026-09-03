import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import "./login.css";
import axiosInstance from "../../axiosCalls/axios";

function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const [form, setfrom] = useState({ email: "", password: "" })
    const [error, seterror] = useState('')
    const [loader, setloader] = useState(false)

    const navigate = useNavigate()

    const handlechange = (e) => {
        setfrom((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    }

    const handlesubmit = async (e) => {
        e.preventDefault()
        seterror()
        setloader()
        try {
            await axiosInstance.post("/user/login", form)
            navigate("/home")
            console.log("User login")

            setfrom({
                email: "",
                password: ""
            })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="auth-page">

            {/* Background effects */}
            <div className="glow glow-one"></div>
            <div className="glow glow-two"></div>
            <div className="glow glow-three"></div>

            <div className="auth-container">

                {/* LEFT SIDE */}
                <div className="auth-intro">

                    <div className="logo">
                        <span>✦</span> SOCIAL
                    </div>

                    <div className="intro-content">
                        <p className="small-text">
                            WELCOME BACK
                        </p>

                        <h1>
                            Your world.
                            <br />
                            <span>Your people.</span>
                        </h1>

                        <p className="intro-description">
                            Connect with people, share your moments,
                            and create something worth remembering.
                        </p>
                    </div>

                    <p className="copyright">
                        © 2026 Social
                    </p>

                </div>


                {/* RIGHT SIDE */}
                <div className="auth-card">

                    <div className="card-header">
                        <p className="welcome">WELCOME BACK 👋</p>

                        <h2>Log in</h2>

                        <p>
                            Enter your details to continue
                        </p>
                    </div>


                    <form>

                        <div className="input-group">

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                placeholder="you@example.com"
                                onChange={handlechange}
                            />

                        </div>


                        <div className="input-group">

                            <label>Password</label>

                            <div className="password-box">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="••••••••"
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


                        <div className="forgot">
                            <a href="#">
                                Forgot password?
                            </a>
                        </div>


                        <button
                            className="auth-button"
                            type="submit"
                            onClick={handlesubmit}
                        >
                            Log in
                            <span>→</span>
                        </button>

                    </form>


                    <div className="divider">
                        <span>OR</span>
                    </div>


                    <p className="signup-text">
                        Don't have an account?
                        <Link to="/signup">
                            Create one
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;