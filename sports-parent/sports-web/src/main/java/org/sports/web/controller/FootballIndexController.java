package org.sports.web.controller;

import java.util.List;

import org.sports.core.model.ExponentData;
import org.sports.core.model.FootballIndex;
import org.sports.core.service.ExponentDataService;
import org.sports.core.service.FootballIndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class FootballIndexController {

	@Autowired
    private ExponentDataService exponentDataService;
	
	@Autowired
    private FootballIndexService indexService;
	
	@RequestMapping("/list")
	public String footballIndex(Model model) {
		List<FootballIndex> list = indexService.findAll();
		model.addAttribute("indexList", list);
		return "football_index";
	}
	
	@RequestMapping("/test")
	public String test() {
		return "test";
	}
	
	@RequestMapping("/hello")
	public String hello() {
		return "index";
	}
	
	@RequestMapping("/data")
	@ResponseBody
	public List<ExponentData> getdata() {
		return exponentDataService.findByIndexId("1580334476");
	}

}
