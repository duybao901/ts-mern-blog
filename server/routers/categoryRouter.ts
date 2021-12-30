import express from 'express'

const router = express.Router()
import { auth } from '../middleware/auth'
import CategoryController from '../controllers/categoryController'

router.route('/category')
    .post(auth, CategoryController.createCategory)
    .get(CategoryController.getCategorys)

router.route('/category/:id')
    .patch(auth, CategoryController.updateCategory)
    .delete(auth, CategoryController.deleteCategory)

export default router