function getCookie(name) {
    return docCookies.getItem(name);
}
function writeCookie(name, value) {
    setCookie(name, value, "h365");
}
function writeCookie2(name, value) {
    setCookie(name, value, "m20");
}
function setCookie(name, value, time) {
    function getsec(str) {
        if (Object.prototype.toString.call(str) === "[object String]" && str.length > 1) {
            try {
                var str1 = parseInt(str.substring(1, str.length));
                var str2 = str.substring(0, 1);
                switch (str2) {
                    case "s": return str1;
                    case "m": return str1 * 60;
                    case "h": return str1 * 60 * 60;
                    case "d": return str1 * 24 * 60 * 60;
                }
            } catch (e) {
            }
        }
        return 0;
    }
    return docCookies.setItem(name, value, getsec(time),"/");
}
function delCookie(name) {
    return docCookies.removeItem(name,"/");
}
var docCookies = {
    getItem: function (sKey) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || "";
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    },
    removeItem: function (sKey, sPath, sDomain) {
        if (!sKey || !this.hasItem(sKey)) { return false; }
        return this.setItem(sKey, "", Infinity, sPath, sDomain);
    },
    hasItem: function (sKey) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: /* optional method: you can safely remove it! */ function () {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
        return aKeys;
    }
};