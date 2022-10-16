const express = require("express");

const error = require("../middleware/error");
const todoRouter = require("../router/todo");

module.exports = function (app) {
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));
  app.use(express.json({ limit: "50mb" }));

  app.use("/api/todo", todoRouter);

  app.use(error);
};
