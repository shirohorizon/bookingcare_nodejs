import { deleteUserByIds, getUserByPk, getAllUser } from '../services/userService'

const getUser = async (req, res) => {
    const id = parseInt(req.query.id)
    try {
        const user = await getUserByPk(id)
        return res.status(200).json({
            user
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }

}

const getUsers = async (req, res) => {
    try {
        const users = await getAllUser()
        return res.status(200).json({
            data: {
                users
            }
        })
    } catch (error) {
        return res.status(500).json({ data: { errorMsg: error.message } })
    }

}

const deleteUsers = async (req, res) => {
    const ids = req.ids
    try {
        await deleteUserByIds(ids)
        return res.status(200).json({
            msg: 'users was deleted  successfully'
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

export {
    deleteUsers,
    getUser,
    getUsers
}