"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
                        var msg = "File created successfully " + dest + ", " + payload.byteLength + " resulted in " + result.byteLength + ", ratio " + ((payload.byteLength / result.byteLength) * 100).toFixed(2) + "%";
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
