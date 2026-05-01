const router = require("express").Router();

const {
  createProject,
  getProjects,
  addMember
} = require("../controllers/projectController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.post("/", auth, role("admin"), createProject);
router.get("/", auth, getProjects);
router.put("/:id/add-member", auth, role("admin"), addMember);

module.exports = router;