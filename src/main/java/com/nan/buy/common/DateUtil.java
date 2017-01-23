package com.nan.buy.common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;


/**
 * 时间格式
 * @date 2016-09-02
 */
public class DateUtil {
	 /**
     * @author handanian
     */
    public DateUtil() {
        // TODO Auto-generated constructor stub
    }

    /**
     * 日期转换成字符串
     * 
     * @param date
     *            日期
     * @return String
     */
    public static String dateConvertString(Date date) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        return format.format(date);
    }

    /**
     * 用pattern指定的格式格式date
     * 
     * @param date
     *            日期
     * @param pattern
     *            日期格式
     * @return String
     */
    public static String dateConvertString(Date date, String pattern) {
        SimpleDateFormat format = new SimpleDateFormat(pattern);
        return format.format(date);
    }

    /**
     * @Description: TODO 日期转换成标准日期格式
     * @param date
     * @return
     * @author handanian
     * @date 2014年9月17日
     */
    public static Date dateConvertDate(Date date) {
        String dateString = dateConvertString(date);
        Date descDate = stringConvertDate(dateString);
        return descDate;
    }

    /**
     * 转换日期格式
     * 
     * @param dateStr
     *            日期格式
     * @return Date
     */
    public static Date stringConvertDate(String dateStr) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return format.parse(dateStr);
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 转化字符串日期为Date
     * 
     * @param dateStr
     *            日期字符串
     * @param pattern
     *            日期格式
     * @return Date
     */
    public static Date stringConvertDate(String dateStr, String pattern) {
        SimpleDateFormat format = new SimpleDateFormat(pattern);
        try {
            return format.parse(dateStr);
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 时间字符串转化成日期    
     * 
     * @param dateStr
     *            日期字符串
     * @return Date
     */
    public static Date stringConvertDateTime(String dateStr) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            return format.parse(dateStr);
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 转化date日期为字符串
     * 
     * @param date
     *            日期
     * @return String
     */
    public static String dateConvertStringTime(Date date) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            return format.format(date);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }

    public static String dateConvertStringType(Date date) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
        try {
            return format.format(date);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 获得指定日期的后一天
     * 
     * @param specifiedDay
     * @return
     */
    public static Date getSpecifiedDayAfter(Date specifiedDay) {
        Calendar c = Calendar.getInstance();
        c.setTime(specifiedDay);
        int day = c.get(Calendar.DATE);
        c.set(Calendar.DATE, day + 1);
        return c.getTime();
    }

    /**
     * 获得指定日期的前一天
     * 
     * @param specifiedDay
     * @return
     */
    public static Date getSpecifiedDayBefore(Date specifiedDay) {
        Calendar c = Calendar.getInstance();
        c.setTime(specifiedDay);
        int day = c.get(Calendar.DATE);
        c.set(Calendar.DATE, day - 1);
        return c.getTime();
    }

    /**
     * 获取上个月的同一天
     * 
     * @param date
     * @return
     */
    public static Date getDateOfLastMonth(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.MONTH, -1);
        return cal.getTime();
    }

    public static Date addMonths(Date date, int amount) {
        return add(date, 2, amount);
    }

    /**
     * 获取日期所在全年周数（中国）
     * 
     * @return
     */
    public static int getWeekNumber(Date date) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        int weekNum = c.get(Calendar.WEEK_OF_YEAR);
        // 如果日期为周日，周数-1
        int hour = c.get(Calendar.DAY_OF_WEEK);
        if (hour == 1) {
            weekNum = weekNum - 1;
        }
        return weekNum;
    }

    /**
     * 获取日期所在全年天数（中国）
     * 
     * @return
     */
    public static int getDayNumber(Date date) {
        Calendar c = Calendar.getInstance(Locale.CHINA);
        c.setTime(date);
        int dayNum = c.get(Calendar.DAY_OF_YEAR);
        return dayNum;
    }

    /**
     * 根据全年指定天数获取日期（中国）
     * 
     * @author dingxingang
     * @param dayNum
     *            全年指定天数
     * @return
     */
    public static Date getDayFromDayNumber(int dayNum) {
        Calendar c = Calendar.getInstance(Locale.CHINA);
        c.set(Calendar.DAY_OF_YEAR, dayNum);
        return c.getTime();
    }

    /**
     * 获取日期所在周日日期
     * 
     * @author dingxingang
     * @param date
     * @return
     */
    public static Date getWeekMondaySaturday(Date date) {
        Calendar c = Calendar.getInstance(Locale.CHINA);
        c.setFirstDayOfWeek(Calendar.MONDAY); // 以周1为首日
        c.setTime(date);
        c.set(Calendar.DAY_OF_WEEK, Calendar.SATURDAY);
        return c.getTime();
    }

    public static Date addDays(Date date, int amount) {
        return add(date, 5, amount);
    }

    /**
     * 获取日期所在周一日期
     * 
     * @param date
     * @return
     */
    public static Date getWeekMonday(Date date) {
        Calendar c = Calendar.getInstance(Locale.CHINA);
        c.setFirstDayOfWeek(Calendar.MONDAY); // 以周1为首日
        c.setTime(date);
        c.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        return c.getTime();
    }

    /**
     * 字符串的日期格式的计算
     */
    public static int daysBetween(String smdate, String bdate) {
        if (StrUtil.isEmpty(smdate) || StrUtil.isEmpty(bdate)) {
            return 0;
        }
        Calendar cal = Calendar.getInstance();
        cal.setTime(DateUtil.stringConvertDate(smdate, "yyyy-MM-dd"));
        long time1 = cal.getTimeInMillis();
        cal.setTime(DateUtil.stringConvertDate(bdate, "yyyy-MM-dd"));
        long time2 = cal.getTimeInMillis();
        long between_days = (time2 - time1) / (1000 * 3600 * 24);
        return Integer.parseInt(String.valueOf(between_days));
    }

    /**
     * 日期加法
     * 
     * @param date
     * @param calendarField
     *            参数
     * @param amount
     * @return
     */
    private static Date add(Date date, int calendarField, int amount) {
        if (date == null) {
            return null;
        } else {
            Calendar c = Calendar.getInstance();
            c.setTime(date);
            c.add(calendarField, amount);
            return c.getTime();
        }
    }

    /**
     * 比对两日期大小
     * 
     * @param DATE1
     * @param DATE2
     * @return DATE1>=DATE2 : true (DATE1 在 DATE2之后)
     */
    public static boolean compare(Date DATE1, Date DATE2) {
        if (DATE1.getTime() >= DATE2.getTime()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 字符串转秒 格式 **小时**分**秒
     * 
     * @author xupeixi
     * @return
     */
    public static Double strConvertSecond(String str) {
        int hoursInx = str.indexOf("小");
        int hours1Inx = str.indexOf("时");
        int minuteInx = str.indexOf("分");
        int secondInx = str.indexOf("秒");
        double hours = 0; // 时
        double minute = 0;// 分
        double second = 0; // 秒
        if (hoursInx > 0) {
            hours = Double.parseDouble(str.substring(0, hoursInx)) * 3600;
        }
        if (minuteInx > 0 && hours1Inx <= 0) {
            minute = Double.parseDouble(str.substring(0, minuteInx)) * 60;
        }
        if (minuteInx > 0 && hours1Inx > 0) {
            minute = Double.parseDouble(str.substring(hours1Inx + 1, minuteInx)) * 60;
        }
        if (secondInx > 0 && minuteInx <= 0) {
            second = Double.parseDouble(str.substring(0, secondInx)) * 60;
        }
        if (secondInx > 0 && minuteInx > 0) {
            second = Double.parseDouble(str.substring(minuteInx + 1, secondInx));
        }
        second = hours + minute + second;
        return second;
    }

    /**
     * 时间转换 秒转字符 格式 为 **小时**分**秒
     * 
     * @author xupeixi
     * @param second
     * @return
     */
    public static String secondConvertStr(Double secondCount) {
        int hours = 0;// 时
        int minute = 0; // 分
        int second = 0; // 秒
        if (secondCount % 60 == 0) {
            minute = (int) (secondCount / 60);
        } else {
            minute = (int) (secondCount / 60);
            second = (int) (secondCount % 60);
        }
        if (minute > 60) {
            if (minute % 60 == 0) {
                hours = (int) (minute / 60);
            } else {
                hours = (int) (minute / 60);
                minute = (int) (minute % 60);
            }
        }
        String callTime = "";
        if (hours > 0) {
            callTime = hours + "时";
        }
        if (minute > 0) {
            callTime = callTime + minute + "分";
        }

        callTime = callTime + second + "秒";
        return callTime;

    }

    /**
     * 返回日期- 日
     * 
     * @author xupeixi
     * @param date
     * @return
     */
    public static int getDayByDate(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        return cal.get(Calendar.DAY_OF_MONTH);
    }

    public static int getMonthByDate(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        return cal.get(Calendar.MONTH) + 1;
    }
    /**
     * 当前年的上一年
     * 
     */
    public static Long getBeforeYear() {
        Calendar a=Calendar.getInstance();
        return new Long(a.get(Calendar.YEAR)-1);
    }
    /**
     * 当前月份的上一个月
     * 
     */
    public static String getBeforeMonth() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MONTH, -1);
        return sdf.format(cal.getTime());
    }
    /**
     * 当前季度的上一个季度的最后一个月
     * 
     */
    public static String getBeforeQuarterMonth() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MONTH, 0);
        String st = sdf.format(cal.getTime());
        String year = st.substring(0, 4);
        String month = st.substring(5);
        if(month.equals("01") || month.equals("02") || month.equals("03")) {
            year = new Integer(Integer.parseInt(year) - 1).toString();
            month = "12";
        } else if(month.equals("04") || month.equals("05") || month.equals("06")) {
            month = "03";
        } else if(month.equals("07") || month.equals("08") || month.equals("09")) {
            month = "06";
        } else if(month.equals("10") || month.equals("11") || month.equals("12")) {
            month = "09";
        }
        return year+"-"+month;
    }
    
    /**
     * 根据年月返回上一月
     * @param year 字符串年份
     * @param month 字符串月份
     * @return String YYYY年MM月
     */
	public static String getLastMonth(String year, String month){
		if(year ==null || year.equals("")) return null;
		if(month ==null || month.equals("")) return null;
		Date date = DateUtil.stringConvertDate(year + "-" + month, "yyyy-MM");
		Calendar ca = Calendar.getInstance();
		ca.setTime(date);
		ca.add(Calendar.MONTH, -1);
		return DateUtil.dateConvertString(ca.getTime(), "yyyy-MM");
	}
	/**
     * 当前季度的上一个季度
     * 
     */
    public static String getBeforeQuarter() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MONTH, 0);
        String st = sdf.format(cal.getTime());
        String year = st.substring(0, 4);
        String month = st.substring(5);
        if(month.equals("01") || month.equals("02") || month.equals("03")) {
            year = new Integer(Integer.parseInt(year) - 1).toString();
            month = "4";
        } else if(month.equals("04") || month.equals("05") || month.equals("06")) {
            month = "1";
        } else if(month.equals("07") || month.equals("08") || month.equals("09")) {
            month = "2";
        } else if(month.equals("10") || month.equals("11") || month.equals("12")) {
            month = "3";
        }
        return year+"-"+month;
    }
    /**
     * 当前时间的上一个半年的最后一个月
     * 
     */
    public static String getBeforeHalfYear() {
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
    	Calendar cal = Calendar.getInstance();
    	cal.setTime(new Date());
    	cal.add(Calendar.MONTH, 0);
    	String st = sdf.format(cal.getTime());
    	String year = st.substring(0, 4);
    	String month = st.substring(5);
    	if(month.equals("01") || month.equals("02") || month.equals("03")||month.equals("04") || month.equals("05") || month.equals("06")) {
    		year = new Integer(Integer.parseInt(year) - 1).toString();
    		month = "12";
    	} else if(month.equals("07") || month.equals("08") || month.equals("09")||month.equals("10") || month.equals("11") || month.equals("12")) {
    		month = "06";
    	}
    	return year+"-"+month;
    }
	
	/**
     * 根据年月返回上一个季度的最后一月
     * @param year 字符串年份
     * @param month 字符串月份
     * @return String YYYY年MM月
     */
	public static String getLastQuarterMonth(String year, String month){
		if(year ==null || year.equals("")) return null;
		if(month ==null || month.equals("")) return null;
		Date date = DateUtil.stringConvertDate(year + "-" + month, "yyyy-MM");
		Calendar ca = Calendar.getInstance();
		ca.setTime(date);
		ca.add(Calendar.MONTH, -3);
		return DateUtil.dateConvertString(ca.getTime(), "yyyy-MM");
	}
	
	public static int getNowYear() {
		Calendar calendar = Calendar.getInstance();
		return calendar.get(Calendar.YEAR);
	}
	
	public static int getNowMonth() {
		Calendar calendar = Calendar.getInstance();
		return calendar.get(Calendar.MONTH) + 1;
	}
    
}
