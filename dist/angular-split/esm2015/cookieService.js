export class CookieService {
    get(cookieName) {
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
    }
    set(name, value) {
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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc3BsaXQvIiwic291cmNlcyI6WyJjb29raWVTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sT0FBTyxhQUFhO0lBQ3pCLEdBQUcsQ0FBQyxVQUFrQjtRQUNyQixJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hELElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUVyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQyw0QkFBNEI7WUFDNUIsSUFBSSxNQUFNLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3BELElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUV0RCwwQkFBMEI7WUFDMUIsSUFBSSxVQUFVLElBQUksSUFBSSxFQUFFO2dCQUN2QixXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixNQUFNO2FBQ047U0FDRDtRQUVELElBQUksV0FBVyxJQUFJLFdBQVcsSUFBSSxXQUFXLElBQUksSUFBSTtZQUNwRCxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBRWxCLE9BQU8sV0FBVyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBVyxFQUFFLEtBQVk7UUFDNUIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRXZCLCtCQUErQjtRQUMvQixJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUN6QjtZQUNDLFdBQVcsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0I7UUFFRCxxREFBcUQ7UUFDckQsSUFBSSxXQUFXLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7UUFFL0QsZ0NBQWdDO1FBQ2hDLElBQUksV0FBVyxJQUFJLElBQUksRUFDdkI7WUFDQyxnRUFBZ0U7WUFDaEUsSUFBSSxPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUN6QixPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUV6QyxXQUFXLEdBQUcsV0FBVyxHQUFHLEdBQUc7Z0JBQzVCLFVBQVUsR0FBRyxPQUFPLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDO1NBQzVDO1FBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztJQUMxQyxDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ29va2llU2VydmljZSB7XHJcblx0Z2V0KGNvb2tpZU5hbWU6IHN0cmluZykge1xyXG5cdFx0dmFyIGNvb2tpZUxpc3QgPSB3aW5kb3cudG9wLmRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjsgXCIpO1xyXG5cdFx0dmFyIGNvb2tpZVZhbHVlID0gXCJcIjtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNvb2tpZUxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0Ly8gc2VwYXJhdGUgbmFtZS12YWx1ZSBwYWlyc1xyXG5cdFx0XHR2YXIgY29va2llID0gZGVjb2RlVVJJQ29tcG9uZW50KGNvb2tpZUxpc3RbaV0pO1xyXG5cdFx0XHR2YXIgbmFtZSA9IGNvb2tpZS5zdWJzdHJpbmcoMCwgY29va2llLmluZGV4T2YoXCI9XCIpKTtcclxuXHRcdFx0dmFyIHZhbHVlID0gY29va2llLnN1YnN0cmluZyhjb29raWUuaW5kZXhPZihcIj1cIikgKyAxKTtcclxuXHJcblx0XHRcdC8vIENvbXBhcmUgdGhlIGNvb2tpZSBuYW1lXHJcblx0XHRcdGlmIChjb29raWVOYW1lID09IG5hbWUpIHtcclxuXHRcdFx0XHRjb29raWVWYWx1ZSA9IHZhbHVlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNvb2tpZVZhbHVlID09IFwidW5kZWZpbmVkXCIgfHwgY29va2llVmFsdWUgPT0gbnVsbClcclxuXHRcdFx0Y29va2llVmFsdWUgPSBcIlwiO1xyXG5cclxuXHRcdHJldHVybiBjb29raWVWYWx1ZTtcclxuXHR9XHJcblx0XHJcblx0c2V0KG5hbWU6c3RyaW5nLCB2YWx1ZTpzdHJpbmcpIHtcclxuXHRcdHZhciBpc1Blcm1hbmVudCA9IHRydWU7XHJcblxyXG5cdFx0Ly8gaWYgdGhlcmUgYXJlIHRocmVlIGFyZ3VtZW50c1xyXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMylcclxuXHRcdHtcclxuXHRcdFx0aXNQZXJtYW5lbnQgPSBhcmd1bWVudHNbMl07XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ3JlYXRlIGEgY29va2llIHN0cmluZyB0byB3cml0ZSB0byB0aGUgY29va2llIGZpbGVcclxuXHRcdHZhciBjb29raWVUb2tlbiA9IG5hbWUgKyBcIj1cIiArIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkgKyBcIjtcIjtcclxuXHJcblx0XHQvLyBpZiB0aGlzIGlzIGEgcGVybWFuZW50IGNvb2tpZVxyXG5cdFx0aWYgKGlzUGVybWFuZW50ID09IHRydWUpXHJcblx0XHR7XHJcblx0XHRcdC8vIFNldCB0aGUgZXhwaXJhdGlvbiBkYXRlIG9mIHRoZSBjb29raWUgdG8gYmUgb25lIHllYXIgZnJvbSBub3dcclxuXHRcdFx0dmFyIGV4cERhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cdFx0XHRleHBEYXRlLnNldERhdGUoMzY1ICsgZXhwRGF0ZS5nZXREYXRlKCkpO1xyXG5cclxuXHRcdFx0Y29va2llVG9rZW4gPSBjb29raWVUb2tlbiArIFwiIFwiICsgXHJcblx0XHRcdFx0XHRcdFwiZXhwaXJlcz1cIiArIGV4cERhdGUudG9VVENTdHJpbmcoKSArIFwiO1wiO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdpbmRvdy50b3AuZG9jdW1lbnQuY29va2llID0gY29va2llVG9rZW47XHRcdFxyXG5cdH1cclxufSJdfQ==