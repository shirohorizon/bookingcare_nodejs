import { Router } from 'express'
import { deleteUsers, getUser, getUsers } from '../app/controllers/userController'
import { authjwt, verifyUser } from '../app/middleware'


const userRoutes = Router()

// get user profile
userRoutes.get('/api/user/profile', [authjwt.verifyToken, authjwt.isUserOrAdmin], getUser)
// get all users
userRoutes.get('/api/user', [authjwt.verifyToken, authjwt.isAdmin], getUsers)
// add user
userRoutes.post('/api/user')
// edit user
userRoutes.put('/api/user')
// delete user
userRoutes.delete('/api/user', [authjwt.verifyToken, authjwt.isAdmin, verifyUser.checkIdsExist], deleteUsers)

export default userRoutes

