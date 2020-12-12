import { Application } from "https://deno.land/x/oak/mod.ts";
import initRoutes from "./router/router.ts";

const port = 3500;

const app = new Application();
initRoutes(app);

console.log(`Server is listening on port ${port}`);

await app.listen({ port });
