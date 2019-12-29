/// <reference types="node" />
export declare class CompressorBase {
    static Compress(payload: Buffer, preHTML?: string, customScript?: string): Promise<Buffer>;
}
