import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import image_resizing_route from "./api/images";

const app = express();
const port = 3000;

// append route to the app..
image_resizing_route(app);

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Connected");
});
app.listen(port, () => {
  console.log(`Started server on port ${port}`);
});

export default app;
