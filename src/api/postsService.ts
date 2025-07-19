import { API_BASE_URL, API_ENDPOINTS } from './config';
import type { Post, Comment, User, Album, Photo } from '../types';

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

  static async fetchUser(userId: number): Promise<User> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.user(userId)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    
    return response.json();
  }

  static async fetchUserAlbums(userId: number): Promise<Album[]> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.userAlbums(userId)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user albums');
    }
    
    return response.json();
  }

  static async fetchAlbumPhotos(albumId: number): Promise<Photo[]> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.albumPhotos(albumId)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch album photos');
    }
    
    return response.json();
  }

  // Cache busting methods for unoptimized service
  static async fetchCommentsWithCacheBust(postId: number, timestamp: number): Promise<Comment[]> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.comments(postId)}?_t=${timestamp}`, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    
    return response.json();
  }

  static async fetchUserWithCacheBust(userId: number, timestamp: number): Promise<User> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.user(userId)}?_t=${timestamp}`, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    
    return response.json();
  }

  static async fetchUserAlbumsWithCacheBust(userId: number, timestamp: number): Promise<Album[]> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.userAlbums(userId)}?_t=${timestamp}`, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user albums');
    }
    
    return response.json();
  }

  static async fetchAlbumPhotosWithCacheBust(albumId: number, timestamp: number): Promise<Photo[]> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.albumPhotos(albumId)}?_t=${timestamp}`, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch album photos');
    }
    
    return response.json();
  }
} 