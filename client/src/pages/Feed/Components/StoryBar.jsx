import React, { useMemo, useRef, useEffect, useState } from 'react';
import StoryAvatar from './StoryAvatar';
import './StoryBar.css';

/**
 * StoryBar Component
 * 
 * Displays a horizontal scrollable bar of story avatars with fixed width.
 * Stories are sorted so that unwatched stories appear first (left side),
 * followed by watched stories (right side), similar to WhatsApp.
 * 
 * @param {Object} props
 * @param {Array} props.stories - Array of story objects
 * @param {string|number} props.maxWidth - Maximum width for the story bar (default: 100%)
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
const StoryBar = ({ 
  stories, 
  maxWidth = '100%',
  className = '' 
}) => {
  const storiesContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  // Sort stories to place unwatched stories on the left and watched on the right
  const sortedStories = useMemo(() => {
    if (!stories || stories.length === 0) return [];
    
    // Create a copy to avoid mutating the original array
    return [...stories].sort((a, b) => {
      // Sort by hasUnseenStory (true values first)
      if (a.hasUnseenStory && !b.hasUnseenStory) return -1;
      if (!a.hasUnseenStory && b.hasUnseenStory) return 1;
      return 0;
    });
  }, [stories]);

  // Scroll by a specific amount when arrow buttons are clicked
  const scrollLeft = () => {
    if (storiesContainerRef.current) {
      const scrollAmount = Math.min(300, storiesContainerRef.current.clientWidth * 0.75);
      storiesContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (storiesContainerRef.current) {
      const scrollAmount = Math.min(300, storiesContainerRef.current.clientWidth * 0.75);
      storiesContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Check scroll position and update arrow visibility
  const checkScrollPosition = () => {
    if (!storiesContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = storiesContainerRef.current;
    
    // Show left arrow if scrolled right
    setShowLeftArrow(scrollLeft > 0);
    
    // Show right arrow if there's more content to scroll
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10); // 10px buffer
  };

  // Set up scroll event listener
  useEffect(() => {
    const container = storiesContainerRef.current;
    if (container) {
      // Initial check
      checkScrollPosition();
      
      // Listen for scroll events
      container.addEventListener('scroll', checkScrollPosition);
      
      // Clean up
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, []);

  // Check arrow visibility when stories change
  useEffect(() => {
    // Small delay to allow DOM to update
    setTimeout(checkScrollPosition, 100);
  }, [stories]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      checkScrollPosition();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      className={`story-bar ${className}`} 
      style={{ maxWidth }}
      data-testid="story-bar"
    >
      {/* Only show left arrow if needed */}
      {showLeftArrow && (
        <button 
          className="nav-arrow left-arrow" 
          onClick={scrollLeft} 
          aria-label="Scroll left"
        >
          <span>&#10094;</span>
        </button>
      )}
      
      <div 
        className="stories-container" 
        ref={storiesContainerRef} 
        onScroll={checkScrollPosition}
      >
        {/* Add Story option - typically appears first */}
        <div className="add-story-wrapper">
          <div className="add-story-avatar">
            <img 
              src="https://via.placeholder.com/64" 
              alt="Your profile" 
              className="avatar-img faded" 
            />
            <div className="add-icon">+</div>
          </div>
          <span className="username">Add Story</span>
        </div>
        
        {/* Display sorted stories */}
        {sortedStories.map(story => (
          <StoryAvatar 
            key={story.id}
            username={story.username}
            avatar={story.avatar}
            hasUnseenStory={story.hasUnseenStory}
          />
        ))}
      </div>
      
      {/* Only show right arrow if needed */}
      {showRightArrow && (
        <button 
          className="nav-arrow right-arrow" 
          onClick={scrollRight} 
          aria-label="Scroll right"
        >
          <span>&#10095;</span>
        </button>
      )}
    </div>
  );
};

export default StoryBar;
