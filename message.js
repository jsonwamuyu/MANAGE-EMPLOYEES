const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;


app.use(express.static('public'));


app.get('/users', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/employees');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});


app.get('/messages', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        res.json(response.data.map(post => ({
            sender: `User ${post.userId}`,
            recipient: `User ${(post.userId % 10) + 1}`, 
            message: post.body,
            timestamp: new Date().toISOString()
        })));
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
