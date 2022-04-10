import { setupExpress } from "./setup/express";

const app = setupExpress();
app.listen(8080, () => {
  console.log("SERVER LISTENING ON LOCALHOST:8080");
});
