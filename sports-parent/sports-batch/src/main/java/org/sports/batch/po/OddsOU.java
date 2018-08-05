package org.sports.batch.po;

import org.sports.batch.constant.SplitConstant;

/**
 * 大小赔率信息
 */
public class OddsOU {

    private String mid;
    private String cid;
    private String goalF;
    private String overF;
    private String underF;
    private String goal;
    private String over;
    private String under;

    public OddsOU(String infoStr) {
        String[] infoArr = infoStr.split(SplitConstant.splitColumn); //209092,8,0.5,0.95,0.95,0.5,1.025,0.875
        this.mid = infoArr[0];
        this.cid = infoArr[1];
        this.goalF = infoArr[2];
        this.overF = infoArr[3];
        this.underF = infoArr[4];
        this.goal = infoArr[5];
        this.over = infoArr[6];
        this.under = infoArr[7];
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

    public String getOverF() {
        return overF;
    }

    public void setOverF(String overF) {
        this.overF = overF;
    }

    public String getUnderF() {
        return underF;
    }

    public void setUnderF(String underF) {
        this.underF = underF;
    }

    public String getGoal() {
        return goal;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }

    public String getOver() {
        return over;
    }

    public void setOver(String over) {
        this.over = over;
    }

    public String getUnder() {
        return under;
    }

    public void setUnder(String under) {
        this.under = under;
    }
}
