import { app } from "./app";

const port = process.env.PORT || 3000;

async function start() {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
