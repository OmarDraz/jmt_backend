// patientsController.js

const express = require('express');
const bodyParser = require('body-parser');
const Patient = require('../models/patientModel');

const router = express.Router();
router.use(bodyParser.json());

// Get all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.getAllPatients();
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get a single patient by ID
router.get('/:id', async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.getPatientById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// // Update a patient by ID
// router.put('/:id', async (req, res) => {
//   try {
//     const patientId = req.params.id;
//     const { name, age } = req.body;
//     await Patient.updatePatient(patientId, { name, age });
//     res.json({ message: 'Patient updated successfully' });
//   } catch (error) {
//     console.error('Error updating patient:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Delete a patient by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const patientId = req.params.id;
//     await Patient.deletePatient(patientId);
//     res.json({ message: 'Patient deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting patient:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

module.exports = router;
