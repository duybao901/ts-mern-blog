import express from 'express'
import authController from '../controllers/authController'

const router = express.Router()

router.post('/register', authController.register)
router.post('/active', authController.activeAccount)
router.post('/login', authController.login)
router.post('/login_google', authController.googleLogin)
router.post('/login_facebook', authController.facebookLogin)
router.get('/refresh_token', authController.refreshToken)
router.get('/logout', authController.logout)


export default router