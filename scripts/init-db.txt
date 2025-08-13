// scripts/init-db.js
// Load environment variables FIRST, before any other imports
import { config } from 'dotenv';
config({ path: '.env.local' });

// Now import other modules
import { initializeIndexes, testConnection } from '../src/lib/mongodb.js';
import { createBoard } from '../src/lib/db-operations.js';

const boards = [
  {
    code: 'a',
    name: 'Pump',
    description: 'Pump.fun Discourse',
    isNSFW: false,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 'b',
    name: 'Majors',
    description: 'Major Crypto',
    isNSFW: false,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 'c',
    name: 'ALTs',
    description: 'Alt Cryptos',
    isNSFW: false,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 'd',
    name: 'Memes',
    description: 'Meme Discourse',
    isNSFW: false,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 'e',
    name: 'Shills',
    description: 'Shill Your Coin',
    isNSFW: false,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 'f',
    name: 'PnLs',
    description: 'Profit/Loss',
    isNSFW: false,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 'g',
    name: 'KOLs',
    description: 'Key Opinion Leaders',
    isNSFW: false,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 'h',
    name: 'TA',
    description: 'Technical Analysis',
    isNSFW: false,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 'i',
    name: 'Ruggers',
    description: 'Mf Ruggers',
    isNSFW: false,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 'j',
    name: 'FUD',
    description: 'Fear, Uncertainty, Doubt',
    isNSFW: false,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 'k',
    name: 'NFTs',
    description: 'Non-Fungible Tokens',
    isNSFW: false,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 'l',
    name: 'Jeets',
    description: 'Always Selling',
    isNSFW: false,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 'm',
    name: 'Tech',
    description: 'Gud Tek',
    isNSFW: false,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 'n',
    name: 'Crashouts',
    description: 'Holy Crashouts',
    isNSFW: false,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 'o',
    name: 'Confessions',
    description: 'Confess Anything',
    isNSFW: false,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 'p',
    name: 'Unemployment',
    description: 'That One Unemployed Friend',
    isNSFW: false,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 'q',
    name: 'gm',
    description: 'say it back',
    isNSFW: false,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 'r',
    name: 'wagmi',
    description: 'wagmi and hopium',
    isNSFW: false,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 's',
    name: 'Culture',
    description: 'Crypto Culture',
    isNSFW: false,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 't',
    name: 'Cryptohoes',
    description: 'Crypto thotties',
    isNSFW: true,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  {
    code: 'u',
    name: 'Chillhouse',
    description: 'Just a Chillhouse',
    isNSFW: true,
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
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