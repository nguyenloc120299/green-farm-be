import app from "./app";

app
  .listen(1202, () => {
    console.log(`Server running on port : ${1202}`);
  })
  .on("error", (e) => console.log(e));
