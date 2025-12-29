import { body } from 'express-validator';
import { findUserByName } from '../db/queries/indexQueries.js';

const emptyErr = 'must not be empty';
const lengthErr = 'must be between 1 and 75 characters';
const bodyLengthErr = 'must be between 1 and 1000 characters';
const alphaErr = 'must only contain letters';
const specialCharErr = `Only letters, numbers and white spaces are allowed`;

const validateSignUp = [
    body('username')
        .notEmpty()
        .withMessage(`Username ${emptyErr}`)
        .bail()
        .custom(async (username) => {
            const user = await findUserByName(username);
            if (user.length > 0) {
                throw new Error('Username already exists');
            }
            return true;
        })
        .bail()
        .isLength({ min: 1, max: 75 })
        .withMessage(`Username ${lengthErr}`),

    body('fname')
        .notEmpty()
        .withMessage(`First name ${emptyErr}`)
        .bail()
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage(`First name ${alphaErr}`)
        .bail()
        .isLength({ min: 1, max: 75 })
        .withMessage(`First name ${lengthErr}`),

    body('lname')
        .notEmpty()
        .withMessage(`Last name ${emptyErr}`)
        .bail()
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage(`Last name ${alphaErr}`)
        .bail()
        .isLength({ min: 1, max: 75 })
        .withMessage(`Last name ${lengthErr}`),

    body('password').notEmpty().withMessage(`Password ${emptyErr}`),

    body('cpassword')
        .notEmpty()
        .withMessage(`Please verify your password`)
        .bail()
        .custom((cpassword, { req }) => {
            if (cpassword !== req.body.password) {
                throw new Error(
                    'Password and password confirmation do not match',
                );
            }
            return true;
        }),
];

export function validateMemberKey(key) {
    return key === process.env.MEMBER_KEY;
}

export function validateAdminKey(key) {
    return key === process.env.ADMIN_KEY;
}

const validatePost = [
    body('title')
        .notEmpty()
        .withMessage(`Title ${emptyErr}`)
        .bail()
        .matches(/^[a-zA-Z0-9? ]+$/)
        .withMessage(`${specialCharErr} within the title`)
        .bail()
        .isLength({ min: 1, max: 75 })
        .withMessage(`Title ${lengthErr}`),

    body('body')
        .notEmpty()
        .withMessage(`Body ${emptyErr}`)
        .bail()
        .matches(/^[a-zA-Z0-9\S\s]+$/)
        .withMessage(`${specialCharErr} within the body`)
        .bail()
        .isLength({ min: 1, max: 1000 })
        .withMessage(`Body ${bodyLengthErr}`),
];

export { validateSignUp, validatePost };
