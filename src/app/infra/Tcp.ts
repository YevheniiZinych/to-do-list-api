import "reflect-metadata";
import express from "express";
import { useExpressServer } from "routing-controllers";

import { IService } from "../../types/services";
import { controllers } from "../../domain/index";
import { middlewares } from "../../middlewares/index";
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { DB_URI } = process.env;

export class Tcp implements IService {
  private static instance: Tcp;

  private routePrefix = "/api";
  public server = express();

  constructor() {
    if (!Tcp.instance) {
      Tcp.instance = this;
    }

    return Tcp.instance;
  }

  async init() {
    const { server, routePrefix } = this;

    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(
      cors({
        origin: "http://localhost:4040", // замінити на потрібний домен
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    useExpressServer(server, {
      routePrefix,
      controllers,
      middlewares,
      cors: false,
      defaultErrorHandler: true,
      validation: false,
    });

    try {
      const db = await mongoose.connect(DB_URI);
      console.log(
        `mongodb is connected, dbName: ${db.connection.name}, onPort: ${db.connection.port}, onHost: ${db.connection.host}`
      );
    } catch (error) {
      console.log(error.message);
      process.exit(1);
    }

    return new Promise<boolean>((resolve) => {
      server.listen(4000, () => {
        console.log("Tcp service started on port 4000");

        return resolve(true);
      });
    });
  }
}
