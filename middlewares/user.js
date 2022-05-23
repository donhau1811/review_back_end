const { isValidObjectId } = require("mongoose");
const PasswordResetToken = require("../models/passwordResetToken");
const { sendError } = require("../utils/helper");

exports.isValidPasswordResetToken = async (req, res, next) => {
  const { token, userId } = req.body;

  if (!token.trim() || !isValidObjectId(userId))
    return sendError(res, "Invalid request!");

  const resetToken = await PasswordResetToken.findOne({ owner: userId });
  if (!resetToken) return sendError(res, "Unauthorized access!");

  const matched = await resetToken.compareToken(token);
  if (!matched) return sendError(res, "Unauthorized access!");

  req.resetToken = resetToken;
  next();
};
