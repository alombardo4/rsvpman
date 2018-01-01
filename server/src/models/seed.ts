import { default as User} from './user.model';

const initUser = {
    email: 'admin@example.com',
    password: 'Password1!',
    profile: {
        name: 'Example Admin'
    }
}

User.remove({}).exec()
    .then(() => {
        return User.create(initUser);
    })
    .then(() => {
        console.log('Created seed user');
    })
    .catch((err) => {
        console.log('An error occurred while seeding users');
        console.log(err);
    })
