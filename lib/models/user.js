const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: { type: String, unique: true, required: true},
	password: { type: String, required: true }
});

userSchema.pre('save', function(next) {
	const user = this;

	if (user.isModified('password') || user.isNew) { // regenerate hash everytime change pw or new user
		bcrypt.hash(user.password, 10, (err, hash) => {
			// 10 is common number to hash, the bigger the more const
			if (err) {
				return next(err) //stop running and run next one
			}
			user.password = hash;
			return next();
		});
	} else {
		next(); //doing nothing, go to next thing
	}
});

// add a method to all users to be able to compare a password
userSchema.methods.comparePassword = function(password) {
	// use bcrypt to compare a plaintext password to a hash
	return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
