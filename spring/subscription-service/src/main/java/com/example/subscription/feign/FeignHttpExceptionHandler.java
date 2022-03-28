package com.example.subscription.feign;

import feign.Response;

public interface FeignHttpExceptionHandler {

    Exception handle(Response response);
}
