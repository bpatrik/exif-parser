"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExifParser_1 = require("./ExifParser");
function getGlobal() {
    return (1, eval)('this');
}
var ExifParserFactory = /** @class */ (function () {
    function ExifParserFactory() {
    }
    ExifParserFactory.create = function (buffer, global) {
        global = global || getGlobal();
        if (buffer instanceof global.ArrayBuffer) {
            var DOMBufferStream = require('./DOMBufferStream');
            return new ExifParser_1.ExifParser(new DOMBufferStream(buffer, 0, buffer.byteLength, true, global));
        }
        else {
            var NodeBufferStream = require('./BufferStream').BufferStream;
            return new ExifParser_1.ExifParser(new NodeBufferStream(buffer, 0, buffer.length, true));
        }
    };
    return ExifParserFactory;
}());
exports.ExifParserFactory = ExifParserFactory;
//# sourceMappingURL=ExifParserFactory.js.map