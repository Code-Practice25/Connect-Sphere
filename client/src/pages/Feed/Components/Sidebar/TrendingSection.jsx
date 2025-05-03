import React from 'react';

/**
 * TrendingSection Component
 * 
 * Displays trending topics in the sidebar
 * 
 * @param {Object} props
 * @param {Array} props.topics - Array of trending topic objects
 * @returns {JSX.Element}
 */
const TrendingSection = ({ topics }) => {
  return (
    <div className="trending-section">
      <h2 className="section-title">Trending Topics</h2>
      <ul className="trending-list">
        {topics.map((topic, index) => (
          <li key={index} className="trending-item">
            <div className="trending-topic">{topic.topic}</div>
            <div className="trending-count">{topic.posts} posts</div>
          </li>
        ))}
      </ul>
      <button className="see-more-btn">
        See more topics
      </button>
    </div>
  );
};

export default TrendingSection;