import { useState, useRef } from 'react';
import useSWR, { preload } from 'swr';
import { fetcher } from './useFetcher';
import type { Post, Comment, User, Album, Photo, PostDetails } from '../types';

export const usePostsOptimized = () => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const prefetchedPosts = useRef<Set<number>>(new Set());
  
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

  // Fetch user data for selected post
  const { 
    data: user, 
    error: userError, 
    isLoading: loadingUser 
  } = useSWR<User>(
    selectedPostId && posts ? `/users/${posts.find(p => p.id === selectedPostId)?.userId}` : null,
    customFetcher,
    {
      refreshInterval: 5 * 60 * 1000,
      revalidateOnFocus: false,
    }
  );

  // Fetch user albums
  const { 
    data: albums, 
    error: albumsError, 
    isLoading: loadingAlbums 
  } = useSWR<Album[]>(
    selectedPostId && user ? `/users/${user.id}/albums` : null,
    customFetcher,
    {
      refreshInterval: 5 * 60 * 1000,
      revalidateOnFocus: false,
    }
  );

  // Fetch photos from first album
  const { 
    data: photos, 
    error: photosError, 
    isLoading: loadingPhotos 
  } = useSWR<Photo[]>(
    albums && albums.length > 0 ? `/albums/${albums[0].id}/photos?_limit=5` : null,
    customFetcher,
    {
      refreshInterval: 5 * 60 * 1000,
      revalidateOnFocus: false,
    }
  );



  // Function to prefetch ALL data for a post (only once)
  const prefetchPostData = (postId: number) => {
    // Check if already prefetched
    if (prefetchedPosts.current.has(postId)) {
      return;
    }

    const post = posts?.find(p => p.id === postId);
    if (!post) return;

    prefetchedPosts.current.add(postId);

    // Prefetch comments
    preload(`/posts/${postId}/comments`, customFetcher);
    
    // Prefetch user data
    preload(`/users/${post.userId}`, customFetcher);
    
    // Prefetch user albums
    preload(`/users/${post.userId}/albums`, customFetcher);
    
    // Prefetch photos from first album (we'll need to get albums first)
    // This is a bit tricky, so we'll do it in sequence
    customFetcher(`/users/${post.userId}/albums`).then((albums: Album[]) => {
      if (albums.length > 0) {
        preload(`/albums/${albums[0].id}/photos?_limit=5`, customFetcher);
      }
    }).catch(console.error);
  };

  // Function to toggle post selection (open/close)
  const togglePost = (postId: number) => {
    setSelectedPostId(selectedPostId === postId ? null : postId);
  };

  // Only create postDetails when all required data is available
  const postDetails: PostDetails | null = selectedPostId && posts && user ? {
    post: posts.find(p => p.id === selectedPostId)!,
    comments: comments || [],
    user: user,
    albums: albums || [],
    photos: photos || [],
  } : null;

  return {
    posts,
    postDetails,
    loadingPosts,
    loadingComments,
    loadingUser,
    loadingAlbums,
    loadingPhotos,
    postsError,
    commentsError,
    userError,
    albumsError,
    photosError,
    togglePost,
    prefetchPostData,
    selectedPostId,
  };
}; 