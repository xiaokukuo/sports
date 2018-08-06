package org.sports.batch.quartz.job;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.sports.batch.handle.GrabDataHandle;
import org.sports.core.common.ApplicationContextProvider;

public class GrabDataJob implements Job {
	
	private static Logger logger = LoggerFactory.getLogger(GrabDataJob.class);

	private GrabDataHandle grabDataHandle;
	
	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		logger.info("GrabDataJob");
		grabDataHandle = ApplicationContextProvider.getApplicationContext().getBean(GrabDataHandle.class);
		grabDataHandle.grab();
	}

}
