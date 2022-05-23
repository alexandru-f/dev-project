package com.example.subscription.config;

import java.util.Date;
import java.util.concurrent.TimeUnit;

public class AppConstants {

    public static final Date ACCESS_TOKEN_LIFETIME = new Date(System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(15));
    public static final Date REFRESH_TOKEN_LIFETIME = new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(60));
}
