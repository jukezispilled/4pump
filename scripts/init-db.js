// scripts/init-db.js
// Load environment variables FIRST, before any other imports
import { config } from 'dotenv';
config({ path: '.env.local' });

// Debug: Check if environment variables are loaded
console.log('Environment check:');
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('MONGODB_URI value:', process.env.MONGODB_URI ? 'Found' : 'Missing');

// Now import other modules
import { initializeIndexes, testConnection } from '../src/lib/mongodb.js';
import { createBoard } from '../src/lib/db-operations.js';

const boards = [
  {
    code: 'b',
    name: 'Random',
    description: 'Random discussion',
    isNSFW: true,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 'g',
    name: 'Technology',
    description: 'Technology discussion',
    isNSFW: false,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 'pol',
    name: 'Politically Incorrect',
    description: 'Political discussion',
    isNSFW: true,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 'a',
    name: 'Anime & Manga',
    description: 'Anime and manga discussion',
    isNSFW: false,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  }
];

async function initializeDatabase() {
  try {
    console.log('Testing MongoDB Atlas connection...');
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.error('Failed to connect to MongoDB Atlas. Please check your connection string and network access.');
      process.exit(1);
    }
    
    console.log('Initializing database indexes...');
    await initializeIndexes();
    
    console.log('Creating default boards...');
    for (const boardData of boards) {
      try {
        const existingBoard = await import('../src/lib/db-operations.js').then(m => 
          m.getBoardByCode(boardData.code)
        );
        
        if (!existingBoard) {
          await createBoard(boardData);
          console.log(`Created board: /${boardData.code}/`);
        } else {
          console.log(`Board /${boardData.code}/ already exists`);
        }
      } catch (error) {
        console.error(`Error creating board /${boardData.code}/:`, error);
      }
    }
    
    console.log('Database initialization complete!');
    process.exit(0);
    
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

initializeDatabase();