const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cron = require('node-cron');   // ← Add this

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/authRoutes');
const donorRoutes = require('./routes/donorRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const requestRoutes = require('./routes/requestRoutes');
const issuanceRoutes = require('./routes/issuanceRoutes');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/issue', issuanceRoutes);

app.get('/', (req, res) => {
  res.send('BBMS Backend is Running Successfully 🩸');
});

// ====================== CRON JOB FOR EXPIRY CHECK ======================
cron.schedule('0 0 * * *', async () => {   // Runs every day at midnight
  try {
    const pool = require('./config/db');
    const [result] = await pool.query(`
      UPDATE blood_stock 
      SET status = 'Expired' 
      WHERE expiry_date < CURDATE() AND status = 'Available'
    `);
    console.log(`✅ Daily Expiry Check Completed. Updated ${result.affectedRows} bags to Expired.`);
  } catch (err) {
    console.error('❌ Expiry Cron Job Error:', err);
  }
});
// =====================================================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});