import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosCalls/axios";
import "../styles/home.css";

function Home() {
    const {user,setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/user/logout");

            setUser(null);
            navigate("/login");

        } catch (error) {
            console.log(error);
        }
    };

    const handleProfile = () => {
        navigate(`/profile/${user.username}`);
    };

    return (
        <div className="home-page">

            <nav className="home-navbar">

                <div className="home-logo">
                    <div className="home-logo-icon">
                        ✦
                    </div>

                    <span>SOCIAL</span>
                </div>


                <div className="home-actions">

                    <button
                        className="home-profile-btn"
                        onClick={handleProfile}
                    >
                        Profile
                    </button>

                    <button
                        className="home-logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </nav>


            <main className="home-content">

                <div className="home-card">

                    <span className="home-small-text">
                        WELCOME BACK ✨
                    </span>

                    <h1>
                        Your world.
                        <br />
                        <span>Your people.</span>
                    </h1>

                    <p>
                        Connect with friends, share your moments,
                        and discover new people.
                    </p>

                </div>

            </main>

        </div>
    );
}

export default Home;