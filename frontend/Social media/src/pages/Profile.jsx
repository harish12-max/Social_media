import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosCalls/axios";
import "../styles/profile.css";

function Profile() {
    const { username } = useParams();

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);

                const response = await axiosInstance.get(
                    `/user/profile/${username}`
                );

                console.log("PROFILE RESPONSE:", response.data);

                setUserData(response.data.userDetails);
            } catch (error) {
                console.error("Failed to fetch profile data:", error);
                setUserData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [username]);

    /* =========================
       LOADING
    ========================= */

    if (loading) {
        return (
            <div className="profile-loading">
                <div className="profile-loader"></div>
            </div>
        );
    }

    /* =========================
       USER NOT FOUND
    ========================= */

    if (!userData) {
        return (
            <div className="profile-not-found">
                <div className="not-found-card">
                    <div className="not-found-icon">?</div>

                    <h2>User profile not found</h2>

                    <p>
                        We couldn't find a profile for @{username}
                    </p>
                </div>
            </div>
        );
    }

    /* =========================
       USER DATA
    ========================= */

    const postsCount = userData.posts?.length || 0;
    const followersCount = userData.followers?.length || 0;
    const followingCount = userData.following?.length || 0;

    const firstLetter =
        userData.name?.charAt(0).toUpperCase() || "U";

    return (
        <div className="profile-page">

            {/* Background decoration */}
            <div className="profile-orb profile-orb-one"></div>
            <div className="profile-orb profile-orb-two"></div>

            <main className="profile-wrapper">

                <section className="profile-card">

                    {/* =================================
                        PROFILE HEADER
                    ================================= */}

                    <div className="profile-header">

                        {/* Avatar */}
                        <div className="profile-avatar-section">

                            <div className="profile-avatar-wrapper">

                                <div className="profile-avatar">
                                    {firstLetter}
                                </div>

                                <span className="online-dot"></span>

                            </div>

                        </div>


                        {/* User Information */}
                        <div className="profile-info">

                            <div className="profile-title-row">

                                <div className="profile-name-section">

                                    <h1 className="profile-name">
                                        {userData.name}
                                    </h1>

                                    <p className="profile-username">
                                        @{userData.username}
                                    </p>

                                </div>

                            </div>


                            {/* Bio */}
                            <p className="profile-bio">
                                Connecting with people, sharing moments
                                and discovering new experiences.
                            </p>


                            {/* Stats */}
                            <div className="profile-stats">

                                <div className="profile-stat">
                                    <strong>
                                        {postsCount}
                                    </strong>

                                    <span>
                                        Posts
                                    </span>
                                </div>


                                <div className="profile-stat">
                                    <strong>
                                        {followersCount}
                                    </strong>

                                    <span>
                                        Followers
                                    </span>
                                </div>


                                <div className="profile-stat">
                                    <strong>
                                        {followingCount}
                                    </strong>

                                    <span>
                                        Following
                                    </span>
                                </div>

                            </div>


                            {/* Buttons */}
                            <div className="profile-actions">

                                <button className="profile-follow-btn">
                                    Follow
                                </button>

                                <button className="profile-message-btn">
                                    Message
                                </button>

                            </div>

                        </div>

                    </div>


                    {/* =================================
                        TABS
                    ================================= */}

                    <div className="profile-tabs">

                        <button className="profile-tab active">
                            <span>▦</span>
                            Posts
                        </button>

                        <button className="profile-tab">
                            <span>▶</span>
                            Reels
                        </button>

                        <button className="profile-tab">
                            <span>♡</span>
                            Saved
                        </button>

                    </div>


                    {/* =================================
                        POSTS SECTION
                    ================================= */}

                    <div className="profile-posts">

                        {postsCount === 0 ? (

                            <div className="empty-posts">

                                <div className="empty-post-icon">
                                    +
                                </div>

                                <h2>
                                    No Posts Yet
                                </h2>

                                <p>
                                    {userData.name} hasn't shared
                                    anything yet.
                                </p>

                                <button className="empty-post-btn">
                                    Create your first post
                                </button>

                            </div>

                        ) : (

                            <div className="posts-grid">

                                {userData.posts.map((post, index) => (

                                    <div
                                        className="post-card"
                                        key={post._id || index}
                                    >
                                        {/* Post content will be added later */}
                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Profile;