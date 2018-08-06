package org.sports.batch;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.sports.batch.handle.GrabDataHandle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import junit.framework.TestCase;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AppTest extends TestCase {
	
	@Autowired
	private GrabDataHandle grabDataHandle;

	@Test
	public void contextLoads() {
		grabDataHandle.grab();
	}
	
}
