export default class UserDTO {
    constructor ( first_name, last_name, age, email ) {
        this.name = `${first_name} ${last_name}`;
        this.age = age;
        this.email = email;
        this.rol = 'user';
    }
}