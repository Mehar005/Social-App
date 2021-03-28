const Validator = require('validator');
const isEmpty = require('./is-Empty');

const validateRegisterInput = (data) => {
	let errors = {};
	data.username = isEmpty(data.username) ? '' : data.username;
	data.email = isEmpty(data.email) ? '' : data.email;
	data.password = isEmpty(data.password) ? '' : data.password;
	data.password2 = isEmpty(data.email) ? '' : data.password2;


	if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
		errors.username = 'username must be between 2 and 30 characters';
	}

	if (Validator.isEmpty(data.username)) {
		errors.username = 'username is required';
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = 'Invalid Email';
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = 'email is required';
	}

	if (!Validator.isLength(data.password, { min: 4, max: 30 })) {
		errors.password = 'password must be between 4 and 30 characters';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'password is required';
	}

	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = 'Password does not match';
	}

	if (Validator.isEmpty(data.password2)) {
		errors.password2 = 'Confirm password is required';
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};

module.exports = validateRegisterInput;
