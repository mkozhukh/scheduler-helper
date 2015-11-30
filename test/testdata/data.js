module.exports = {
	normal:[
		{ id:"1", text:"a", start_date: new Date(2015, 1, 10, 8, 0, 0),  end_date: new Date(2015, 2, 3, 8, 0, 0) },		//2015-2-10, 08:00 - 2015-3-3, 08:00
		{ id:"2", text:"b", start_date: new Date(2015, 1, 10, 12, 0, 0), end_date: new Date(2015, 1, 10, 13, 0, 0) },	//2015-2-10, 12:00 - 13:00
		{ id:"3", text:"c", start_date: new Date(2015, 1, 10, 0, 0, 0),  end_date: new Date(2015, 1, 10, 6, 0, 0) }		//2015-2-10, 00:00 - 10:00
	],
	recurring_dayly:[
		{ id:"1", text:"a", 
			start_date: new Date(2015, 1, 10, 8, 0, 0), 
			end_date: new Date(2015, 1, 18, 8, 0, 0),
			rec_type:"day_1___",
			event_length : 7200
		}
	],
	recurring_monthly:[
		{ id:"1", text:"a", 
			start_date: new Date(2015, 1, 10, 8, 0, 0), 
			end_date: new Date(2016, 1, 18, 8, 0, 0),
			rec_type:"month_2___",
			event_length : 7200
		}
	],
	recurring_yearly:[
		{ id:"1", text:"a", 
			start_date: new Date(2015, 1, 10, 8, 0, 0), 
			end_date: new Date(2020, 1, 18, 8, 0, 0),
			rec_type:"year_1___",
			event_length : 7200
		}
	],

	recurring_infinity:[
		{ id:"1", text:"a", 
			start_date: new Date(2000, 1, 10, 8, 0, 0), 
			end_date: new Date(2999, 1, 18, 8, 0, 0),
			rec_type:"day_1___",
			event_length : 7200
		}
	],
};