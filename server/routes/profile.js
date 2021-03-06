const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');
// Load profile and user model
const Profile = require('../models/Profile');
const User = require('../models/User');

// Load validations
const validateProfileInput = require('../validation/profile');
const validateExperienceInput = require('../validation/experience');
const validateEducationInput = require('../validation/education');

//@route    Get /api/profile
//@desc     get current user profile
//@status   private
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = {};
		Profile.findOne({ user: req.user.id })
			.populate('user', ['username', 'email'])
			.then((profile) => {
				if (!profile) {
					errors.noprofile = 'No profile exists';
					res.status(404).json(errors);
				}
				res.json(profile);
			})
			.catch((error) => res.json({ error: error.message }));
	}
);

//@route    Post  /api/profile
//@desc     create/update profile for current user
//@status   private
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateProfileInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		} else {
			const profileFields = {};
			profileFields.user = req.user.id;
			if (req.body.handle) profileFields.handle = req.body.handle;
			if (req.body.company) profileFields.company = req.body.company;
			if (req.body.website || req.body.website === '')
				profileFields.website = req.body.website;
			if (req.body.location) profileFields.location = req.body.location;
			if (req.body.bio) profileFields.bio = req.body.bio;
			if (req.body.status) profileFields.status = req.body.status;
			if (req.body.githubusername)
				profileFields.githubusername = req.body.githubusername;
			// Skills - Spilt into array
			if (typeof req.body.skills !== 'undefined') {
				profileFields.skills = req.body.skills.split(',');
			}
			// Social
			profileFields.social = {};
			if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
			if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
			if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
			if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
			if (req.body.instagram)
				profileFields.social.instagram = req.body.instagram;

			Profile.findOne({ user: req.user.id })
				.then((profile) => {
					if (profile) {
						// update profile
						Profile.findOneAndUpdate(
							{ user: req.user.id },
							{ $set: profileFields },
							{ new: true }
						)
							.then((profile) => res.json(profile))
							.catch((err) => res.json({ error: err.message }));
					} else {
						// check for handle
						Profile.findOne({ handle: req.body.handle })
							.then((profile) => {
								if (profile) {
									errors.handle = 'Profile with this handle already exists';
									res.status(400).json(errors);
								} else {
									// create new profile
									new Profile(profileFields)
										.save()
										.then((profile) => res.json(profile))
										.catch((err) => res.json({ error: err.message }));
								}
							})
							.catch((err) => res.json({ error: err.message }));
					}
				})
				.catch((err) => res.json({ error: err.message }));
		}
	}
);

//@route    Get  /api/profile/handle/:handle
//@desc     get user profile by handle
//@status   public
router.get('/handle/:handle', (req, res) => {
	const errors = {};
	Profile.findOne({ handle: req.params.handle })
		.populate('user', ['username', 'avatar'])
		.then((profile) => {
			if (!profile) {
				errors.handle = 'There is no profile on this handle';
				res.status(404).json(errors);
			} else {
				res.json(profile);
			}
		})
		.catch((err) => res.status(404).json(errors));
});

//@route    Get  /api/profile/user/:user_id
//@desc     get user profile by user ID
//@status   public
router.get('/user/:user_id', (req, res) => {
	const errors = {};
	Profile.findOne({ user: req.params.user_id })
		.then((profile) => {
			if (!profile) {
				errors.id = 'There is no profile on this user id';
				res.status(404).json(errors);
			} else {
				res.json(profile);
			}
		})
		.catch((err) => res.status(404).json(errors));
});

//@route    Get  /api/profile/All
//@desc     get all profiles
//@status   public
router.get('/all', (req, res) => {
	const errors = {};
	Profile.find()
		.populate('user', ['username', 'avatar'])
		.then((profiles) => {
			if (!profiles) {
				errors.id = 'There are no profiles avaialbe';
				res.status(404).json(errors);
			} else {
				res.json(profiles);
			}
		})
		.catch((err) => res.status(404).json(errors));
});

// @route   POST api/profile/experience;
// @desc    Add experience to profile
// @access  Private
router.post(
	'/experience',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateExperienceInput(req.body);

		// Check Validation
		if (!isValid) {
			// Return any errors with 400 status
			return res.status(400).json(errors);
		}

		Profile.findOne({ user: req.user.id }).then((profile) => {
			const newExp = {
				title: req.body.title,
				company: req.body.company,
				location: req.body.location,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description,
			};

			// Add to exp array
			profile.experience.unshift(newExp);

			profile.save().then((profile) => res.json(profile));
		});
	}
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
	'/education',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateEducationInput(req.body);

		// Check Validation
		if (!isValid) {
			// Return any errors with 400 status
			return res.status(400).json(errors);
		}

		Profile.findOne({ user: req.user.id }).then((profile) => {
			const newEdu = {
				school: req.body.school,
				degree: req.body.degree,
				fieldofstudy: req.body.fieldofstudy,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description,
			};

			// Add to exp array
			profile.education.unshift(newEdu);

			profile.save().then((profile) => res.json(profile));
		});
	}
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
	'/experience/:exp_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id })
			.then((profile) => {
				// Get remove index
				const removeIndex = profile.experience
					.map((item) => item.id)
					.indexOf(req.params.exp_id);

				// Splice out of array
				profile.experience.splice(removeIndex, 1);

				// Save
				profile.save().then((profile) => res.json(profile));
			})
			.catch((err) => res.status(404).json(err));
	}
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
	'/education/:edu_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id })
			.then((profile) => {
				// Get remove index
				const removeIndex = profile.education
					.map((item) => item.id)
					.indexOf(req.params.edu_id);

				// Splice out of array
				profile.education.splice(removeIndex, 1);

				// Save
				profile.save().then((profile) => res.json(profile));
			})
			.catch((err) => res.status(404).json(err));
	}
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOneAndRemove({ user: req.user.id }).then(() => {
			User.findOneAndRemove({ _id: req.user.id }).then(() =>
				res.json({ success: true })
			);
		});
	}
);

module.exports = router;
