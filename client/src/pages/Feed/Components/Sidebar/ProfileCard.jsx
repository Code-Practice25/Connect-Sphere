import React from 'react';

/**
 * ProfileCard Component
 * 
 * Displays the user's profile card in the sidebar
 * 
 * @param {Object} props
 * @param {Object} props.user - Current user object
 * @returns {JSX.Element}
 */
const ProfileCard = ({ user }) => {
  const navItems = ['Profile', 'Friends', 'Saved Posts', 'Groups', 'Events'];
  
  return (
    <div className="profile-card">
      <div className="profile-header">
        <img 
          src={user.avatar} 
          alt={user.displayName} 
          className="profile-avatar"
        />
        <div>
          <h3 className="profile-name">{user.displayName}</h3>
          <p className="profile-username">@{user.username}</p>
        </div>
      </div>
      <nav className="profile-nav">
        {navItems.map((item, index) => (
          <button 
            key={index}
            className="nav-item"
            onClick={() => console.log(`Clicked on ${item}`)}
          >
            <span>{item}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProfileCard;