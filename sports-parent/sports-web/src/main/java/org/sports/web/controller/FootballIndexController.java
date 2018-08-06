package org.sports.web.controller;

import java.util.List;

import org.sports.core.model.ExponentData;
import org.sports.core.service.ExponentDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class FootballIndexController {

	@Autowired
    private ExponentDataService exponentDataService;
	
	@RequestMapping("/hello")
	public String hello() {
		return "index";
	}
	
	@RequestMapping("/data")
	@ResponseBody
	public List<ExponentData> getdata() {
		return exponentDataService.findAll();
	}

}
