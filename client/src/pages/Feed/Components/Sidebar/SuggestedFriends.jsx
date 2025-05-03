import React from 'react';

/**
 * SuggestedFriends Component
 * 
 * Displays suggested friends in the sidebar
 * 
 * @param {Object} props
 * @param {Array} props.suggestions - Array of suggested user objects
 * @returns {JSX.Element}
 */
const SuggestedFriends = ({ suggestions }) => {
  return (
    <div className="suggested-friends">
      <h2 className="section-title">Suggested Friends</h2>
      <div className="friends-list">
        {suggestions.map(user => (
          <div key={user.id} className="friend-item">
            <div className="friend-info">
              <img 
                src={user.avatar} 
                alt={user.username} 
                className="friend-avatar"
              />
              <div>
                <h3 className="friend-name">{user.username}</h3>
                <p className="friend-suggestion">Suggested for you</p>
              </div>
            </div>
            <button className="follow-btn">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedFriends;