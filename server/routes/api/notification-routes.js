const express = require('express');
const router = express.Router();
const { Notification } = require('../../models');

// Get all notifications for a user (expects userId as query param or from auth middleware)
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || req.user?.id;
    if (!userId) return res.status(400).json({ message: 'User ID required' });
    const notifications = await Notification.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });
    res.json(notifications);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a notification
router.post('/', async (req, res) => {
  try {
    const { userId, type, message } = req.body;
    if (!userId || !type || !message) {
      return res.status(400).json({ message: 'userId, type, and message are required' });
    }
    const notification = await Notification.create({ userId, type, message });
    res.status(201).json(notification);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Mark a notification as read
router.put('/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    notification.isRead = true;
    await notification.save();
    res.json({ message: 'Notification marked as read' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a notification
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Notification.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Notification not found' });
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router; 