"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const Zlib = __importStar(require("zlib"));
const crc_1 = require("crc");
class Compressor {
    static Pngify(src, dest, preHTML) {
        console.clear();
        if (!preHTML)
            preHTML = '';
        const getBytes = (number, bytes) => {
            bytes = bytes || 4;
            let result = [];
            for (let i = 0; i < bytes; i++) {
                result = [number % 256].concat(result);
                number = number / 256 | 0;
            }
            return new Buffer(result);
        };
        const chunk = (type, data) => {
            let length = getBytes(data.length, 4);
            let typeAndData = Buffer.concat([new Buffer(type, 'binary'), data]);
            return Buffer.concat([
                length,
                typeAndData,
                getBytes(crc_1.crc32(typeAndData), 4)
            ]);
        };
        const bufferChunk = (buffer, len) => {
            let chunks = [], i = 0, n = buffer.length;
            while (i < n) {
                chunks.push(buffer.slice(i, i += len));
            }
            return chunks;
        };
        fs.readFile(path.join(__dirname, src), (err, payload) => {
            console.log("File loaded (name,bytes):", src, payload.byteLength);
            while (payload.length % 3) {
                payload = Buffer.concat([payload, new Buffer([0])]);
            }
            let width = Math.ceil(Math.sqrt(payload.length / 3));
            let height = width;
            let padding = width * height - payload.length / 3;
            while (padding-- > 0) {
                payload = Buffer.concat([payload, new Buffer([0, 0, 0])]);
            }
            let fileSignature = new Buffer('\x89\x50\x4e\x47\x0d\x0a\x1a\x0a', 'binary');
            let IHDRChunk = chunk('IHDR', Buffer.concat([
                getBytes(width, 4),
                getBytes(height, 4),
                getBytes(8, 1),
                getBytes(2, 1),
                getBytes(0, 1),
                getBytes(0, 1),
                getBytes(0, 1)
            ]));
            let html = `
            ${preHTML}
            <script>
            z=function(){c=String.fromCharCode;q=document.querySelector.bind(document);x=q("#c").getContext("2d");x.drawImage(q("img"),0,0);d=x.getImageData(0,0,${width},${height}).data;b=[];s=1E6;p=b.push.bind(b);l=function(a){for(i=a;i<a+s&&i<d.length;i+=4)p(c(d[i])),p(c(d[i+1])),p(c(d[i+2]));a<d.length?setTimeout(function(){l(a+s)},0):(s=b.join("").replace(/\\0/g," "),(0,eval)(s))};l(0)};
            </script>
            <canvas id="c" height="${height}" width="${width}"></canvas><img src=# onload=z()><!--
            `;
            let htMlChunk = chunk('htMl', new Buffer(html));
            let IENDChunk = chunk('IEND', new Buffer(''));
            let scanlines = bufferChunk(payload, width * 3);
            let scanlinesBuffer = Buffer.concat(scanlines.map(function (scanline) {
                return Buffer.concat([new Buffer([0]), scanline]);
            }));
            let pngify = new Promise((resolve, reject) => {
                Zlib.deflate(scanlinesBuffer, (err, buffer) => {
                    if (err)
                        reject();
                    let IDATData = Buffer.concat([
                        buffer,
                        getBytes(crc_1.crc32(scanlinesBuffer), 4)
                    ]);
                    let IDATChunk = chunk('IDAT', IDATData);
                    resolve(Buffer.concat([
                        fileSignature,
                        IHDRChunk,
                        htMlChunk,
                        IDATChunk,
                        IENDChunk
                    ]));
                });
            });
            pngify.then((a) => {
                fs.writeFile(dest, a, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    let msg = `File created successfully, ${payload.byteLength} resulted in ${a.byteLength}, ratio ${(a.byteLength / payload.byteLength) * 100}%`;
                    console.log(msg);
                });
            });
        });
    }
}
exports.Compressor = Compressor;
