package com.nan.buy.model;

public class SubType {
    private String sId;

    private String sSupertype;

    private String sName;

    public String getsId() {
        return sId;
    }

    public void setsId(String sId) {
        this.sId = sId == null ? null : sId.trim();
    }

    public String getsSupertype() {
        return sSupertype;
    }

    public void setsSupertype(String sSupertype) {
        this.sSupertype = sSupertype == null ? null : sSupertype.trim();
    }

    public String getsName() {
        return sName;
    }

    public void setsName(String sName) {
        this.sName = sName == null ? null : sName.trim();
    }
}