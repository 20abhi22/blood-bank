import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Get all blood requests
router.get("/all", async (req, res) => {
  let client;
  
  try {
    client = await pool.connect();
    
    console.log("Attempting to fetch blood requests...");
    
    const result = await client.query(
      `SELECT 
        br.*,
        bg.name as blood_group_name
       FROM blood_requests br
       LEFT JOIN bloodgroup bg ON br.blood_group_id = bg.id
       ORDER BY br.created_at DESC`
    );

    console.log("Successfully fetched requests, count:", result.rows.length);
    if (result.rows.length > 0) {
      console.log("Sample data:", result.rows[0]);
    }

    res.json(result.rows);

  } catch (err) {
    console.error("Get all requests error:", err);
    console.error("Error message:", err.message);
    res.status(500).json({ 
      message: "Failed to fetch requests", 
      error: err.message
    });
  } finally {
    if (client) {
      client.release();
    }
  }
});

// Update request status
router.put("/status/:id", async (req, res) => {
  let client;
  const { id } = req.params;
  const { status } = req.body;
  
  try {
    client = await pool.connect();
    
    const requestId = parseInt(id);
    
    if (isNaN(requestId)) {
      return res.status(400).json({ message: "Invalid request ID" });
    }
    
    console.log("Updating request status:", { requestId, status });
    
    // Update with fulfilled_at timestamp if status is fulfilled
    let query, values;
    if (status === 'fulfilled') {
      query = 'UPDATE blood_requests SET status = $1, fulfilled_at = NOW() WHERE id = $2 RETURNING *';
      values = [status, requestId];
    } else {
      query = 'UPDATE blood_requests SET status = $1 WHERE id = $2 RETURNING *';
      values = [status, requestId];
    }
    
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error("Update request status error:", err);
    res.status(500).json({ 
      message: "Failed to update request status", 
      error: err.message 
    });
  } finally {
    if (client) {
      client.release();
    }
  }
});

export default router;