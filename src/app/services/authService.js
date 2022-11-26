import { User, Allcode } from '../models'

const getUserByEmail = async (email, raw) => {
    try {
        return await User.findOne({
            where: {
                email
            },
            raw: raw
        })
    } catch (error) {
        return null
    }
}

const getUserByPk = async pk => {
    try {
        return await User.findByPk(pk)
    } catch (error) {
        return null
    }
}

const getRoles = async () => {
    try {
        return Allcode.findAll({
            where: {
                type: 'role'
            }
        })
    } catch (error) {
        return null
    }
}

const getRoleByKey = async key => {
    try {
        return await Allcode.findOne({
            where: {
                type: 'ROLE',
                key: key
            }
        })
    } catch (error) {
        return null
    }
}

export {
    getUserByEmail,
    getUserByPk,
    getRoleByKey,
    getRoles
}


