package org.sports.batch.https;

import java.io.IOException;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

public class HttpTool {
	
	/**
	 * 创建 json的 HttpGet请求
	 * @param url
	 * @return
	 */
	private static HttpGet newHttpGetOdds(String url){
		
		HttpGet request = new HttpGet(url); // 创建httget


		return request;
	}
	
	public static String getOdds(String url){
		HttpGet request = newHttpGetOdds(url);
		try {
			
			HttpClient httpclient = HttpClients.createDefault(); // 创建httpclient
			HttpResponse response = httpclient.execute(request);
			
			StatusLine statusLine = response.getStatusLine();

			if (statusLine.getStatusCode() == HttpStatus.SC_OK) {
				HttpEntity entity = response.getEntity();
				String responseStr = EntityUtils.toString(entity);
				return responseStr;
			} 
			
			System.err.println("发送失败");
		
		} catch (IOException e) {
			System.err.println("发送失败"+e);
		}
		return null;
	}
	


}
