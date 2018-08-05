package org.sports.batch.po;

import org.sports.batch.constant.SplitConstant;

/**
 * 欧赔信息
 */
public class Odds1x2 {

    private String mid;
    private String cid;
    private String hwF;
    private String stF;
    private String awF;
    private String hw;
    private String st;
    private String aw;

    public Odds1x2(String infoStr) {
        String[] infoArr = infoStr.split(SplitConstant.splitColumn); //209092,8,2.25,3.95,2.95,2.25,3.025,2.875
        this.mid = infoArr[0];
        this.cid = infoArr[1];
        this.hwF = infoArr[2];
        this.stF = infoArr[3];
        this.awF = infoArr[4];
        this.hw = infoArr[5];
        this.st = infoArr[6];
        this.aw = infoArr[7];
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

    public String getHwF() {
        return hwF;
    }

    public void setHwF(String hwF) {
        this.hwF = hwF;
    }

    public String getStF() {
        return stF;
    }

    public void setStF(String stF) {
        this.stF = stF;
    }

    public String getAwF() {
        return awF;
    }

    public void setAwF(String awF) {
        this.awF = awF;
    }

    public String getHw() {
        return hw;
    }

    public void setHw(String hw) {
        this.hw = hw;
    }

    public String getSt() {
        return st;
    }

    public void setSt(String st) {
        this.st = st;
    }

    public String getAw() {
        return aw;
    }

    public void setAw(String aw) {
        this.aw = aw;
    }
}
