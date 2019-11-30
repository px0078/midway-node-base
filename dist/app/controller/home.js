"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const midway_1 = require("midway");
let HomeController = class HomeController {
    async index() {
        console.log('px', await this.service.login());
        this.ctx.body = `hello world!`;
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], HomeController.prototype, "ctx", void 0);
__decorate([
    midway_1.inject('userAuthService'),
    __metadata("design:type", Object)
], HomeController.prototype, "service", void 0);
__decorate([
    midway_1.get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "index", null);
HomeController = __decorate([
    midway_1.provide(),
    midway_1.controller('/')
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29udHJvbGxlci9ob21lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW1FO0FBSW5FLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFTekIsS0FBSyxDQUFDLEtBQUs7UUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtRQUM3QyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxjQUFjLENBQUM7SUFDakMsQ0FBQztDQUNGLENBQUE7QUFWQztJQURDLGVBQU0sRUFBRTs7MkNBQ0k7QUFHYjtJQURDLGVBQU0sQ0FBQyxpQkFBaUIsQ0FBQzs7K0NBQ2I7QUFHYjtJQURDLFlBQUcsQ0FBQyxHQUFHLENBQUM7Ozs7MkNBSVI7QUFaVSxjQUFjO0lBRjFCLGdCQUFPLEVBQUU7SUFDVCxtQkFBVSxDQUFDLEdBQUcsQ0FBQztHQUNILGNBQWMsQ0FhMUI7QUFiWSx3Q0FBYyJ9