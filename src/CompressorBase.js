"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var crc_1 = require("crc");
var Zlib = __importStar(require("zlib"));
var CompressorBase = (function () {
    function CompressorBase() {
    }
    CompressorBase.Compress = function (payload, preHTML, customScript) {
        return new Promise(function (resolve, reject) {
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
            if (!customScript) {
                script = "<script>z=function(){c=String.fromCharCode;q=document.querySelector.bind(document);x=q(\"#c\").getContext(\"2d\");x.drawImage(q(\"img\"),0,0);d=x.getImageData(0,0," + width + "," + height + ").data;b=[];s=1E6;p=b.push.bind(b);l=function(a){for(i=a;i<a+s&&i<d.length;i+=4)p(c(d[i])),p(c(d[i+1])),p(c(d[i+2]));a<d.length?setTimeout(function(){l(a+s)},0):(s=b.join(\"\").replace(/\\0/g,\" \"),(0,eval)(s))};l(0)};</script><canvas id=\"c\" height=\"" + height + "\" width=\"" + width + "\"></canvas><img src=# onload=z()><!--";
            }
            else {
                script = "<script>" + customScript + "</script><canvas id=\"c\" height=\"" + height + "\" width=\"" + width + "\"></canvas><img src=# onload=z()><!--";
            }
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
            pngify.then(function (result) {
                resolve(result);
            }).catch(function (err) { return reject(err); });
        });
    };
    return CompressorBase;
}());
exports.CompressorBase = CompressorBase;
