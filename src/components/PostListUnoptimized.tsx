import React from 'react';
import { usePostsUnoptimized } from '../hooks/usePostsUnoptimized';
import LoadingSpinner from './LoadingSpinner';
import { PostMetrics } from './PostMetrics';

const PostListUnoptimized: React.FC = () => {
  const {
    posts,
    loadingPosts,
    selectedPostId,
    selectedPostDetails,
    loadingDetails,
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
            
            {selectedPostId === post.id && (
              <div className="mt-4 border-t pt-4 space-y-4">
                {/* Performance Metrics - Always show when post is selected */}
                <PostMetrics 
                  postId={post.id} 
                  isOptimized={false} 
                  isLoading={loadingDetails}
                  hasData={!!selectedPostDetails}
                />

                {loadingDetails && selectedPostDetails === null && (
                  <LoadingSpinner />
                )}
                
                {selectedPostDetails && selectedPostDetails.user && (
                  <>
                    {/* User Info */}
                    <div>
                      <h5 className="font-semibold mb-2 text-gray-800">Author:</h5>
                      <div className="bg-gray-100 p-3 rounded-md">
                        <div className="font-medium">{selectedPostDetails.user.name}</div>
                        <div className="text-sm text-gray-600">@{selectedPostDetails.user.username}</div>
                        <div className="text-sm text-gray-600">{selectedPostDetails.user.email}</div>
                        <div className="text-sm text-gray-600">{selectedPostDetails.user.phone}</div>
                      </div>
                    </div>

                    {/* Comments */}
                    {selectedPostDetails.comments && selectedPostDetails.comments.length > 0 && (
                      <div>
                        <h5 className="font-semibold mb-2">Comments ({selectedPostDetails.comments.length}):</h5>
                        <ul className="text-sm space-y-2">
                          {selectedPostDetails.comments.slice(0, 3).map((comment: any) => (
                            <li key={comment.id} className="bg-gray-100 p-2 rounded-sm">
                              <span className="font-medium">{comment.email}:</span> {comment.body.substring(0, 50)}...
                            </li>
                          ))}
                          {selectedPostDetails.comments.length > 3 && (
                            <li className="text-gray-500 text-xs">... and {selectedPostDetails.comments.length - 3} more comments</li>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Albums */}
                    {selectedPostDetails.albums && selectedPostDetails.albums.length > 0 && (
                      <div>
                        <h5 className="font-semibold mb-2">Albums ({selectedPostDetails.albums.length}):</h5>
                        <ul className="text-sm space-y-1">
                          {selectedPostDetails.albums.slice(0, 3).map((album: any) => (
                            <li key={album.id} className="bg-gray-100 p-2 rounded-sm">
                              <span className="font-medium">{album.title}</span>
                            </li>
                          ))}
                          {selectedPostDetails.albums.length > 3 && (
                            <li className="text-gray-500 text-xs">... and {selectedPostDetails.albums.length - 3} more albums</li>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Photos */}
                    {selectedPostDetails.photos && selectedPostDetails.photos.length > 0 && (
                      <div>
                        <h5 className="font-semibold mb-2">Photos ({selectedPostDetails.photos.length}):</h5>
                        <div className="grid grid-cols-3 gap-2">
                          {selectedPostDetails.photos.slice(0, 6).map((photo: any) => (
                            <div key={photo.id} className="aspect-square bg-gray-200 rounded-md overflow-hidden">
                              <img 
                                src={photo.thumbnailUrl} 
                                alt={photo.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        {selectedPostDetails.photos.length > 6 && (
                          <div className="text-gray-500 text-xs mt-2">... and {selectedPostDetails.photos.length - 6} more photos</div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostListUnoptimized;