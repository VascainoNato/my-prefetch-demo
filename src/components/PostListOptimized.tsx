import React from 'react';
import { SWRConfig } from 'swr';
import { usePostsOptimized } from '../hooks/usePostsOptimized';
import { fetcher } from '../hooks/useFetcher';
import LoadingSpinner from './LoadingSpinner';

const PostItemOptimized: React.FC<{ 
  post: { id: number; title: string; body: string }; 
  onSelect: (postId: number) => void;
  onPrefetch: (postId: number) => void;
  isSelected: boolean;
  comments: any[];
  loadingComments: boolean;
  commentsError: any;
}> = ({ 
  post, 
  onSelect, 
  onPrefetch, 
  isSelected, 
  comments, 
  loadingComments, 
  commentsError 
}) => {
  return (
    <li
      className="border p-4 rounded-md cursor-pointer hover:bg-gray-50"
      onMouseEnter={() => onPrefetch(post.id)}
      onClick={() => onSelect(post.id)}
    >
      <h4 className="font-medium text-lg">{post.title}</h4>
      <p className="text-gray-600 text-sm">{post.body.substring(0, 100)}...</p>

      {isSelected && (
        <div>
          {commentsError && <div className="text-red-500 mt-2">Error loading comments.</div>}
          {loadingComments && !comments && <LoadingSpinner />}
          {comments && comments.length > 0 && (
            <div className="mt-4 border-t pt-4">
              <h5 className="font-semibold mb-2">Comments:</h5>
              <ul className="text-sm space-y-1">
                {comments.map(comment => (
                  <li key={comment.id} className="bg-gray-100 p-2 rounded-sm">
                    <span className="font-medium">{comment.email}:</span> {comment.body.substring(0, 50)}...
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </li>
  );
};

const PostListOptimized: React.FC = () => {
  const {
    posts,
    comments,
    loadingPosts,
    loadingComments,
    postsError,
    commentsError,
    selectPost,
    prefetchComments,
    selectedPostId,
  } = usePostsOptimized();

  if (loadingPosts) {
    return <LoadingSpinner />;
  }

  if (postsError) {
    return <div className="text-red-500">Error loading posts.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Optimized with Prefetch, Polling and Cache (SWR)</h3>
      <ul className="space-y-4">
        {posts?.map(post => (
          <PostItemOptimized 
            key={post.id} 
            post={post}
            onSelect={selectPost}
            onPrefetch={prefetchComments}
            isSelected={selectedPostId === post.id}
            comments={comments || []}
            loadingComments={loadingComments}
            commentsError={commentsError}
          />
        ))}
      </ul>
    </div>
  );
};

// Wrapper for SWRConfig to define base URL
const OptimizedWrapper: React.FC = () => (
  <SWRConfig value={{ fetcher: (resource, init) => fetcher(`https://jsonplaceholder.typicode.com${resource}`, init) }}>
    <PostListOptimized />
  </SWRConfig>
);

export default OptimizedWrapper;