// controllers/sessionController.js
const express = require('express');
const bodyParser = require('body-parser');
const Session = require('../models/sessionModel');

const router = express.Router();
router.use(bodyParser.json());

router.post('/sessions', async (req, res) => {
  try {
    const {
      patient_id,
      doctor_id,
      game_id,
      start_angle,
      desired_angle,
      time_taken,
      rra,
      rra_user,
      score,
    } = req.body;

    const session = await Session.createSession({
      patient_id,
      doctor_id,
      game_id,
      start_angle,
      desired_angle,
      time_taken,
      rra,
      rra_user,
      score,
    });

    res.status(201).json(session);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/sessions/:sessionId', async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const session = await Session.getSessionById(sessionId);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.status(200).json(session);
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/sessions/:sessionId', async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const {
      time_taken,
      rra,
      rra_user,
      score,
    } = req.body;

    const updatedSession = await Session.updateSession({
      sessionId,
      time_taken,
      rra,
      rra_user,
      score,
    });

    if (!updatedSession) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.status(200).json(updatedSession);
  } catch (error) {
    console.error('Error updating session:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/sessions/:sessionId', async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const result = await Session.deleteSession(sessionId);

    if (!result) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.status(204).end(); // Successful deletion
  } catch (error) {
    console.error('Error deleting session:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
