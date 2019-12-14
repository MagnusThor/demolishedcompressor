"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var Zlib = __importStar(require("zlib"));
var crc_1 = require("crc");
var Compressor = (function () {
    function Compressor() {
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
    Compressor.Pngify = function (src, dest, preHTML, useScript) {
        if (!preHTML)
            preHTML = '';
        var getBytes = function (number, bytes) {
            bytes = bytes || 4;
            var result = [];
            for (var i = 0; i < bytes; i++) {
                result = [number % 256].concat(result);
                number = number / 256 | 0;
            }
            return new Buffer(result);
        };
        var chunk = function (type, data) {
            var length = getBytes(data.length, 4);
            var typeAndData = Buffer.concat([new Buffer(type, 'binary'), data]);
            return Buffer.concat([
                length,
                typeAndData,
                getBytes(crc_1.crc32(typeAndData), 4)
            ]);
        };
        var bufferChunk = function (buffer, len) {
            var chunks = [], i = 0, n = buffer.length;
            while (i < n) {
                chunks.push(buffer.slice(i, i += len));
            }
            return chunks;
        };
        src = path.join(process.cwd(), src);
        fs.readFile(src, function (err, payload) {
            if (err) {
                console.log(err);
            }
            console.log("File loaded (name,bytes):", src, payload.byteLength);
            while (payload.length % 3) {
                payload = Buffer.concat([payload, new Buffer([0])]);
            }
            var width = Math.ceil(Math.sqrt(payload.length / 3));
            var height = width;
            var padding = width * height - payload.length / 3;
            while (padding-- > 0) {
                payload = Buffer.concat([payload, new Buffer([0, 0, 0])]);
            }
            var fileSignature = new Buffer('\x89\x50\x4e\x47\x0d\x0a\x1a\x0a', 'binary');
            var IHDRChunk = chunk('IHDR', Buffer.concat([
                getBytes(width, 4),
                getBytes(height, 4),
                getBytes(8, 1),
                getBytes(2, 1),
                getBytes(0, 1),
                getBytes(0, 1),
                getBytes(0, 1)
            ]));
            var script = "";
            if (useScript)
                script = "<script>z=function(){c=String.fromCharCode;q=document.querySelector.bind(document);x=q(\"#c\").getContext(\"2d\");x.drawImage(q(\"img\"),0,0);d=x.getImageData(0,0," + width + "," + height + ").data;b=[];s=1E6;p=b.push.bind(b);l=function(a){for(i=a;i<a+s&&i<d.length;i+=4)p(c(d[i])),p(c(d[i+1])),p(c(d[i+2]));a<d.length?setTimeout(function(){l(a+s)},0):(s=b.join(\"\").replace(/\\0/g,\" \"),(0,eval)(s))};l(0)};</script><canvas id=\"c\" height=\"" + height + "\" width=\"" + width + "\"></canvas><img src=# onload=z()><!--";
            var html = "" + preHTML + script;
            var htMlChunk = chunk('htMl', new Buffer(html));
            var IENDChunk = chunk('IEND', new Buffer(''));
            var scanlines = bufferChunk(payload, width * 3);
            var scanlinesBuffer = Buffer.concat(scanlines.map(function (scanline) {
                return Buffer.concat([new Buffer([0]), scanline]);
            }));
            var pngify = new Promise(function (resolve, reject) {
                Zlib.deflate(scanlinesBuffer, function (err, buffer) {
                    if (err)
                        reject();
                    var IDATData = Buffer.concat([
                        buffer,
                        getBytes(crc_1.crc32(scanlinesBuffer), 4)
                    ]);
                    var IDATChunk = chunk('IDAT', IDATData);
                    resolve(Buffer.concat([
                        fileSignature,
                        IHDRChunk,
                        htMlChunk,
                        IDATChunk,
                        IENDChunk
                    ]));
                });
            });
            dest = path.join(process.cwd(), dest);
            pngify.then(function (a) {
                fs.writeFile(dest, a, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    var msg = "File created successfully, " + payload.byteLength + " resulted in " + a.byteLength + ", ratio " + ((payload.byteLength / a.byteLength) * 100).toFixed(2) + "%";
                    console.log(msg);
                });
            });
        });
    };
    return Compressor;
}());
exports.Compressor = Compressor;
