"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tcp = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const mongoose = require("mongoose");
const routing_controllers_1 = require("routing-controllers");
const domain_1 = require("app/domain");
const middlewares_1 = require("app/middlewares");
require("dotenv").config();
const { DB_URI } = process.env;
class Tcp {
    constructor() {
        this.routePrefix = "/api";
        this.server = (0, express_1.default)();
        if (!Tcp.instance) {
            Tcp.instance = this;
        }
        return Tcp.instance;
    }
    async init() {
        const { server, routePrefix } = this;
        server.use(express_1.default.json());
        server.use(express_1.default.urlencoded({ extended: false }));
        (0, routing_controllers_1.useExpressServer)(server, {
            routePrefix,
            controllers: domain_1.controllers,
            middlewares: middlewares_1.middlewares,
            cors: true,
            defaultErrorHandler: true,
            validation: false,
        });
        try {
            const db = await mongoose.connect(DB_URI);
            console.log(`mongodb is connected, dbName: ${db.connection.name}, onPort: ${db.connection.port}, onHost: ${db.connection.host}`);
        }
        catch (error) {
            console.log(error.message);
            process.exit(1);
        }
        return new Promise((resolve) => {
            server.listen(4000, () => {
                console.log("Tcp service started on port 4000");
                return resolve(true);
            });
        });
    }
}
exports.Tcp = Tcp;
//# sourceMappingURL=Tcp.js.map