declare class DeCompressor {
    unpack(i: HTMLImageElement, cb: (result: any) => {}): void;
    loadAndUpack(file: string, cb: (result: any) => {}): void;
    constructor();
    static getInstance(): DeCompressor;
}
//# sourceMappingURL=DeCompressor.d.ts.map