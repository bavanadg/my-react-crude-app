"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Set up the PostgreSQL connection pool
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'database-1.cnwdmgl8rph0.ap-southeast-2.rds.amazonaws.com',
    database: 'postgres',
    password: 'AWSMaster',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});
app.use(express_1.default.json());
// Route to get all records for a person based on their ID
// app.get('/person/:id', async (req, res) => {
//  try {
//    const { id } = req.params;
//    const query = `SELECT * FROM person WHERE id = ${id}`;
//    console.log(query);
//    const result = await pool.query(query, [id]);
//    res.status(200).json(result.rows);
//  } catch (error) {
//    console.error('Error fetching person:', error);
//    res.status(500).json({ error: 'An error occurred while fetching the person.' });
//  }
// });
//
app.get('/person/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM person WHERE id = $1'; // Correct query with placeholder
        const result = await pool.query(query, [id]); // Pass the parameter array
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error('Error fetching person:', error);
        res.status(500).json({ error: 'An error occurred while fetching the person.' });
    }
});
app.post('/person', async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber } = req.body;
        const query = 'INSERT INTO person (first_name, last_name, phone_number) VALUES ($1, $2, $3) RETURNING *';
        const result = await pool.query(query, [firstName, lastName, phoneNumber]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error creating person:', error);
        res.status(500).json({ error: 'An error occurred while creating the person.' });
    }
});
app.put('/person/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, phoneNumber } = req.body;
        const query = 'UPDATE person SET first_name = $1, last_name = $2, phone_number = $3 WHERE id = $4 RETURNING *';
        const result = await pool.query(query, [firstName, lastName, phoneNumber, id]);
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error updating person:', error);
        res.status(500).json({ error: 'An error occurred while updating the person.' });
    }
});
app.delete('/person/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM person WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error deleting person:', error);
        res.status(500).json({ error: 'An error occurred while deleting the person.' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
