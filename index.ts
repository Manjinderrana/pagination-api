import express from 'express';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

let currentPage = 1;
const perPage = 150; 
let data: any[] = []; 

fs.readFile('data.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.error('Error reading JSON file:', err);
    return;
  }
  try {
    data = JSON.parse(jsonString);
  } catch (err) {
    console.error('Error parsing JSON file:', err);
  }
});

app.get('/data', async (req, res) => {
  try {
    const startIdx = (currentPage - 1) * perPage;
    const endIdx = startIdx + perPage;
    const chunk = data.slice(startIdx, endIdx);

    await prisma.product.createMany({
      data: chunk.map(item => ({ 
              sku: item.sku,
              id: item.id,
              product_type: item.product_type,
              attribute_set_code: item.attribute_set_code,
              product_websites: item.product_websites,
              categories: item.categories,
              name: item.name 
      })),
    });

    currentPage++; 

    res.json({ data: chunk, currentPage, perPage,});

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000');
});
