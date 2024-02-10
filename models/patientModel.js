// models/patientModel.js
var db = require('../config/db');

class Patient {
  constructor({ user_id, age }) {
    this.user_id = user_id;
    this.age = age;
  }

  static async createPatient({ user_id, age }) {
    try {
      // Insert a new record in the patients table
      await db.execute('INSERT INTO patients (user_id, age) VALUES (?, ?, ?)', [user_id, age]);

      return true; // Successful creation
    } catch (error) {
      console.error(error);
      throw new Error('Error creating patient in the database');
    }
  }

  static async getAllPatients() {
    try {
      // Query to fetch all patients with their related data from the database using a JOIN operation
      const [patients] = await db.query(`
        SELECT
          patients.id AS patient_id,
          patients.name AS patient_name,
          patients.age AS patient_age,
          users.email AS patient_email,
          users.first_name AS patient_first_name,
          users.last_name AS patient_last_name
        FROM
          patients
        INNER JOIN
          users ON patients.user_id = users.id
      `);
      
      return patients;
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw new Error('Error fetching patients');
    }
  }
}