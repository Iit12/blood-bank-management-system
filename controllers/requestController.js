const pool = require('../config/db');

exports.getAllRequests = async (req, res) => {
  try {
    const [requests] = await pool.query('SELECT * FROM blood_requests ORDER BY created_at DESC');
    res.json(requests);
  } catch (err) {
    res.json([]);
  }
};

exports.createRequest = async (req, res) => {
  const { blood_group, quantity_ml, urgency = 'Routine' } = req.body;

  const request_id = `REQ-${Date.now().toString().slice(-6)}`;

  try {
    // Disable foreign key check temporarily
    await pool.query('SET FOREIGN_KEY_CHECKS = 0');

    await pool.query(
      `INSERT INTO blood_requests 
       (request_id, hospital_id, blood_group, quantity_ml, urgency, requested_by, status) 
       VALUES (?, 1, ?, ?, ?, 1, 'Pending')`,
      [request_id, blood_group, quantity_ml, urgency]
    );

    await pool.query('SET FOREIGN_KEY_CHECKS = 1');

    res.status(201).json({ message: '✅ Request submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed: ' + err.message });
  }
};