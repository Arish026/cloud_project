
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();
// Using 'any' cast for middleware to bypass version-specific type mismatches often found in EC2 environments
app.use(cors() as any);
app.use(express.json() as any);

// AWS RDS CONFIGURATION
const dbConfig = {
  host: process.env.RDS_HOSTNAME || 'database-1.cyzque8wabhy.us-east-1.rds.amazonaws.com', 
  user: process.env.RDS_USERNAME || 'admin',
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME || 'muhasib_audit',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Singleton connection pool
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
