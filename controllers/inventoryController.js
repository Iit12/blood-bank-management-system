const pool = require('../config/db');

exports.getInventory = async (req, res) => {
  try {
    const [stock] = await pool.query('SELECT * FROM blood_stock ORDER BY expiry_date ASC');
    res.json(stock);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addBloodUnit = async (req, res) => {
  const { blood_group, quantity_ml = 350, collection_date } = req.body;
  
  if (!blood_group || !collection_date) {
    return res.status(400).json({ message: 'Blood group and collection date are required' });
  }

  const expiry_date = new Date(collection_date);
  expiry_date.setDate(expiry_date.getDate() + 42); // 42 days shelf life

  const bag_id = `BAG-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

  try {
    await pool.query(
      `INSERT INTO blood_stock 
       (bag_id, blood_group, quantity_ml, collection_date, expiry_date, status) 
       VALUES (?, ?, ?, ?, ?, 'Available')`,
      [bag_id, blood_group, quantity_ml, collection_date, expiry_date.toISOString().split('T')[0]]
    );
    res.status(201).json({ message: 'Blood unit added successfully', bag_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add blood unit' });
  }
};