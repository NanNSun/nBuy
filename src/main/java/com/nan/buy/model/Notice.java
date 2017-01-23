package com.nan.buy.model;

public class Notice {
    private String nId;

    private String nMessage;

    private String nAdmin;

    private String nHeader;

    private String nTime;

    public String getnId() {
        return nId;
    }

    public void setnId(String nId) {
        this.nId = nId == null ? null : nId.trim();
    }

    public String getnMessage() {
        return nMessage;
    }

    public void setnMessage(String nMessage) {
        this.nMessage = nMessage == null ? null : nMessage.trim();
    }

    public String getnAdmin() {
        return nAdmin;
    }

    public void setnAdmin(String nAdmin) {
        this.nAdmin = nAdmin == null ? null : nAdmin.trim();
    }

    public String getnHeader() {
        return nHeader;
    }

    public void setnHeader(String nHeader) {
        this.nHeader = nHeader == null ? null : nHeader.trim();
    }

    public String getnTime() {
        return nTime;
    }

    public void setnTime(String nTime) {
        this.nTime = nTime == null ? null : nTime.trim();
    }
}