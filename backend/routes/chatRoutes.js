const express = require('express');
const { sendMessage, clearChat } = require('../controller/chatController');

const router = express.Router();

// Send message to AI
router.post('/message', sendMessage);

// Clear chat history
router.post('/clear', clearChat);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Chat API is running' });
});

module.exports = router;