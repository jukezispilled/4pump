export function generatePostNumber() {
  return Math.floor(Math.random() * 900000000) + 100000000; // 9-digit number
}

export function generateThreadNumber() {
  return Math.floor(Math.random() * 90000000) + 10000000; // 8-digit number
}

export function generateTripcode(password) {
  if (!password) return null;
  
  // Simple tripcode generation (in production, use proper crypto)
  const crypto = require('crypto');
  const hash = crypto.createHash('md5').update(password).digest('hex');
  return '!' + hash.substring(0, 8);
}

export function parseContent(content) {
  if (!content) return '';
  
  // Parse >>references
  content = content.replace(/>>(\d+)/g, '<a href="#post-$1" class="text-blue-600 hover:underline">&gt;&gt;$1</a>');
  
  // Parse >greentext
  content = content.replace(/^(&gt;|>)(.+)$/gm, '<span class="text-green-600">&gt;$2</span>');
  
  // Parse line breaks
  content = content.replace(/\n/g, '<br>');
  
  return content;
}

export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function truncateFilename(filename, maxLength = 16) {
  // Check if filename exists and is a string
  if (!filename || typeof filename !== 'string') {
      return '';
  }
  
  if (filename.length <= maxLength) return filename;
  
  // Check if file has an extension
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1) {
      // No extension, just truncate
      return filename.substring(0, maxLength - 3) + '...';
  }
  
  const ext = filename.substring(lastDotIndex);
  const name = filename.substring(0, lastDotIndex);
  
  // Make sure we have room for the extension and ellipsis
  const availableLength = maxLength - ext.length - 3;
  if (availableLength <= 0) {
      // If extension is too long, just return the extension
      return ext.length <= maxLength ? ext : ext.substring(0, maxLength - 3) + '...';
  }
  
  const truncated = name.substring(0, availableLength) + '...';
  return truncated + ext;
}