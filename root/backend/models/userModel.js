const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name!'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email!'],
    unique: true,
    lowercase: true,
    trim: true,
    // add validation with validator npm package
    validate: [validator.isEmail, 'A user must have a valid email!'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'A user must have a password!'],
    minlength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A password must have a confirmed password!'],
    validate: {
      validator: function (pass) {
        return pass === this.password;
      },
      message: 'Passwords does not match!',
    },
  },
  passwordChangedAt: Date, // used to simulate if user changed password after jwtoken issued
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  isAccountActive: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ isAccountActive: { $ne: false } });

  next();
});

userSchema.methods.isPasswordCorrect = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.isPasswordChangedAfterTokenIssue = function (tokenIssuedAt) {
  if (this.passwordChangedAt) {
    const passwordChangedAtMilliseconds = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(tokenIssuedAt, passwordChangedAtMilliseconds);

    return tokenIssuedAt < passwordChangedAtMilliseconds;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  // create a random string as a token
  const resetPasswordToken = crypto.randomBytes(32).toString('hex');

  // assign the encrypted random string token to the user model as passwordResetToken
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetPasswordToken)
    .digest('hex');

  // set an expiration time for the token (10 minutes)
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  // return the resetPasswordToken
  return resetPasswordToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
