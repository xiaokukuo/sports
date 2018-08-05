package org.sports.batch.po;

import org.sports.batch.constant.SplitConstant;

/**
 * 联赛项类
 */
public class League {

    private String lid;
    private String type;
    private String color;
    private String cnName;
    private String trName;
    private String enName;
    private String url;
    private String important;

    private int matchNum;
    private int showNum;
    private boolean show;
    private int shengfu;
    private int beidan;

    public League(){}

    public League(String infoStr){
       String[] infoArr = infoStr.split(SplitConstant.splitColumn);
        this.lid = infoArr[0];
        this.type = infoArr[1];
        this.color = infoArr[2];
        this.cnName = infoArr[3];
        this.trName = infoArr[4];
        this.enName = infoArr[5];
        this.url = infoArr[6];
        this.important = infoArr[7];
        this.matchNum = 0;
        this.showNum = 0;
        this.show = true;
        this.shengfu = 0;
        this.beidan = 0;
    }

    public String getLid() {
        return lid;
    }

    public void setLid(String lid) {
        this.lid = lid;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getCnName() {
        return cnName;
    }

    public void setCnName(String cnName) {
        this.cnName = cnName;
    }

    public String getTrName() {
        return trName;
    }

    public void setTrName(String trName) {
        this.trName = trName;
    }

    public String getEnName() {
        return enName;
    }

    public void setEnName(String enName) {
        this.enName = enName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getImportant() {
        return important;
    }

    public void setImportant(String important) {
        this.important = important;
    }

    public int getMatchNum() {
        return matchNum;
    }

    public int getShowNum() {
        return showNum;
    }

    public boolean isShow() {
        return show;
    }

    public int getShengfu() {
        return shengfu;
    }

    public int getBeidan() {
        return beidan;
    }
}
