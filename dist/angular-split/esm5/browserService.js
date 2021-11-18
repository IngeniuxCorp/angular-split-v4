var BrowserService = /** @class */ (function () {
    function BrowserService() {
    }
    BrowserService.isIE = function () {
        var ua = window.navigator.userAgent;
        // Test values; Uncomment to check result …
        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        // IE 12 / Spartan
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
        // Edge (IE 12+)
        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }
        // other browser
        return false;
    };
    return BrowserService;
}());
export { BrowserService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3NlclNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNwbGl0LyIsInNvdXJjZXMiOlsiYnJvd3NlclNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7SUFBQTtJQXdDQSxDQUFDO0lBdkNjLG1CQUFJLEdBQWxCO1FBQ0MsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7UUFFcEMsMkNBQTJDO1FBRTNDLFFBQVE7UUFDUiwyRUFBMkU7UUFFM0UsUUFBUTtRQUNSLHdFQUF3RTtRQUV4RSxrQkFBa0I7UUFDbEIsa0lBQWtJO1FBRWxJLGdCQUFnQjtRQUNoQiwwSUFBMEk7UUFFMUksSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQixJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDYiwwQ0FBMEM7WUFDMUMsT0FBTyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDbkU7UUFFRCxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRTtZQUNoQixpQ0FBaUM7WUFDakMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixPQUFPLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMvRDtRQUVELElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO1lBQ2IseUNBQXlDO1lBQ3pDLE9BQU8sUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ25FO1FBRUQsZ0JBQWdCO1FBQ2hCLE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUNGLHFCQUFDO0FBQUQsQ0FBQyxBQXhDRCxJQXdDQyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuZXhwb3J0IGNsYXNzIEJyb3dzZXJTZXJ2aWNlIHtcclxuXHRwdWJsaWMgc3RhdGljIGlzSUUoKTogbnVtYmVyIHwgYm9vbGVhbiB7XHJcblx0XHR2YXIgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcclxuXHJcblx0XHQvLyBUZXN0IHZhbHVlczsgVW5jb21tZW50IHRvIGNoZWNrIHJlc3VsdCDigKZcclxuXHJcblx0XHQvLyBJRSAxMFxyXG5cdFx0Ly8gdWEgPSAnTW96aWxsYS81LjAgKGNvbXBhdGlibGU7IE1TSUUgMTAuMDsgV2luZG93cyBOVCA2LjI7IFRyaWRlbnQvNi4wKSc7XHJcblxyXG5cdFx0Ly8gSUUgMTFcclxuXHRcdC8vIHVhID0gJ01vemlsbGEvNS4wIChXaW5kb3dzIE5UIDYuMzsgVHJpZGVudC83LjA7IHJ2OjExLjApIGxpa2UgR2Vja28nO1xyXG5cclxuXHRcdC8vIElFIDEyIC8gU3BhcnRhblxyXG5cdFx0Ly8gdWEgPSAnTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV09XNjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8zOS4wLjIxNzEuNzEgU2FmYXJpLzUzNy4zNiBFZGdlLzEyLjAnO1xyXG5cclxuXHRcdC8vIEVkZ2UgKElFIDEyKylcclxuXHRcdC8vIHVhID0gJ01vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS80Ni4wLjI0ODYuMCBTYWZhcmkvNTM3LjM2IEVkZ2UvMTMuMTA1ODYnO1xyXG5cclxuXHRcdHZhciBtc2llID0gdWEuaW5kZXhPZignTVNJRSAnKTtcclxuXHRcdGlmIChtc2llID4gMCkge1xyXG5cdFx0XHQvLyBJRSAxMCBvciBvbGRlciA9PiByZXR1cm4gdmVyc2lvbiBudW1iZXJcclxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHVhLnN1YnN0cmluZyhtc2llICsgNSwgdWEuaW5kZXhPZignLicsIG1zaWUpKSwgMTApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciB0cmlkZW50ID0gdWEuaW5kZXhPZignVHJpZGVudC8nKTtcclxuXHRcdGlmICh0cmlkZW50ID4gMCkge1xyXG5cdFx0XHQvLyBJRSAxMSA9PiByZXR1cm4gdmVyc2lvbiBudW1iZXJcclxuXHRcdFx0dmFyIHJ2ID0gdWEuaW5kZXhPZigncnY6Jyk7XHJcblx0XHRcdHJldHVybiBwYXJzZUludCh1YS5zdWJzdHJpbmcocnYgKyAzLCB1YS5pbmRleE9mKCcuJywgcnYpKSwgMTApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBlZGdlID0gdWEuaW5kZXhPZignRWRnZS8nKTtcclxuXHRcdGlmIChlZGdlID4gMCkge1xyXG5cdFx0XHQvLyBFZGdlIChJRSAxMispID0+IHJldHVybiB2ZXJzaW9uIG51bWJlclxyXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQodWEuc3Vic3RyaW5nKGVkZ2UgKyA1LCB1YS5pbmRleE9mKCcuJywgZWRnZSkpLCAxMCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gb3RoZXIgYnJvd3NlclxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxufSJdfQ==