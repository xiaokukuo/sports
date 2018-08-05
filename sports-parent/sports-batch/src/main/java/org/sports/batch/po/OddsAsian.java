package org.sports.batch.po;

import org.sports.batch.constant.SplitConstant;

/**
 * 亚赔信息
 */
public class OddsAsian {

    private String mid;
    private String cid;
    private String goalF;
    private String homeF;
    private String awayF;
    private String goal;
    private String home;
    private String away;
    private String close;
    private String zoudi;

    public OddsAsian(String infoStr) {
        String[] infoArr = infoStr.split(SplitConstant.splitColumn); //209092,8,0.5,0.95,0.95,0.5,1.025,0.875,False,False;
        this.mid = infoArr[0];
        this.cid = infoArr[1];
        this.goalF = infoArr[2];
        this.homeF = infoArr[3];
        this.awayF = infoArr[4];
        this.goal = infoArr[5];
        this.home = infoArr[6];
        this.away = infoArr[7];
        this.close = infoArr[8];
        this.zoudi = infoArr[9];
    }

    public String getMid() {
        return mid;
    }

    public void setMid(String mid) {
        this.mid = mid;
    }

    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }

    public String getGoalF() {
        return goalF;
    }

    public void setGoalF(String goalF) {
        this.goalF = goalF;
    }

    public String getHomeF() {
        return homeF;
    }

    public void setHomeF(String homeF) {
        this.homeF = homeF;
    }

    public String getAwayF() {
        return awayF;
    }

    public void setAwayF(String awayF) {
        this.awayF = awayF;
    }

    public String getGoal() {
        return goal;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }

    public String getHome() {
        return home;
    }

    public void setHome(String home) {
        this.home = home;
    }

    public String getAway() {
        return away;
    }

    public void setAway(String away) {
        this.away = away;
    }

    public String getClose() {
        return close;
    }

    public void setClose(String close) {
        this.close = close;
    }

    public String getZoudi() {
        return zoudi;
    }

    public void setZoudi(String zoudi) {
        this.zoudi = zoudi;
    }
}
