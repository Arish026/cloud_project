# MUHASIB: Charcoal Edition - Project Documentation
**Professional Islamic Finance & Zakat Management System**

---

## 1. Executive Overview
MUHASIB (The Auditor) is a next-generation Zakat management platform designed for the modern Ummah. It combines traditional Shariah principles with cutting-edge technology: **Google Gemini AI** for real-time market grounding and **AWS RDS** for enterprise-grade financial persistence.

### Project Goals:
- **Accuracy**: Dynamic Nisab calculation based on live gold market rates.
- **Spirituality**: Personalized AI-generated reminders on wealth purification.
- **Security**: 3-Tier architecture ensuring financial data is never exposed client-side.
- **Aesthetics**: A "Charcoal & Emerald" UI optimized for focus and dignity.

---

## 2. Technical Architecture (AWS Cloud)

The system is deployed using a **Three-Tier Architecture** to satisfy security and scalability requirements:

```text
[ TIER 1: FRONTEND ] (AWS EC2 / S3)
   - React 19 SPA
   - Tailwind CSS (Charcoal/Emerald Theme)
   - Gemini API Client (for UI-bound AI logic)

          | (RESTful HTTPS)
          v

[ TIER 2: BACKEND ] (AWS EC2 - Node.js/Express)
   - Middleware for Database Auth
   - Logic for persistent history fetching

          | (Private VPC - Port 3306)
          v

[ TIER 3: DATABASE ] (AWS RDS - MySQL)
   - Encrypted storage for user calculation history
   - Audit logs for financial tracking
```

---

## 3. Feature Breakdown & Visual Walkthrough

### A. The Dashboard (Financial Audit Panel)
**Visual Description:** A deep charcoal-gray canvas featuring high-contrast emerald interactive elements. 
**Feature Logic:** 
- Users input assets in 5 major global currencies.
- Toggle for **Live Gold Rate Tracking**: Queries the live web via Gemini Search to find the exact price per gram of 24K gold on *HamariWeb*.

> **[ Screenshot Placeholder: MAIN_DASHBOARD ]**
> *View: A dark, sleek card with a large numerical input field. The text 'Purify Your Wealth Today' glows in emerald green. A toggle switch is active, showing 'Live Gold-based Nisab: Active'.*

### B. AI-Powered Grounding & Verification
**Visual Description:** Results are accompanied by a "Verified Sources" list.
**Feature Logic:** 
- Uses `googleSearch` tool to prevent AI "hallucinations."
- Provides clickable links to the source of the gold rate, ensuring full transparency for the audit.

### C. Spiritual Purification Notes
**Visual Description:** An emerald-tinted quote box using the *Amiri* Serif font.
**Feature Logic:** 
- Gemini analyzes the final Zakat amount.
- Generates a custom 3-sentence spiritual reminder (e.g., "Your Zakat of 2,500 Rs is a seed for your growth...").

---

## 4. Database Schema (AWS RDS)

The following schema is implemented in the RDS MySQL instance to support the application:

```sql
CREATE TABLE zakat_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    wealth_amount DECIMAL(15, 2),
    nisab_threshold DECIMAL(15, 2),
    zakat_due DECIMAL(15, 2),
    currency_code VARCHAR(10),
    is_eligible BOOLEAN,
    source_url TEXT
);
```

---

## 5. Deployment Guide for AWS

### I. Server Setup (EC2)
1. Launch an Ubuntu instance.
2. Install Nginx: `sudo apt install nginx`
3. Deploy the `dist` folder to `/var/www/html`.

### II. Database Setup (RDS)
1. Create a MySQL instance.
2. Ensure the **Security Group** allows Inbound traffic from the EC2 Instance IP on Port 3306.

### III. Nginx Reverse Proxy
To link the Frontend and the Backend API, use this Nginx block:
```nginx
location /api {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

---
*Created for the MUHASIB Project Proposal - 2024/25*
