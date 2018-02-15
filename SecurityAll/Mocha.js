/*npm install --global mocha
$ npm install --save-dev mocha

"scripts": {
    "test": "mocha"
} */


describe('User', function() {
    describe('#save()', function() {
        it('should save without error', function(done) {
            var user = new User('Luna');
            user.save(function(err) {
                if (err) done(err);
                else done();
            });
        });
    });
});