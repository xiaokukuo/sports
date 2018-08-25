package org.sports.web.invocation;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class ThreadPoolTest {
	
	public static void main(String[] args) {
		ThreadPoolExecutor excuter = new ThreadPoolExecutor(
				5,
				10,
				300,
				TimeUnit.SECONDS, 
				new LinkedBlockingQueue<>());
		
		excuter.prestartCoreThread(); //方法会创建核心线程数的线程来等待任务
		excuter.allowCoreThreadTimeOut(true); //超出 keepAliveTime空闲的核心线程会销毁
		
		ExecutorService cachedThreadPool = Executors.newScheduledThreadPool(3);
		
	}

}
