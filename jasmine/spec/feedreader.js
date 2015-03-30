/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
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

    /* TODO: Write a new test suite named "The menu" */

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
    describe("The menu", function() {

        it("is hidden by default", function () {
            expect($("body").attr("class")).toBe("menu-hidden");
        });

        it("changes visibility when the menu button is clicked", function () {
            var menuIcon = $('.menu-icon-link');
            
            $('body').removeClass('menu-hidden');

            menuIcon.click();

            expect($('body').attr("class")).toBe("menu-hidden");
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
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
        var newTitle = 0;

        beforeEach(function(done) {

            
            loadFeed(2, function () {
                newTitle = allFeeds[2].name;
                done();
            });
        });

        afterEach(function () {
            loadFeed(0);
        });

        it("changes the content to that of the new feed", function (done) {
            expect(newTitle).not.toBe(oldTitle);
            done();
        });
        
    });
}());