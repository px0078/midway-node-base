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
let UserController = class UserController {
    async getUser() {
        const id = this.ctx.params.id;
        const user = await this.service.getUser({ id });
        this.ctx.body = { success: true, message: 'OK', data: user };
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], UserController.prototype, "ctx", void 0);
__decorate([
    midway_1.inject('userService'),
    __metadata("design:type", Object)
], UserController.prototype, "service", void 0);
__decorate([
    midway_1.get('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
UserController = __decorate([
    midway_1.provide(),
    midway_1.controller('/user')
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29udHJvbGxlci91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW1FO0FBS25FLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFTekIsS0FBSyxDQUFDLE9BQU87UUFDWCxNQUFNLEVBQUUsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDdEMsTUFBTSxJQUFJLEdBQWdCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUM3RCxDQUFDO0NBQ0YsQ0FBQTtBQVhDO0lBREMsZUFBTSxFQUFFOzsyQ0FDSTtBQUdiO0lBREMsZUFBTSxDQUFDLGFBQWEsQ0FBQzs7K0NBQ0E7QUFHdEI7SUFEQyxZQUFHLENBQUMsTUFBTSxDQUFDOzs7OzZDQUtYO0FBYlUsY0FBYztJQUYxQixnQkFBTyxFQUFFO0lBQ1QsbUJBQVUsQ0FBQyxPQUFPLENBQUM7R0FDUCxjQUFjLENBYzFCO0FBZFksd0NBQWMifQ==