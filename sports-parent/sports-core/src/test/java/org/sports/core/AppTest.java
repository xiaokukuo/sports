package org.sports.core;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.sports.core.model.ExponentData;
import org.sports.core.service.ExponentDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import junit.framework.TestCase;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AppTest extends TestCase {
	
	@Autowired
	private ExponentDataService exponentDataService;

	@Test
	public void contextLoads() {
		List<ExponentData> list = exponentDataService.findAll();
		System.out.println(list.toArray());
	}
	
}
