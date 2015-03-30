/* This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {

    /* These tests make sure that the allFeeds variable has been 
     * defined and that it is not empty.
     */

    describe('RSS Feeds', function() {

        var e = 0;

        beforeEach(function() {
            e++;
        });

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have a non-empty url-string for each feed', function() {
            expect(allFeeds[e].url).toBeDefined();
            expect(allFeeds[e].url).not.toEqual('');
        });

        it('have a non-empty name-string for each feed', function() {
            expect(allFeeds[e].name).toBeDefined();
            expect(allFeeds[e].name).not.toEqual('');
        });

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
            loadFeed(0, function () {
                done();
            });
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
        
        var oldTitle = allFeeds[0].name;
        var newTitle;

        testContent = function (num) {

            it("changes the content to that of the selected feed", function(done) {
                
                var newTitle = allFeeds[num].name;
                loadFeed(num);
                console.log(oldTitle, newTitle);
                expect(newTitle).not.toBe(oldTitle);
                loadFeed(0);
                done();
            }); 
        };

        for (i = 1; i < allFeeds.length; i++) {
            testContent(i);
        }
    });
}());