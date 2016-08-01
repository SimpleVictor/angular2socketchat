/// <reference path="../typings/index.d.ts" />
import * as express from "express";
import * as sioc from 'socket.io';
import { join } from "path";
import * as favicon from "serve-favicon";
import { json, urlencoded } from "body-parser";

import { loginRouter } from "./routes/login";
import { protectedRouter } from "./routes/protected";





var app:any= express();


var io = sioc();
app.io = io;

// console.log(io);

let users = [];

io.on('connection', (socket) => {

    let username;

    console.log('user connected');

    socket.on('request-users', function(){
        socket.emit('request-users', users);
    });

    socket.on('new-user', function(data){
        io.emit('new-user',data.name);
        username = data.name;
        users.push(data.name);
        console.log(data.name + " has joined the chat");
    });

    socket.on('disconnect', function(){
        users.splice(users.indexOf(username), 1);
        console.log(this.username +' disconnected');
        io.emit('remove-player', username);
    });

    socket.on('add-message', (message) => {
        let messageData = {
            username: username,
            message: message
        };
        io.emit("message", messageData);
    });
});


app.disable("x-powered-by");

app.use(favicon(join(__dirname, "../public", "favicon.ico")));
app.use(express.static(join(__dirname, '../public')));

app.use(json());
app.use(urlencoded({ extended: true }));

// api routes
app.use("/api", protectedRouter);
app.use("/login", loginRouter);

app.use('/client', express.static(join(__dirname, '../client')));

























// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {

    app.use(express.static(join(__dirname, '../node_modules')));

    app.use(function(err, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next) {
    let err = new Error("Not Found");
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});

export { app }
