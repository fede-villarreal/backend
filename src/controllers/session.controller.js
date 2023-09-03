import passport from "passport";

export default class SessionController {

    static async login(req, res, next) {
        try {
            req.session.user = {
                name: `${req.user.first_name} ${req.user.last_name}`,
                age: req.user.age,
                email: req.user.email,
                rol: 'user'
            }
            res.redirect('/products')
        } catch (error) {
            next(error)
        }
    }

    static async logout(req, res, next) {
        try {
            req.session.destroy(err => {
                if (err) {
                    return res.json({ status: 'Logout ERROR', body: err })
                }
                res.send('Logout ok!')
            })
        } catch (error) {
            next(error)
        }
    }

    static async githubCallback(req, res, next) {
        try {
            req.session.user = {
                name: `${req.user.first_name} ${req.user.last_name}`,
                age: req.user.age,
                email: req.user.email,
                rol: 'user'
            }
            res.redirect('/products')
        } catch (error) {
            next(error)
        }
    }

}