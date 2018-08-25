package org.sports.batch.quartz.job;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.sports.core.service.ExponentDataService;
import org.springframework.beans.factory.annotation.Autowired;

public class ClearTableJob implements Job {
	
	@Autowired
	private ExponentDataService exponentDataService;

	@Override
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		exponentDataService.truncateTable();
	}

}
