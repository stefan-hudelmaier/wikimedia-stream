"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wikimedia_streams_1 = __importDefault(require("wikimedia-streams"));
// "recentchange" can be replaced with any valid stream. 
const stream = new wikimedia_streams_1.default("recentchange");
stream.on("recentchange", (data, event) => {
    console.log(JSON.stringify(data, null, 2));
});
