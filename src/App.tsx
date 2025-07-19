import PostListUnoptimized from './components/PostListUnoptimized';
import PostListOptimized from './components/PostListOptimized';

function App() {
  return (
    <div className="w-full flex bg-gray-100 h-screen flex-col">
      <h1 className="text-3xl font-bold text-center items-center justify-center h-20 flex">Prefetching and Caching Demo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <PostListUnoptimized />
        <PostListOptimized />
      </div>
    </div>
  );
}

export default App;