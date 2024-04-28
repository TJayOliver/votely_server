class AdministratorController {

    constructor (service) {
        this.service = service;
    }

    async createAdmin (req, res) {
        const { username, password } = req.body;
        try {
            const credentials = { username, password };
            const admin = await this.service.createAdminService(credentials);
            if (admin.error) return res.status(409).json( { error : admin.error } );
            return res.status(201).json( { message : 'Success', admin }); 
        } catch (error) {
            console.error('create admin {controller}:', error.message);
            return res.status(500).json( { message : 'Internal Server Error'} );
        }
    }

    async readAdmin (req, res) {
        try {
            const admin = await this.service.readAdminService()
            return res.status(201).json( { message : 'Success', admin });
        } catch (error) {
            console.error('read admin {controller}:', error.message);
            return res.status(500).json( { message : 'Internal Server Error'} );
        }
    }

    async deleteAdmin (req, res) {
        const { id } = req.params;
        try {
            const admin = await this.service.deleteAdminService(id);
            if (admin.error) return res.status(409).json( { error : admin.error } );
            return res.status(201).json( { message : 'Success', admin });
        } catch (error) {
            console.error('delete admin {controller}:', error.message);
            return res.status(500).json( { message : 'Internal Server Error'} );
        }
    }

    async signInAdmin (req, res) {
        const { username, password } = req.body;
        try {
            const credentials = { username, password };
            const admin = await this.service.signInAdminService(credentials);
            if (admin.error) return res.status(409).json( { error : admin.error } );
            return res.status(201).json( { message : 'Success', admin } );
        } catch (error) {
            console.error('sign in admin {controller}:', error.message);
        }
    }
};

export default AdministratorController;