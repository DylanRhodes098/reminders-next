import * as fs from 'fs';
import { defineTool } from './defineTool';
import { z } from 'zod';

// ============================================================================= //
// Tool Functions
// ============================================================================= //

export function registerFileTools(): void {
  defineTool({
    name: 'listFiles',
    description: 'Lists all files in the current directory',
    schema: z.object({}),
    tags: ['file_operations'],
    execute: () => {
      const files = fs.readdirSync('.');
      console.log(`📁 Found ${files.length} files`);
      return files;
    },
  });

  defineTool({
    name: 'readFile',
    description: 'Reads the contents of a file',
    schema: z.object({
      fileName: z.string().describe('The name of the file to read'),
    }),
    tags: ['file_operations'],
    execute: ({ fileName }) => {
      const content = fs.readFileSync(fileName, 'utf-8');
      console.log(`📄 Read ${content.length} characters from ${fileName}`);
      return content;
    },
  });

  defineTool({
    name: 'terminate',
    description: 'Ends the session and provides final output to the user',
    schema: z.object({
      message: z.string().describe('Final message to display'),
    }),
    tags: ['system'],
    terminal: true,
    execute: ({ message }) => {
      console.log(`✅ ${message}`);
      return message;
    },
  });
}
