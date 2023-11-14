const express = require("express");
const app = express();
const router = express.Router();

router.use(require("./users"));
router.use(require("./roles"));

module.exports = router;
