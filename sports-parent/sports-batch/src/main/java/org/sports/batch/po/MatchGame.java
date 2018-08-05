package org.sports.batch.po;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

import org.sports.batch.constant.SplitConstant;
import org.springframework.util.StringUtils;

/**
 * 比赛项类
 */
public class MatchGame {

    private String mId;
    private String lId;
    private String time;
    private String time2;
    private String t1Id;
    private String t1CnName;
    private String t1TrName;
    private String t1EnName;
    private String t1Position;
    private String t2Id;
    private String t2CnName;
    private String t2TrName;
    private String t2EnName;
    private String t2Position;
    private String state;
    private String homeScore;
    private String guestScore;
    private String tv;
    private String flag;
    private String level;
    private String hredcard;
    private String gredcard;
    private String hyellow;
    private String gyellow;

    public MatchGame(String infoStr) {

        String[] infoArr = infoStr.split(SplitConstant.splitColumn);
        //265454,539,2009-5-6 23:00:00,,6734,学生体育,學生體育,Sportul Studentesc,14,6730,
        // 德尔塔,德爾塔,Delta Tulcea,2,0,0,0,,False;
        this.mId = infoArr[0];
        this.lId = infoArr[1];
        this.time = SplitConstant.ftf.format(
                LocalDateTime.ofInstant(
                        Instant.ofEpochMilli(Long.parseLong(infoArr[2])),
                        ZoneId.systemDefault()));

        if(!StringUtils.isEmpty(infoArr[3])){
            this.time2 = SplitConstant.ftf.format(
                    LocalDateTime.ofInstant(
                            Instant.ofEpochMilli(Long.parseLong(infoArr[3])),
                            ZoneId.systemDefault()));
        }

        this.t1Id = infoArr[4];
        this.t1CnName = infoArr[5];
        this.t1TrName = infoArr[6];
        this.t1EnName = infoArr[7];
        this.t1Position = infoArr[8] != "" ? "[" + infoArr[8] + "]" : "";
        this.t2Id = infoArr[9];
        this.t2CnName = infoArr[10];
        this.t2TrName = infoArr[11];
        this.t2EnName = infoArr[12];
        this.t2Position = infoArr[13] != "" ? "[" + infoArr[13] + "]" : "";
        this.state = infoArr[14];
        this.homeScore = infoArr[15];
        this.guestScore = infoArr[16];
        this.tv = infoArr[17];
        this.flag = "";
        if (infoArr[18] == "True") this.flag = "(中)";
        this.level = infoArr[19];
        this.hredcard = infoArr[20];
        this.gredcard = infoArr[21];
        this.hyellow = infoArr[22];
        this.gyellow = infoArr[23];

    }

    public String getmId() {
        return mId;
    }

    public void setmId(String mId) {
        this.mId = mId;
    }

    public String getlId() {
        return lId;
    }

    public void setlId(String lId) {
        this.lId = lId;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getTime2() {
        return time2;
    }

    public void setTime2(String time2) {
        this.time2 = time2;
    }

    public String getT1Id() {
        return t1Id;
    }

    public void setT1Id(String t1Id) {
        this.t1Id = t1Id;
    }

    public String getT1CnName() {
        return t1CnName;
    }

    public void setT1CnName(String t1CnName) {
        this.t1CnName = t1CnName;
    }

    public String getT1TrName() {
        return t1TrName;
    }

    public void setT1TrName(String t1TrName) {
        this.t1TrName = t1TrName;
    }

    public String getT1EnName() {
        return t1EnName;
    }

    public void setT1EnName(String t1EnName) {
        this.t1EnName = t1EnName;
    }

    public String getT1Position() {
        return t1Position;
    }

    public void setT1Position(String t1Position) {
        this.t1Position = t1Position;
    }

    public String getT2Id() {
        return t2Id;
    }

    public void setT2Id(String t2Id) {
        this.t2Id = t2Id;
    }

    public String getT2CnName() {
        return t2CnName;
    }

    public void setT2CnName(String t2CnName) {
        this.t2CnName = t2CnName;
    }

    public String getT2TrName() {
        return t2TrName;
    }

    public void setT2TrName(String t2TrName) {
        this.t2TrName = t2TrName;
    }

    public String getT2EnName() {
        return t2EnName;
    }

    public void setT2EnName(String t2EnName) {
        this.t2EnName = t2EnName;
    }

    public String getT2Position() {
        return t2Position;
    }

    public void setT2Position(String t2Position) {
        this.t2Position = t2Position;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getHomeScore() {
        return homeScore;
    }

    public void setHomeScore(String homeScore) {
        this.homeScore = homeScore;
    }

    public String getGuestScore() {
        return guestScore;
    }

    public void setGuestScore(String guestScore) {
        this.guestScore = guestScore;
    }

    public String getTv() {
        return tv;
    }

    public void setTv(String tv) {
        this.tv = tv;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getHredcard() {
        return hredcard;
    }

    public void setHredcard(String hredcard) {
        this.hredcard = hredcard;
    }

    public String getGredcard() {
        return gredcard;
    }

    public void setGredcard(String gredcard) {
        this.gredcard = gredcard;
    }

    public String getHyellow() {
        return hyellow;
    }

    public void setHyellow(String hyellow) {
        this.hyellow = hyellow;
    }

    public String getGyellow() {
        return gyellow;
    }

    public void setGyellow(String gyellow) {
        this.gyellow = gyellow;
    }
}
