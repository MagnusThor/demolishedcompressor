"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Compressor_1 = require("../src/Compressor");
Compressor_1.Compressor.Mjolnir("/example/builds/foo.js", "/example/builds/foo-mjolnir.js", "/example/mjolnir-webgl.json").then(function () {
    var html = "<canvas style=\"width:100%;height:100vh;left:0;position:absolute\" id=w width=640 height=360/>\n  <style>body{margin:0;background:0}</style>";
    Compressor_1.Compressor.Pngify("/example/builds/foo-mjolnir.min.js", "/example/builds/foo-mjolnir.png.html", html).catch(function (err) {
        console.log(err);
    }).then(function () {
    });
}).catch(function (err) {
    console.error(err);
});
