"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompressString = void 0;
var CompressorBase_1 = require("./CompressorBase");
var CompressString = (function (_super) {
    __extends(CompressString, _super);
    function CompressString() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CompressString.Pngify = function (src, preHTML, customScript) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var buffer = Buffer.from(src);
            _this.Compress(buffer, preHTML, customScript).then(function (result) {
                resolve(result);
            });
        }).catch(function (err) { return console.log(err); });
    };
    return CompressString;
}(CompressorBase_1.CompressorBase));
exports.CompressString = CompressString;
//# sourceMappingURL=CompressorFromString.js.map