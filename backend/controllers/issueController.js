import Issue from "../models/Issue.js";
import { getAISeverity } from "../services/aiSeverityService.js";

/**
 * @desc    Create a new issue (post)
 * @route   POST /api/issues
 * @access  Citizen (authenticated)
 */
export const createIssue = async (req, res) => {
  try {
    const { title, description, address, lat, lng } = req.body;

    // basic validation
    if (!title || !description || !lat || !lng || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Title, description, image, and location are required"
      });
    }

    const aiSeverity = await getAISeverity(description);

    const issue = await Issue.create({
      title,
      description,
      images: [req.file.path],
      address,
      location: {
        type: "Point",
        coordinates: [Number(lng), Number(lat)]
      },
      createdBy: req.user.id,
      aiSeverity,
      severityScore: aiSeverity.score
    });

    res.status(201).json({
      success: true,
      issue
    });
  } catch (err) {
    console.error("CREATE ISSUE ERROR:", err);
    console.error("Error stack:", err.stack);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * @desc    Get all issues (feed)
 * @route   GET /api/issues
 * @access  Public
 */
export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      issues
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * @desc    Get single issue
 * @route   GET /api/issues/:id
 * @access  Public
 */
export const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate("createdBy", "name role")
      .populate("comments.user", "name");

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found"
      });
    }

    res.json({
      success: true,
      issue
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * @desc    Get issues by user
 * @route   GET /api/issues/user/:userId
 * @access  Public
 */
export const getIssuesByUser = async (req, res) => {
  try {
    const issues = await Issue.find({
      createdBy: req.params.userId
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      issues
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * @desc    Like or unlike an issue
 * @route   POST /api/issues/:id/like
 * @access  Authenticated
 */
export const toggleLike = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ success: false, message: "Issue not found" });
    }

    const userId = req.user.id;
    const liked = issue.likes.includes(userId);

    if (liked) {
      issue.likes.pull(userId);
    } else {
      issue.likes.push(userId);
    }

    await issue.save();

    res.json({
      success: true,
      liked: !liked,
      totalLikes: issue.likes.length
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * @desc    Add comment to issue
 * @route   POST /api/issues/:id/comment
 * @access  Authenticated
 */
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, message: "Comment text required" });
    }

    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ success: false, message: "Issue not found" });
    }

    issue.comments.push({
      user: req.user.id,
      text
    });

    await issue.save();

    res.status(201).json({
      success: true,
      comment: issue.comments.at(-1)
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
