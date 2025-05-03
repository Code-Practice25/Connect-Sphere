import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';

/**
 * PostCard Component
 * 
 * Displays a single post with user info, content, image, location, and interaction buttons
 * 
 * @param {Object} props
 * @param {Object} props.post - Post data
 * @returns {JSX.Element}
 */
const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };
  
  // Format timestamp
  const getFormattedTime = (timestamp) => {
    if (typeof timestamp === 'string') {
      return timestamp;
    }
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return 'recently';
    }
  };

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="post-card"
    >
      {/* Post header */}
      <div className="post-header">
        <div className="post-user-info">
          <img 
            src={post.avatar} 
            alt={post.username} 
            className="post-avatar"
          />
          <div>
            <h3 className="post-username">{post.username}</h3>
            <div className="post-meta">
              {post.feeling && (
                <span className="post-feeling">
                  is feeling {post.feeling.emoji} {post.feeling.name}
                </span>
              )}
              {post.location && (
                <span className="post-location">
                  {post.feeling ? ' at ' : 'at '}
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="location-icon-small">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  {post.location.name.split(',')[0]}
                </span>
              )}
              <span className="post-time">
                {(post.feeling || post.location) ? ' · ' : ''}
                {getFormattedTime(post.timestamp)}
              </span>
            </div>
          </div>
        </div>
        <button className="post-menu-btn">
          <svg xmlns="http://www.w3.org/2000/svg" className="menu-icon" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Post content */}
      <div className="post-content">
        <p>{post.content}</p>
      </div>

      {/* Post image */}
      {post.image && (
        <div className="post-image-container">
          <img 
            src={post.image} 
            alt="Post content" 
            className="post-image"
          />
        </div>
      )}

      {/* Post stats */}
      <div className="post-stats">
        <div className="post-likes">
          <div className="reaction-icons">
            <div className="reaction-icon blue">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon-small" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
            </div>
            <div className="reaction-icon red">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon-small" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <span>{likeCount}</span>
        </div>
        <div className="post-comments-count">
          <span>{post.comments} comments</span>
        </div>
      </div>

      {/* Post actions */}
      <div className="post-actions">
        <button 
          onClick={handleLike}
          className={`post-action-btn ${isLiked ? 'liked' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="action-icon" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          <span>Like</span>
        </button>
        <button className="post-action-btn">
          <svg xmlns="http://www.w3.org/2000/svg" className="action-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
          <span>Comment</span>
        </button>
        <button className="post-action-btn">
          <svg xmlns="http://www.w3.org/2000/svg" className="action-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          <span>Share</span>
        </button>
      </div>
    </motion.div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    content: PropTypes.string,
    image: PropTypes.string,
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date), PropTypes.number]).isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    isLiked: PropTypes.bool,
    feeling: PropTypes.shape({
      name: PropTypes.string,
      emoji: PropTypes.string
    }),
    location: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      lon: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  }).isRequired
};

export default PostCard;
