// proxy-server.mjs
import fetch from 'node-fetch';
import express from 'express';

const app = express();
const port = 3000;

app.use('/', async (req, res) => {
   // proxy-server.mjs
const url = 'https://api.jsonbin.io/b/your-bin-id/latest';

    
    try {
        const response = await fetch(url, {
            headers: {
                'secret-key': 'your-secret-key',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});
