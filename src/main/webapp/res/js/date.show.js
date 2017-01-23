var date=new Date();
/**获取当前年*/
function year(){
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	
}
/**年报*/
function reportYear(){
	var year=date.getFullYear();
	var reportShow=[];
	for(var i=0;i<5;i++){
		reportShow.push(year-i);
	}
	return reportShow;
}

/**年月*/
function reportMonth(){
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var reportShow=[];
	var index=0;
	for (var int = year; int > 2010; int--) {
		if(year==int){
			for (var int2 = month; int2 >0; int2--) {
				var show=((int2+"").length==1)?"0"+int2:int2;
				if(index>=5){
					break;
				}
				reportShow.push(int+""+show);
				index++;
			}
		}else{
			for (var int2 = 12; int2 >0; int2--) {
				var show=((int2+"").length==1)?"0"+int2:int2;
				if(index>=5){
					break;
				}
				reportShow.push(int+""+show);
				index++;
			}
		}
	}
	return reportShow;
}

/**年季*/
function reportQuarter(){
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var quarter="";
	switch(month){
	case 1:
	case 2:
	case 3:
		quarter=1;
		break;
	case 4:
	case 5:
	case 6:
		quarter=2;
		break;
	case 7:
	case 8:
	case 9:
		quarter=3;
		break;
	case 10:
	case 11:
	case 12:
		quarter=4;
		break;
	}
	var reportShow=[];
	var index=0;
	for (var int = year; int > 2010; int--) {
		if(year==int){
			for (var int2 = quarter; int2 >0; int2--) {
				if(index>=5){
					break;
				}
				reportShow.push(int+"Q"+int2);
				index++;
			}
		}else{
			for (var int2 = 4; int2 >0; int2--) {
				if(index>=5){
					break;
				}
				reportShow.push(int+"Q"+int2);
				index++;
			}
		}
	}
	return reportShow;
}

/**半年*/
function reportHalfYear(){
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var halfYear="";
	switch(month){
	case 1:
	case 2:
	case 3:
	case 4:
	case 5:
	case 6:
		halfYear=1;
		break;
	case 7:
	case 8:
	case 9:
	case 10:
	case 11:
	case 12:
		halfYear=2;
		break;
	}
	var reportShow=[];
	var index=0;
	for (var int = year; int > 2010; int--) {
		if(year==int){
			for (var int2 = halfYear; int2 >0; int2--) {
				var show=(int2==1)?"上半年":"下半年";
				if(index>=5){
					break;
				}
				reportShow.push(int+""+show);
				index++;
			}
		}else{
			for (var int2 = 2; int2 >0; int2--) {
				var show=(int2==1)?"上半年":"下半年";
				if(index>=5){
					break;
				}
				reportShow.push(int+""+show);
				index++;
			}
		}
	}
	return reportShow;
}



