import React, { useState, useRef, useEffect } from 'react';

export interface PostMetricsProps {
  postId: number;
  isOptimized?: boolean;
  isLoading?: boolean;
  hasData?: boolean;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
}

export const PostMetrics: React.FC<PostMetricsProps> = ({ 
  postId, 
  isOptimized = false, 
  isLoading = false,
  hasData = false,
  onLoadStart,
  onLoadEnd 
}) => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
  });
  
  const startTimeRef = useRef<number>(0);
  const prevIsLoadingRef = useRef<boolean>(false);
  const prevHasDataRef = useRef<boolean>(false);

  useEffect(() => {
    // When loading starts (user clicks the post)
    if (isLoading && !prevIsLoadingRef.current) {
      startTimeRef.current = performance.now();
      onLoadStart?.();
    }
    
    // When loading ends (data is ready)
    if (!isLoading && prevIsLoadingRef.current) {
      const endTime = performance.now();
      const loadTime = endTime - startTimeRef.current;
      
      setMetrics({
        loadTime: loadTime,
      });
      
      onLoadEnd?.();
    }
    
    // When post is closed, reset metrics
    if (!hasData && prevHasDataRef.current) {
      setMetrics({
        loadTime: 0,
      });
    }
    
    prevIsLoadingRef.current = isLoading;
    prevHasDataRef.current = hasData;
  }, [isLoading, hasData, onLoadStart, onLoadEnd, postId, isOptimized]);

  const bgColor = isOptimized ? 'bg-green-50' : 'bg-red-50';
  const textColor = isOptimized ? 'text-green-800' : 'text-red-800';
  const borderColor = isOptimized ? 'border-green-200' : 'border-red-200';

  return (
    <div className={`${bgColor} p-3 rounded-md border ${borderColor}`}>
      <div className="mb-2">
        <h6 className={`font-semibold ${textColor}`}>
          {isOptimized ? 'Cache Performance' : 'Single Query Performance'}:
        </h6>
      </div>
      <div className={`text-sm ${textColor} space-y-1`}>
        <div>Load Time: {metrics.loadTime.toFixed(2)}ms</div>
        {isLoading && <div className="text-blue-600 font-medium">Loading...</div>}
      </div>
    </div>
  );
}; 