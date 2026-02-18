import express from "express";
const router = express.Router();
import pool from "../config/db.js";

const MASTER_TABLES = {
  bloodgroup: "bloodgroup",
  college: "college",
  department: "department",
  year: "year",
}


router.post("/add", async (req, res) => {
  try {
    const { table_name, name } = req.body

    if (!MASTER_TABLES[table_name]) {
      return res.status(400).json({
        status: "error",
        message: "Invalid table name",
      })
    }

    if (!name) {
      return res.status(400).json({
        status: "error",
        message: "Name is required",
      })
    }

    const table = MASTER_TABLES[table_name]

    const query = `
      INSERT INTO ${table} (name, created_at , is_active)
      VALUES ($1, NOW() ,'Y')
      RETURNING *
    `

    const result = await pool.query(query, [name])

    res.status(201).json({
      status: "success",
      data: result.rows[0],
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: "error", message: err.message })
  }
})

router.put("/edit", async (req, res) => {
  try {
    const { table_name, id, name } = req.body

    if (!MASTER_TABLES[table_name]) {
      return res.status(400).json({ message: "Invalid table name" })
    }

    const table = MASTER_TABLES[table_name]

    const result = await pool.query(
      `UPDATE ${table}
       SET name = $1
       WHERE id = $2
       RETURNING *`,
      [name, id]
    )

    res.json({
      status: "success",
      data: result.rows[0],
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete("/delete", async (req, res) => {
  try {
    const { table_name, id } = req.body

    if (!MASTER_TABLES[table_name]) {
      return res.status(400).json({ message: "Invalid table name" })
    }

    const table = MASTER_TABLES[table_name]

    await pool.query(
      `UPDATE ${table}
       SET is_active = 'N'
       WHERE id = $1`,
      [id]
    )

    res.json({
      status: "success",
      message: "Record deleted",
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


router.get("/list/:table_name", async (req, res) => {
  try {
    const { table_name } = req.params

    if (!MASTER_TABLES[table_name]) {
      return res.status(400).json({ message: "Invalid table name" })
    }

    const table = MASTER_TABLES[table_name]

    const result = await pool.query(
      `SELECT * FROM ${table} WHERE is_active = 'Y' ORDER BY id`
    )

    res.json({
      status: "success",
      data: result.rows,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})



export default router;