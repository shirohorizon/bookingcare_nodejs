
import { getUserByEmail, getRoles } from '../services/authService';


const checkDuplicateEmail = async (req, res, next) => {
    const { email } = req.body
    // check Email
    try {
        const user = await getUserByEmail(email)
        if (user) {
            res.status(400).json({
                msg: "Failed! Email is already in use!"
            })
            return
        }
        next()
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
};

const checkRolesExisted = (req, res, next) => {
    const { role } = req.body
    console.log(role);
    if (role) {
        const roles = getRoles()
        if (roles) {
            const isRoleExisted = roles.includes(role)
            if (!isRoleExisted) {
                res.status(400).json({
                    msg: "Failed! Role does not exist = " + role
                })
                return
            }
        }
        return
    }

    next()
};

const verifySignUp = {
    checkDuplicateEmail,
    checkRolesExisted
};

export default verifySignUp