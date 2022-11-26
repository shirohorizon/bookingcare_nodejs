import { getUserByPK } from "../services/authService"

const checkIdsExist = (req, res, next) => {
    let ids = req.body.ids ? req.body.ids : null

    if (ids && ids !== 1) {
        ids = typeof ids === 'number' ? [ids] : [...ids]
        ids.forEach(async id => {
            const user = await getUserByPK(id)
            if (!user) {
                return res.status(403).json({
                    msg: 'require ids 1'
                })
            }
        })
        req.ids = ids
        next()
        return
    }

    return res.status(403).json({
        msg: 'require ids 2'
    })
}

const verifyUser = {
    checkIdsExist
}

export default verifyUser