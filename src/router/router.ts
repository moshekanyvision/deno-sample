import { Application } from "https://deno.land/x/oak/mod.ts";
import productsRoutes from "./routes/products.ts";
import usersRoutes from "./routes/users.ts";

export default function (app: Application) {
  app.use(productsRoutes.routes());
  app.use(usersRoutes.routes());
}
