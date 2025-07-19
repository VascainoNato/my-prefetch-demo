import React from 'react';
import { usePostsOptimized } from '../hooks/usePostsOptimized';
import LoadingSpinner from './LoadingSpinner';
import { PostMetrics } from './PostMetrics';

const PostItemOptimized: React.FC<{ 
  post: { id: number; title: string; body: string; userId: number }; 
  onToggle: (postId: number) => void;
  onPrefetch: (postId: number) => void;
  isSelected: boolean;
  postDetails: any;
  loadingDetails: boolean;
  detailsError: any;
}> = ({ 
  post, 
  onToggle, 
  onPrefetch, 
  isSelected, 
  postDetails, 
  loadingDetails, 
  detailsError
}) => {
  return (
    <li
      className="border p-4 rounded-md cursor-pointer hover:bg-gray-50"
      onMouseEnter={() => onPrefetch(post.id)}
      onClick={() => onToggle(post.id)}
    >
      <h4 className="font-medium text-lg">{post.title}</h4>
      <p className="text-gray-600 text-sm">{post.body.substring(0, 100)}...</p>

      {isSelected && (
        <div>
          {detailsError && <div className="text-red-500 mt-2">Error loading details.</div>}
          {loadingDetails && !postDetails && <LoadingSpinner />}
          {postDetails && postDetails.user && (
            <div className="mt-4 border-t pt-4 space-y-4">
              {/* Performance Metrics */}
              <PostMetrics 
                postId={post.id} 
                isOptimized={true} 
                isLoading={loadingDetails}
                hasData={!!postDetails}
              />

              {/* User Info */}
              <div>
                <h5 className="font-semibold mb-2 text-gray-800">Author:</h5>
                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="font-medium">{postDetails.user.name}</div>
                  <div className="text-sm text-gray-600">@{postDetails.user.username}</div>
                  <div className="text-sm text-gray-600">{postDetails.user.email}</div>
                  <div className="text-sm text-gray-600">{postDetails.user.phone}</div>
                </div>
              </div>

              {/* Comments */}
              {postDetails.comments && postDetails.comments.length > 0 && (
                <div>
                  <h5 className="font-semibold mb-2">Comments ({postDetails.comments.length}):</h5>
                  <ul className="text-sm space-y-2">
                    {postDetails.comments.slice(0, 3).map((comment: any) => (
                      <li key={comment.id} className="bg-gray-100 p-2 rounded-sm">
                        <span className="font-medium">{comment.email}:</span> {comment.body.substring(0, 50)}...
                      </li>
                    ))}
                    {postDetails.comments.length > 3 && (
                      <li className="text-gray-500 text-xs">... and {postDetails.comments.length - 3} more comments</li>
                    )}
                  </ul>
                </div>
              )}

              {/* Albums */}
              {postDetails.albums && postDetails.albums.length > 0 && (
                <div>
                  <h5 className="font-semibold mb-2">Albums ({postDetails.albums.length}):</h5>
                  <ul className="text-sm space-y-1">
                    {postDetails.albums.slice(0, 3).map((album: any) => (
                      <li key={album.id} className="bg-gray-100 p-2 rounded-sm">
                        <span className="font-medium">{album.title}</span>
                      </li>
                    ))}
                    {postDetails.albums.length > 3 && (
                      <li className="text-gray-500 text-xs">... and {postDetails.albums.length - 3} more albums</li>
                    )}
                  </ul>
                </div>
              )}

              {/* Photos */}
              {postDetails.photos && postDetails.photos.length > 0 && (
                <div>
                  <h5 className="font-semibold mb-2">Photos ({postDetails.photos.length}):</h5>
                  <div className="grid grid-cols-3 gap-2">
                    {postDetails.photos.slice(0, 6).map((photo: any) => (
                      <div key={photo.id} className="aspect-square bg-gray-200 rounded-md overflow-hidden">
                        <img 
                          src={photo.thumbnailUrl} 
                          alt={photo.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  {postDetails.photos.length > 6 && (
                    <div className="text-gray-500 text-xs mt-2">... and {postDetails.photos.length - 6} more photos</div>
                  )}
                </div>
              )}
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
  } = usePostsOptimized();

  const loadingDetails = loadingComments || loadingUser || loadingAlbums || loadingPhotos;
  const detailsError = commentsError || userError || albumsError || photosError;

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
            onToggle={togglePost}
            onPrefetch={prefetchPostData}
            isSelected={selectedPostId === post.id}
            postDetails={postDetails}
            loadingDetails={loadingDetails}
            detailsError={detailsError}
          />
        ))}
      </ul>
    </div>
  );
};

export default PostListOptimized;