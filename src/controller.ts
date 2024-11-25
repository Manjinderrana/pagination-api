import { Request, Response } from 'express';
import fs from 'fs'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const perPage = 150
let data: any

const delay = () => new Promise(resolve => setTimeout(resolve, 4000))

fs.readFile('data.json', 'utf8', (err, jsonString) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }
    try {
      data = ((JSON.parse(jsonString)))
    } catch (err) {
      console.error('Error parsing JSON file:', err);
    }
  })

export const chunks = async (_req: Request, res: Response) => {
  try {
  let index = 0;
    while (index < data.length) {
      const chunked = data.slice(index, index + perPage);
      try {
        await prisma.product.createMany({
          data: chunked.map((item: any) => ({
            name: item?.name,
            sku: item?.sku,
            product_type: item?.product_type,
            categories: item?.categories,
            attribute_set_code: item?.attribute_set_code,
            product_websites: item?.product_websites,
          })),
        });
        console.log(`Inserted chunk starting from index ${index}`);
      } catch (err) {
        console.error(`Error inserting chunk starting from index ${index}:`, err);
      }
      index += perPage
      await delay()
    }
  res.json({ message: 'data inserted in chunks successfully'});
  
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
