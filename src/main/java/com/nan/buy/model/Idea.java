package com.nan.buy.model;

public class Idea {
    private String id;

    private String cName;

    private String cHeader;

    private String newMessage;

    private String reMessage;

    private String newTime;

    private String reTime;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getcName() {
        return cName;
    }

    public void setcName(String cName) {
        this.cName = cName == null ? null : cName.trim();
    }

    public String getcHeader() {
        return cHeader;
    }

    public void setcHeader(String cHeader) {
        this.cHeader = cHeader == null ? null : cHeader.trim();
    }

    public String getNewMessage() {
        return newMessage;
    }

    public void setNewMessage(String newMessage) {
        this.newMessage = newMessage == null ? null : newMessage.trim();
    }

    public String getReMessage() {
        return reMessage;
    }

    public void setReMessage(String reMessage) {
        this.reMessage = reMessage == null ? null : reMessage.trim();
    }

    public String getNewTime() {
        return newTime;
    }

    public void setNewTime(String newTime) {
        this.newTime = newTime == null ? null : newTime.trim();
    }

    public String getReTime() {
        return reTime;
    }

    public void setReTime(String reTime) {
        this.reTime = reTime == null ? null : reTime.trim();
    }
}