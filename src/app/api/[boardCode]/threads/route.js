import { 
    getBoardByCode, 
    getThreadsByBoard, 
    createThread,
    incrementBoardPostCount,
    getRecentPostsByThread,
    getNextPostNumber
  } from '@/lib/db-operations';
  import { uploadImage } from '@/lib/imageUpload';
  import { generateTripcode } from '@/lib/utils';
  
  export async function GET(request, { params }) {
    try {
      const { boardCode } = params;
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page')) || 1;
      const limit = 10;
      
      const board = await getBoardByCode(boardCode);
      if (!board) {
        return Response.json({ error: 'Board not found' }, { status: 404 });
      }
      
      const threads = await getThreadsByBoard(boardCode, page, limit);
      
      // Get recent replies for each thread
      const threadsWithReplies = await Promise.all(
        threads.map(async (thread) => {
          const recentPosts = await getRecentPostsByThread(boardCode, thread.threadNumber, 5);
          return {
            ...thread,
            recentPosts: recentPosts.reverse() // Show oldest first
          };
        })
      );
      
      return Response.json({
        board,
        threads: threadsWithReplies,
        hasMore: threads.length === limit
      });
      
    } catch (error) {
      console.error('Failed to fetch threads:', error);
      return Response.json({ error: 'Failed to fetch threads' }, { status: 500 });
    }
  }

  export async function GET() {
    try {
      const threads = await getAllThreads();
      return Response.json(threads);
    } catch (error) {
      console.error('Failed to fetch threads:', error);
      return Response.json({ error: 'Failed to fetch threads' }, { status: 500 });
    }
  }
  
  export async function POST(request, { params }) {
    try {
      const { boardCode } = params;
      
      const board = await getBoardByCode(boardCode);
      if (!board) {
        return Response.json({ error: 'Board not found' }, { status: 404 });
      }
      
      const formData = await request.formData();
      const subject = formData.get('subject') || '';
      const content = formData.get('content') || '';
      const author = formData.get('author') || 'Anonymous';
      const email = formData.get('email') || '';
      const tripcode_password = formData.get('tripcode_password') || '';
      const image = formData.get('image');
      
      if (!content && !image) {
        return Response.json({ error: 'Thread must have content or image' }, { status: 400 });
      }
      
      const tripcode = generateTripcode(tripcode_password);
      
      let imageData = {};
      if (image && image.size > 0) {
        if (image.size > board.maxFileSize) {
          return Response.json({ error: 'File too large' }, { status: 400 });
        }
        
        if (!board.allowedFileTypes.includes(image.type)) {
          return Response.json({ error: 'File type not allowed' }, { status: 400 });
        }
        
        const postNumber = await getNextPostNumber();
        imageData = await uploadImage(image, boardCode, postNumber);
      }
      
      const threadData = {
        boardCode,
        subject: subject.substring(0, 100),
        content: content.substring(0, 2000),
        author: author.substring(0, 50),
        tripcode,
        email: email.substring(0, 100),
        ...imageData
      };
      
      const thread = await createThread(threadData);
      await incrementBoardPostCount(boardCode, 1);
      
      return Response.json(thread, { status: 201 });
      
    } catch (error) {
      console.error('Thread creation error:', error);
      return Response.json({ error: 'Failed to create thread' }, { status: 500 });
    }
  }