"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
exports.default = (0, yup_1.object)({
    body: (0, yup_1.object)({
        preferredAlias: (0, yup_1.string)()
            .min(2, "Your preferred Alias must be at least 2 characters")
            .max(32, "Your preferred Alias must be at most 32 characters"),
        destination: (0, yup_1.string)()
            .url("Must be a valid URL")
            .required("A long URL is required"),
    }),
});
