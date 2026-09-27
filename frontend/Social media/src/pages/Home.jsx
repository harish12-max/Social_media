import { useState } from "react";
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

const demoPosts = [
    {
        id: "demo-1",
        author: "Ananya Sharma",
        username: "ananya",
        initials: "AS",
        tone: "pink",
        time: "2h ago",
        caption: "Some days are just made for good coffee, quiet moments, and getting things done. ☕✨",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85",
        likes: 124,
        comments: 18,
    },
    {
        id: "demo-2",
        author: "Rohan Mehta",
        username: "rohan",
        initials: "RM",
        tone: "blue",
        time: "5h ago",
        caption: "Weekend walks and a little sunshine. Keeping it simple.",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
        likes: 86,
        comments: 9,
    },
];

function Avatar({ initials, tone = "slate", size = "medium", image }) {
    return (
        <div className={`home-avatar home-avatar--${tone} home-avatar--${size}`}>
            {image ? (
                <img src={image} alt="" />
            ) : (
                <span>{initials}</span>
            )}
        </div>
    );
}

function Home() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const [activeNav, setActiveNav] = useState("home");
    const [search, setSearch] = useState("");
    const [postText, setPostText] = useState("");
    const [selectedImageName, setSelectedImageName] = useState("");
    const [demoPostsState, setDemoPostsState] = useState(demoPosts);
    const [likedPosts, setLikedPosts] = useState({});
    const [followedUsers, setFollowedUsers] = useState({});
    const [notice, setNotice] = useState("");

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/user/logout");
        } catch (error) {
            console.log(error);
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
        if (item === "profile") {
            handleProfile();
        }
    };

    const handleLikeDemo = (id) => {
        setLikedPosts((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));

        setDemoPostsState((prev) =>
            prev.map((post) => {
                if (post.id !== id) return post;
                const currentlyLiked = likedPosts[id];
                return {
                    ...post,
                    likes: currentlyLiked ? post.likes - 1 : post.likes + 1,
                };
            })
        );
    };

    const handleFollowDemo = (username) => {
        setFollowedUsers((prev) => ({
            ...prev,
            [username]: !prev[username],
        }));
    };

    const handleImageSelect = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setSelectedImageName(file.name);
        setNotice("Image selected. Post creation will connect to your backend next.");
    };

    const handleCreatePostPlaceholder = (event) => {
        event.preventDefault();

        if (!postText.trim() && !selectedImageName) {
            setNotice("Write something or choose an image first.");
            return;
        }

        setNotice("Post composer is ready for your POST /post/create API.");
        setPostText("");
        setSelectedImageName("");
        event.target.reset();
    };

    return (
        <div className="home-page">
            <header className="home-navbar">
                <div className="home-navbar__left">
                    <button
                        className="home-brand"
                        type="button"
                        onClick={() => handleNavClick("home")}
                    >
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
                    <button className="home-icon-btn" type="button" aria-label="Notifications">
                        ♡
                    </button>

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
                        <button type="button" className="home-filter-btn">
                            Latest <span>⌄</span>
                        </button>
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

                        <form onSubmit={handleCreatePostPlaceholder}>
                            <textarea
                                value={postText}
                                onChange={(event) => setPostText(event.target.value)}
                                placeholder="What's on your mind?"
                                rows="3"
                            />

                            <div className="home-composer__footer">
                                <div className="home-composer__tools">
                                    <label className="composer-tool composer-tool--image">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageSelect}
                                        />
                                        <span>▧</span>
                                        Add Image
                                    </label>
                                    <button type="button" className="composer-tool">
                                        <span>▶</span>
                                        Add Reel
                                    </button>
                                </div>

                                <button type="submit" className="home-primary-btn">
                                    + Post
                                </button>
                            </div>

                            {selectedImageName && (
                                <div className="home-file-chip">
                                    <span>Selected</span>
                                    <strong>{selectedImageName}</strong>
                                </div>
                            )}

                            {notice && <p className="home-form-notice">{notice}</p>}
                        </form>
                    </section>

                    <section className="home-posts">
                        {demoPostsState.map((post) => {
                            const isLiked = !!likedPosts[post.id];

                            return (
                                <article className="home-post card-surface" key={post.id}>
                                    <div className="home-post__header">
                                        <div className="home-post__author">
                                            <Avatar initials={post.initials} tone={post.tone} size="medium" />
                                            <div>
                                                <strong>{post.author}</strong>
                                                <span>@{post.username} · {post.time}</span>
                                            </div>
                                        </div>

                                        <button type="button" className="home-more-btn" aria-label="More options">
                                            ···
                                        </button>
                                    </div>

                                    <p className="home-post__caption">{post.caption}</p>

                                    <img
                                        className="home-post__image"
                                        src={post.image}
                                        alt="Post"
                                        loading="lazy"
                                    />

                                    <div className="home-post__meta">
                                        <span>{post.likes} likes</span>
                                        <span>{post.comments} comments</span>
                                    </div>

                                    <div className="home-post__actions">
                                        <button
                                            type="button"
                                            className={isLiked ? "is-liked" : ""}
                                            onClick={() => handleLikeDemo(post.id)}
                                        >
                                            <span>♥</span>
                                            Like
                                        </button>
                                        <button type="button">
                                            <span>◌</span>
                                            Comment
                                        </button>
                                        <button type="button">
                                            <span>↗</span>
                                            Share
                                        </button>
                                    </div>

                                    <div className="home-comment-preview">
                                        <Avatar initials="PM" tone="orange" size="tiny" />
                                        <div>
                                            <strong>Priya Nair</strong>
                                            <span>Love this! ✨</span>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
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
                                            onClick={() => handleFollowDemo(person.username)}
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