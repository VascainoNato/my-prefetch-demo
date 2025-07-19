import { useState } from 'react';
import useSWR, { preload } from 'swr';
import { fetcher } from './useFetcher';
import type { Post, Comment } from '../types';

export const usePostsOptimized = () => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  // Custom fetcher with base URL
  const customFetcher = (url: string) => fetcher(`https://jsonplaceholder.typicode.com${url}`);
  // Fetch posts with SWR (automatic cache, polling, revalidation)
  const { 
    data: posts, 
    error: postsError, 
    isLoading: loadingPosts 
  } = useSWR<Post[]>('/posts?_limit=5', customFetcher, {
    refreshInterval: 5 * 60 * 1000, // Polling every 5 minutes
    revalidateOnFocus: false,
  });

  // Fetch comments only when a post is selected
  const { 
    data: comments, 
    error: commentsError, 
    isLoading: loadingComments 
  } = useSWR<Comment[]>(
    selectedPostId ? `/posts/${selectedPostId}/comments` : null,
    customFetcher,
    {
      refreshInterval: 5 * 60 * 1000, 
      fallbackData: [], 
      revalidateOnFocus: false, 
    }
  );

  // Function to prefetch comments
  const prefetchComments = (postId: number) => {
    preload(`/posts/${postId}/comments`, customFetcher);
  };

  // Function to toggle post selection (open/close)
  const togglePost = (postId: number) => {
    setSelectedPostId(selectedPostId === postId ? null : postId);
  };

  return {
    posts,
    comments,
    loadingPosts,
    loadingComments,
    postsError,
    commentsError,
    togglePost,
    prefetchComments,
    selectedPostId,
  };
}; 