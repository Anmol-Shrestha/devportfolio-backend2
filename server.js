const express = require('express');
const cors = require('cors');
const path = require('path');
const { bundleMDX } = require('mdx-bundler');
const esbuild = require('esbuild');
const app = express();


// --- 1. PORT ---
const PORT = process.env.PORT || 3001;

// --- 1. CORS Configuration ---

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const corsOptions = {
  origin: FRONTEND_URL,
  methods: 'POST',
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // Middleware to parse JSON body with increased limit for long MDX


// --- 2. MDX Compilation Logic ---
async function compileMdx(source) {

  process.env.ESBUILD_BINARY_PATH = esbuild.esbuildPath;

  try {
    const { code, frontmatter } = await bundleMDX({
      source,
      // Optional plugins for GitHub-flavored Markdown, tables, etc.
      // remarkPlugins: [require('remark-gfm')],
    });

    console.log('✅ MDX compiled successfully.');
    console.log('🧾 Frontmatter:', frontmatter);
    console.log('📦 Code preview:', code.slice(0, 120));

    return { code, frontmatter };
  } catch (error) {
    console.error('❌ MDX Compilation Error:', error);
    throw new Error('Failed to compile MDX.');
  }
}
// --- 3. The API Endpoint ---
app.post('/api/compile-mdx', async (req, res) => {
    // The raw MDX string comes from the request body, which was sent from your fetchProject
    const { mdxContent } = req.body;

    if (!mdxContent) {
        return res.status(400).json({ error: 'mdxContent field is required in the request body.' });
    }

    console.log(`Received ${mdxContent.length} characters of MDX content for compilation.`);

    try {
        const { code, frontmatter } = await compileMdx(mdxContent);
        
        // Success: Send the compiled JS code and frontmatter back to the frontend
        res.json({ code, frontmatter });
    } catch (error) {
        // Handle compilation errors
        res.status(500).json({ 
            error: 'Compilation failed', 
            details: error.message 
        });
    }
});

// --- 4. Server Start ---
app.listen(PORT, () => {
    console.log(`🚀 MDX Compiler server running on ${PORT}`);
    console.log(`   CORS configured for frontend at ${corsOptions.origin}`);
});
