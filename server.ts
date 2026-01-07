
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Note: On your EC2, ensure you run: npm install mysql2
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();
app.use(cors() as any);
app.use(express.json() as any);

// AWS RDS CONFIGURATION
// Use the exact values you used in your terminal test
const dbConfig = {
  host: process.env.RDS_HOSTNAME || 'YOUR_RDS_ENDPOINT', 
  user: process.env.RDS_USERNAME || 'admin',
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME || 'muhasib_audit',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Singleton connection pool for better performance on EC2
const pool = mysql.createPool(dbConfig);

// ENDPOINT: Save calculation to RDS
app.post('/api/calculations', async (req, res) => {
  const { earnings, nisab, zakatAmount, currency, isApplicable } = req.body;
  
  console.log(`[RDS WRITE] New Audit Entry: ${zakatAmount} ${currency}`);
  
  try {
    const [result] = await pool.execute(
      'INSERT INTO zakat_history (wealth_amount, nisab_threshold, zakat_due, currency_code, is_eligible) VALUES (?, ?, ?, ?, ?)',
      [earnings, nisab, zakatAmount, currency, isApplicable ? 1 : 0]
    );
    res.status(201).json({ status: 'success', id: (result as any).insertId });
  } catch (error) {
    console.error("RDS Insert Failed:", error);
    res.status(500).json({ error: 'Failed to write to RDS' });
  }
});

// ENDPOINT: Fetch history from RDS
app.get('/api/calculations', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM zakat_history ORDER BY timestamp DESC LIMIT 50');
    res.json(rows);
  } catch (error) {
    console.error("RDS Fetch Failed:", error);
    res.status(500).json({ error: 'Could not connect to RDS' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 MUHASIB PRODUCTION BACKEND READY`);
  console.log(`-----------------------------------`);
  console.log(`PORT: ${PORT}`);
  console.log(`RDS TARGET: ${dbConfig.host}`);
  console.log(`DATABASE: ${dbConfig.database}\n`);
});
