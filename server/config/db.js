import pkg from "pg";
const { Pool } = pkg;

console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("TYPE:", typeof process.env.DB_PASSWORD);


const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("connect", () => {
  console.log("PostgreSQL connected");
});

pool.on("error", (err) => {
  console.error("PostgreSQL error", err);
  process.exit(1);
});

export default pool;
