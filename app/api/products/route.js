import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import Papa from 'papaparse';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('search') || '';

    const dataDirectory = path.join(process.cwd(), 'public');
    const fileContents = await fs.readFile(dataDirectory + '/output.csv', 'utf8');

    return new Promise((resolve, reject) => {
      Papa.parse(fileContents, {
        header: true,
        complete: (results) => {
          const allData = results.data;
          console.log(`Total products: ${allData.length}`);

          // Filter the data based on the search term
          const filteredData = allData.filter(product => 
            product.unique_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.name?.toLowerCase().includes(searchTerm.toLowerCase())
          );

          console.log(`Filtered products: ${filteredData.length}`);

          resolve(NextResponse.json(filteredData));
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          reject(NextResponse.json({ error: 'Failed to parse CSV' }, { status: 500 }));
        }
      });
    });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}
