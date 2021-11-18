var CookieService = /** @class */ (function () {
    function CookieService() {
    }
    CookieService.prototype.get = function (cookieName) {
        var cookieList = window.top.document.cookie.split("; ");
        var cookieValue = "";
        for (var i = 0; i < cookieList.length; i++) {
            // separate name-value pairs
            var cookie = decodeURIComponent(cookieList[i]);
            var name = cookie.substring(0, cookie.indexOf("="));
            var value = cookie.substring(cookie.indexOf("=") + 1);
            // Compare the cookie name
            if (cookieName == name) {
                cookieValue = value;
                break;
            }
        }
        if (cookieValue == "undefined" || cookieValue == null)
            cookieValue = "";
        return cookieValue;
    };
    CookieService.prototype.set = function (name, value) {
        var isPermanent = true;
        // if there are three arguments
        if (arguments.length == 3) {
            isPermanent = arguments[2];
        }
        // Create a cookie string to write to the cookie file
        var cookieToken = name + "=" + decodeURIComponent(value) + ";";
        // if this is a permanent cookie
        if (isPermanent == true) {
            // Set the expiration date of the cookie to be one year from now
            var expDate = new Date();
            expDate.setDate(365 + expDate.getDate());
            cookieToken = cookieToken + " " +
                "expires=" + expDate.toUTCString() + ";";
        }
        window.top.document.cookie = cookieToken;
    };
    return CookieService;
}());
export { CookieService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc3BsaXQvIiwic291cmNlcyI6WyJjb29raWVTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQUE7SUFpREEsQ0FBQztJQWhEQSwyQkFBRyxHQUFILFVBQUksVUFBa0I7UUFDckIsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFFckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0MsNEJBQTRCO1lBQzVCLElBQUksTUFBTSxHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNwRCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFdEQsMEJBQTBCO1lBQzFCLElBQUksVUFBVSxJQUFJLElBQUksRUFBRTtnQkFDdkIsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDcEIsTUFBTTthQUNOO1NBQ0Q7UUFFRCxJQUFJLFdBQVcsSUFBSSxXQUFXLElBQUksV0FBVyxJQUFJLElBQUk7WUFDcEQsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUVsQixPQUFPLFdBQVcsQ0FBQztJQUNwQixDQUFDO0lBRUQsMkJBQUcsR0FBSCxVQUFJLElBQVcsRUFBRSxLQUFZO1FBQzVCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztRQUV2QiwrQkFBK0I7UUFDL0IsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsRUFDekI7WUFDQyxXQUFXLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNCO1FBRUQscURBQXFEO1FBQ3JELElBQUksV0FBVyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBRS9ELGdDQUFnQztRQUNoQyxJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQ3ZCO1lBQ0MsZ0VBQWdFO1lBQ2hFLElBQUksT0FBTyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDekIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFFekMsV0FBVyxHQUFHLFdBQVcsR0FBRyxHQUFHO2dCQUM1QixVQUFVLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQztTQUM1QztRQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7SUFDMUMsQ0FBQztJQUNGLG9CQUFDO0FBQUQsQ0FBQyxBQWpERCxJQWlEQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDb29raWVTZXJ2aWNlIHtcclxuXHRnZXQoY29va2llTmFtZTogc3RyaW5nKSB7XHJcblx0XHR2YXIgY29va2llTGlzdCA9IHdpbmRvdy50b3AuZG9jdW1lbnQuY29va2llLnNwbGl0KFwiOyBcIik7XHJcblx0XHR2YXIgY29va2llVmFsdWUgPSBcIlwiO1xyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY29va2llTGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHQvLyBzZXBhcmF0ZSBuYW1lLXZhbHVlIHBhaXJzXHJcblx0XHRcdHZhciBjb29raWUgPSBkZWNvZGVVUklDb21wb25lbnQoY29va2llTGlzdFtpXSk7XHJcblx0XHRcdHZhciBuYW1lID0gY29va2llLnN1YnN0cmluZygwLCBjb29raWUuaW5kZXhPZihcIj1cIikpO1xyXG5cdFx0XHR2YXIgdmFsdWUgPSBjb29raWUuc3Vic3RyaW5nKGNvb2tpZS5pbmRleE9mKFwiPVwiKSArIDEpO1xyXG5cclxuXHRcdFx0Ly8gQ29tcGFyZSB0aGUgY29va2llIG5hbWVcclxuXHRcdFx0aWYgKGNvb2tpZU5hbWUgPT0gbmFtZSkge1xyXG5cdFx0XHRcdGNvb2tpZVZhbHVlID0gdmFsdWU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY29va2llVmFsdWUgPT0gXCJ1bmRlZmluZWRcIiB8fCBjb29raWVWYWx1ZSA9PSBudWxsKVxyXG5cdFx0XHRjb29raWVWYWx1ZSA9IFwiXCI7XHJcblxyXG5cdFx0cmV0dXJuIGNvb2tpZVZhbHVlO1xyXG5cdH1cclxuXHRcclxuXHRzZXQobmFtZTpzdHJpbmcsIHZhbHVlOnN0cmluZykge1xyXG5cdFx0dmFyIGlzUGVybWFuZW50ID0gdHJ1ZTtcclxuXHJcblx0XHQvLyBpZiB0aGVyZSBhcmUgdGhyZWUgYXJndW1lbnRzXHJcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAzKVxyXG5cdFx0e1xyXG5cdFx0XHRpc1Blcm1hbmVudCA9IGFyZ3VtZW50c1syXTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDcmVhdGUgYSBjb29raWUgc3RyaW5nIHRvIHdyaXRlIHRvIHRoZSBjb29raWUgZmlsZVxyXG5cdFx0dmFyIGNvb2tpZVRva2VuID0gbmFtZSArIFwiPVwiICsgZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKSArIFwiO1wiO1xyXG5cclxuXHRcdC8vIGlmIHRoaXMgaXMgYSBwZXJtYW5lbnQgY29va2llXHJcblx0XHRpZiAoaXNQZXJtYW5lbnQgPT0gdHJ1ZSlcclxuXHRcdHtcclxuXHRcdFx0Ly8gU2V0IHRoZSBleHBpcmF0aW9uIGRhdGUgb2YgdGhlIGNvb2tpZSB0byBiZSBvbmUgeWVhciBmcm9tIG5vd1xyXG5cdFx0XHR2YXIgZXhwRGF0ZSA9IG5ldyBEYXRlKCk7XHJcblx0XHRcdGV4cERhdGUuc2V0RGF0ZSgzNjUgKyBleHBEYXRlLmdldERhdGUoKSk7XHJcblxyXG5cdFx0XHRjb29raWVUb2tlbiA9IGNvb2tpZVRva2VuICsgXCIgXCIgKyBcclxuXHRcdFx0XHRcdFx0XCJleHBpcmVzPVwiICsgZXhwRGF0ZS50b1VUQ1N0cmluZygpICsgXCI7XCI7XHJcblx0XHR9XHJcblxyXG5cdFx0d2luZG93LnRvcC5kb2N1bWVudC5jb29raWUgPSBjb29raWVUb2tlbjtcdFx0XHJcblx0fVxyXG59Il19