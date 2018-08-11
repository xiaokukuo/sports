package org.sports.web.controller;

import java.util.List;

import org.sports.core.model.ExponentData;
import org.sports.core.model.FootballIndex;
import org.sports.core.service.ExponentDataService;
import org.sports.core.service.FootballIndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class FootballIndexController {

	@Autowired
    private ExponentDataService exponentDataService;
	
	@Autowired
    private FootballIndexService indexService;
	
	@RequestMapping("/index")
	public String footballIndex(Model model) {
		List<FootballIndex> list = indexService.findAll();
		model.addAttribute("indexList", list);
		return "football_index";
	}
	
	@GetMapping("/detail")
	public String detail(String indexId,Model model) {
		model.addAttribute("indexId", indexId);
		return "detail_index";
	}
	
	@RequestMapping("/data")
	@ResponseBody
	public List<ExponentData> getdata(String indexId) {
		return exponentDataService.findByIndexId(indexId);
	}
	
	
	@RequestMapping("/odds")
	@ResponseBody
	public List<FootballIndex> getOdds() {
		List<FootballIndex> list = indexService.findAll();
		
		return list;
	}

}
