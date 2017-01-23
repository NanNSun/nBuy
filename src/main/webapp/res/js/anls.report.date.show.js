
function reportShow(reportCount){
	if(reportCount==''){
		reportCount=5;
	}
	var reportShow=[];
	var show="$m";
	for (var int = 0; int <reportCount; int++) {
		if(int==0){
			reportShow.push("$m$");
		}else{
			reportShow.push("$m-"+int+"$");
		}
	}
	return reportShow;
}