module.exports = {
    localDbUrl: 'mongodb://127.0.0.1/mono_devs',
    mlabDbUrl: 'mongodb://mono:Jonam1996@ds058369.mlab.com:58369/mono_devs',
    password: 'Jonam1996',

    userSchema: {
        firstName: {
            type: String,
            required: 'First Name is Required!',
            match: /[A-Za-z]+$/
        },
        lastName: {
            type: String,
            required: 'Last Name is Required!',
            match: /[A-Za-z]+$/
        },
        _id: {
            type: String,
            required: 'Email is Required!',
            match: /\S+@\S+\.\S+/,
            unique: true,
        },
        gender: {
            type: String,
            required: 'Gender is Required!',
            enum: {
                values: ['MALE', 'FEMALE', 'OTHER'],
                message: 'Not a valid gender! Gender should be either MALE, FEMALE or OTHER'
            }
        },
        password: {
            type: String,
            required: 'Password is Required!',
        }
    }
}