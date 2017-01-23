package com.nan.buy.common;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;

import com.sun.xml.internal.messaging.saaj.packaging.mime.internet.MimeUtility;

/**
 * Http 用户代理解析类
 * 
 * @version 2016-09-02
 */
public class HttpUserAgentUtil {
	/**
	 * 获取客户端浏览器类型
	 * 
	 * @param req
	 *            HttpServletRequest
	 */
	public static String getUserAgent(HttpServletRequest req) {
		String userAgent = req.getHeader("User-Agent");
		if (userAgent != null)
			userAgent = userAgent.toLowerCase();
		return userAgent;
	}

	/**
	 * 编码下载文件名
	 * 
	 * @param req
	 *            HttpServletRequest
	 * @param fileName
	 *            待下载文件名
	 * @return encodeName 已编码文件名
	 */
	public static String encodeFileName(HttpServletRequest req, String fileName) {
		String agent = getUserAgent(req);
		String encodeName = null;
		try {
			String newName = URLEncoder.encode(fileName, "UTF8");
			// IE浏览器，只能采用URLEncoder编码
			if (agent.indexOf("msie") != -1 || agent.indexOf("trident") != -1) {
				encodeName = "filename=" + newName + "\"";
			}
			// Opera浏览器只能采用filename*
			else if (agent.indexOf("opera") != -1) {
				encodeName = "filename*=UTF-8''" + newName;
			}
			// Safari浏览器，只能采用ISO编码的中文输出
			else if (agent.indexOf("safari") != -1) {
				encodeName = "filename=" + new String(fileName.getBytes("UTF-8"), "ISO8859-1") + "\"";
			}
			// Chrome浏览器，只能采用MimeUtility编码或ISO编码的中文输出
			else if (agent.indexOf("applewebkit") != -1) {
				newName = MimeUtility.encodeText(fileName, "UTF8", "B");
				encodeName = "filename=" + newName + "\"";
			}
			// FireFox浏览器，可以使用MimeUtility或filename*或ISO编码的中文输出
			else if (agent.indexOf("mozilla") != -1) {
				encodeName = "filename*=UTF-8''" + newName;
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return encodeName;
	}
}
