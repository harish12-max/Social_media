import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosCalls/axios";
import "../styles/profile.css";

function Profile() {
    const { username } = useParams();

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ name: "", username: "", email: "", bio: "" });

    const isOwnProfile = currentUser?.username === username;

    const fetchProfile = async () => {
        try {
            const response = await axiosInstance.get(
                `/user/profile/${username}`
            );

            const userProfile = response.data.userDetails;

            setUserData(userProfile);

           
            setEditForm({
                name: userProfile.name || "",
                username: userProfile.username || "",
                email: userProfile.email || "",
                bio: userProfile.bio || ""
            });

            return userProfile;

        } catch (error) {
            console.error("Failed to fetch profile data:", error);
            setUserData(null);
            return null;
        }
    };


    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const response = await axiosInstance.get("/user/me");

                setCurrentUser(response.data);

            } catch (error) {
                console.log("Get current user:", error);
            }
        };

        getCurrentUser();
    }, []);


    useEffect(() => {
        const loadProfile = async () => {
            try {
                setLoading(true);

                const profile = await fetchProfile();

                if (!profile) {
                    return;
                }

                const meResponse = await axiosInstance.get("/user/me");

                const myFollowingList =
                    meResponse.data.following || [];

                setCurrentUser(meResponse.data);

                const following = myFollowingList.some((id) => {
                    return id.toString() === profile._id.toString();
                });

                setIsFollowing(following);

            } catch (error) {
                console.error(error);

            } finally {
                setLoading(false);
            }
        };

        loadProfile();

    }, [username]);


    const handlefollow = async () => {
        try {

            if (isFollowing) {

                await axiosInstance.delete(
                    `/user/${userData._id}/follow`
                );

                setIsFollowing(false);

            } else {

                await axiosInstance.post(
                    `/user/${userData._id}/follow`
                );

                setIsFollowing(true);
            }

           
            await fetchProfile();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };


   
    const handleEditChange = (event) => {
        const { name, value } = event.target;

        setEditForm({
            ...editForm,
            [name]: value
        });
    };


 
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

                    <div className="not-found-icon">
                        ?
                    </div>

                    <h2>
                        User profile not found
                    </h2>

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

           

            <div className="profile-orb profile-orb-one"></div>

            <div className="profile-orb profile-orb-two"></div>


            <main className="profile-wrapper">

                <section className="profile-card">

                    <div className="profile-header">

                        <div className="profile-avatar-section">

                            <div className="profile-avatar-wrapper">

                                <div className="profile-avatar">
                                    {firstLetter}
                                </div>

                                <span className="online-dot"></span>

                            </div>

                        </div>



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

                                {userData.bio ||
                                    "Connecting with people, sharing moments and discovering new experiences."}

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


                            {/* =================================
                                BUTTONS
                            ================================= */}

                            {isOwnProfile && (

                                <button
                                    className="profile-edit-btn"
                                    onClick={() =>
                                        setIsEditing(!isEditing)
                                    }
                                >
                                    {isEditing
                                        ? "Cancel"
                                        : "Edit Profile"}
                                </button>

                            )}


                            {!isOwnProfile && (

                                <div className="profile-actions">

                                    <button
                                        className="profile-follow-btn"
                                        onClick={handlefollow}
                                    >
                                        {isFollowing
                                            ? "Unfollow"
                                            : "Follow"}
                                    </button>


                                    <button className="profile-message-btn">
                                        Message
                                    </button>

                                </div>

                            )}

                        </div>

                    </div>


                    {/* =================================
                        EDIT PROFILE FORM
                    ================================= */}

                    {isEditing && isOwnProfile && (

                        <div className="edit-profile-section">

                            <h2>
                                Edit Profile
                            </h2>


                            <div className="edit-profile-form">


                                {/* Name */}

                                <div className="edit-form-group">

                                    <label>
                                        Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={editForm.name}
                                        onChange={handleEditChange}
                                    />

                                </div>


                                {/* Username */}

                                <div className="edit-form-group">

                                    <label>
                                        Username
                                    </label>

                                    <input
                                        type="text"
                                        name="username"
                                        value={editForm.username}
                                        onChange={handleEditChange}
                                    />

                                </div>


                                {/* Email */}

                                <div className="edit-form-group">

                                    <label>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={editForm.email}
                                        onChange={handleEditChange}
                                    />

                                </div>


                                {/* Bio */}

                                <div className="edit-form-group">

                                    <label>
                                        Bio
                                    </label>

                                    <textarea
                                        name="bio"
                                        value={editForm.bio}
                                        onChange={handleEditChange}
                                    />

                                </div>


                                {/* Save button */}

                                <button
                                    className="edit-save-btn"
                                    type="button"
                                >
                                    Save Changes
                                </button>


                            </div>

                        </div>

                    )}


                    <div className="profile-connections">


                        {/* Followers */}

                        <div className="connection-section">

                            <h2>
                                Followers
                            </h2>


                            <div className="connection-list">

                                {userData.followers?.length === 0 ? (

                                    <p>
                                        No followers yet
                                    </p>

                                ) : (

                                    userData.followers.map((follower) => (

                                        <div
                                            className="connection-user"
                                            key={follower._id}
                                        >

                                            <strong>
                                                {follower.name}
                                            </strong>

                                            <span>
                                                @{follower.username}
                                            </span>

                                        </div>

                                    ))

                                )}

                            </div>

                        </div>


                        {/* Following */}

                        <div className="connection-section">

                            <h2>
                                Following
                            </h2>


                            <div className="connection-list">

                                {userData.following?.length === 0 ? (

                                    <p>
                                        Not following anyone
                                    </p>

                                ) : (

                                    userData.following.map((following) => (

                                        <div
                                            className="connection-user"
                                            key={following._id}
                                        >

                                            <strong>
                                                {following.name}
                                            </strong>

                                            <span>
                                                @{following.username}
                                            </span>

                                        </div>

                                    ))

                                )}

                            </div>

                        </div>


                    </div>


                </section>

            </main>

        </div>
    );
}

export default Profile;