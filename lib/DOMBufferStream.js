"use strict";
/*jslint browser: true, devel: true, bitwise: false, debug: true, eqeq: false, es5: true, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: false, unparam: false, sloppy: true, stupid: false, sub: false, todo: true, lets: true, white: true */
Object.defineProperty(exports, "__esModule", { value: true });
var DOMBufferStream = /** @class */ (function () {
    function DOMBufferStream(arrayBuffer, offset, length, bigEndian, global, parentOffset) {
        this.arrayBuffer = arrayBuffer;
        this.offset = offset;
        this.length = length;
        this.bigEndian = bigEndian;
        this.global = global;
        this.parentOffset = parentOffset;
        this.global = global;
        offset = offset || 0;
        length = length || (arrayBuffer.byteLength - offset);
        this.arrayBuffer = arrayBuffer.slice(offset, offset + length);
        this.view = new global.DataView(this.arrayBuffer, 0, this.arrayBuffer.byteLength);
        this.setBigEndian(bigEndian);
        this.offset = 0;
        this.parentOffset = (parentOffset || 0) + offset;
    }
    DOMBufferStream.prototype.setBigEndian = function (bigEndian) {
        this.littleEndian = !bigEndian;
    };
    DOMBufferStream.prototype.nextUInt8 = function () {
        var value = this.view.getUint8(this.offset);
        this.offset += 1;
        return value;
    };
    DOMBufferStream.prototype.nextInt8 = function () {
        var value = this.view.getInt8(this.offset);
        this.offset += 1;
        return value;
    };
    DOMBufferStream.prototype.nextUInt16 = function () {
        var value = this.view.getUint16(this.offset, this.littleEndian);
        this.offset += 2;
        return value;
    };
    DOMBufferStream.prototype.nextUInt32 = function () {
        var value = this.view.getUint32(this.offset, this.littleEndian);
        this.offset += 4;
        return value;
    };
    DOMBufferStream.prototype.nextInt16 = function () {
        var value = this.view.getInt16(this.offset, this.littleEndian);
        this.offset += 2;
        return value;
    };
    DOMBufferStream.prototype.nextInt32 = function () {
        var value = this.view.getInt32(this.offset, this.littleEndian);
        this.offset += 4;
        return value;
    };
    DOMBufferStream.prototype.nextFloat = function () {
        var value = this.view.getFloat32(this.offset, this.littleEndian);
        this.offset += 4;
        return value;
    };
    DOMBufferStream.prototype.nextDouble = function () {
        var value = this.view.getFloat64(this.offset, this.littleEndian);
        this.offset += 8;
        return value;
    };
    DOMBufferStream.prototype.nextBuffer = function (length) {
        //this won't work in IE10
        var value = this.arrayBuffer.slice(this.offset, this.offset + length);
        this.offset += length;
        return value;
    };
    DOMBufferStream.prototype.remainingLength = function () {
        return this.arrayBuffer.byteLength - this.offset;
    };
    DOMBufferStream.prototype.nextString = function (length) {
        var value = this.arrayBuffer.slice(this.offset, this.offset + length);
        value = String.fromCharCode.apply(null, new this.global.Uint8Array(value));
        this.offset += length;
        return value;
    };
    DOMBufferStream.prototype.mark = function () {
        var self = this;
        return {
            openWithOffset: function (offset) {
                offset = (offset || 0) + this.offset;
                return new DOMBufferStream(self.arrayBuffer, offset, self.arrayBuffer.byteLength - offset, !self.littleEndian, self.global, self.parentOffset);
            },
            offset: this.offset,
            getParentOffset: function () {
                return self.parentOffset;
            }
        };
    };
    DOMBufferStream.prototype.offsetFrom = function (marker) {
        return this.parentOffset + this.offset - (marker.offset + marker.getParentOffset());
    };
    DOMBufferStream.prototype.skip = function (amount) {
        this.offset += amount;
    };
    DOMBufferStream.prototype.branch = function (offset, length) {
        length = typeof length === 'number' ? length : this.arrayBuffer.byteLength - (this.offset + offset);
        return new DOMBufferStream(this.arrayBuffer, this.offset + offset, length, !this.littleEndian, this.global, this.parentOffset);
    };
    return DOMBufferStream;
}());
exports.DOMBufferStream = DOMBufferStream;
//# sourceMappingURL=DOMBufferStream.js.map