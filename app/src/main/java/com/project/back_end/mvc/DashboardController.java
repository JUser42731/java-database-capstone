package com.project.back_end.mvc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class DashboardController {

    @Autowired
    private Service service;

    @GetMapping("/adminDashboard/{token}")
    public String adminDashboard(@PathVariable("token") String token) {
        if (service.validateToken(token, "admin")) {
            return "admin/adminDashboard";
        } else {
            return "redirect:/";
        }
    }

  
    @GetMapping("/doctorDashboard/{token}")
    public String doctorDashboard(@PathVariable("token") String token) {
        if (service.validateToken(token, "doctor")) {
            return "doctor/doctorDashboard";
        } else {
            return "redirect:/";
        }
    }
}
