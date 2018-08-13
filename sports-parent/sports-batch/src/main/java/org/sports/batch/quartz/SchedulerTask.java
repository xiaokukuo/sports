package org.sports.batch.quartz;

import java.util.ArrayList;
import java.util.List;

import org.quartz.CronScheduleBuilder;
import org.quartz.CronTrigger;
import org.quartz.Job;
import org.quartz.JobBuilder;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.JobExecutionException;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.TriggerKey;
import org.sports.core.model.BatchTaskInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import org.springframework.stereotype.Component;


@Configuration
@Component
@EnableScheduling // 该注解必须要加
public class SchedulerTask {

	@Autowired
	private SchedulerFactoryBean schedulerFactory;
	private static List<BatchTaskInfo> taskInfos = new ArrayList<BatchTaskInfo>();
	static{
		BatchTaskInfo task = new BatchTaskInfo();
		task.setId(111);
		task.setTaskName("365");
		task.setTaskGroup("group1");
		task.setCron("0 0/1 0-6,16-24 * * ?");
		task.setClassName("org.sports.batch.quartz.job.GrabDataJob");
		task.setTaskType("Y");
		
		
		BatchTaskInfo task2 = new BatchTaskInfo();
		task2.setId(111);
		task2.setTaskName("clear");
		task2.setTaskGroup("clearTable");
		task2.setCron("0 0 7 * * ?");
		task2.setClassName("org.sports.batch.quartz.job.ClearTableJob");
		task2.setTaskType("Y");
		
		taskInfos.add(task2);
		taskInfos.add(task);
	}
	
	public void execute() throws JobExecutionException, Exception {
		
		Scheduler scheduler = schedulerFactory.getScheduler();
		
		for (BatchTaskInfo taskInfo : taskInfos) {
				if ("N".equals(taskInfo.getStatus())) {
					deleteJob(taskInfo, scheduler);
				} else{
					flushJob(taskInfo, scheduler);
				}
		}
		
	}

	private void flushJob(BatchTaskInfo task,Scheduler scheduler) throws Exception {
		
		TriggerKey triggerKey = TriggerKey.triggerKey(task.getTaskName(),task.getTaskGroup());
		Trigger trigger = scheduler.getTrigger(triggerKey);
		
		boolean isNew = true;// 是否为新任务
		if (trigger != null) {
			isNew = false;
		}
		if (isNew) {
			//System.err.println("创建一个新任务");
			addJob(task, scheduler);
		}else{
			JobKey jobKey = JobKey.jobKey(task.getTaskName(),task.getTaskGroup());
			JobDataMap jdm = scheduler.getJobDetail(jobKey).getJobDataMap();
			String  oldCron =  (String) jdm.get("jobScheduler");
			if (oldCron.equals(task.getCron())) {
				System.err.println("任务不变");
			}else{
				deleteJob(task, scheduler);
				//System.err.println("任务执行时间改变");
				addJob(task, scheduler);
			}
		}

	}
	
	private void deleteJob(BatchTaskInfo task,Scheduler scheduler) throws Exception {
		JobKey jobKey = JobKey.jobKey(task.getTaskName(),task.getTaskGroup());
		scheduler.deleteJob(jobKey);
	}
	
	@SuppressWarnings({ "unchecked" })
	private void addJob(BatchTaskInfo task,Scheduler scheduler) throws Exception {
		Class<Job> clazz;
		try {
			clazz = (Class<Job>) Class.forName(task.getClassName());
		} catch (ClassNotFoundException e1) {
			return;
		}
		JobDetail jobDetail = JobBuilder.newJob(clazz)
				.withIdentity(task.getTaskName(), task.getTaskGroup())
				.build();
		jobDetail.getJobDataMap().put("jobScheduler",task.getCron());
		CronScheduleBuilder scheduleBuilder = CronScheduleBuilder.cronSchedule(task.getCron());
		CronTrigger trigger = TriggerBuilder.newTrigger()
				.withIdentity(task.getTaskName(), task.getTaskGroup())
				.withSchedule(scheduleBuilder).build();
		scheduler.scheduleJob(jobDetail, trigger);
		System.err.println("任务["+task.getTaskName()+"], 构建Quartz任务成功, cron["+task.getCron()+"]");
	}

}
