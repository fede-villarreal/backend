import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const generateCode = () => {
    return faker.string.alphanumeric(6)
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, __dirname+'/public/images')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

export const uploader = multer({storage});