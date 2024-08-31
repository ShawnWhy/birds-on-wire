// var path = require("path");
// var express = require("express");
import path from "path";
import express from "express";
import { fileURLToPath } from "url";

var app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "dist")));
app.set("port", process.env.PORT || 8080);

var server = app.listen(app.get("port"), function () {
  console.log("listening on port ", server.address().port);
});
