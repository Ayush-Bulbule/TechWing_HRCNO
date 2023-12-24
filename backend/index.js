const express = require("express");
const connectDB = require("./models/connect.js");
// const routes = require("./routes/index");
const cors = require("cors");


//initialize express
const app = express();

//create db connection
connectDB();

app.use(cors());
app.use(express.json());


// //
// app.use(routes);
// app.get("/", (req, res) => {
//     res.send("Hello World")
// });



const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
{
    console.log(`⚡Server is running on port ${PORT}`);
});