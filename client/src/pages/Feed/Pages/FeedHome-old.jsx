import React, { useState, useEffect } from 'react';
import { STORIES, POSTS, TRENDING_TOPICS, CURRENT_USER } from '../../../data/mockData';

// Import components from the new structure
import StoryBar from '../../../components/Feed/StoryBar';
import PostComposer from '../../../components/Feed/PostComposer';
import PostCard from '../../../components/Feed/PostCard';
import PostSkeleton from '../../../components/Feed/PostSkeleton';
import ProfileCard from '../../../components/Feed/Sidebar/ProfileCard';
import TrendingSection from '../../../components/Feed/Sidebar/TrendingSection';
import SuggestedFriends from '../../../components/Feed/Sidebar/SuggestedFriends';

// Main FeedHome component
const FeedHome = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(POSTS);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Load more posts function
  const loadMorePosts = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Add more posts (in a real app, this would be an API call)
      setPosts(prevPosts => [
        ...prevPosts,
        ...POSTS.map(post => ({
          ...post,
          id: post.id + prevPosts.length,
          timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
        }))
      ]);
      setLoading(false);
    }, 1000);
  };

  // Handle creating a new post
  const handleCreatePost = (newPost) => {
    const post = {
      id: Date.now(),
      username: CURRENT_USER.username,
      avatar: CURRENT_USER.avatar,
      content: newPost.content,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      isLiked: false
    };
    
    setPosts(prevPosts => [post, ...prevPosts]);
  };

  return (
    <div className="feed-container">
      <div className="feed-content">
        <div className="feed-layout">
          {/* Left sidebar (desktop only) */}
          <div className="sidebar left-sidebar">
            <div className="sidebar-content">
              <ProfileCard user={CURRENT_USER} />
            </div>
          </div>

          {/* Main content */}
          <div className="main-content">
            {/* Story bar */}
            <StoryBar stories={STORIES} />

            {/* Post composer */}
            <PostComposer user={CURRENT_USER} onCreatePost={handleCreatePost} />

            {/* Posts feed */}
            <div className="posts-feed">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
              
              {/* Loading skeletons */}
              {loading && (
                <>
                  <PostSkeleton />
                  <PostSkeleton />
                </>
              )}

              {/* Load more button */}
              <div className="load-more-container">
                <button 
                  onClick={loadMorePosts}
                  disabled={loading}
                  className={`load-more-btn ${loading ? 'loading' : ''}`}
                >
                  {loading ? 'Loading...' : 'Load More Posts'}
                </button>
              </div>
            </div>
          </div>

          {/* Right sidebar (desktop only) */}
          <div className="sidebar right-sidebar">
            <div className="sidebar-content">
              <TrendingSection topics={TRENDING_TOPICS} />
              <SuggestedFriends suggestions={STORIES.slice(0, 3)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedHome;