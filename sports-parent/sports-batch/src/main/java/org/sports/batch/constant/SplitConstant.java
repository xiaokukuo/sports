package org.sports.batch.constant;

import java.time.format.DateTimeFormatter;

public class SplitConstant {
    public static DateTimeFormatter ftf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    //公共变量
    public static String splitDomain = "\\$";
    public static String splitRecord = ";";
    public static String splitColumn = ",";

}
