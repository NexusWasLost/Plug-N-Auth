import { config } from "../config/config.js";
import db from "./DB.js";
import cookieParser from "cookie-parser";

import express from "express";
const app = express();

app.listen(config.port, function(){
    console.log(`Server running on Port: ${config.port} 🚀 !`);
})

/**
 * Middlewares
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", function(req, res){
    try{
        res.status(200).json({ message: "Welcome to Plug-N-Auth 🔌 !" });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ ErrMsg: "Oops 😳 ! Some Error Occured !"});
    }
})

/**
 * Import Routes and use them
*/
import _signup from "./routes/signup.route.js";
import _login from "./routes/login.route.js";
import _status from "./routes/status.route.js";
import _update from "./routes/update.route.js";
import _delete from "./routes/delete.route.js";
import _refresh from "./routes/refresh.route.js";

app.use('/user/api', _signup);
app.use('/user/api', _login);
app.use('/user/api', _status);
app.use('/user/api', _update);
app.use('/user/api', _delete);
app.use('/user/api', _refresh);

//handle wrong requests
app.use(function (req, res){
    res.status(404).json({ "message": "Oops! Looks like this path doesn’t lead anywhere. Try a different route! 🚀"  })
})
