var mDate = {
	startOnMonday:false,
	toFixed:function(num){
		if (num<10)	return "0"+num;
		return num;
	},
	weekStart:function(date){
		date = this.copy(date);

		var shift=date.getDay();
		if (this.startOnMonday){
			if (shift===0) shift=6;
			else shift--;
		}
		return this.datePart(this.add(date,-1*shift,"day"));
	},
	monthStart:function(date){
		date = this.copy(date);

		date.setDate(1);
		return this.datePart(date);
	},
	yearStart:function(date){
		date = this.copy(date);

		date.setMonth(0);
		return this.monthStart(date);
	},
	dayStart:function(date){
		return this.datePart(date, true);
	},	
	getISOWeek: function(ndate) {
		if(!ndate) return false;
		var nday = ndate.getDay();
		if (nday === 0) {
			nday = 7;
		}
		var first_thursday = new Date(ndate.valueOf());
		first_thursday.setDate(ndate.getDate() + (4 - nday));
		var year_number = first_thursday.getFullYear(); // year of the first Thursday
		var ordinal_date = Math.floor( (first_thursday.getTime() - new Date(year_number, 0, 1).getTime()) / 86400000); //ordinal date of the first Thursday - 1 (so not really ordinal date)
		var weekNumber = 1 + Math.floor( ordinal_date / 7);	
		return weekNumber;
	},
	
	getUTCISOWeek: function(ndate){
		return this.getISOWeek(ndate);
	},
	_correctDate: function(d,d0,inc,checkFunc){
		if(!inc)
			return;
		var incorrect = checkFunc(d,d0);
		if(incorrect){
			var i = (inc>0?1:-1);

			while(incorrect){
				d.setHours(d.getHours()+i);
				incorrect = checkFunc(d,d0);
				i += (inc>0?1:-1);
			}
		}
	},
	add:function(date,inc,mode,copy){
		if (copy) date = this.copy(date);
		var d = mDate.copy(date);
		switch(mode){
			case "day":
				date.setDate(date.getDate()+inc);
				this._correctDate(date,d,inc,function(d,d0){
					return 	mDate.datePart(d0,true).valueOf()== mDate.datePart(d,true).valueOf();
				});
				break;
			case "week":
				date.setDate(date.getDate()+7*inc);
				this._correctDate(date,d,7*inc,function(d,d0){
					return 	mDate.datePart(d0,true).valueOf()== mDate.datePart(d,true).valueOf();
				});
				break;
			case "month":
				date.setMonth(date.getMonth()+inc);
				this._correctDate(date,d,inc,function(d,d0){
					return 	d0.getMonth() == d.getMonth() && d0.getYear() == d.getYear();
				});
				break;
			case "year":
				date.setYear(date.getFullYear()+inc);
				this._correctDate(date,d,inc,function(d,d0){
					return 	d0.getFullYear() == d.getFullYear();
				});
				break;
			case "hour":
				date.setHours(date.getHours()+inc);
				this._correctDate(date,d,inc,function(d,d0){
					return 	d0.getHours() == d.getHours() && mDate.datePart(d0,true)== mDate.datePart(d,true);
				});
				break;
			case "minute": 	date.setMinutes(date.getMinutes()+inc); break;
			default:
				mDate.add[mode](date, inc, mode);
				break;
		}
		return date;
	},
	datePart:function(date, copy){
		if (copy) date = this.copy(date);

		// workaround for non-existent hours
		var d = this.copy(date);
		d.setHours(0);
		if(d.getDate()!=date.getDate()){
			date.setHours(1);
		}
		else{
			date.setHours(0);
		}

		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		return date;
	},
	timePart:function(date, copy){
		if (copy) date = this.copy(date);
		return (date.valueOf()/1000 - date.getTimezoneOffset()*60)%86400;
	},
	copy:function(date){
		return new Date(date.valueOf());
	},
	equal:function(a,b){
		if (!a || !b) return false;
		return a.valueOf() === b.valueOf();
	}
};

module.exports = mDate;