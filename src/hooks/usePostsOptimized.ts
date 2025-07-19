import { useState } from 'react';
import useSWR, { preload } from 'swr';
import { fetcher } from './useFetcher';
import type { Post, Comment } from '../types';

export const usePostsOptimized = () => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  // Fetch posts with SWR (automatic cache, polling, revalidation)
  const { 
    data: posts, 
    error: postsError, 
    isLoading: loadingPosts 
  } = useSWR<Post[]>('/posts?_limit=5', fetcher, {
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
    fetcher,
    {
      refreshInterval: 5 * 60 * 1000, 
      fallbackData: [], 
      revalidateOnFocus: false, 
    }
  );

  // Function to prefetch comments
  const prefetchComments = (postId: number) => {
    preload(`/posts/${postId}/comments`, fetcher);
  };

  // Function to select a post and load its comments
  const selectPost = (postId: number) => {
    setSelectedPostId(postId);
  };

  return {
    posts,
    comments,
    loadingPosts,
    loadingComments,
    postsError,
    commentsError,
    selectPost,
    prefetchComments,
    selectedPostId,
  };
}; 