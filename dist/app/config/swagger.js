"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "RentNest API",
        version: "1.0.0",
        description: "Rental House Management Backend API",
    },
    servers: [
        {
            url: "http://localhost:5000/api/v1",
        },
    ],
    paths: {
        "/auth/register": {
            post: {
                summary: "Register User",
            },
        },
        "/auth/login": {
            post: {
                summary: "Login User",
            },
        },
        "/auth/me": {
            get: {
                summary: "Current User",
            },
        },
        "/categories": {
            get: {
                summary: "All Categories",
            },
            post: {
                summary: "Create Category",
            },
        },
        "/properties": {
            get: {
                summary: "All Properties",
            },
            post: {
                summary: "Create Property",
            },
        },
        "/rentals": {
            get: {
                summary: "Rental History",
            },
            post: {
                summary: "Create Rental",
            },
        },
        "/payments": {
            get: {
                summary: "Payment History",
            },
        },
        "/reviews": {
            post: {
                summary: "Create Review",
            },
        },
        "/admin/users": {
            get: {
                summary: "All Users",
            },
        },
    },
};
exports.default = swaggerDocument;
