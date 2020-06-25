import { Application, Context } from "https://deno.land/x/oak/mod.ts";
import router from "./routes";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server is listening on port 5000`);
await app.listen({ port: 5000 });
