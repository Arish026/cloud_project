# MUHASIB: Charcoal Edition - Project Documentation
**Professional Islamic Finance & Zakat Management System**

---

## 1. Executive Overview
MUHASIB (The Auditor) is a next-generation Zakat management platform designed for the modern Ummah. It combines traditional Shariah principles with cutting-edge technology: **Google Gemini AI** for real-time market grounding and **AWS RDS** for enterprise-grade financial persistence.

### Project Status: **LIVE & VERIFIED**
- **Database Connectivity**: Confirmed via EC2 Terminal.
- **Persistence**: Active MySQL instance on AWS RDS.
- **AI Integration**: Gemini 3 Flash for live Gold Rate retrieval.

---

## 2. Technical Architecture (AWS Cloud)

```text
[ TIER 1: FRONTEND ] (AWS EC2 / S3)
   - React 19 SPA + Tailwind CSS
   - Gemini API Client (Market Grounding)

          | (RESTful HTTPS / JSON)
          v

[ TIER 2: BACKEND ] (Node.js Express)
   - Connection Pooling via mysql2/promise
   - Port 3000 (Internal)

          | (Private VPC - Port 3306)
          v

[ TIER 3: DATABASE ] (AWS RDS MySQL)
   - Schema: 'muhasib_audit'
   - Table: 'zakat_history'
```

---

## 3. Data Integrity & Verification (Audit Trail)

As of the latest deployment, the system successfully maintains a cryptographically timestamped record of Zakat calculations.

### Verified Database State (Terminal Proof):
The following data was verified directly on the AWS RDS instance via the EC2 terminal:

```sql
mysql> SELECT * FROM zakat_history;
+----+---------------------+---------------+-----------------+-----------+---------------+-------------+
| id | timestamp           | wealth_amount | nisab_threshold | zakat_due | currency_code | is_eligible |
+----+---------------------+---------------+-----------------+-----------+---------------+-------------+
|  1 | 2026-01-07 12:42:11 |     500000.00 |       250000.00 |  12500.00 | PKR           |           1 |
+----+---------------------+---------------+-----------------+-----------+---------------+-------------+
```

---

## 4. Deployment Check-list for Final Submission

1. **Security Groups**: 
   - RDS allows Inbound 3306 from EC2 Private IP.
   - EC2 allows Inbound 80 (Nginx) and 443 (SSL).
2. **Environment**:
   - `RDS_HOSTNAME`, `RDS_PASSWORD`, and `API_KEY` are configured as environment variables.
3. **Frontend-Backend Bridge**:
   - Nginx handles `/api` proxying to `localhost:3000`.

---
*Verified and Documented for the MUHASIB Project - 2024/25*
