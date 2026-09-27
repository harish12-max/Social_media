import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axiosCalls/axios";
import "../styles/home.css";

const stories = [
    { name: "Your Story", initials: "Y", tone: "purple", isYou: true },
    { name: "Ananya", initials: "A", tone: "pink" },
    { name: "Rohan", initials: "R", tone: "blue" },
    { name: "Priya", initials: "P", tone: "orange" },
    { name: "Arjun", initials: "A", tone: "green" },
    { name: "Meera", initials: "M", tone: "violet" },
];

const suggestedUsers = [
    { name: "Priya Nair", username: "priyanair", initials: "PN", tone: "orange" },
    { name: "Arjun Kapoor", username: "arjunk", initials: "AK", tone: "green" },
    { name: "Meera Das", username: "meera_das", initials: "MD", tone: "pink" },
];

function Avatar({ initials, tone = "slate", size = "medium", image }) {
    return (
        <div className={`home-avatar home-avatar--${tone} home-avatar--${size}`}>
            {image ? <img src={image} alt="" /> : <span>{initials}</span>}
        </div>
    );
}

const formatTime = (date) => {
    if (!date) return "";
    const diff = Math.max(0, Date.now() - new Date(date).getTime());
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;

    return new Date(date).toLocaleDateString();
};

function Home() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const [activeNav, setActiveNav] = useState("home");
    const [search, setSearch] = useState("");
    const [postText, setPostText] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedReel, setSelectedReel] = useState(null);
    const [posts, setPosts] = useState([]);
    const [reels, setReels] = useState([]);
    const [likedPosts, setLikedPosts] = useState({});
    const [likedReels, setLikedReels] = useState({});
    const [followedUsers, setFollowedUsers] = useState({});
    const [notice, setNotice] = useState("");
    const [error, setError] = useState("");
    const [loadingFeed, setLoadingFeed] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const fetchFeed = async () => {
        try {
            setLoadingFeed(true);
            setError("");

            const [postsResponse, reelsResponse] = await Promise.all([
                axiosInstance.get("/post"),
                axiosInstance.get("/reel"),
            ]);

            const fetchedPosts = postsResponse.data.posts || [];
            const fetchedReels = reelsResponse.data.reels || [];

            setPosts(fetchedPosts);
            setReels(fetchedReels);

            const postLikes = {};
            fetchedPosts.forEach((post) => {
                postLikes[post._id] = (post.likes || []).some(
                    (id) => id.toString() === user?._id?.toString()
                );
            });

            const reelLikes = {};
            fetchedReels.forEach((reel) => {
                reelLikes[reel._id] = (reel.likes || []).some(
                    (id) => id.toString() === user?._id?.toString()
                );
            });

            setLikedPosts(postLikes);
            setLikedReels(reelLikes);
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || "Unable to load your feed.");
        } finally {
            setLoadingFeed(false);
        }
    };

    useEffect(() => {
        if (user?._id) {
            fetchFeed();
        }
    }, [user?._id]);

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/user/logout");
        } catch (err) {
            console.log(err);
        } finally {
            setUser(null);
            navigate("/login");
        }
    };

    const handleProfile = () => {
        if (user?.username) {
            navigate(`/profile/${user.username}`);
        }
    };

    const handleNavClick = (item) => {
        setActiveNav(item);
        if (item === "profile") handleProfile();
    };

    const handleImageSelect = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setError("Image must be smaller than 5 MB.");
            event.target.value = "";
            return;
        }

        setSelectedImage(file);
        setSelectedReel(null);
        setNotice(`Image selected: ${file.name}`);
        setError("");
    };

    const handleReelSelect = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > 50 * 1024 * 1024) {
            setError("Reel must be smaller than 50 MB.");
            event.target.value = "";
            return;
        }

        setSelectedReel(file);
        setSelectedImage(null);
        setNotice(`Reel selected: ${file.name}`);
        setError("");
    };

    const handleCreateContent = async (event) => {
        event.preventDefault();

        const caption = postText.trim();

        if (!caption && !selectedImage && !selectedReel) {
            setError("Write a caption or choose a file first.");
            return;
        }

        if (selectedImage && selectedReel) {
            setError("Choose either an image or a reel, not both.");
            return;
        }

        if (!caption) {
            setError("Caption is required for a post.");
            return;
        }

        try {
            setSubmitting(true);
            setError("");
            setNotice("");

            const formData = new FormData();
            formData.append("caption", caption);

            if (selectedImage) {
                formData.append("image", selectedImage);

                const response = await axiosInstance.post("/post/create", formData);

                setPosts((prev) => [response.data.post, ...prev]);
                setLikedPosts((prev) => ({
                    ...prev,
                    [response.data.post._id]: false,
                }));

                setNotice("Post created successfully.");
            } else if (selectedReel) {
                formData.append("video", selectedReel);

                const response = await axiosInstance.post("/reel/createReel", formData);

                setReels((prev) => [response.data.reel, ...prev]);
                setLikedReels((prev) => ({
                    ...prev,
                    [response.data.reel._id]: false,
                }));

                setNotice("Reel created successfully.");
            }

            setPostText("");
            setSelectedImage(null);
            setSelectedReel(null);
            event.target.reset();
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || "Could not create content.");
        } finally {
            setSubmitting(false);
        }
    };

    const handlePostLike = async (postId) => {
        try {
            const response = await axiosInstance.post(`/post/likes/${postId}`);
            const { likes, liked } = response.data;

            setPosts((prev) =>
                prev.map((post) =>
                    post._id === postId
                        ? { ...post, likes: Array.from({ length: likes }, (_, index) => index) }
                        : post
                )
            );

            setLikedPosts((prev) => ({
                ...prev,
                [postId]: liked,
            }));
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || "Could not update post like.");
        }
    };

    const handleReelLike = async (reelId) => {
        try {
            const response = await axiosInstance.post(`/reel/likes/${reelId}`);
            const { likes, liked } = response.data;

            setReels((prev) =>
                prev.map((reel) =>
                    reel._id === reelId
                        ? { ...reel, likes: Array.from({ length: likes }, (_, index) => index) }
                        : reel
                )
            );

            setLikedReels((prev) => ({
                ...prev,
                [reelId]: liked,
            }));
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || "Could not update reel like.");
        }
    };

    const feedItems = useMemo(() => {
        const postItems = posts.map((post) => ({
            ...post,
            contentType: "post",
        }));

        const reelItems = reels.map((reel) => ({
            ...reel,
            contentType: "reel",
        }));

        return [...postItems, ...reelItems].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    }, [posts, reels]);

    const getLikeCount = (likes) => (Array.isArray(likes) ? likes.length : 0);

    return (
        <div className="home-page">
            <header className="home-navbar">
                <div className="home-navbar__left">
                    <button className="home-brand" type="button" onClick={() => handleNavClick("home")}>
                        <span className="home-brand__mark">S</span>
                        <div>
                            <strong>SST Social</strong>
                            <span>Your circle, your feed</span>
                        </div>
                    </button>
                </div>

                <div className="home-search">
                    <span className="home-search__icon">⌕</span>
                    <input
                        type="text"
                        placeholder="Search people or posts"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    {search && (
                        <button
                            type="button"
                            className="home-search__clear"
                            onClick={() => setSearch("")}
                            aria-label="Clear search"
                        >
                            ×
                        </button>
                    )}
                </div>

                <div className="home-navbar__right">
                    <button className="home-icon-btn" type="button" aria-label="Notifications">♡</button>

                    <button className="home-user-chip" type="button" onClick={handleProfile}>
                        <Avatar
                            initials={(user?.name || "U").slice(0, 1).toUpperCase()}
                            tone="purple"
                            size="small"
                            image={user?.profileImage}
                        />
                        <span>{user?.name || "User"}</span>
                    </button>

                    <button className="home-logout" type="button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>

            <main className="home-layout">
                <aside className="home-sidebar">
                    <nav className="home-side-nav">
                        <button
                            type="button"
                            className={activeNav === "home" ? "is-active" : ""}
                            onClick={() => handleNavClick("home")}
                        >
                            <span>⌂</span>
                            Home Feed
                        </button>
                        <button
                            type="button"
                            className={activeNav === "profile" ? "is-active" : ""}
                            onClick={() => handleNavClick("profile")}
                        >
                            <span>●</span>
                            My Profile
                        </button>
                        <button
                            type="button"
                            className={activeNav === "notifications" ? "is-active" : ""}
                            onClick={() => handleNavClick("notifications")}
                        >
                            <span>♡</span>
                            Notifications
                        </button>
                        <button
                            type="button"
                            className={activeNav === "explore" ? "is-active" : ""}
                            onClick={() => handleNavClick("explore")}
                        >
                            <span>✦</span>
                            Explore
                        </button>
                    </nav>

                    <div className="home-sidebar-card">
                        <div className="home-sidebar-card__icon">✦</div>
                        <div>
                            <strong>Build your circle</strong>
                            <p>Follow people and keep your feed interesting.</p>
                        </div>
                    </div>
                </aside>

                <section className="home-feed">
                    <div className="home-section-heading">
                        <div>
                            <p className="home-eyebrow">HOME</p>
                            <h1>Your latest updates</h1>
                        </div>
                        <button type="button" className="home-filter-btn">Latest <span>⌄</span></button>
                    </div>

                    <section className="home-stories card-surface">
                        <div className="home-section-top">
                            <h2>Your Story</h2>
                            <button type="button">See all</button>
                        </div>

                        <div className="home-story-row">
                            {stories.map((story) => (
                                <button className="home-story" key={story.name} type="button">
                                    <div className="home-story__ring">
                                        <Avatar initials={story.initials} tone={story.tone} size="story" />
                                        {story.isYou && <span className="home-story__plus">+</span>}
                                    </div>
                                    <span>{story.name}</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="home-composer card-surface">
                        <div className="home-composer__header">
                            <Avatar
                                initials={(user?.name || "U").slice(0, 1).toUpperCase()}
                                tone="purple"
                                size="large"
                                image={user?.profileImage}
                            />
                            <div>
                                <strong>{user?.name || "You"}</strong>
                                <span>Share something with your circle</span>
                            </div>
                        </div>

                        <form onSubmit={handleCreateContent}>
                            <textarea
                                value={postText}
                                onChange={(event) => setPostText(event.target.value)}
                                placeholder="What's on your mind?"
                                rows="3"
                                disabled={submitting}
                            />

                            <div className="home-composer__footer">
                                <div className="home-composer__tools">
                                    <label className="composer-tool composer-tool--image">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageSelect}
                                            disabled={submitting}
                                        />
                                        <span>▧</span>
                                        Add Image
                                    </label>

                                    <label className="composer-tool composer-tool--reel">
                                        <input
                                            type="file"
                                            accept="video/*"
                                            onChange={handleReelSelect}
                                            disabled={submitting}
                                        />
                                        <span>▶</span>
                                        Add Reel
                                    </label>
                                </div>

                                <button type="submit" className="home-primary-btn" disabled={submitting}>
                                    {submitting ? "Posting..." : "+ Post"}
                                </button>
                            </div>

                            {selectedImage && (
                                <div className="home-file-chip">
                                    <span>Image</span>
                                    <strong>{selectedImage.name}</strong>
                                </div>
                            )}

                            {selectedReel && (
                                <div className="home-file-chip home-file-chip--reel">
                                    <span>Reel</span>
                                    <strong>{selectedReel.name}</strong>
                                </div>
                            )}

                            {notice && <p className="home-form-notice home-form-notice--success">{notice}</p>}
                            {error && <p className="home-form-notice home-form-notice--error">{error}</p>}
                        </form>
                    </section>

                    <section className="home-posts">
                        {loadingFeed ? (
                            <div className="home-feed-status card-surface">Loading your feed...</div>
                        ) : error && feedItems.length === 0 ? (
                            <div className="home-feed-status card-surface">{error}</div>
                        ) : feedItems.length === 0 ? (
                            <div className="home-feed-status card-surface">
                                No posts or reels yet. Create the first one.
                            </div>
                        ) : (
                            feedItems.map((item) => {
                                const isReel = item.contentType === "reel";
                                const isLiked = isReel
                                    ? !!likedReels[item._id]
                                    : !!likedPosts[item._id];

                                return (
                                    <article className="home-post card-surface" key={`${item.contentType}-${item._id}`}>
                                        <div className="home-post__header">
                                            <div className="home-post__author">
                                                <Avatar
                                                    initials={(item.author?.name || "U").slice(0, 1).toUpperCase()}
                                                    tone="purple"
                                                    size="medium"
                                                    image={item.author?.profileImage}
                                                />
                                                <div>
                                                    <strong>{item.author?.name || "Unknown user"}</strong>
                                                    <span>
                                                        @{item.author?.username || "user"} · {formatTime(item.createdAt)}
                                                    </span>
                                                </div>
                                            </div>

                                            {isReel && <span className="home-content-badge">REEL</span>}
                                        </div>

                                        {item.caption && (
                                            <p className="home-post__caption">{item.caption}</p>
                                        )}

                                        {isReel ? (
                                            <video
                                                className="home-post__video"
                                                src={item.video}
                                                controls
                                                playsInline
                                                preload="metadata"
                                            />
                                        ) : (
                                            <img
                                                className="home-post__image"
                                                src={item.image}
                                                alt={item.caption || "Post"}
                                                loading="lazy"
                                            />
                                        )}

                                        <div className="home-post__meta">
                                            <span>{getLikeCount(item.likes)} likes</span>
                                            <span>{isReel ? "Reel" : "Post"}</span>
                                        </div>

                                        <div className="home-post__actions">
                                            <button
                                                type="button"
                                                className={isLiked ? "is-liked" : ""}
                                                onClick={() =>
                                                    isReel
                                                        ? handleReelLike(item._id)
                                                        : handlePostLike(item._id)
                                                }
                                            >
                                                <span>♥</span>
                                                Like
                                            </button>

                                            <button type="button" disabled>
                                                <span>◌</span>
                                                Comment
                                            </button>

                                            <button type="button" disabled>
                                                <span>↗</span>
                                                Share
                                            </button>
                                        </div>
                                    </article>
                                );
                            })
                        )}
                    </section>
                </section>

                <aside className="home-rightbar">
                    <section className="home-follow-card card-surface">
                        <div className="home-section-top">
                            <div>
                                <p className="home-eyebrow">DISCOVER</p>
                                <h2>People to follow</h2>
                            </div>
                            <button type="button">See all</button>
                        </div>

                        <div className="home-follow-list">
                            {suggestedUsers.map((person) => {
                                const followed = !!followedUsers[person.username];

                                return (
                                    <div className="home-follow-row" key={person.username}>
                                        <Avatar initials={person.initials} tone={person.tone} size="medium" />
                                        <div className="home-follow-info">
                                            <strong>{person.name}</strong>
                                            <span>@{person.username}</span>
                                        </div>
                                        <button
                                            type="button"
                                            className={followed ? "is-following" : ""}
                                            onClick={() =>
                                                setFollowedUsers((prev) => ({
                                                    ...prev,
                                                    [person.username]: !prev[person.username],
                                                }))
                                            }
                                        >
                                            {followed ? "Following" : "Follow"}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section className="home-trend-card card-surface">
                        <p className="home-eyebrow">TRENDING</p>
                        <h2>What's happening</h2>

                        <div className="home-trend">
                            <span>01</span>
                            <div>
                                <strong>#collegeLife</strong>
                                <p>2.4K posts</p>
                            </div>
                        </div>

                        <div className="home-trend">
                            <span>02</span>
                            <div>
                                <strong>#coding</strong>
                                <p>1.8K posts</p>
                            </div>
                        </div>

                        <div className="home-trend">
                            <span>03</span>
                            <div>
                                <strong>#weekend</strong>
                                <p>934 posts</p>
                            </div>
                        </div>
                    </section>

                    <p className="home-footer-note">SST Social · Connect, share, discover.</p>
                </aside>
            </main>
        </div>
    );
}

export default Home;
