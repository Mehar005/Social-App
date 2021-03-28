const router = require('express').Router();
const User = require('../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Keys = require('../config/keys');
const passport = require('passport');

// loading input validator
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

//@route    /api/users/test
//@desc     to get all the users
//@status   public
router.get('/test', (req, res) => {
	User.find()
		.then((response) => res.json(response))
		.catch((err) => res.status(404).json({ msg: err.message }));
});

//@route    POST /api/users/register
//@desc     to register new user
//@status   public
router.post('/register', (req, res) => {
	// check for valid inputs
	const { errors, isValid } = validateRegisterInput(req.body);

	if (!isValid) {
		res.status(400).json(errors);
	} else {
		User.findOne({ email: req.body.email }).then((user) => {
			if (user) {
				errors.email = 'Email is already exist';
				return res.status(400).json(errors);
			} else {
				const avatar = gravatar.url(req.body.email, {
					s: '200', // size
					r: 'pg', // rating
					d: 'mm', // default
				});
				const newUser = new User({
					username: req.body.username,
					email: req.body.email,
					avatar: avatar,
					password: req.body.password,
				});

				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;
						newUser.password = hash;
						newUser
							.save()
							.then((user) => res.json(user))
							.catch((err) => res.json({ message: err.message }));
					});
				});
			}
		});
	}
});

//@route    /api/users/login
//@desc     to login user
//@status   public
router.post('/login', (req, res) => {
	//checking for validation
	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid) {
		res.status(400).json(errors);
	} else {
		const email = req.body.email;
		const password = req.body.password;
		User.findOne({ email: email }).then((user) => {
			if (!user) {
				errors.email = 'email not found';
				res.status(404).json(errors);
			} else {
				bcrypt.compare(password, user.password).then((isMatch) => {
					if (!isMatch) {
						errors.password = 'password is incorrect';
						res.status(400).json(errors);
					} else {
						// creating payload
						const payload = {
							id: user._id,
							avatar: user.avatar,
							username: user.username,
							email: user.email,
						};
						// creating jwt
						jwt.sign(
							payload,
							Keys.secretKey,
							{ expiresIn: 3600 },
							(err, token) => {
								res.json({
									token: `Bearer ${token}`,
								});
							}
						);
					}
				});
			}
		});
	}
});

//@route    /api/users/current
//@desc     return the current user
//@status   private
router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.json({
			id: req.user.id,
			username: req.user.username,
			email: req.user.email,
		});
	}
);
module.exports = router;
