export declare class DOMBufferStream {
    private arrayBuffer;
    private offset;
    private length;
    private bigEndian;
    private global;
    private parentOffset;
    view: any;
    littleEndian: any;
    constructor(arrayBuffer: any, offset: any, length: any, bigEndian: any, global: any, parentOffset: any);
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
        openWithOffset: (offset: any) => DOMBufferStream;
        offset: any;
        getParentOffset: () => any;
    };
    offsetFrom(marker: any): number;
    skip(amount: any): void;
    branch(offset: any, length: any): DOMBufferStream;
}
