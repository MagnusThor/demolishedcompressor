import * as fs from 'fs';
import * as path from 'path';
import * as Zlib from 'zlib';
import { crc32 } from 'crc';

export class Compressor {

    
    static Mjolnir(src:string,dest:string,map:any):Promise<any>{

        
        return new Promise((resolve, reject) => {

       fs.readFile(path.join(process.cwd(), map), (err,hash:any) => {
        var o = JSON.parse(hash.toString())
        fs.readFile(path.join(process.cwd(), src), (err, payload) => {
            if(err) reject(err);
            var source = payload.toString();
            Object.keys(o).forEach ( (key:string) => {
                var s = "." +o[key]+"(";
                if(source.includes(s)){
                    console.log("Mjolnor replacing" ,o[key] + " with " + key);
                    source = source.split(s).join("."+  key +("(")) ;
                }               
            });
            fs.writeFile(path.join(process.cwd(), dest), source, function (err) {   
                if(err) reject(err);            
                console.log(dest," is now completed, see ",dest , "resulted in " ,payload.length - source.length ,"bytes less (" ,
                (100-(source.length / payload.length)*100).toFixed(2) , "%)"
                );
                resolve();
            });
        });

        });

        });


    }
    

    /**
     * Pngify ( compress ) a javascript
     *
     * @static
     * @param {string} src
     * @param {string} dest
     * @param {string} [preHTML]
     * @param {boolean} [useScript]
     * @memberof Compressor
     */
    static Pngify(src: string, dest: string, preHTML?: string, useScript?: boolean): void {

        if (!preHTML) preHTML = '';

        const getBytes = (number: number, bytes: any) => {
            bytes = bytes || 4;
            let result: any[] | never[] | number[] | Array<number> = [];
            for (let i = 0; i < bytes; i++) {
                result = [number % 256].concat(result);
                number = number / 256 | 0;
            }
            return new Buffer(result);
        }

        const chunk = (type: string, data: Buffer) => {
            let length = getBytes(data.length, 4);
            let typeAndData = Buffer.concat([new Buffer(type, 'binary'), data]);
            return Buffer.concat([
                length,
                typeAndData,
                getBytes(crc32(typeAndData), 4)
            ]);
        }

        const bufferChunk = (buffer: Buffer, len: number) => {
            let chunks = [], i = 0, n = buffer.length;
            while (i < n) { chunks.push(buffer.slice(i, i += len)); }
            return chunks;
        }

        src = path.join(process.cwd(), src);
        
        fs.readFile(src, (err, payload) => {

            if (err) {
                console.log(err);
            }
            
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

            let script: string = "";

            if (useScript) script = `<script>z=function(){c=String.fromCharCode;q=document.querySelector.bind(document);x=q("#c").getContext("2d");x.drawImage(q("img"),0,0);d=x.getImageData(0,0,${width},${height}).data;b=[];s=1E6;p=b.push.bind(b);l=function(a){for(i=a;i<a+s&&i<d.length;i+=4)p(c(d[i])),p(c(d[i+1])),p(c(d[i+2]));a<d.length?setTimeout(function(){l(a+s)},0):(s=b.join("").replace(/\\0/g," "),(0,eval)(s))};l(0)};</script><canvas id="c" height="${height}" width="${width}"></canvas><img src=# onload=z()><!--`;

            let html = `${preHTML}${script}`;

            let htMlChunk = chunk('htMl', new Buffer(html));
            let IENDChunk = chunk('IEND', new Buffer(''));


            let scanlines = bufferChunk(payload, width * 3);
            let scanlinesBuffer = Buffer.concat(scanlines.map(function (scanline) {
                return Buffer.concat([new Buffer([0]), scanline]);
            }));


            let pngify = new Promise((resolve, reject) => {
                Zlib.deflate(scanlinesBuffer, (err, buffer) => {
                    if (err) reject();
                    let IDATData = Buffer.concat([
                        buffer,
                        getBytes(crc32(scanlinesBuffer), 4)
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

            dest = path.join(process.cwd(), dest);

            pngify.then((a: any) => {

                fs.writeFile(dest, a, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    let msg = `File created successfully, ${payload.byteLength} resulted in ${a.byteLength}, ratio ${((payload.byteLength / a.byteLength) * 100).toFixed(2)}%`;
                    console.log(msg);
                });

            });

        }
        );

    }

}


