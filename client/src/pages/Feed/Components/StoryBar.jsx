import React from 'react';
import StoryAvatar from './StoryAvatar';

/**
 * StoryBar Component
 * 
 * Displays a horizontal scrollable bar of story avatars
 * 
 * @param {Object} props
 * @param {Array} props.stories - Array of story objects
 * @returns {JSX.Element}
 */
const StoryBar = ({ stories }) => {
  return (
    <div className="story-bar">
      <div className="stories-container">
        {stories.map(story => (
          <StoryAvatar 
            key={story.id}
            username={story.username}
            avatar={story.avatar}
            hasUnseenStory={story.hasUnseenStory}
          />
        ))}
      </div>
    </div>
  );
};

export default StoryBar;