package com.example.subscription.filter;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.subscription.utility.CookieUtil;
import com.example.subscription.utility.TokensUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

import static com.example.subscription.config.AppConstants.ACCESS_TOKEN_LIFETIME;
import static com.example.subscription.config.AppConstants.REFRESH_TOKEN_LIFETIME;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
public class CustomAuthorizationFilter extends OncePerRequestFilter {

    @Autowired
    private TokensUtil tokensUtil;

    @Autowired
    private CookieUtil helper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        /*
         * If user tries to login, continue process without doing anything
         * */
        if (request.getServletPath().equals("/api/v1/user/login")
                || request.getServletPath().equals("/api/v1/user/token/refresh")
                || request.getServletPath().equals("/api/v1/user/company/signup")) {
            filterChain.doFilter(request, response);
        } else {
            String accessToken = null;
            String authorizationHeader = request.getHeader(AUTHORIZATION);
            String cookieValue = helper.getCookieValue("accessToken").orElse(null);
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                accessToken = authorizationHeader.substring("Bearer ".length());
            } else if (cookieValue != null) {
                accessToken = cookieValue;
            }
            if (accessToken != null) {
                try {
                    DecodedJWT decodedJWT = tokensUtil.createDecodedJWT(accessToken);
                    String username = decodedJWT.getSubject();
                    String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
                    Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
                    Arrays.stream(roles).forEach(role -> {
                        authorities.add(new SimpleGrantedAuthority(role));
                    });
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                            username, null, authorities
                    );
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    filterChain.doFilter(request, response);
                } catch(Exception exception) {
                    response.setHeader("error", exception.getMessage());
                    response.setStatus(UNAUTHORIZED.value());
                    response.setContentType(APPLICATION_JSON_VALUE);
                    Map<String, String> error = new HashMap<>();
                    error.put("message", "You are not logged in");
                    new ObjectMapper().writeValue(response.getOutputStream(), error);
                }
            } else {
                response.setStatus(UNAUTHORIZED.value());
                response.setContentType(APPLICATION_JSON_VALUE);
                Map<String, String> error = new HashMap<>();
                error.put("message", "You are not logged in");
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        }
    }
}
