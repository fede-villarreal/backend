import "dotenv/config";

export default class UserDTO {
    constructor ( first_name, last_name, age, email ) {
        this.name = `${first_name} ${last_name}`;
        this.age = age;
        this.email = email;
        if (email === process.env.ADMIN_EMAIL) {
            this.rol = 'admin'
        } else {
            this.rol = 'user';
        }
    }
}