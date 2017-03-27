export class CookieService {
	get(cookieName: string) {
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
	
	set(name:string, value:string) {
		var isPermanent = true;

		// if there are three arguments
		if (arguments.length == 3)
		{
			isPermanent = arguments[2];
		}

		// Create a cookie string to write to the cookie file
		var cookieToken = name + "=" + decodeURIComponent(value) + ";";

		// if this is a permanent cookie
		if (isPermanent == true)
		{
			// Set the expiration date of the cookie to be one year from now
			var expDate = new Date();
			expDate.setDate(365 + expDate.getDate());

			cookieToken = cookieToken + " " + 
						"expires=" + expDate.toUTCString() + ";";
		}

		window.top.document.cookie = cookieToken;		
	}
}