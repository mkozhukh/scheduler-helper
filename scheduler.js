var mDate = require("./date");
var scheduler = {};


scheduler.transponse_size={
	day:1, week:7, month:1, year:12 
};
scheduler.day_week=function(sd,day,week){
	sd.setDate(1);
	week = (week-1)*7;
	var cday = sd.getDay();
	var nday=(day==7?0:(day*1))+week-cday+1;
	sd.setDate(nday<=week?(nday+7):nday);
};
scheduler.transpose_day_week=function(sd,list,cor,size,cor2){
	var cday = (sd.getDay()||(mDate.startOnMonday?7:0))-cor;
	for (var i=0; i < list.length; i++) {
		if (list[i]>cday)
			return sd.setDate(sd.getDate()+list[i]*1-cday-(size?cor:cor2));
	}
	scheduler.transpose_day_week(sd,list,cor+size,null,cor);
};

scheduler.transpose_type = function(type){
	var f = "transpose_"+type;
	if (!mDate[f]) {
		var str = type.split("_");
		var day = 60*60*24*1000;
		var step = scheduler.transponse_size[str[0]]*str[1];
		
		if (str[0]=="day" || str[0]=="week"){
			var days = null;
			if (str[4]){
				days=str[4].split(",");
				if (mDate.startOnMonday){
					for (var i=0; i < days.length; i++)
						days[i]=(days[i]*1)||7;
					days.sort();
				}
			}
			
			
			mDate[f] = function(nd,td){
				var delta = Math.floor((td.valueOf()-nd.valueOf())/(day*step));
				if (delta>0)
					nd.setDate(nd.getDate()+delta*step);
				if (days)
						scheduler.transpose_day_week(nd,days,1,step);
			};
			mDate.add[type] = function(nd,inc){
				if (days){
					for (var count=0; count < inc; count++)
						scheduler.transpose_day_week(nd,days,0,step);	
				} else
					nd.setDate(nd.getDate()+inc*step);
				
				return nd;
			};
		}
		else if (str[0]=="month" || str[0]=="year"){
			mDate[f] = function(nd,td){
				var delta = Math.ceil(((td.getFullYear()*12+td.getMonth()*1)-(nd.getFullYear()*12+nd.getMonth()*1))/(step));
				if (delta>=0)
					nd.setMonth(nd.getMonth()+delta*step);
				if (str[3])
					scheduler.day_week(nd,str[2],str[3]);
			};
			mDate.add[type] = function(nd,inc){
				nd.setMonth(nd.getMonth()+inc*step);
				if (str[3])
					scheduler.day_week(nd,str[2],str[3]);
				return nd;
			};
		}
	}
	return mDate[f];
};

module.exports = scheduler;