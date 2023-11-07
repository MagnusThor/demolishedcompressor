import { CompressorBase } from "./CompressorBase";
export declare class Compressor extends CompressorBase {
    static Mjolnir(src: string, dest: string, map: any): Promise<boolean>;
    private static loadFile;
    static Pngify(src: string, dest: string, preHTML?: string, customScript?: string): Promise<boolean>;
}
//# sourceMappingURL=Compressor.d.ts.map