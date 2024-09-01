import express from 'express';
import { dependency } from '../settings/category.config.js';

const { controller } = dependency();

const categoryRouter = express.Router();

export default categoryRouter;

categoryRouter.get('/category/:id', 
    async (req, res) => controller.readCategory(req, res)
);

categoryRouter.get('/category/name/:name', 
    async (req, res) => controller.getCategoryByName(req, res)
);

categoryRouter.post('/category/create', 
    async (req, res) => controller.createCategory(req, res)
);

categoryRouter.delete('/category/delete/:category_id', 
    async (req, res) => controller.deleteCategory(req, res)
);
