"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const midway_1 = require("midway");
let UserService = class UserService {
    async getUser(options) {
        return {
            id: options.id,
            username: 'mockedName',
            phone: '12345678901',
            email: 'xxx.xxx@xxx.com',
        };
    }
};
UserService = __decorate([
    midway_1.provide('userService')
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxtQ0FBaUM7QUFJakMsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQUV0QixLQUFLLENBQUMsT0FBTyxDQUFDLE9BQXFCO1FBQ2pDLE9BQU87WUFDTCxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUU7WUFDZCxRQUFRLEVBQUUsWUFBWTtZQUN0QixLQUFLLEVBQUUsYUFBYTtZQUNwQixLQUFLLEVBQUUsaUJBQWlCO1NBQ3pCLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQVZZLFdBQVc7SUFEdkIsZ0JBQU8sQ0FBQyxhQUFhLENBQUM7R0FDVixXQUFXLENBVXZCO0FBVlksa0NBQVcifQ==