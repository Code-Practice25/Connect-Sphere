# Feed Page Layout Implementation Guide

This guide explains how to implement the new layout system that ensures proper spacing and consistent widths for all components in the Feed page.

## Overview

The new layout uses CSS Grid to create a three-column layout on desktop:
1. Left sidebar - ProfileCard
2. Main content - StoryBar, posts
3. Right sidebar - TrendingSection, SuggestedFriends

The layout is responsive and adjusts to different screen sizes.

## Implementation Steps

### 1. Import CSS Files

Make sure to import all the necessary CSS files in your components:

```jsx
// In ProfileCard.jsx
import './ProfileCard.css';

// In TrendingSection.jsx
import './TrendingSection.css';

// In SuggestedFriends.jsx
import './SuggestedFriends.css';

// In Feed.jsx (main page component)
import './FeedLayout.css';
```

### 2. Structure Your Feed Component

Update your main Feed component to use the new layout classes:

```jsx
import React from 'react';
import ProfileCard from './Components/Sidebar/ProfileCard';
import TrendingSection from './Components/Sidebar/TrendingSection';
import SuggestedFriends from './Components/Sidebar/SuggestedFriends';
import StoryBar from './Components/StoryBar';
import PostsList from './Components/PostsList';
import './FeedLayout.css';

const Feed = () => {
  // Your data/state here
  const user = { /* user data */ };
  const stories = [ /* stories data */ ];
  const posts = [ /* posts data */ ];
  const trendingTopics = [ /* trending topics */ ];
  const suggestedFriends = [ /* suggested friends */ ];

  return (
    <div className="feed-container">
      {/* Left Sidebar */}
      <div className="left-sidebar">
        <ProfileCard user={user} />
        {/* Add any other left sidebar components here */}
      </div>

      {/* StoryBar - Placed in its own grid area */}
      <StoryBar stories={stories} />

      {/* Main Content */}
      <div className="feed-content">
        <PostsList posts={posts} />
      </div>

      {/* Right Sidebar */}
      <div className="right-sidebar">
        <TrendingSection topics={trendingTopics} />
        <SuggestedFriends suggestions={suggestedFriends} />
      </div>
    </div>
  );
};

export default Feed;
```

### 3. Update Any Existing Layout CSS

If you have existing layout CSS that might conflict with this new system, you should review and update it. The new grid system is designed to work with your existing component styles.

### 4. Test Across Different Screen Sizes

Test your layout in different viewport sizes to ensure it responds correctly:
- Mobile (below 768px)
- Tablet (768px - 1023px)
- Desktop (1024px and above)

## Additional Customization

### Adjusting Column Widths

If you need to adjust the column widths, modify the `grid-template-columns` values in the media queries in `FeedLayout.css`:

```css
@media (min-width: 1024px) {
  .feed-container {
    grid-template-columns: 250px 1fr 300px;
    /* Change 250px for left sidebar width, 300px for right sidebar width */
  }
}
```

### Sticky Sidebars

The sidebars are set to `position: sticky` by default. If you don't want this behavior, you can remove the following CSS from `FeedLayout.css`:

```css
.left-sidebar,
.right-sidebar {
  position: sticky;
  top: 20px;
}
```

## Troubleshooting

If components are not maintaining their width:
1. Ensure each component has `width: 100%` and `box-sizing: border-box`
2. Check for any inline styles that might be overriding the CSS
3. Verify that all CSS files are being imported correctly