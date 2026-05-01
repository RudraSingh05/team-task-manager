const router = require("express").Router();

const {
  createTask,
  getTasks,
  updateTaskStatus,
  dashboard
} = require("../controllers/taskController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.post("/", auth, role("admin"), createTask);
router.get("/", auth, getTasks);
router.put("/:id", auth, updateTaskStatus);
router.get("/dashboard/stats", auth, dashboard);

module.exports = router;