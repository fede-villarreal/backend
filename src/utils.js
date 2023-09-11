import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import bcrypt from 'bcrypt';
import { fakerES as faker } from '@faker-js/faker';

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const generateCode = () => {
    return faker.string.alphanumeric(6)
}
export const generateProducts = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric(6),
        price: faker.commerce.price({ min: 1, max: 200, dec: 0 }),
        stock: faker.number.int({ min: 1, max: 300 }),
        category: faker.commerce.department(),
        status: faker.datatype.boolean(0.9),
        thumbnails: faker.image.url(),
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const uploader = multer({ storage });