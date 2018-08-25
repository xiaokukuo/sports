package org.sports.web.controller;

import java.io.IOException;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class YanZhengController {

	@RequestMapping(value = "/captcha", method = RequestMethod.GET)
	@ResponseBody
	public void captcha(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		RandomCodeUtil rdnu = RandomCodeUtil.Instance();
		//RandomCodeUtil 
		HttpSession session = request.getSession();
		// 取得随机字符串放入Session中
		session.setAttribute("RANDOMCODE", rdnu.getString());
	
		
		// 将图像输出到Servlet输出流中。
		ServletOutputStream sos = response.getOutputStream();
		ImageIO.write(rdnu.getBuffImg(), "jpeg", sos);
		sos.close();
	}
	@RequestMapping(value = "/yanz")
	@ResponseBody
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		request.setCharacterEncoding("UTF-8"); 
		response.setCharacterEncoding("UTF-8");
		
		String code = request.getParameter("captcha");
		HttpSession session = request.getSession();
		if (!code.equalsIgnoreCase((String) session.getAttribute("RANDOMCODE"))) {
			request.setAttribute("errormsg", "验证码不正确");
			response.getWriter().println("<script> type='text/javascript'>window.alert('*验证码错误！');window.location.href='login.jsp'</script>");
		}
		response.getWriter().println("<script> type='text/javascript'>window.alert('*用户登录成功！');window.location.href='login.jsp'</script>");
	}
 
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}


}
