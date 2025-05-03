import React from 'react';

/**
 * PostSkeleton Component
 * 
 * Displays a loading skeleton for posts
 * 
 * @returns {JSX.Element}
 */
const PostSkeleton = () => {
  return (
    <div className="post-skeleton">
      <div className="skeleton-header">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-user-info">
          <div className="skeleton-username"></div>
          <div className="skeleton-time"></div>
        </div>
      </div>
      <div className="skeleton-content">
        <div className="skeleton-text-line"></div>
        <div className="skeleton-text-line short"></div>
      </div>
      <div className="skeleton-image"></div>
      <div className="skeleton-actions">
        <div className="skeleton-action-line"></div>
        <div className="skeleton-action-buttons"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;