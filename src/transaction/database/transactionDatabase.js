import { executeQuery } from "../../../configurations/mysql.config.js";

class TransactionDatabase {
  async createTransaction(details) {
    try {
      const query = `INSERT INTO transaction (transaction_id, reference, amount, candidate_id) VALUES (?,?,?,?)`;
      const parameter = [
        details.transaction_id,
        details.reference,
        details.amount,
        details.candidate_id,
      ];
      const transaction = await executeQuery(query, parameter);
      return transaction;
    } catch (error) {
      throw error;
    }
  }
}

export default TransactionDatabase;
