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
exports.isAuthenticated = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("./user/user.service");
let isAuthenticated = class isAuthenticated {
    constructor(jwt, userService) {
        this.jwt = jwt;
        this.userService = userService;
    }
    async use(req, res, next) {
        try {
            if (!(req.headers.authorization &&
                req.headers.authorization.startsWith('Bearer'))) {
                throw new common_1.HttpException('No token found', common_1.HttpStatus.NOT_FOUND);
            }
            console.log(req.headers);
            const token = req.headers.authorization.split(' ')[1];
            const decoded = await this.jwt.verify(token);
            const user = await this.userService.getOne(decoded.email);
            if (!user) {
                throw new common_1.HttpException('권한 없음', common_1.HttpStatus.UNAUTHORIZED);
            }
            req.user = user;
            next();
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
isAuthenticated = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], isAuthenticated);
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=app.middleware.js.map