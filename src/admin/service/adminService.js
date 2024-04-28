import bcrypt from 'bcrypt';
import { v4 as id } from 'uuid';


class AdministratorService {

    constructor (model) {
        this.model = model;
    }

    async createAdminService (credentials) {
        const saltRounds = 10;
        try {
            const checkUsername = await this.model.getAdminByUsernameModel(credentials.username);
            if ( checkUsername.length ) return { error : 'Username exists' };
            if ( credentials.password.length < 6 ) return { error : 'Password must be more than 5 characters' };
            const passwordHash =  await bcrypt.hash(credentials.password, saltRounds);
            const details = {
                id : id(),
                username : credentials.username,
                password : passwordHash
            }
            const admin = await this.model.createAdminModel(details);
            return admin;
        } catch (error) {
            console.error('create admin {service}:', error.message);
        }
    }

    async readAdminService () {
        try {
            const admin = await this.model.readAdminModel()
            return admin;
        } catch (error) {
            console.error('read admin {service}:', error.message)
        }
    }

    async deleteAdminService (id) {
        try {
            const checkID = await this.model.getAdminByIDModel(id);
            if ( !checkID.length ) return { error : 'User does not exist' };
            const admin = await this.model.deleteAdminModel(credentials)
            return admin;
        } catch (error) {
            console.error('delete admin {service}:', error.message)
        }
    }

    async signInAdminService (credentials) {
        try {
            const admin = await this.model.getAdminByUsernameModel(credentials.username);
            if (admin) {
                const hashedPassword = admin[0].password;
                const verifyPassword = await bcrypt.compare(credentials.password, hashedPassword);
                if (verifyPassword) return 'Logged In'; 
                return { error : 'Incorrect Password' } 
            } else {
                return { error : 'Username is Incorrect' }
            }
        } catch (error) {
            console.error('sign in admin {service}:', error.message);
        }
    }
};

export default AdministratorService;