import { Router } from 'express'
import { verifySignUp, verifySignIn } from '../app/middleware'
import { signin, signup } from '../app/controllers/authController'

const authRoutes = Router()

authRoutes.post('/api/auth/signup', [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted], signup)
authRoutes.post('/api/auth/signin', [verifySignIn.checkUserExisted, verifySignIn.checkPasswordInvalid], signin)

export default authRoutes