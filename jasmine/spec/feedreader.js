/* This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {

    var LEN = allFeeds.length;
    /* These tests make sure that the allFeeds variable has been 
     * defined and that it is not empty.
     */

    describe('RSS Feeds', function() {
        it('are defined', function() {
                expect(allFeeds).toBeDefined();
                expect(allFeeds.length).not.toBe(0);
            });

        testContent = function (e) { 

            it('have a non-empty url-string for feed number ' + e, function() {
                expect(allFeeds[e].url).toBeDefined();
                expect(allFeeds[e].url).not.toEqual('');
            });

            it('have a non-empty name-string for feed number ' + e, function() {
                expect(allFeeds[e].name).toBeDefined();
                expect(allFeeds[e].name).not.toEqual('');
            });
        };

        for (var i = 0; i < LEN; i++) {
            testContent(i);
        }

    });

    describe("The menu", function() {

        /* This test ensures that the menu element is
         * hidden by default.
         */

        it("is hidden by default", function () {
            expect($("body").attr("class")).toBe("menu-hidden");
        });

        /* This test ensures that the menu changes
         * visibility when the menu icon is clicked.
         */

        it("changes visibility when the menu button is clicked", function () {

            var menuIcon = $('.menu-icon-link');
            
            $('body').removeClass('menu-hidden');

            menuIcon.click();

            expect($('body').attr("class")).toBe("menu-hidden");
        });
    });

    /* This test ensures that when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */

    describe("Initial Entries", function () {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it("contain at least one feed", function (done) {
            expect(document.getElementsByClassName('feed')[0].hasChildNodes()).toBe(true);
            done();
        });
    });

    /* This test ensures that when a new feed is loaded
     * by the loadFeed function, the content actually changes.
     */

    describe("New Feed Selection", function () {

        var oldTitle,
            newTitle,
            len = allFeeds.length;

        testContent = function (num) {
            describe("of feed " + num, function () {

                beforeEach(function (done) {
                    oldTitle = $('.header-title').text();
                    loadFeed(num, done);
                });

                it("changes the content to that of feed " + num, function (done) {
                    newTitle = $('.header-title').text();
                    expect(newTitle).toBeDefined();
                    if (num > 0) {
                        expect(newTitle).not.toBe(oldTitle);
                    }
                    done();
                });
            });
        };
        for (var i = LEN - 1; i > -1; i--) {
            testContent(i);
        }
    });

}());