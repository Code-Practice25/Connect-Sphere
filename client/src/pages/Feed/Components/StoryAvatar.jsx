import React from 'react';
import './StoryBar.css';

/**
 * StoryAvatar Component
 * 
 * Displays a user's avatar with a colored ring indicating story status
 * - Green gradient ring for unwatched stories
 * - Gray ring for watched stories
 * 
 * @param {Object} props
 * @param {string} props.username - User's display name
 * @param {string} props.avatar - URL to user's avatar image
 * @param {boolean} props.hasUnseenStory - Whether user has stories that haven't been viewed
 * @returns {JSX.Element}
 */
const StoryAvatar = ({ username, avatar, hasUnseenStory }) => {
  const handleStoryClick = () => {
    // Handle opening the story view
    console.log(`Opening story for ${username}`);
    // You would typically call a function to display the full-screen story here
  };

  return (
    <div 
      className="story-avatar-wrapper" 
      onClick={handleStoryClick}
      tabIndex="0"
      role="button"
      aria-label={`View ${username}'s story`}
    >
      <div className="story-avatar">
        <div className="story-ring-container">
          {/* Apply different ring styles based on whether the story has been seen */}
          <div className={`story-ring ${hasUnseenStory ? 'unwatched' : 'watched'}`}>
            <img 
              src={avatar} 
              alt={`${username}'s avatar`} 
              className="avatar-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/64?text=User";
              }}
            />
          </div>
        </div>
        <span className="username">{username}</span>
      </div>
    </div>
  );
};

export default StoryAvatar;
