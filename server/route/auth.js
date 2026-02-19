import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import pool from "../config/db.js";
import jwt from "jsonwebtoken";
import admin from "../firebaseAdmin.js";


router.post("/register", async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

    const userExists = await pool.query(
      "SELECT id FROM subledger WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(409).json({
        status: "error",
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO subledger
       (name, email, phone, password, created_at, is_active)
       VALUES ($1, $2, $3, $4, NOW(), 'Y')`,
      [name, email, phone, hashedPassword]
    );

    return res.status(201).json({
      status: "success",
      message: "Registration successful",
    });
  } catch (err) {
    next(err);
  }
});






// router.post("/login", async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         status: "error",
//         message: "All fields are required",
//       });
//     }

//     const user = await pool.query(
//       "SELECT * FROM subledger WHERE email = $1 AND is_active = 'Y'",
//       [email]
//     );

//     if (user.rows.length === 0) {
//       return res.status(401).json({
//         status: "error",
//         message: "Invalid email or password",
//       });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.rows[0].password);

//     if (!passwordMatch) {
//       return res.status(401).json({
//         status: "error",
//         message: "Invalid email or password",
//       });
//     }

//     console.log(user.rows[0]);


//     return res.status(200).json({
//       status: "success",
//       message: "Login successful",
//       data: {
//         id: user.rows[0].id,
//         name: user.rows[0].name,
//         email: user.rows[0].email,
//         phone: user.rows[0].phone
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// });


router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

    const user = await pool.query(
      "SELECT * FROM subledger WHERE email = $1 AND is_active = 'Y'",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.rows[0].password);

    if (!passwordMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    // 🔐 CREATE JWT TOKEN
    const token = jwt.sign(
      {
        id: user.rows[0].id,
        email: user.rows[0].email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      token, // 👈 SEND TOKEN TO FRONTEND
      user: {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        phone: user.rows[0].phone,
      },
    });

  } catch (err) {
    next(err);
  }
});



router.post("/verify", async (req, res, next) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        status: "error",
        message: "Missing Firebase token",
      });
    }

    // Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(idToken);

    const phone = decoded.phone_number;

    if (!phone) {
      return res.status(400).json({
        status: "error",
        message: "Phone number not found",
      });
    }

    // Check user by phone
    let user = await pool.query(
      "SELECT * FROM subledger WHERE phone=$1",
      [phone]
    );

    // Create user if not exists
    if (!user.rows.length) {
      user = await pool.query(
        `INSERT INTO subledger (phone, created_at, is_active)
         VALUES ($1, NOW(), 'Y')
         RETURNING *`,
        [phone]
      );
    }

    const userData = user.rows[0];

    // Create JWT (same as email login)
    const token = jwt.sign(
      {
        id: userData.id,
        phone: userData.phone,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      status: "success",
      token,
      user: {
        id: userData.id,
        phone: userData.phone,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({
      status: "error",
      message: "OTP verification failed",
    });
  }
});



export default router;
