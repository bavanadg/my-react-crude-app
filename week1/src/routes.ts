import express from 'express';
import pool from './db';

const router = express.Router();

// Get all persons
router.get('/persons', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM person');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Get a single person by ID
router.get('/persons/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM person WHERE id = $1', [id]);
    if (rows.length === 0) {
      res.status(404).send('Person not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Create a new person
router.post('/persons', async (req, res) => {
  const { first_name, last_name, phone_number } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO person (first_name, last_name, phone_number) VALUES ($1, $2, $3) RETURNING *',
      [first_name, last_name, phone_number]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Update a person by ID
router.put('/persons/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, phone_number } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE person SET first_name = $1, last_name = $2, phone_number = $3 WHERE id = $4 RETURNING *',
      [first_name, last_name, phone_number, id]
    );
    if (rows.length === 0) {
      res.status(404).send('Person not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Delete a person by ID
router.delete('/persons/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('DELETE FROM person WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      res.status(404).send('Person not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

export default router;
