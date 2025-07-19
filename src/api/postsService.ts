import { API_BASE_URL, API_ENDPOINTS } from './config';
import type { Post, Comment } from '../types';

// Simple service without optimizations
export class PostsService {
  static async fetchPosts(limit: number = 5): Promise<Post[]> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.posts}?_limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    return response.json();
  }

  static async fetchComments(postId: number): Promise<Comment[]> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.comments(postId)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    
    return response.json();
  }
} 