import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="landing-page">

            {/* ================= NAVBAR ================= */}
            <nav className="landing-navbar">
                <div
                    className="landing-logo"
                    onClick={() => navigate("/")}
                >
                    <div className="logo-icon">✦</div>
                    <span>SOCIAL</span>
                </div>

                <div className="nav-links">
                    <a href="#features">Features</a>
                    <a href="#about">About</a>
                    <a href="#community">Community</a>
                </div>

                <div className="nav-actions">
                    <button
                        className="nav-login"
                        onClick={() => navigate("/login")}
                    >
                        Log in
                    </button>

                    <button
                        className="nav-signup"
                        onClick={() => navigate("/signup")}
                    >
                        Get started
                    </button>
                </div>
            </nav>


            {/* ================= HERO ================= */}
            <section className="hero-section">

                <div className="hero-content">

                    <div className="hero-badge">
                        <span className="badge-dot"></span>
                        A place for your people
                    </div>

                    <h1>
                        Your world.
                        <br />
                        <span>Your people.</span>
                    </h1>

                    <p className="hero-description">
                        Connect with friends, share your moments,
                        discover new people, and create a space
                        that feels like yours.
                    </p>

                    <div className="hero-buttons">
                        <button
                            className="primary-button"
                            onClick={() => navigate("/signup")}
                        >
                            Create your account
                            <span>→</span>
                        </button>

                        <button
                            className="secondary-button"
                            onClick={() => navigate("/login")}
                        >
                            Log in
                        </button>
                    </div>

                    <div className="hero-trust">
                        <div className="avatar-stack">
                            <div>H</div>
                            <div>A</div>
                            <div>R</div>
                            <div>+</div>
                        </div>

                        <div>
                            <strong>10K+</strong>
                            <span>people already connecting</span>
                        </div>
                    </div>

                </div>


                {/* ================= HERO VISUAL ================= */}
                <div className="hero-visual">

                    <div className="glow-circle glow-one"></div>
                    <div className="glow-circle glow-two"></div>

                    {/* Main profile card */}
                    <div className="profile-card">

                        <div className="profile-header">
                            <div className="profile-avatar">
                                H
                            </div>

                            <div className="profile-info">
                                <strong>Harish</strong>
                                <span>@harish</span>
                            </div>

                            <div className="online-status"></div>
                        </div>

                        <div className="post-image">
                            <div className="post-sun"></div>

                            <div className="post-mountains">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>

                            <span className="post-location">
                                ✦ Somewhere beautiful
                            </span>
                        </div>

                        <div className="post-actions">
                            <span>♡ 248</span>
                            <span>◌ 32</span>
                            <span>↗</span>
                        </div>

                        <p className="post-text">
                            Making memories worth sharing. ✨
                        </p>

                    </div>


                    {/* Floating online card */}
                    <div className="floating-card online-card">
                        <div className="mini-avatar">A</div>

                        <div>
                            <strong>12 people online</strong>
                            <span>right now</span>
                        </div>

                        <div className="green-dot"></div>
                    </div>


                    {/* Floating notification */}
                    <div className="floating-card notification-card">
                        <div className="notification-icon">
                            ♡
                        </div>

                        <div>
                            <strong>New connection</strong>
                            <span>Alex started following you</span>
                        </div>
                    </div>


                    {/* Floating message */}
                    <div className="floating-card message-card">
                        <div className="message-icon">
                            ✦
                        </div>

                        <span>
                            You have something new to share.
                        </span>
                    </div>

                </div>

            </section>


            {/* ================= STATS ================= */}
            <section className="stats-section">

                <div className="stat-item">
                    <strong>10K+</strong>
                    <span>Active people</span>
                </div>

                <div className="stat-divider"></div>

                <div className="stat-item">
                    <strong>50K+</strong>
                    <span>Moments shared</span>
                </div>

                <div className="stat-divider"></div>

                <div className="stat-item">
                    <strong>100K+</strong>
                    <span>Connections made</span>
                </div>

                <div className="stat-divider"></div>

                <div className="stat-item">
                    <strong>24/7</strong>
                    <span>Your community</span>
                </div>

            </section>


            {/* ================= FEATURES ================= */}
            <section
                className="features-section"
                id="features"
            >

                <div className="section-heading">

                    <div className="section-label">
                        WHY SOCIAL
                    </div>

                    <h2>
                        Everything you need
                        <br />
                        <span>to stay connected.</span>
                    </h2>

                    <p>
                        A simple and beautiful place to share,
                        connect, and discover.
                    </p>

                </div>


                <div className="features-grid">

                    <div className="feature-card feature-large">
                        <div className="feature-icon blue-icon">
                            ✦
                        </div>

                        <h3>Share your world</h3>

                        <p>
                            Post photos, thoughts, and moments
                            that matter to you. Your story deserves
                            to be seen.
                        </p>

                        <div className="feature-preview post-preview">
                            <div className="preview-user">
                                <div className="small-avatar">H</div>
                                <div>
                                    <strong>Harish</strong>
                                    <span>Just now</span>
                                </div>
                            </div>

                            <div className="preview-lines">
                                <span></span>
                                <span></span>
                                <span className="short-line"></span>
                            </div>
                        </div>
                    </div>


                    <div className="feature-card">
                        <div className="feature-icon cyan-icon">
                            ◎
                        </div>

                        <h3>Meet your people</h3>

                        <p>
                            Discover interesting people and
                            build genuine connections.
                        </p>

                        <div className="people-preview">
                            <div>H</div>
                            <div>A</div>
                            <div>R</div>
                            <div>S</div>
                            <div>+</div>
                        </div>
                    </div>


                    <div className="feature-card">
                        <div className="feature-icon purple-icon">
                            ♡
                        </div>

                        <h3>Be yourself</h3>

                        <p>
                            Create your own space and express
                            yourself without limits.
                        </p>

                        <div className="heart-preview">
                            <span>♡</span>
                            <strong>248</strong>
                            <small>people liked this</small>
                        </div>
                    </div>


                    <div className="feature-card feature-wide">
                        <div className="wide-feature-content">

                            <div className="feature-icon blue-icon">
                                ↗
                            </div>

                            <h3>Always in the loop</h3>

                            <p>
                                Stay connected with the people
                                and moments that matter most.
                            </p>

                        </div>

                        <div className="notification-preview">

                            <div className="fake-notification">
                                <div className="notification-avatar">
                                    A
                                </div>

                                <div>
                                    <strong>Alex liked your post</strong>
                                    <span>2 minutes ago</span>
                                </div>

                                <span className="heart">♥</span>
                            </div>

                            <div className="fake-notification">
                                <div className="notification-avatar">
                                    R
                                </div>

                                <div>
                                    <strong>Ryan followed you</strong>
                                    <span>5 minutes ago</span>
                                </div>

                                <span className="follow">+</span>
                            </div>

                        </div>
                    </div>

                </div>

            </section>


            {/* ================= ABOUT ================= */}
            <section
                className="about-section"
                id="about"
            >

                <div className="about-visual">

                    <div className="about-glow"></div>

                    <div className="about-card">

                        <div className="about-card-top">
                            <span>YOUR SPACE</span>
                            <span>✦</span>
                        </div>

                        <div className="about-big-text">
                            Connect.
                            <br />
                            Share.
                            <br />
                            <span>Belong.</span>
                        </div>

                        <div className="about-card-bottom">
                            <span>© 2026 Social</span>
                            <span>● 12 people online</span>
                        </div>

                    </div>

                </div>


                <div className="about-content">

                    <div className="section-label">
                        MADE FOR PEOPLE
                    </div>

                    <h2>
                        Social should feel
                        <span> personal.</span>
                    </h2>

                    <p>
                        We believe social media should be more than
                        endless scrolling. It should be a place where
                        you can express yourself, meet people,
                        and share moments that actually matter.
                    </p>

                    <div className="about-points">

                        <div className="about-point">
                            <div>✓</div>
                            <span>Simple and beautiful experience</span>
                        </div>

                        <div className="about-point">
                            <div>✓</div>
                            <span>Connect with people who matter</span>
                        </div>

                        <div className="about-point">
                            <div>✓</div>
                            <span>Your own space, your own identity</span>
                        </div>

                    </div>

                </div>

            </section>


            {/* ================= COMMUNITY ================= */}
            <section
                className="community-section"
                id="community"
            >

                <div className="community-content">

                    <div className="section-label">
                        YOUR COMMUNITY
                    </div>

                    <h2>
                        Your people are
                        <br />
                        <span>already here.</span>
                    </h2>

                    <p>
                        Start sharing your world and discover
                        people who make it a little more interesting.
                    </p>

                    <button
                        className="primary-button community-button"
                        onClick={() => navigate("/signup")}
                    >
                        Join Social
                        <span>→</span>
                    </button>

                </div>


                <div className="community-orbit">

                    <div className="orbit-ring ring-one"></div>
                    <div className="orbit-ring ring-two"></div>

                    <div className="orbit-center">
                        ✦
                    </div>

                    <div className="orbit-person person-one">H</div>
                    <div className="orbit-person person-two">A</div>
                    <div className="orbit-person person-three">R</div>
                    <div className="orbit-person person-four">S</div>

                </div>

            </section>


            {/* ================= FINAL CTA ================= */}
            <section className="cta-section">

                <div className="cta-glow"></div>

                <div className="cta-content">

                    <div className="section-label">
                        READY TO CONNECT?
                    </div>

                    <h2>
                        Create your
                        <br />
                        <span>own space.</span>
                    </h2>

                    <p>
                        Your people are waiting.
                        Start connecting today.
                    </p>

                    <button
                        className="cta-button"
                        onClick={() => navigate("/signup")}
                    >
                        Create your account
                        <span>→</span>
                    </button>

                </div>

            </section>


            {/* ================= FOOTER ================= */}
            <footer className="landing-footer">

                <div className="footer-brand">

                    <div className="landing-logo">
                        <div className="logo-icon">✦</div>
                        <span>SOCIAL</span>
                    </div>

                    <p>
                        Your world. Your people.
                    </p>

                </div>

                <div className="footer-links">

                    <a href="#features">Features</a>
                    <a href="#about">About</a>
                    <a href="#community">Community</a>

                </div>

                <div className="footer-copy">
                    © 2026 Social. All rights reserved.
                </div>

            </footer>

        </div>
    );
}

export default Landing;