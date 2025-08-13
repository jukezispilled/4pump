import Link from 'next/link';
import { getAllBoards, getAllThreads } from '@/lib/db-operations';
import AddressDisplay from './components/Copy';
import InfoModal from './components/InfoModal';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const boards = await getAllBoards();
  const threads = await getAllThreads();
  
  // Calculate total posts across all boards
  const totalPosts = boards.reduce((sum, board) => sum + board.postCount, 0);
  
  // Get top 6 threads with images, sorted by reply count
  const popularThreads = threads
    .filter(thread => thread.imageUrl && thread.imageUrl.trim() !== '') // Only threads with images
    .sort((a, b) => (b.replyCount || 0) - (a.replyCount || 0)) // Sort by reply count descending
    .slice(0, 6); // Take top 6
  
  // Example contract address - replace with your actual contract address
  const contractAddress = "1234pump";

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen flex flex-col">
      {/* Top left area with X link and contract address */}
      <div className="flex justify-between items-start mb-4 absolute top-4 left-4">
        <div className="flex items-center gap-1">
          <Link
            href="https://x.com/4pumporg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#890000] font-semibold text-base mt-0"
          >
            𝕏
          </Link>
          <AddressDisplay contractAddress={contractAddress} />
          <InfoModal />
        </div>
      </div>

      <div className="text-center mb-8">
        <img src="/head.png" alt="Logo" className="mx-auto mb-2 w-[30%]" />
      </div>

      <div className="bg-[#f5fdf3] border-2 border-gray-300 h-min">
        <div className='bg-[#8CF2BD]'>
          <h2 className="text-lg font-bold mb-4 text-[#890000] px-2">Boards</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {boards.map((board) => (
            <Link
              key={board.code}
              href={`/${board.code}`}
              className="block p-2 bg-white border border-gray-300 hover:bg-gray-50 transition-colors relative"
            >
              <div className="font-bold text-blue-600">/{board.code}/</div>
              <div className="text-sm text-gray-700">{board.name}</div>
              <div className="text-xs text-gray-500 mt-1">{board.description}</div>
              <div className="text-xs text-gray-400 absolute top-2 right-2">
                {board.postCount} posts
                {board.isNSFW && <span className="text-red-500 ml-2">[NSFW]</span>}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Threads section */}
      <div className="bg-[#f5fdf3] border-2 border-gray-300 h-min mt-4">
        <div className='bg-[#8CF2BD]'>
          <h2 className="text-lg font-bold mb-4 text-[#890000] px-2">Popular Threads</h2>
        </div>
        <div className="p-4">
          {popularThreads.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularThreads.map((thread, index) => (
                <Link
                  key={thread.id || `thread-${index}`}
                  href={`/${thread.boardCode}/thread/${thread.threadNumber || thread.id || index}`}
                  className="block bg-white border border-gray-300 hover:bg-gray-50 transition-colors overflow-hidden relative"
                >
                  {/* Thread image */}
                  <div className="aspect-video bg-gray-100 overflow-hidden relative">
                    <img 
                      src={thread.imageUrl} 
                      alt={thread.subject || 'Thread image'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Thread info */}
                  <div className="p-3">
                    <div className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2">
                      {thread.subject || 'No Subject'}
                    </div>
                    <div className="text-xs text-gray-600 mb-6 line-clamp-3">
                      {thread.content?.substring(0, 100)}
                      {thread.content?.length > 100 && '...'}
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500 absolute bottom-2 right-2">
                      <span>/{thread.boardCode}/</span>
                      <span>{thread.replyCount || 0} replies</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1 absolute bottom-2 left-2">
                      {thread.createdAt && new Date(thread.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-300 p-6 text-center">
              <div className="text-lg font-semibold text-gray-500 mb-2">No Popular Threads</div>
              <div className="text-sm text-gray-400">No threads with images found yet</div>
            </div>
          )}
        </div>
      </div>

      {/* Stats area with same style as boards */}
      <div className="bg-[#f5fdf3] border-2 border-gray-300 h-min mt-4">
        <div className='bg-[#8CF2BD]'>
          <h2 className="text-lg font-bold mb-4 text-[#890000] px-2">Stats</h2>
        </div>
        <div className="p-4">
          <div className="bg-white border border-gray-300 p-4 text-center">
            <div className="text-2xl font-bold text-[#890000]">{totalPosts.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Posts</div>
          </div>
        </div>
      </div>

      <div className='text-[10px] text-[#890000] text-center mt-auto py-4'>
        Copyright © 4pump 2025. All rights reserved.
      </div>
    </div>
  );
};