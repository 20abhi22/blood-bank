import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/about", async (req, res) => {
  try {
    const query = `
      SELECT
        (SELECT COUNT(*) FROM donors) AS registered_donors,

        (SELECT COUNT(*) FROM blood_requests WHERE status='fulfilled')
          AS lives_saved,

        (SELECT ROUND(
           AVG(EXTRACT(EPOCH FROM (fulfilled_at - created_at)) / 3600),
           2)
         FROM blood_requests
         WHERE fulfilled_at IS NOT NULL)
          AS avg_response_hours,

        (SELECT ROUND(
           (COUNT(*) FILTER (WHERE status='fulfilled')::float /
            NULLIF(COUNT(*)::float,0)) * 100,
           2)
         FROM blood_requests)
          AS fulfillment_rate;
    `;

    const result = await pool.query(query);

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Stats error" });
  }
});


router.get("/admin", async (req, res) => {
       let client;
  try {
 
    client = await pool.connect();
    
    const [totalDonors, pendingRequest, availableDonors,totalDonations] = await Promise.all([
     client.query(
        'SELECT COUNT(*) FROM donors WHERE status = $1',
        ['A'] // 'A' for approved
      ),
      client.query(
        'SELECT COUNT(*) FROM blood_requests WHERE status = $1',
        ['pending'] // 'P' for pending
      ),
      client.query(
        'SELECT COUNT(*) FROM donors WHERE status = $1 AND available = $2',
        ['A', 'Y'] // 'A' for approved and 'Y' for available
      ),
      client.query(
        'SELECT COUNT(*) FROM blood_requests WHERE status = $1',
        ['fulfiled'] 
      ),
    ]);

    res.json({
      totalDonors: parseInt(totalDonors.rows[0].count),
      pendingRequest: parseInt(pendingRequest.rows[0].count),
      availableDonors: parseInt(availableDonors.rows[0].count),
      totalDonations:parseInt(totalDonations.rows[0].count),
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Stats error" });
  }

 finally {
    if (client) {
      client.release();
    }
  }
});

export default router;
