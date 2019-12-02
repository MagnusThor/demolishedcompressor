"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
// packs /tiny/song.js into tiny.png
let html = ``;
index_1.Compressor.Pngify("/tiny-efflux/rawsong.json", "/tiny-efflux/tiny.png", html, false);
