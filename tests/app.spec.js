let chai = require('chai'),
    path = require('path');

chai.should();

describe('MochaTest', () => {
    describe('test group', () => {
        let rectangle;

        beforeEach(() => {
            rectangle = {test: 1};
        });

        it('should pass', () => {
            rectangle.test.should.equal(1);
        });
    });
});