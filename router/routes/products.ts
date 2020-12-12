import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../../services/product-service.ts";

const router = new Router();

router.prefix("/api/products");

router.get("/", getProducts)
  .get("/:id", getProduct)
  .post("/", addProduct)
  .put("/:id", updateProduct)
  .delete("/:id", deleteProduct);

export default router;
