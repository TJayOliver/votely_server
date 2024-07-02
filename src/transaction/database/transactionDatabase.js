import { executeQuery } from "../../../configurations/mysql.config.js";

class TransactionDatabase {
  async createTransaction(details) {
    try {
      const query = `INSERT INTO transaction (reference_id, receipt_number, amount, candidate_id) VALUES (?,?,?,?)`;
      const parameter = [details.reference_id, details.receipt_number, details.amount, details.candidate_id];
      const transaction = await executeQuery(query, parameter);
      return transaction;
    } catch (error) {
      throw error;
    }
  }

  async getReferenceID(reference_id) {
    try {
      const query = `SELECT reference_id FROM transaction WHERE reference_id=?`;
      const parameter = [reference_id];
      const transaction = await executeQuery(query, parameter);
      return transaction;
    } catch (error) {
      throw error;
    }
  }

  
}

export default TransactionDatabase;
