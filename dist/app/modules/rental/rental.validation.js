"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRentalValidation = void 0;
const zod_1 = require("zod");
exports.createRentalValidation = zod_1.z.object({
    body: zod_1.z.object({
        propertyId: zod_1.z.string(),
        moveInDate: zod_1.z.string(),
    }),
});
