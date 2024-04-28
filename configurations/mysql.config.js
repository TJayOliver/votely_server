import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export const executeQuery = async (query, parameter = []) => {
  const connection = await connectToDatabase.getConnection();
  try {
    const [data] = await connection.execute(query, parameter);
    return data;
  } catch (error) {
    console.error("Error connecting to database", error.message);
    throw error.message;
  } finally {
    connection.release();
  }
};
