import express from 'express';
import { setupProxyMiddleware } from './proxy';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Use the proxy middleware for all requests
app.use('/*', setupProxyMiddleware());

// After the proxy middleware, set up the 404 handler for undefined routes
app.all('*', (req, res) => {
    res.status(404).send('The resource you are looking for does not exist.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
