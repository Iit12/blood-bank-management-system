const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes with absolute relative paths
const authRoutes = require('./authRoutes');
const donorRoutes = require('./donorRoutes');
const inventoryRoutes = require('./inventoryRoutes');
const requestRoutes = require('./requestRoutes');
const issuanceRoutes = require('./issuanceRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/issue', issuanceRoutes);

app.get('/', (req, res) => {
  res.send('BBMS Backend is Running Successfully 🩸');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});