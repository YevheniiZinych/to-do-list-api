import "reflect-metadata";
import express from "express";
const mongoose = require("mongoose");
import { useExpressServer } from "routing-controllers";

import { IService } from "types/services";
import { controllers } from "app/domain";
import { middlewares } from "app/middlewares";

// Оголошуємо клас Tcp, який реалізує інтерфейс IService
export class Tcp implements IService {
  private static instance: Tcp; // Ссылка на единственный экземпляр класса

  private routePrefix = "/api"; // Префикс для маршрутов API
  public server = express(); // Экземпляр Express.js

  // Конструктор, що реалізує шаблон Singleton для класу Tcp
  constructor() {
    // Якщо екземпляр ще не створено, зберігаємо посилання на поточний екземпляр
    if (!Tcp.instance) {
      Tcp.instance = this;
    }

    // Повертаємо посилання на єдиний екземпляр класу
    return Tcp.instance;
  }

  // Метод для ініціалізації сервісу
  async init() {
    const { server, routePrefix } = this;

    // Парсимо тіло запиту, потрібно для middlewares
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));

    // Використовуємо бібліотеку routing-controllers для налаштування маршрутів
    useExpressServer(server, {
      routePrefix,
      controllers,
      middlewares,
      cors: true,
      defaultErrorHandler: true,
      validation: false, // Відключаємо вбудовану валідацію, щоб ми могли перевірити DTO самі всередині контролера
    });

    try {
      const db = await mongoose.connect(
        "mongodb+srv://zinich911:ea1og6ZcMNBptsGT@to-do-list-api.aj8b3.mongodb.net/"
      );
      console.log(
        `mongodb is connected, dbName: ${db.connection.name}, onPort: ${db.connection.port}, onHost: ${db.connection.host}`
      );
    } catch (error) {
      console.log(error.message);
      process.exit(1);
    }

    // Повертаємо Promise, який успішно виконується, коли сервер починає слухати порт
    return new Promise<boolean>((resolve) => {
      server.listen(4000, () => {
        console.log("Tcp service started on port 4000");

        return resolve(true);
      });
    });
  }
}
