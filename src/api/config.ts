export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const API_ENDPOINTS = {
  posts: '/posts',
  comments: (postId: number) => `/posts/${postId}/comments`,
  users: '/users',
  user: (userId: number) => `/users/${userId}`,
  albums: '/albums',
  userAlbums: (userId: number) => `/users/${userId}/albums`,
  photos: '/photos',
  albumPhotos: (albumId: number) => `/albums/${albumId}/photos`,
} as const; 