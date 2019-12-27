"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var ExifParserFactory_1 = require("../lib/ExifParserFactory");
var assert = require("assert");
describe('ExifParser', function () {
    it('Should parse image', function () {
        var buf = fs.readFileSync(__dirname + '/assets/image2.jpg');
        var actual = ExifParserFactory_1.ExifParserFactory.create(buf).parse();
        var expected = require(__dirname + '/assets/expected-image2.json');
        delete actual.imageSize;
        delete actual.startMarker.openWithOffset;
        assert.deepEqual(actual, expected);
    });
});
//# sourceMappingURL=ExifParser.spec.js.map