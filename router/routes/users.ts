import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../../services/users-service.ts";

const router = new Router();

router.prefix("/api/users");

router.get("/", getUsers)
  .get("/:id", getUser)
  .post("/", addUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser);

export default router;
