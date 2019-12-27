"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BufferStream = /** @class */ (function () {
    function BufferStream(buffer, offset, length, bigEndian) {
        if (offset === void 0) { offset = 0; }
        if (length === void 0) { length = buffer.length; }
        this.buffer = buffer;
        this.offset = offset;
        this.length = length;
        this.bigEndian = bigEndian;
        this.endPosition = this.offset + length;
        this.setBigEndian(bigEndian);
    }
    BufferStream.prototype.setBigEndian = function (bigEndian) {
        this.bigEndian = !!bigEndian;
    };
    BufferStream.prototype.nextUInt8 = function () {
        var value = this.buffer.readUInt8(this.offset);
        this.offset += 1;
        return value;
    };
    BufferStream.prototype.nextInt8 = function () {
        var value = this.buffer.readInt8(this.offset);
        this.offset += 1;
        return value;
    };
    BufferStream.prototype.nextUInt16 = function () {
        var value = this.bigEndian ? this.buffer.readUInt16BE(this.offset) : this.buffer.readUInt16LE(this.offset);
        this.offset += 2;
        return value;
    };
    BufferStream.prototype.nextUInt32 = function () {
        var value = this.bigEndian ? this.buffer.readUInt32BE(this.offset) : this.buffer.readUInt32LE(this.offset);
        this.offset += 4;
        return value;
    };
    BufferStream.prototype.nextInt16 = function () {
        var value = this.bigEndian ? this.buffer.readInt16BE(this.offset) : this.buffer.readInt16LE(this.offset);
        this.offset += 2;
        return value;
    };
    BufferStream.prototype.nextInt32 = function () {
        var value = this.bigEndian ? this.buffer.readInt32BE(this.offset) : this.buffer.readInt32LE(this.offset);
        this.offset += 4;
        return value;
    };
    BufferStream.prototype.nextFloat = function () {
        var value = this.bigEndian ? this.buffer.readFloatBE(this.offset) : this.buffer.readFloatLE(this.offset);
        this.offset += 4;
        return value;
    };
    BufferStream.prototype.nextDouble = function () {
        var value = this.bigEndian ? this.buffer.readDoubleBE(this.offset) : this.buffer.readDoubleLE(this.offset);
        this.offset += 8;
        return value;
    };
    BufferStream.prototype.nextBuffer = function (length) {
        var value = this.buffer.slice(this.offset, this.offset + length);
        this.offset += length;
        return value;
    };
    BufferStream.prototype.remainingLength = function () {
        return this.endPosition - this.offset;
    };
    BufferStream.prototype.nextString = function (length) {
        var value = this.buffer.toString('utf8', this.offset, this.offset + length);
        this.offset += length;
        return value;
    };
    BufferStream.prototype.mark = function () {
        var self = this;
        return {
            openWithOffset: function (offset) {
                offset = (offset || 0) + this.offset;
                return new BufferStream(self.buffer, offset, self.endPosition - offset, self.bigEndian);
            },
            offset: this.offset
        };
    };
    BufferStream.prototype.offsetFrom = function (marker) {
        return this.offset - marker.offset;
    };
    BufferStream.prototype.skip = function (amount) {
        this.offset += amount;
    };
    BufferStream.prototype.branch = function (offset, length) {
        length = typeof length === 'number' ? length : this.endPosition - (this.offset + offset);
        return new BufferStream(this.buffer, this.offset + offset, length, this.bigEndian);
    };
    return BufferStream;
}());
exports.BufferStream = BufferStream;
//# sourceMappingURL=BufferStream.js.map