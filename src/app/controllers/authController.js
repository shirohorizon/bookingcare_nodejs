import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import * as config from '../../config/authConfig'
import { createUser } from '../services/userService'
import { getRoleByKey } from '../services/authService'

const salt = bcrypt.genSaltSync(10);

const signup = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await createUser({
            email,
            password: bcrypt.hashSync(password, salt),
            roleId: "R3"
        })

        if (!user) {
            res.status(400).json({
                msg: 'Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.'
            })
        }

        return res.status(200).json({
            msg: "User was registered successfully!"
        })

    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}

const signin = async (req, res) => {
    const { user } = req.body

    const { secret, expiresIn } = config
    try {
        const role = await getRoleByKey(user.roleId)
        if (!role) {
            return res.status(404).json({
                data: {
                    errorMsg: "Role Not found."
                }
            })
        }

        const token = await jwt.sign({ id: user.id }, secret, {
            algorithm: 'HS256',
            expiresIn
        })

        return res.status(200).json({
            data: {
                errorMsg: '',
                msg: '',
                current_user: { ...user, password: '', role: role },
                jwt: token
            }
        })

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }


}


export { signup, signin }