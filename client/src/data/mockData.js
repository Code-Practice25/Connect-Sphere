// Mock data for stories
export const STORIES = [
  { id: 1, username: 'alex_doe', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', hasUnseenStory: true },
  { id: 2, username: 'sarah_j', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', hasUnseenStory: true },
  { id: 3, username: 'mike_smith', avatar: 'https://randomuser.me/api/portraits/men/86.jpg', hasUnseenStory: false },
  { id: 4, username: 'jessica_t', avatar: 'https://randomuser.me/api/portraits/women/29.jpg', hasUnseenStory: true },
  { id: 5, username: 'chris_h', avatar: 'https://randomuser.me/api/portraits/men/53.jpg', hasUnseenStory: false },
  { id: 6, username: 'emma_w', avatar: 'https://randomuser.me/api/portraits/women/67.jpg', hasUnseenStory: true },
  { id: 7, username: 'james_l', avatar: 'https://randomuser.me/api/portraits/men/41.jpg', hasUnseenStory: true },
  { id: 8, username: 'olivia_p', avatar: 'https://randomuser.me/api/portraits/women/90.jpg', hasUnseenStory: false },
];

// Mock data for posts
export const POSTS = [
  {
    id: 1,
    username: 'alex_doe',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    content: 'Just finished my latest project! #coding #webdev',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 42,
    comments: 7,
    isLiked: false,
  },
  {
    id: 2,
    username: 'sarah_j',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    content: 'Beautiful sunset at the beach today! 🌅 #nature #sunset',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    likes: 128,
    comments: 23,
    isLiked: true,
  },
  {
    id: 3,
    username: 'mike_smith',
    avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
    content: 'Just got my new gaming setup! What do you think? #gaming #setup',
    image: 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2',
    timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000), // 23 hours ago
    likes: 76,
    comments: 15,
    isLiked: false,
  },
];

// Trending topics
export const TRENDING_TOPICS = [
  { topic: '#WebDevelopment', posts: 5432 },
  { topic: '#ReactJS', posts: 3211 },
  { topic: '#UXDesign', posts: 2876 },
  { topic: '#JavaScript', posts: 9876 },
  { topic: '#TailwindCSS', posts: 1543 }
];

// Current user
export const CURRENT_USER = {
  id: 0,
  username: 'alex_doe',
  displayName: 'Alex Doe',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
};