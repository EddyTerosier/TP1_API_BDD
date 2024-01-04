// REQUIRE GLOBAL
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');


//REQUIRE ROUTE
const userRoute = require("./Routes/UserRoute");
const commentRoute = require("./Routes/CommentRoute");
const technologyRoute = require("./Routes/TechnologyRoute");

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// ROUTES
app.use("/users", userRoute);
app.use('/comments', commentRoute);
app.use("/technologies", technologyRoute);

// SERVER
app.listen(8000, function () {
    console.log("Server listening on port 8000");
});
