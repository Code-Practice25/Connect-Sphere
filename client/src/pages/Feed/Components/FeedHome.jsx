import React, { useState, useEffect } from 'react';
import StoryBar from './StoryBar';
import PostComposer from './PostComposer';
import PostCard from './PostCard';
import PostSkeleton from './PostSkeleton';
import ProfileCard from './Sidebar/ProfileCard';
import TrendingSection from './Sidebar/TrendingSection';
import SuggestedFriends from './Sidebar/SuggestedFriends';
import { STORIES, POSTS, TRENDING_TOPICS, CURRENT_USER } from '../../../data/mockData';
import './Feed.css'; // Add CSS import for styling

/**
 * FeedHome Component
 * 
 * Main feed page layout with three-column design:
 * 1. Left sidebar (ProfileCard)
 * 2. Main content (StoryBar, PostComposer, PostCards)
 * 3. Right sidebar (TrendingSection, SuggestedFriends)
 * 
 * @returns {JSX.Element}
 */
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
    <div className="feed-layout">
      {/* Left Sidebar */}
      <div className="feed-sidebar feed-left-sidebar">
        <ProfileCard user={CURRENT_USER} />
      </div>

      {/* Main Content */}
      <div className="feed-main-content">
        <StoryBar stories={STORIES} />
        
        <div className="feed-posts-container">
          <PostComposer user={CURRENT_USER} onCreatePost={handleCreatePost} />
          
          {/* Posts feed */}
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

      {/* Right Sidebar */}
      <div className="feed-sidebar feed-right-sidebar">
        <TrendingSection topics={TRENDING_TOPICS} />
        <SuggestedFriends suggestions={STORIES.slice(0, 3)} />
      </div>
    </div>
  );
};

export default FeedHome;
