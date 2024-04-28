import express from 'express';
import { dependency } from '../setting/admin.config.js';

const { controller } = dependency();

const adminRouter = express.Router();

adminRouter.get('/admin', 
    async (req, res) => controller.readAdmin(req, res)
);

adminRouter.post('/admin/signin', 
    async (req, res) => controller.signInAdmin(req, res)
);

adminRouter.post('/admin/create', 
    async (req, res) => controller.createAdmin(req, res)
);

adminRouter.delete('/admin/delete/:id', 
    async (req, res) => controller.deleteAdmin(req, res)
);

export default adminRouter;