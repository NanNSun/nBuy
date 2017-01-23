package com.nan.buy.model;

public class Customer {
    private String cName;

    private String cPass;

    private String cHeader;

    private String cPhone;

    private String cQuestion;

    private String cAnswer;

    private String cAddress;

    private String cEmail;

    private String cId;

    public String getcName() {
        return cName;
    }

    public void setcName(String cName) {
        this.cName = cName == null ? null : cName.trim();
    }

    public String getcPass() {
        return cPass;
    }

    public void setcPass(String cPass) {
        this.cPass = cPass == null ? null : cPass.trim();
    }

    public String getcHeader() {
        return cHeader;
    }

    public void setcHeader(String cHeader) {
        this.cHeader = cHeader == null ? null : cHeader.trim();
    }

    public String getcPhone() {
        return cPhone;
    }

    public void setcPhone(String cPhone) {
        this.cPhone = cPhone == null ? null : cPhone.trim();
    }

    public String getcQuestion() {
        return cQuestion;
    }

    public void setcQuestion(String cQuestion) {
        this.cQuestion = cQuestion == null ? null : cQuestion.trim();
    }

    public String getcAnswer() {
        return cAnswer;
    }

    public void setcAnswer(String cAnswer) {
        this.cAnswer = cAnswer == null ? null : cAnswer.trim();
    }

    public String getcAddress() {
        return cAddress;
    }

    public void setcAddress(String cAddress) {
        this.cAddress = cAddress == null ? null : cAddress.trim();
    }

    public String getcEmail() {
        return cEmail;
    }

    public void setcEmail(String cEmail) {
        this.cEmail = cEmail == null ? null : cEmail.trim();
    }

    public String getcId() {
        return cId;
    }

    public void setcId(String cId) {
        this.cId = cId == null ? null : cId.trim();
    }
}