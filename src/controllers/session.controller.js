import UserDTO from "../dtos/user.dto.js";

export default class SessionController {

    static async login(req, res, next) {
        try {
            const { first_name, last_name, age, email} = req.user;
            req.session.user = new UserDTO(first_name, last_name, age, email)
            res.redirect('/products')
        } catch (error) {
            next(error)
        }
    }

    static async logout(req, res, next) {
        try {
            req.session.destroy()
            res.send('Logout ok!')
        } catch (error) {
            next(error)
        }
    }

    static async githubCallback(req, res, next) {
        try {
            const { first_name, last_name, age, email} = req.user;
            req.session.user = new UserDTO(first_name, last_name, age, email)
            res.redirect('/products')
        } catch (error) {
            next(error)
        }
    }

    static async current(req, res, next) {
        try {
            const { first_name, last_name, age, email} = req.user;
            const user = new UserDTO(first_name, last_name, age, email)
            res.send({status: 'success', payload: user})
        } catch (error) {
            next(error)
        }
    }

}