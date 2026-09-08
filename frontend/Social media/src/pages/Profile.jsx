import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosCalls/axios";

function Profile() {
  const { username } = useParams();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);

        const user = await axiosInstance.get(
          `/user/profile/${username}`
        );

        setUserData(user.data.userData);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [username]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center py-10 text-gray-500">
        User profile not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">

        {/* Profile Picture */}
        <div className="shrink-0">
          <div className="w-32 h-32 rounded-full bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-1">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <span className="text-4xl font-semibold text-gray-700">
                {userData.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 w-full">

          {/* Name + Username */}
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-semibold text-gray-900">
              {userData.name}
            </h1>

            <p className="text-gray-500 mt-1">
              @{userData.username}
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center sm:justify-start gap-8 mt-6">

            <div className="text-center">
              <p className="font-semibold text-lg">
                {userData.posts?.length || 0}
              </p>
              <p className="text-sm text-gray-500">
                Posts
              </p>
            </div>

            <div className="text-center">
              <p className="font-semibold text-lg">
                {userData.followers?.length || 0}
              </p>
              <p className="text-sm text-gray-500">
                Followers
              </p>
            </div>

            <div className="text-center">
              <p className="font-semibold text-lg">
                {userData.following?.length || 0}
              </p>
              <p className="text-sm text-gray-500">
                Following
              </p>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-center sm:justify-start gap-3 mt-6">

            <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
              Follow
            </button>

            <button className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition">
              Message
            </button>

          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mt-10"></div>

      {/* Profile Tabs */}
      <div className="flex justify-center gap-12 border-b border-gray-200">

        <button className="py-4 text-sm font-semibold border-b-2 border-gray-900">
          Posts
        </button>

        <button className="py-4 text-sm text-gray-500 hover:text-gray-900">
          Reels
        </button>

        <button className="py-4 text-sm text-gray-500 hover:text-gray-900">
          Saved
        </button>

      </div>

      {/* Posts */}
      <div className="mt-10">

        {userData.posts?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">

            <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <span className="text-2xl">+</span>
            </div>

            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              No Posts Yet
            </h2>

            <p className="text-gray-500 mt-1">
              {userData.name} hasn't posted anything yet.
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1 sm:gap-4">
            {/* Your posts will be rendered here */}
          </div>
        )}

      </div>

    </div>
  );
}

export default Profile;