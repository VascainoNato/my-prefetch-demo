export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const API_ENDPOINTS = {
  posts: '/posts',
  comments: (postId: number) => `/posts/${postId}/comments`,
} as const; 