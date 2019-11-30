"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const midway_1 = require("midway");
const baseService_1 = require("../baseService");
let userAuth = class userAuth extends baseService_1.baseService {
    async login() {
        // const info = {
        //   id: 1,
        //   name: '123'
        // }
        // this.setRedis('px', info)
        return this.getRedis('px');
    }
};
userAuth = __decorate([
    midway_1.provide('userAuthService')
], userAuth);
exports.userAuth = userAuth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckF1dGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3NlcnZpY2UvdXNlckF1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQSxtQ0FBZ0M7QUFFaEMsZ0RBQTZDO0FBRzdDLElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVMsU0FBUSx5QkFBVztJQUV2QyxLQUFLLENBQUMsS0FBSztRQUNULGlCQUFpQjtRQUNqQixXQUFXO1FBQ1gsZ0JBQWdCO1FBQ2hCLElBQUk7UUFDSiw0QkFBNEI7UUFDNUIsT0FBUSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzdCLENBQUM7Q0FFRixDQUFBO0FBWFksUUFBUTtJQURwQixnQkFBTyxDQUFDLGlCQUFpQixDQUFDO0dBQ2QsUUFBUSxDQVdwQjtBQVhZLDRCQUFRIn0=