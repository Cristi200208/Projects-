const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log("Error while hashing password");
    console.log(error.message);
    return error;
  }
};

const comparePasswords = async (inputPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.log("Error while comparing passwords");
    console.log(error.message);
    return error;
  }
};

const signToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    fullName: user.firstName + "" + user.lastName,
    isAdmin: user.isAdmin,
  };

  const secretKey = process.env.SECRET_KEY;
  const jwtOption = {
    expiresIn: "1h",
  };

  const token = jwt.sign(payload, secretKey, jwtOption);

  return token;
};

module.exports = {
  hashPassword,
  comparePasswords,
  signToken,
};
