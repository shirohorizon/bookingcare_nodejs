import authRoutes from "./authRoutes";
import userRoutes from "./userRouters";



const initWebRouters = app => {
    app.use('/', authRoutes)
    app.use('/', userRoutes)
    return app
}

export default initWebRouters