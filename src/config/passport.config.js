import passport from "passport";
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import userModel from "../dao/models/user.js";
import { createHash, isValidPassword } from '../utils.js';
import "dotenv/config";

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
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                }
                let result = await userModel.create(newUser)
                return done(null, result)
            } catch (error) {
                return done('Error al obtener al usuario ' + error);
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
                return done(error)
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
            return done(error)
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
    res.redirect("/faillogin");
}

export default initializePassport;