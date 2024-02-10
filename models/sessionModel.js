// models/sessionModel.js
var db = require('../config/db');

class Session {
  constructor({
    id,
    patient_id,
    doctor_id,
    game_id,
    start_angle,
    desired_angle,
    time_taken,
    rra,
    rra_user,
    score,
    scheduled_at,
  }) {
    this.id = id;
    this.patient_id = patient_id;
    this.doctor_id = doctor_id;
    this.game_id = game_id;
    this.start_angle = start_angle;
    this.desired_angle = desired_angle;
    this.time_taken = time_taken;
    this.rra = rra;
    this.rra_user = rra_user;
    this.score = score;
    this.scheduled_at = scheduled_at;
  }

  static async createSession({
    patient_id,
    doctor_id,
    game_id,
    start_angle,
    desired_angle,
    time_taken,
    rra,
    rra_user,
    score,
  }) {
    try {
      const [result] = await db.execute(
        'INSERT INTO sessions (patient_id, doctor_id, game_id, start_angle, desired_angle, time_taken, rra, rra_user, score) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [patient_id, doctor_id, game_id, start_angle, desired_angle, time_taken, rra, rra_user, score]
      );

      const session_id = result.insertId;
      const scheduled_at = new Date(); // You can customize this as needed

      return new Session({
        id: session_id,
        patient_id,
        doctor_id,
        game_id,
        start_angle,
        desired_angle,
        time_taken,
        rra,
        rra_user,
        score,
        scheduled_at,
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error creating session in the database');
    }
  }

  static async getSessionById(sessionId) {
    try {
      const [rows] = await db.execute('SELECT * FROM sessions WHERE id = ?', [sessionId]);
      if (rows.length > 0) {
        const sessionData = rows[0];
        return new Session(sessionData);
      }
      return null; // No session found with the provided ID
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching session from the database');
    }
  }

  static async updateSession({
    sessionId,
    time_taken,
    rra,
    rra_user,
    score,
  }) {
    try {
      await db.execute(
        'UPDATE sessions SET time_taken = ?, rra = ?, rra_user = ?, score = ? WHERE id = ?',
        [time_taken, rra, rra_user, score, sessionId]
      );

      const updatedSession = await Session.getSessionById(sessionId);
      return updatedSession;
    } catch (error) {
      console.error(error);
      throw new Error('Error updating session in the database');
    }
  }

  static async deleteSession(sessionId) {
    try {
      await db.execute('DELETE FROM sessions WHERE id = ?', [sessionId]);
      return true; // Deletion successful
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting session from the database');
    }
  }
}

module.exports = Session;
