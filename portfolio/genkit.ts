import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { adminFirestore } from './app/firebaseAdmin';

export const ai = genkit({
  plugins: [
    googleAI(),
  ],
  model: googleAI.model('gemini-1.5-flash'),
});

export const projectAssistant = ai.defineFlow(
  { name: 'projectAssistant', inputSchema: z.string(), outputSchema: z.string() },
  async (prompt) => {
    // Fetch real-time project data for context
    const snapshot = await adminFirestore.collection('projects').orderBy('createdAt', 'desc').limit(10).get();
    const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const context = JSON.stringify(projects);

    const { text } = await ai.generate(
      `You are Sahil's professional portfolio assistant. You are helpful, concise, and tech-savvy.
      Use the following project data to answer the user query accurately. 
      Projects: ${context}
      User Query: ${prompt}`
    );
    return text;
  }
);

export { z };