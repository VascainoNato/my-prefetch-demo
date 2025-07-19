import { useState, useEffect } from 'react';
import { PostsService } from '../api/postsService';
import type { Post, Photo, PostDetails } from '../types';

export const usePostsUnoptimized = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedPostDetails, setSelectedPostDetails] = useState<PostDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
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

  // Function to toggle post selection and fetch all details
  const togglePost = async (postId: number) => {
    if (selectedPostId === postId) {
      // Close post
      setSelectedPostId(null);
      setSelectedPostDetails(null);
    } else {
      // Open post and fetch all details - ALWAYS make new request
      setSelectedPostId(postId);
      setLoadingDetails(true);
      setSelectedPostDetails(null);
      setError(null);

      try {
        const post = posts.find(p => p.id === postId);
        if (!post) throw new Error('Post not found');

        // Add timestamp to prevent browser caching
        const timestamp = Date.now();
        
        // Fetch all data in parallel - this will always be a new request
        const [comments, user, albums] = await Promise.all([
          PostsService.fetchCommentsWithCacheBust(postId, timestamp),
          PostsService.fetchUserWithCacheBust(post.userId, timestamp),
          PostsService.fetchUserAlbumsWithCacheBust(post.userId, timestamp),
        ]);

        // Fetch photos from first album if available
        let photos: Photo[] = [];
        if (albums.length > 0) {
          photos = await PostsService.fetchAlbumPhotosWithCacheBust(albums[0].id, timestamp);
        }

        const postDetails: PostDetails = {
          post,
          comments,
          user,
          albums,
          photos,
        };

        setSelectedPostDetails(postDetails);
      } catch (err) {
        setError('Error loading post details');
        console.error('Error fetching post details:', err);
      } finally {
        setLoadingDetails(false);
      }
    }
  };

  return {
    posts,
    loadingPosts,
    selectedPostId,
    selectedPostDetails,
    loadingDetails,
    error,
    togglePost,
  };
}; 