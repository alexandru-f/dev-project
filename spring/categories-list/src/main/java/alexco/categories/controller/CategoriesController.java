package alexco.categories.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CategoriesController {

//    @GetMapping("/home")
//    public String getHomeItems() {
//        return "home items";
//    }

    @PostMapping("/category/{category}")
    public String addItem(@PathVariable String category) {

    }
}
