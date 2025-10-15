// AI assistant and helper scripts

const fs = require('fs');
const path = require('path');

/**
 * Generate AI-powered code snippet suggestions based on the current file and function context
 * For demo, a static set of helpful snippets is returned
 */
function getAISnippetSuggestions(context) {
    return [
        { title: 'Express Route Template', snippet: "app.get('/api/example', (req, res) => res.json({ message: 'Hello from AI!' }));" },
        { title: 'MongoDB Model Query', snippet: "const result = await Model.find({}).lean();" },
        { title: 'JWT Token Verification Middleware', snippet: "function verifyToken(req, res, next) { /* token validation logic */ next(); }" },
        { title: 'Basic React Component', snippet: "const Component = () => <div>Hello AI FullStack</div>;" }
    ];
}

/**
 * Automatically document API route files with JSDoc style comments
 * Uses simple regex to find routes (for demo only)
 */
function generateAPIDocumentation(apiFilePath) {
    if (!fs.existsSync(apiFilePath)) return '';
    const content = fs.readFileSync(apiFilePath, 'utf-8');
    const routes = content.match(/app\.(get|post|put|delete)\('([^']+)'/g) || [];
    return routes.map(route => `/**\n * API Route: ${route}\n */`).join('\n');
}

module.exports = {
    getAISnippetSuggestions,
    generateAPIDocumentation
};
