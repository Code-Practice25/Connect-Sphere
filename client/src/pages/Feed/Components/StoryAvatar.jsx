import React from 'react';

/**
 * StoryAvatar Component
 * 
 * Displays a user's avatar with a colored ring if they have an unseen story
 * 
 * @param {Object} props
 * @param {string} props.username - The username to display
 * @param {string} props.avatar - URL to the user's avatar image
 * @param {boolean} props.hasUnseenStory - Whether the user has an unseen story
 * @returns {JSX.Element}
 */
const StoryAvatar = ({ username, avatar, hasUnseenStory }) => {
  return (
    <div className="story-avatar">
      <div className={hasUnseenStory ? 'story-ring' : ''}>
        <img 
          src={avatar} 
          alt={username} 
          className="avatar-img"
        />
      </div>
      <span className="username">{username}</span>
    </div>
  );
};

export default StoryAvatar;