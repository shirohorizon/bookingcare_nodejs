import { getUserByEmail } from "../services/authService"
import bcrypt from 'bcryptjs'

const checkUserExisted = async (req, res, next) => {
    console.log(req.body);
    const { email } = req.body
    // check Email
    try {
        const user = await getUserByEmail(email, true)
        if (!user) {
            res.status(404).json({
                data: {
                    errorMsg: "User Not found!"
                }
            })
            return
        }
        req.body.user = user
        next()
        return
    } catch (error) {
        return res.status(500).json({
            data: {
                errorMsg: error.message
            }
        })
    }
}

const checkPasswordInvalid = async (req, res, next) => {
    const { password, user } = req.body
    try {
        const passwordIsValid = await bcrypt.compareSync(
            password,
            user.password
        )

        if (!passwordIsValid) {
            return res.status(401).json({
                data: {
                    errorMsg: "Password Invalid!"
                }
            });
        }
        next()
    } catch (error) {
        return res.status(500).json({
            data: {
                errorMsg: error.message
            }
        })
    }
}

const verifySignIn = {
    checkPasswordInvalid,
    checkUserExisted
}

export default verifySignIn