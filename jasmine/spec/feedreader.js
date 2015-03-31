/* This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {

    var len = allFeeds.length;
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

        for (var i = 0; i < len; i++) {
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


        it("are not a duplicates of each other", function () {
            for (var i = 0; i < len; i++) {
                var url = allFeeds[i].url;
                for (var x = 0; x < len; x++) {
                    if (i != x) {
                        expect(url).not.toBe(allFeeds[x].url);  
                    }

                }

            }
            
        });
    });

    /* This test ensures that when a new feed is loaded
     * by the loadFeed function, the content actually changes.
     */

    describe("New Feed Selection", function () {

        var initialSnip = '',
            newSnip;

        testContent = function (num) {
            describe("of feed " + num, function () {

                beforeEach(function (done) {
                    loadFeed(num, done);
                });

                it("changes the content to that of feed " + num, function (done) {
                    newSnip = $('.feed .entry p')[0].innerHTML;
                    expect(newSnip).toBeDefined();
                    if (num > 0) {
                        expect(newSnip).not.toBe(initialSnip);
                    }
                    done();
                });
            });
        };

        for (var i = len - 1; i > -1; i--) {
            testContent(i);
        }
    });
}());