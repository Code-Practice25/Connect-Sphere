/**
 * Mock data for development and testing
 * This file contains sample data for stories, posts, users, and trending topics
 */

// Current user data
export const CURRENT_USER = {
  id: 1,
  username: 'johndoe',
  name: 'John Doe',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  coverPhoto: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93',
  bio: 'Software Engineer | React Developer | Coffee Enthusiast',
  location: 'San Francisco, CA',
  followers: 1234,
  following: 567,
  joined: 'January 2022'
};

// Sample stories data
export const STORIES = [
  {
    id: 1,
    username: 'janedoe',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    isViewed: false
  },
  {
    id: 2,
    username: 'mikebrown',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    isViewed: false
  },
  {
    id: 3,
    username: 'sarahsmith',
    avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
    isViewed: true
  },
  {
    id: 4,
    username: 'alexjohnson',
    avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
    isViewed: false
  },
  {
    id: 5,
    username: 'emilywilson',
    avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
    isViewed: true
  },
  {
    id: 6,
    username: 'davidmiller',
    avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
    isViewed: false
  }
];

// Sample posts data
export const POSTS = [
  {
    id: 1,
    username: 'janedoe',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    content: 'Just launched my new portfolio website! Check it out and let me know what you think. #webdevelopment #portfolio',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 42,
    comments: 8,
    isLiked: false
  },
  {
    id: 2,
    username: 'mikebrown',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    content: 'Beautiful day for a hike! Nature is the best therapy. 🌲🏞️',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    likes: 76,
    comments: 12,
    isLiked: true
  },
  {
    id: 3,
    username: 'sarahsmith',
    avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
    content: 'Just finished reading this amazing book on artificial intelligence. Highly recommend it to anyone interested in the future of technology!',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    likes: 28,
    comments: 5,
    isLiked: false
  },
  {
    id: 4,
    username: 'alexjohnson',
    avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
    content: 'Excited to announce that I\'ll be speaking at the React Conference next month! Who else is attending? #ReactJS #WebDevelopment',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e4',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    likes: 124,
    comments: 32,
    isLiked: false
  },
  {
    id: 5,
    username: 'emilywilson',
    avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
    content: 'Just adopted this little guy from the shelter. Meet Max! 🐶',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    likes: 215,
    comments: 45,
    isLiked: true
  }
];

// Trending topics
export const TRENDING_TOPICS = [
  {
    id: 1,
    topic: 'ReactJS',
    posts: 1234
  },
  {
    id: 2,
    topic: 'WebDevelopment',
    posts: 876
  },
  {
    id: 3,
    topic: 'TechNews',
    posts: 543
  },
  {
    id: 4,
    topic: 'Programming',
    posts: 432
  },
  {
    id: 5,
    topic: 'JavaScript',
    posts: 321
  }
];

// Sample comments data
export const COMMENTS = [
  {
    id: 1,
    postId: 1,
    username: 'mikebrown',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    content: 'This looks amazing! Great work!',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    likes: 5
  },
  {
    id: 2,
    postId: 1,
    username: 'sarahsmith',
    avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
    content: 'I love the design! What technologies did you use?',
    timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
    likes: 3
  },
  {
    id: 3,
    postId: 2,
    username: 'johndoe',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    content: 'Where is this? Looks beautiful!',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    likes: 8
  }
];