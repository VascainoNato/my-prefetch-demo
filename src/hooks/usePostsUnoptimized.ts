import { useState, useEffect } from 'react';
import { PostsService } from '../api/postsService';
import type { Post, Comment } from '../types';

export const usePostsUnoptimized = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [selectedPostComments, setSelectedPostComments] = useState<Comment[] | null>(null);
  const [loadingComments, setLoadingComments] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setError(null);
        const data = await PostsService.fetchPosts(5);
        setPosts(data);
      } catch (err) {
        setError('Error loading posts');
        console.error('Error fetching posts:', err);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  // Function to fetch comments for a post
  const fetchComments = async (postId: number) => {
    setLoadingComments(true);
    setSelectedPostComments(null);
    setError(null);

    try {
      const data = await PostsService.fetchComments(postId);
      setSelectedPostComments(data);
    } catch (err) {
      setError('Error loading comments');
      console.error('Error fetching comments:', err);
    } finally {
      setLoadingComments(false);
    }
  };

  return {
    posts,
    loadingPosts,
    selectedPostComments,
    loadingComments,
    error,
    fetchComments,
  };
}; 