import { executeQuery } from '../../../configurations/mysql.config.js';

class AdministratorDatabase {

    async createAdmin (credentials) {
        try {
           const query = 'INSERT INTO administrator (id, username, password) VALUES (?,?, ?)';
           const parameter = [credentials.id, credentials.username, credentials.password];
           const admin = await executeQuery(query, parameter);
           return admin 
        } catch (error) {
            throw error;
        }
    }

    async readAdmin () {
        try {
            const query = `SELECT * FROM administrator`;
            const admin = await executeQuery(query);
            return admin;
        } catch (error) {
            throw error;
        }
    }

    async deleteAdmin (credentials) {
        try {
            const query = 'DELETE FROM administrator WHERE id=?';
            const parameter = [credentials.id];
            const admin = await executeQuery(query, parameter);
            return admin;
        } catch (error) {
            throw error;
        }
    }

    async getAdminByID (id) {
        try {
            const query = 'SELECT id FROM administrator WHERE id = ?';
            const parameter = [id];
            const admin = await executeQuery(query, parameter);
            return admin;
        } catch (error) {
            throw error;
        }
    }

    async getAdminByUsername (username) {
        try {
            const query = 'SELECT * FROM administrator WHERE username = ?';
            const parameter = [username];
            const admin = await executeQuery(query, parameter);
            return admin;
        } catch (error) {
            throw error;
        }
    }
}

export default AdministratorDatabase;