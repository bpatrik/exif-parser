export declare class BufferStream {
    private buffer;
    offset: number;
    private length;
    private bigEndian?;
    endPosition: any;
    constructor(buffer: any, offset?: number, length?: number, bigEndian?: boolean);
    setBigEndian(bigEndian: any): void;
    nextUInt8(): any;
    nextInt8(): any;
    nextUInt16(): any;
    nextUInt32(): any;
    nextInt16(): any;
    nextInt32(): any;
    nextFloat(): any;
    nextDouble(): any;
    nextBuffer(length: any): any;
    remainingLength(): number;
    nextString(length: any): any;
    mark(): {
        openWithOffset(offset: any): BufferStream;
        offset: number;
    };
    offsetFrom(marker: any): number;
    skip(amount: any): void;
    branch(offset: any, length: any): BufferStream;
}
