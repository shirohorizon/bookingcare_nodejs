import jwt from 'jsonwebtoken'
import * as config from '../../config/authConfig'
import { getUserByPk, getRoleByKey } from '../services/authService';

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token']

    if (!token) {
        return res.status(403).json({
            data: {
                errorMsg: "No token provided!"
            }
        })
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        console.log(err);
        if (err) {
            return res.status(401).json({
                data: {
                    errorMsg: "Unauthorized!"
                }
            })
        }
        req.userId = decoded.id
        next()
    });
};

const isAdmin = async (req, res, next) => {

    const user = await getUserByPk(req.userId)

    if (user) {
        const role = await getRoleByKey(user.roleId)

        if (role && role.valueEn === "Admin") {
            next()
            return
        }
        res.status(403).json({
            data: {
                errorMsg: "Require Admin Role!"
            }
        });
        return;
    }
};

const isDoctor = async (req, res, next) => {
    const user = await getUserByPK(req.userId)
    if (user) {
        const role = await getRoleByKey(user.roleId)
        if (role && role.value_en === "Doctor") {
            next()
            return
        }
        res.status(403).json({
            data: {
                errorMsg: "Require Doctor Role!"
            }
        });
        return;
    }
};

const isDoctorOrAdmin = async (req, res, next) => {
    const user = await getUserByPK(req.userId)
    if (user) {
        const role = await getRoleByKey(user.roleId)
        if (role && role.valueEn === "Admin") {
            next()
            return
        }

        if (role && role.valueEn === "Doctor") {
            next()
            return
        }
        res.status(403).json({
            data: {
                errorMsg: "Require Doctor or Admin Role!"
            }
        });
        return;
    }
};

const isUserOrAdmin = async (req, res, next) => {
    const user = await getUserByPK(req.userId)
    if (user) {
        const role = await getRoleByKey(user.roleId)

        if (role && role.valueEn === "Admin") {
            next()
            return
        }

        if (role && role.valueEn === "Patient") {
            const paramId = parseInt(req.query.id)
            if (paramId && paramId === req.userId) {
                next()
                return
            }
            return res.status(403).json({
                data: {
                    errorMsg: "Require id"
                }
            });
        }
        res.status(403).json({
            data: {
                errorMsg: "Require Patient or Admin Role!"
            }
        });
        return;
    }
};

const authJwt = {
    verifyToken,
    isAdmin,
    isDoctor,
    isDoctorOrAdmin,
    isUserOrAdmin
};
export default authJwt