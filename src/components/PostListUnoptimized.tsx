import React from 'react';
import { usePostsUnoptimized } from '../hooks/usePostsUnoptimized';
import LoadingSpinner from './LoadingSpinner';

const PostListUnoptimized: React.FC = () => {
  const {
    posts,
    loadingPosts,
    selectedPostId,
    selectedPostComments,
    loadingComments,
    error,
    togglePost,
  } = usePostsUnoptimized();

  if (loadingPosts) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Single Query (No Optimizations)</h3>
      <ul className="space-y-4">
        {posts.map(post => (
          <li 
            key={post.id} 
            className="border p-4 rounded-md cursor-pointer hover:bg-gray-50" 
            onClick={() => togglePost(post.id)}
          >
            <h4 className="font-medium text-lg">{post.title}</h4>
            <p className="text-gray-600 text-sm">{post.body.substring(0, 100)}...</p>
            
            {selectedPostId === post.id && loadingComments && selectedPostComments === null && (
              <LoadingSpinner />
            )}
            
            {selectedPostId === post.id && selectedPostComments && selectedPostComments.length > 0 && (
              <div className="mt-4 border-t pt-4">
                <h5 className="font-semibold mb-2">Comments:</h5>
                <ul className="text-sm space-y-1">
                  {selectedPostComments.map(comment => (
                    <li key={comment.id} className="bg-gray-100 p-2 rounded-sm">
                      <span className="font-medium">{comment.email}:</span> {comment.body.substring(0, 50)}...
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostListUnoptimized;