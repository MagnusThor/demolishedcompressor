import * as fs from 'fs';
import { CompressorBase } from "./CompressorBase";
import * as path from 'path';

export class Compressor extends CompressorBase {
/**
     * Mjolnir - Hash methods of any API using a map, reduce names etc..
     *
     * @static
     * @param {string} src
     * @param {string} dest
     * @param {*} map
     * @returns {Promise<any>}
     * @memberof Compressor
     */
    static Mjolnir(src: string, dest: string, map: any): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(process.cwd(), map), (err, hash: any) => {
                var o = JSON.parse(hash.toString());
                fs.readFile(path.join(process.cwd(), src), (err, payload) => {
                    if (err)
                        reject(false);
                    var source = payload.toString();
                    Object.keys(o).forEach((key: string) => {
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
                        resolve(true);
                    });
                });
            });
        });
    }
    /**
     * Load a file
     *
     * @private
     * @static
     * @param {string} fullpath
     * @returns {Promise<Buffer>}
     * @memberof Compressor
     */
    private static loadFile(fullpath: string): Promise<Buffer> {
        console.log("Loading -      " ,fullpath);
        return new Promise((resolve, reject) => {
            fs.readFile(fullpath, (err, payload) => {
                if (!err) {
                    resolve(payload);
                }
                else
                    reject(err);
            });
        });
    }
    /**
     * Pngify ( compress ) a javascript file
     * Creates
     * @static
     * @param {string} src
     * @param {string} dest
     * @param {string} [preHTML]
     * @param {boolean} [customScript]
     * @memberof Compressor
     */
    static Pngify(src: string, dest: string, preHTML?: string, customScript?: string): Promise<any> {
        src = path.join(process.cwd(), src);

        return new Promise((resolve, reject) => {
            this.loadFile(src).then(payload => {
                this.Compress(payload, preHTML, customScript).then(result => {
                    dest = path.join(process.cwd(), dest);

                    fs.writeFile(dest, result, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        let msg = `File created successfully ${dest}, ${payload.byteLength} resulted in ${result.byteLength}, ratio ${((payload.byteLength / result.byteLength) * 100).toFixed(2)}%`;
                        console.log(msg);
                        resolve(true);
                    });
                }).catch(err => {
                    reject(err);
                });
            });
        });
    }
}