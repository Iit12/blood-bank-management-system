const pool = require('../config/db');

exports.getAllDonors = async (req, res) => {
  try {
    const [donors] = await pool.query('SELECT * FROM donors ORDER BY created_at DESC');
    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createDonor = async (req, res) => {
  const { full_name, age, gender, blood_group, phone, email, address, medical_history } = req.body;

  if (age < 18) return res.status(400).json({ message: 'Age must be 18 or above' });

  try {
    const donor_id = `DON-${Date.now().toString().slice(-6)}`;
    
    const [result] = await pool.query(
      'INSERT INTO donors (donor_id, full_name, age, gender, blood_group, phone, email, address, medical_history) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [donor_id, full_name, age, gender, blood_group, phone, email, address, medical_history]
    );

    res.status(201).json({ message: 'Donor added successfully', donor_id });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Phone or email already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};