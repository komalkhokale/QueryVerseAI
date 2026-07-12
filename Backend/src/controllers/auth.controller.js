import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @body { username, email, password }
 */
export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "User with this email or username already exists",
        success: false,
        err: "User already exists",
      });
    }

    const user = await userModel.create({
      username,
      email,
      password,
    });

    const emailVerificationToken = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET,
    );

    await sendEmail({
      to: email,
      subject: "Welcome to QueryVerseAI!",
      html: `
        <p>Hi ${username},</p>

        <p>
          Thank you for registering at
          <strong>QueryVerseAI</strong>.
          We're excited to have you on board!
        </p>

        <p>
          Please verify your email address by clicking the link below:
        </p>

        <a
          href="https://queryverseai.onrender.com/api/auth/verify-email?token=${emailVerificationToken}"
        >
          Verify Email
        </a>

        <p>
          If you did not create an account, please ignore this email.
        </p>

        <p>
          Best regards,
          <br />
          The QueryVerseAI Team
        </p>
      `,
    });

  
    return res.status(201).json({
      message:
        "User registered successfully. Please verify your email before logging in.",
      success: true,
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      message: "Registration failed. Please try again.",
      success: false,
      err: error.message,
    });
  }
}

/**
 * @desc Login user and return JWT token
 * @route POST /api/auth/login
 * @access Public
 * @body { email, password }
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
        err: "User not found",
      });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
        err: "Incorrect password",
      });
    }

    if (!user.verified) {
      return res.status(400).json({
        message: "Please verify your email before logging in",
        success: false,
        err: "Email not verified",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token);

    return res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Login failed. Please try again.",
      success: false,
      err: error.message,
    });
  }
}

/**
 * @desc Get current logged in user's details
 * @route GET /api/auth/get-me
 * @access Private
 */
export async function getMe(req, res) {
  try {
    const userId = req.user.id;

    const user = await userModel
      .findById(userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        err: "User not found",
      });
    }

    return res.status(200).json({
      message: "User details fetched successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get me error:", error);

    return res.status(500).json({
      message: "Failed to fetch user details",
      success: false,
      err: error.message,
    });
  }
}

/**
 * @desc Verify user's email address
 * @route GET /api/auth/verify-email
 * @access Public
 * @query { token }
 */
export async function verifyEmail(req, res) {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
    );

    const user = await userModel.findOne({
      email: decoded.email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid token",
        success: false,
        err: "User not found",
      });
    }

    user.verified = true;

    await user.save();

    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <title>Email Verified</title>
        </head>

        <body
          style="
            margin: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #09090b;
            color: #ffffff;
            font-family: Arial, Helvetica, sans-serif;
          "
        >
          <div
            style="
              width: 100%;
              max-width: 500px;
              margin: 20px;
              padding: 40px;
              text-align: center;
              background: #18181b;
              border: 1px solid #27272a;
              border-radius: 20px;
            "
          >
            <h1
              style="
                margin-top: 0;
                color: #ffffff;
              "
            >
              Email Verified Successfully!
            </h1>

            <p
              style="
                color: #a1a1aa;
                line-height: 1.7;
              "
            >
              Your email has been verified.
              You can now log in to your account.
            </p>

            <a
              href="https://queryverseai.onrender.com/login"
              style="
                display: inline-block;
                margin-top: 20px;
                padding: 14px 24px;
                border-radius: 12px;
                background: #7c3aed;
                color: #ffffff;
                font-weight: 600;
                text-decoration: none;
              "
            >
              Go to Login
            </a>
          </div>
        </body>
      </html>
    `;

    return res.send(html);
  } catch (err) {
    return res.status(400).json({
      message: "Invalid or expired token",
      success: false,
      err: err.message,
    });
  }
}

/**
 * @desc Logout user
 * @route POST /api/auth/logout
 * @access Private
 */
export async function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
}