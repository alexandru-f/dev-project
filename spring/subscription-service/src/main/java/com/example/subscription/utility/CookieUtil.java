package com.example.subscription.utility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.net.CookieStore;
import java.util.Arrays;
import java.util.Optional;

@Component
public class CookieUtil {

    @Autowired
    HttpServletRequest request;

    public Optional<String> getCookieValue(String cookieName) {
        if (request.getCookies() == null) {
            return Optional.empty();
        }
        return Arrays.stream(request.getCookies())
                .filter(c -> c.getName().equals(cookieName))
                .map(Cookie::getValue)
                .findAny();
    }

    public Cookie createCookie(String cookieName, String cookieValue, int cookieAgeInMinutes, boolean isSecure) {
        Cookie cookie = new Cookie(cookieName, cookieValue);
        cookie.setMaxAge(cookieAgeInMinutes * 60);
        cookie.setPath("/");
        if (isSecure) {
        //To activate to set HTTPS only
//            cookie.setSecure(true);
            cookie.setHttpOnly(true);
        }
        return cookie;
    }
}
