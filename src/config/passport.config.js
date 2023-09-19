import passport from "passport";
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import userModel from "../dao/models/user.js";
import { createHash, isValidPassword } from '../utils/utils.js';
import "dotenv/config";
import CartService from "../services/cart.service.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import { registerErrorInfo, loginErrorInfo, githubErrorInfo, unauthorizedUserErrorInfo } from '../services/errors/info.js';

const cartService = new CartService();

const LocalStrategy = local.Strategy;

const initializePassport = () => {

    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;
            try {
                let user = await userModel.findOne({ email: username });
                if (user) {
                    console.log('User already exist')
                    return done(null, false)
                }
                const newCart = await cartService.createCart()
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    cart: newCart._id
                }
                let result = await userModel.create(newUser)
                return done(null, result)
            } catch (error) {
                return done(CustomError.createError({
                    name: 'Registro fallido',
                    cause: registerErrorInfo(),
                    message: error,
                    code: EErrors.INTERNAL_SERVER_ERROR
                }));
            }
        }))

    passport.use('login', new LocalStrategy(
        { usernameField: 'email' }, async (username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username })
                if (!user) {
                    console.log("User doesn't exist")
                    return done(null, false)
                }
                if (!isValidPassword(user, password)) return done(null, false)
                return done(null, user);
            } catch (error) {
                return done(CustomError.createError({
                    name: 'Loggin fallido',
                    cause: loginErrorInfo(),
                    message: error,
                    code: EErrors.INTERNAL_SERVER_ERROR
                }))
            }
        }))

    passport.use('github', new GitHubStrategy({
        // Cifrar estos datos, son info sensible:
        clientID: `${process.env.CLIENT_ID}`,
        clientSecret: `${process.env.CLIENT_SECRET}`,
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userModel.findOne({ email: profile._json.email })
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: "",
                    email: profile._json.email,
                    password: ""
                }
                let result = await userModel.create(newUser)
                done(null, result)
            }
            else {
                done(null, user)
            }
        } catch (error) {
            return done(CustomError.createError({
                name: 'Loggin fallido',
                cause: githubErrorInfo(),
                message: error,
                code: EErrors.INTERNAL_SERVER_ERROR
            }))
        }

    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id);
        if (user != null) {
            done(null, user)
        } else {
            done(error);
        }
    })
}

export function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    CustomError.createError({
        name: 'Usuario no autorizado',
        cause: unauthorizedUserErrorInfo(),
        message: 'Acción no disponible',
        code: EErrors.UNAUTHORIZED
    })
    res.redirect("/faillogin");
}

export default initializePassport;