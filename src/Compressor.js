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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compressor = void 0;
var fs = __importStar(require("fs"));
var CompressorBase_1 = require("./CompressorBase");
var path = __importStar(require("path"));
var Compressor = (function (_super) {
    __extends(Compressor, _super);
    function Compressor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Compressor.Mjolnir = function (src, dest, map) {
        return new Promise(function (resolve, reject) {
            fs.readFile(path.join(process.cwd(), map), function (err, hash) {
                var o = JSON.parse(hash.toString());
                fs.readFile(path.join(process.cwd(), src), function (err, payload) {
                    if (err)
                        reject(err);
                    var source = payload.toString();
                    Object.keys(o).forEach(function (key) {
                        var s = "." + o[key] + "(";
                        if (source.includes(s)) {
                            console.log("Mjolnor replacing", o[key] + " with " + key);
                            source = source.split(s).join("." + key + ("("));
                        }
                    });
                    fs.writeFile(path.join(process.cwd(), dest), source, function (err) {
                        if (err)
                            reject(err);
                        console.log(dest, " is now completed, see ", dest, "resulted in ", payload.length - source.length, "bytes less (", (100 - (source.length / payload.length) * 100).toFixed(2), "%)");
                        resolve();
                    });
                });
            });
        });
    };
    Compressor.loadFile = function (fullpath) {
        console.log("Loading -      ", fullpath);
        return new Promise(function (resolve, reject) {
            fs.readFile(fullpath, function (err, payload) {
                if (!err) {
                    resolve(payload);
                }
                else
                    reject(err);
            });
        });
    };
    Compressor.Pngify = function (src, dest, preHTML, customScript) {
        var _this = this;
        src = path.join(process.cwd(), src);
        return new Promise(function (resolve, reject) {
            _this.loadFile(src).then(function (payload) {
                _this.Compress(payload, preHTML, customScript).then(function (result) {
                    dest = path.join(process.cwd(), dest);
                    fs.writeFile(dest, result, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        var msg = "File created successfully ".concat(dest, ", ").concat(payload.byteLength, " resulted in ").concat(result.byteLength, ", ratio ").concat(((payload.byteLength / result.byteLength) * 100).toFixed(2), "%");
                        console.log(msg);
                        resolve();
                    });
                }).catch(function (err) {
                    reject(err);
                });
            });
        });
    };
    return Compressor;
}(CompressorBase_1.CompressorBase));
exports.Compressor = Compressor;
