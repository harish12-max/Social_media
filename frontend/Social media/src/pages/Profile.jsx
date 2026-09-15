import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosCalls/axios";
import "../styles/profile.css";

function Profile() {
    const { username } = useParams();

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        const getcurrentUser = async () => {
            try {
                const response = await axiosInstance.get("/user/me")
                setCurrentUser(response.data);
            } catch (error) {
                console.log("get current USer :", error)

            }
        }
        getcurrentUser();
    }, [])

    const isOwnProfile = currentUser?.username === username;


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



    if (loading) {
        return (
            <div className="profile-loading">
                <div className="profile-loader"></div>
            </div>
        );
    }



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
                            {!isOwnProfile && (
                                <div className="profile-actions">
                                    <button className="profile-follow-btn">
                                        Follow
                                    </button>

                                    <button className="profile-message-btn">
                                        Message
                                    </button>
                                </div>
                            )}

                        </div>

                    </div>

                    {/* followers */}
                    <div className="profile-connections">

                        <div className="connection-section">

                            <h2>Followers</h2>

                            <div className="connection-list">

                                {userData.followers?.length === 0 ? (
                                    <p>No followers yet</p>
                                ) : (
                                    userData.followers.map((follower) => (
                                        <div
                                            className="connection-user"
                                            key={follower._id}
                                        >
                                            <strong>{follower.name}</strong>
                                            <span>@{follower.username}</span>
                                        </div>
                                    ))
                                )}

                            </div>

                        </div>


                        <div className="connection-section">

                            <h2>Following</h2>

                            <div className="connection-list">

                                {userData.following?.length === 0 ? (
                                    <p>Not following anyone</p>
                                ) : (
                                    userData.following.map((following) => (
                                        <div
                                            className="connection-user"
                                            key={following._id}
                                        >
                                            <strong>{following.name}</strong>
                                            <span>@{following.username}</span>
                                        </div>
                                    ))
                                )}

                            </div>

                        </div>

                    </div>


                </section>

            </main>

        </div >
    );
}

export default Profile;