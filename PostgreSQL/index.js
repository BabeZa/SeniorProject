const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");

const PORT = process.env.PORT || 55011;
//pm2 restart index --log-date-format 'D-MM-YYYY HH:mm:ss'

global.__basedir = __dirname;
global.__pathphoto = "http://167.99.70.72:55011/public/images/";
global.__pathfile = "http://api.aun-qa-cpekmutt.me/public/files/";

app.get("/", function (req, res) {
  const server = {
    port: PORT,
    dbhost: pool.options.host,
    dbport: pool.options.port,
    dbname: pool.options.database,
    basedir: __basedir,
  };
  res.send(server);
  // res.send("Server is Running");
});

//middleware
app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use("/public", express.static(path.join(__dirname, "/public")));
//ROUTES//

app.use("/auth", require("./routes/jwtAuth"));
app.use("/subject", require("./routes/subject"));
app.use("/document", require("./routes/document"));
app.use("/employee", require("./routes/employee"));
app.use("/image", require("./routes/uploadImage"));
app.use("/pdf", require("./routes/uploadPDF"));
app.use("/photo", require("./routes/photo"));
app.use("/validrole", require("./routes/validrole"));
app.use("/forselect", require("./routes/forselect"));
app.use("/permissions", require("./routes/permissions"));
app.use("/test", require("./routes/test"));
app.use("/tqf3", require("./routes/tqf3"));
app.use("/tqf2", require("./routes/tqf2"));
app.use("/tqf5", require("./routes/tqf5"));
app.use("/weeksnote", require("./routes/weeksnote"));
app.use("/document-upload", require("./routes/documentUpload"));
app.use("/reactadmin", require("./routes/reactadmin/reactadmin"));
app.use("/calendar", require("./routes/calendar"));

app.listen(PORT, () => {
  console.log("Server has started on port " + PORT);
  console.log(
    "Database connect to: " +
      pool.options.host +
      ":" +
      pool.options.port +
      " Database: " +
      pool.options.database
  );
});
