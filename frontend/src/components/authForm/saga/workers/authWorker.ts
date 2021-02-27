import axios from "axios";

export function* authWorker(payload: any): Generator {
  const call = () => {
    axios
      .post("https://animeover-api.herokuapp.com/auth", null, {
        params: {
          token: "token",
          email: "",
          password: "",
        },
      })
      .then((data) => {
        console.log(data);
      });
  };
  // https://animeover-api.herokuapp.com/auth
  console.log(payload);
  yield new Promise((resolve) => resolve("test"));
}
