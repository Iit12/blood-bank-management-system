const pool = require('../config/db');

const compatibilityMatrix = {
  'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+']
};

exports.issueBlood = async (req, res) => {
  const { request_id, bag_id } = req.body;

  try {
    const [requests] = await pool.query('SELECT * FROM blood_requests WHERE id = ?', [request_id]);
    const [bags] = await pool.query('SELECT * FROM blood_stock WHERE bag_id = ? AND status = "Available"', [bag_id]);

    if (requests.length === 0 || bags.length === 0) {
      return res.status(400).json({ message: 'Invalid request or blood bag' });
    }

    const request = requests[0];
    const bag = bags[0];

    if (!compatibilityMatrix[bag.blood_group]?.includes(request.blood_group)) {
      return res.status(400).json({ message: 'Blood group compatibility check failed!' });
    }

    // Issue the blood
    await pool.query(
      'INSERT INTO issued_blood (request_id, bag_id, issued_by) VALUES (?, ?, ?)',
      [request_id, bag_id, req.user.id]
    );

    await pool.query('UPDATE blood_stock SET status = "Issued" WHERE bag_id = ?', [bag_id]);
    await pool.query('UPDATE blood_requests SET status = "Issued" WHERE id = ?', [request_id]);

    res.json({ message: '✅ Blood issued successfully with compatibility check!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to issue blood' });
  }
};