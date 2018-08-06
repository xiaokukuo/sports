package org.sports.core.model;

public class ExponentData {

    private int id;
    
    private String indexId;

    private String time;

    private double data;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

	public String getIndexId() {
		return indexId;
	}

	public void setIndexId(String indexId) {
		this.indexId = indexId;
	}

	public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public double getData() {
        return data;
    }

    public void setData(double data) {
        this.data = data;
    }
}
