package com.example.subscription.config;

import java.util.Date;
import java.util.concurrent.TimeUnit;

public class AppConstants {

    public static final long ACCESS_TOKEN_LIFETIME = TimeUnit.MINUTES.toMillis(60);
    public static final long REFRESH_TOKEN_LIFETIME = TimeUnit.MINUTES.toMillis(43800);
}
