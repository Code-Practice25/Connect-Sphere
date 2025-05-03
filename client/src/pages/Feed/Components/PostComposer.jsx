import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

// List of feelings/moods that users can select
const FEELINGS = [
  // Core Emotions
  { id: 1, name: 'Happy', emoji: '😊' },
  { id: 2, name: 'Sad', emoji: '😢' },
  { id: 3, name: 'Excited', emoji: '🤩' },
  { id: 4, name: 'Tired', emoji: '😴' },
  { id: 5, name: 'Loved', emoji: '🥰' },
  { id: 6, name: 'Angry', emoji: '😡' },
  { id: 7, name: 'Confused', emoji: '😕' },
  { id: 8, name: 'Anxious', emoji: '😰' },
  { id: 9, name: 'Relaxed', emoji: '😌' },
  { id: 10, name: 'Bored', emoji: '😒' },

  // Gratitude & Mindfulness
  { id: 11, name: 'Grateful', emoji: '🙏' },
  { id: 12, name: 'Blessed', emoji: '✨' },
  { id: 13, name: 'Mindful', emoji: '🧘' },

  // Health & Body
  { id: 14, name: 'Sick', emoji: '🤒' },
  { id: 15, name: 'Hungry', emoji: '🍔' },
  { id: 16, name: 'Sleepy', emoji: '💤' },
  { id: 17, name: 'Hot', emoji: '🥵' },
  { id: 18, name: 'Cold', emoji: '🥶' },

  // Social/Relational
  { id: 19, name: 'Celebrating', emoji: '🥳' },
  { id: 20, name: 'Friendly', emoji: '🤗' },
  { id: 21, name: 'Chill', emoji: '😎' },
  { id: 22, name: 'Awkward', emoji: '😬' },

  // Mental States
  { id: 23, name: 'Overwhelmed', emoji: '🫠' },
  { id: 24, name: 'Stressed', emoji: '🤯' },
  { id: 25, name: 'Curious', emoji: '🧩' },

  // Activity-based
  { id: 26, name: 'Working', emoji: '💻' },
  { id: 27, name: 'Studying', emoji: '📚' },
  { id: 28, name: 'Working Out', emoji: '🏋️' },
  { id: 29, name: 'Traveling', emoji: '✈️' },

  // Motivation & Power
  { id: 30, name: 'Motivated', emoji: '💪' }
];


/**
 * PostComposer Component
 * 
 * Allows users to create new posts with text, images, feelings, and location
 * 
 * @param {Object} props - Component props
 * @param {Object} props.user - Current user data
 * @param {Function} props.onCreatePost - Function to handle post creation
 * @returns {JSX.Element}
 */
const PostComposer = ({ user, onCreatePost }) => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showFeelingSelector, setShowFeelingSelector] = useState(false);
  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const fileInputRef = useRef(null);
  const feelingSelectorRef = useRef(null);
  const locationSelectorRef = useRef(null);

  // Handle content change
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  // Handle image selection
  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click when photo button is clicked
  const handlePhotoButtonClick = () => {
    fileInputRef.current.click();
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    fileInputRef.current.value = '';
  };

  // Toggle feeling selector
  const handleFeelingButtonClick = () => {
    setShowFeelingSelector(!showFeelingSelector);
    setShowLocationSelector(false);
  };

  // Select a feeling
  const handleFeelingSelect = (feeling) => {
    setSelectedFeeling(feeling);
    setShowFeelingSelector(false);
  };

  // Remove selected feeling
  const handleRemoveFeeling = () => {
    setSelectedFeeling(null);
  };

  // Toggle location selector
  const handleLocationButtonClick = () => {
    setShowLocationSelector(!showLocationSelector);
    setShowFeelingSelector(false);
  };

  // Handle location search input change
  const handleLocationSearchChange = (e) => {
    setLocationSearch(e.target.value);
  };

  // Search for locations using Nominatim API - wrapped in useCallback to prevent recreation on each render
  const searchLocations = useCallback(async () => {
    if (locationSearch.trim().length < 3) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationSearch)}&limit=5`,
        {
          headers: {
            'Accept-Language': 'en-US,en;q=0.9',
            'User-Agent': 'ConnectSphere/1.0'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.map(item => ({
          id: item.place_id,
          name: item.display_name,
          lat: item.lat,
          lon: item.lon
        })));
      } else {
        console.error('Failed to fetch locations');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching locations:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [locationSearch]); // Include locationSearch as a dependency

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (locationSearch.trim().length >= 3) {
        searchLocations();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [locationSearch, searchLocations]); // Now includes searchLocations as a dependency

  // Select a location
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationSelector(false);
    setLocationSearch('');
    setSearchResults([]);
  };

  // Remove selected location
  const handleRemoveLocation = () => {
    setSelectedLocation(null);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (content.trim() === '' && !selectedImage && !selectedFeeling && !selectedLocation) return;

    // Create new post object
    const newPost = {
      content: content.trim(),
      image: imagePreview, // In a real app, you would upload the image to a server and use the returned URL
      feeling: selectedFeeling,
      location: selectedLocation
    };

    // Call the onCreatePost function passed from parent
    onCreatePost(newPost);

    // Reset form
    setContent('');
    setSelectedImage(null);
    setImagePreview(null);
    setSelectedFeeling(null);
    setSelectedLocation(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Close selectors when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (feelingSelectorRef.current && !feelingSelectorRef.current.contains(event.target)) {
        setShowFeelingSelector(false);
      }
      if (locationSelectorRef.current && !locationSelectorRef.current.contains(event.target)) {
        setShowLocationSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="post-composer">
      <form onSubmit={handleSubmit}>
        <div className="composer-input-container">
          <img src={user.avatar} alt={user.username} className="user-avatar" />
          <input
            type="text"
            className="composer-input"
            placeholder={selectedFeeling
              ? `What's on your mind? You're feeling ${selectedFeeling.name}...`
              : "What's on your mind?"}
            value={content}
            onChange={handleContentChange}
          />
        </div>

        {/* Selected feeling display */}
        {selectedFeeling && (
          <div className="selected-feeling">
            <span className="feeling-emoji">{selectedFeeling.emoji}</span>
            <span className="feeling-text">Feeling {selectedFeeling.name}</span>
            <button
              type="button"
              className="remove-feeling-btn"
              onClick={handleRemoveFeeling}
              aria-label="Remove feeling"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        )}

        {/* Selected location display */}
        {selectedLocation && (
          <div className="selected-location">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="location-icon">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className="location-text">{selectedLocation.name.split(',')[0]}</span>
            <button
              type="button"
              className="remove-location-btn"
              onClick={handleRemoveLocation}
              aria-label="Remove location"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        )}

        {/* Image preview */}
        {imagePreview && (
          <div className="image-preview-container">
            <img src={imagePreview} alt="Preview" className="image-preview" />
            <button
              type="button"
              className="remove-image-btn"
              onClick={handleRemoveImage}
              aria-label="Remove image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </button>
          </div>
        )}

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageSelect}
          accept="image/*"
          style={{ display: 'none' }}
          aria-label="Upload image"
        />

        <div className="composer-actions">
          <div className="composer-action-buttons">
            <button
              type="button"
              className="composer-action-btn"
              onClick={handlePhotoButtonClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="action-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Photo</span>
            </button>

            <div className="feeling-selector-container" ref={feelingSelectorRef}>
              <button
                type="button"
                className={`composer-action-btn ${selectedFeeling ? 'active' : ''}`}
                onClick={handleFeelingButtonClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="action-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Feeling</span>
              </button>

              {/* Feeling selector dropdown */}
              {showFeelingSelector && (
                <div className="feeling-selector">
                  <div className="feeling-selector-header">
                    <h3>How are you feeling?</h3>
                  </div>
                  <div className="feeling-options">
                    {FEELINGS.map(feeling => (
                      <div
                        key={feeling.id}
                        className="feeling-option"
                        onClick={() => handleFeelingSelect(feeling)}
                      >
                        <span className="feeling-emoji">{feeling.emoji}</span>
                        <span className="feeling-name">{feeling.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="location-selector-container" ref={locationSelectorRef}>
              <button
                type="button"
                className={`composer-action-btn ${selectedLocation ? 'active' : ''}`}
                onClick={handleLocationButtonClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="action-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Location</span>
              </button>

              {/* Location selector dropdown */}
              {showLocationSelector && (
                <div className="location-selector">
                  <div className="location-selector-header">
                    <h3>Add a location</h3>
                  </div>
                  <div className="location-search">
                    <input
                      type="text"
                      placeholder="Search for a location..."
                      value={locationSearch}
                      onChange={handleLocationSearchChange}
                      className="location-search-input"
                    />
                  </div>
                  <div className="location-results">
                    {isSearching ? (
                      <div className="location-loading">Searching...</div>
                    ) : searchResults.length > 0 ? (
                      searchResults.map(location => (
                        <div
                          key={location.id}
                          className="location-result-item"
                          onClick={() => handleLocationSelect(location)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="location-result-icon">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          <span className="location-result-name">{location.name}</span>
                        </div>
                      ))
                    ) : locationSearch.length >= 3 ? (
                      <div className="location-no-results">No locations found</div>
                    ) : (
                      <div className="location-search-hint">Type at least 3 characters to search</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`post-button ${content.trim() || selectedImage || selectedFeeling || selectedLocation ? 'active' : ''}`}
            disabled={!content.trim() && !selectedImage && !selectedFeeling && !selectedLocation}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

PostComposer.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
  onCreatePost: PropTypes.func.isRequired
};

export default PostComposer;
