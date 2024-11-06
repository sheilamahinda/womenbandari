const { Router } = require("express");
const controlRegister = require("../controller/auth/register");
const controlGetUser = require("../controller/auth/get_user");
const controlFetchUser = require("../controller/auth/user");

const router = Router();

router.post("/register", controlRegister);
router.get("/getUser/:id", controlGetUser);
router.get("/fetchUser", controlFetchUser);

const authRouter = router;

module.exports = authRouter;
