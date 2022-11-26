import { User } from '../models'
import { getUserByPk } from './authService'

const getAllUser = async () => {
    try {
        return await User.findAll({
            attributes: {
                exclude: ['password']
            }
        })
    } catch (error) {
        return null
    }
}

const createUser = async (user) => {
    try {
        return await User.create(user)
    } catch (error) {
        return null
    }
}

const deleteUserByIds = async ids => {
    ids.forEach(async id => {
        try {
            await User.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            return null
        }
    });
}

export {
    deleteUserByIds,
    createUser,
    getAllUser,
    getUserByPk
}