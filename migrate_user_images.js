import axios from 'axios';
import fs from 'fs';
import path from 'path';

const API_URL = 'https://jcab-server.onrender.com/api';
const DOWNLOADS_DIR = 'C:\\Users\\janar\\Downloads';

async function migrateUserImages() {
  try {
    const prodRes = await axios.get(`${API_URL}/products`);
    const existingProducts = prodRes.data;

    console.log(`Found ${existingProducts.length} products. Checking for local .webp images...`);

    let updatedCount = 0;
    for (const p of existingProducts) {
      // The user's images are named exactly after the product title, e.g. "Contemporary Area Light.webp"
      const safeTitle = p.title.replace(/[<>:"/\\|?*]+/g, ''); // Basic sanitization just in case
      const imagePath = path.join(DOWNLOADS_DIR, `${safeTitle}.webp`);
      
      if (fs.existsSync(imagePath)) {
        console.log(`Found image for ${p.title} -> converting to base64...`);
        const fileData = fs.readFileSync(imagePath);
        const base64Str = 'data:image/webp;base64,' + fileData.toString('base64');
        
        await axios.put(`${API_URL}/products/${p._id}`, {
          images: [base64Str]
        });
        updatedCount++;
      } else {
        console.log(`No image found in Downloads for: ${p.title}`);
      }
    }

    console.log(`\nSuccessfully migrated ${updatedCount} images!`);
  } catch (err) {
    console.error('Error updating products:', err.response?.data || err.message);
  }
}

migrateUserImages();
