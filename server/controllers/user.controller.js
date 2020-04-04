const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');

const User = require('../models/user.model');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().min(4).required(),
});

const passwordForm = Joi.object({
  newPassword: Joi.string().min(4).required(),
  oldPassword: Joi.string().min(4).required(),
});

const hashSalt = 10;

const create = async (req, res) => {
  const user = req.body;
  const { error, value } = await userSchema
    .validate(user, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: 'Invalid user',
      status: 400,
    });
  }

  value.password = bcrypt.hashSync(value.password, hashSalt);

  const createdUser = new User(value).save();
  delete createdUser.password;

  return res.json(createdUser);
};

const changePassword = async (req, res) => {
  const { error, value } = await passwordForm
    .validate(req.body, { abortEarly: false });
  const user = await User.findById(req.user._id);

  if (error
    || !await bcrypt.compare(value.oldPassword, user.password)) {
    return res.status(400).json({
      message: 'Invalid password confirmation',
      status: 400,
    });
  }

  user.password = bcrypt.hashSync(value.newPassword, hashSalt);

  await user.save();

  return res.json({ message: 'Password updated' });
};

module.exports = {
  create,
  changePassword,
};
