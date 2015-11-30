// data - array of js objects
// - (date, mandatory) start_date
// - (date, mandatory) end_date
// - (optional) rec_type
// - (optional) event_length
// - (optional) event_pid
// http://docs.dhtmlx.com/scheduler/recurring_events.html#serversideintegration

var scheduler = require("./scheduler");
var mDate = require("./date");

function getEvents(data, from, to){
	var events = [];
	var exceptions = {};

	//collect exceptions
	for (var i=0; i<data.length; i++){
		var ev = data[i];
		if (ev.event_pid)
			setException(exceptions, ev.event_length, ev.event_pid);
	}

	//process events
	for (var i=0; i<data.length; i++){
		var ev = data[i];
		if (ev.rec_type === "none") continue;
		if (ev.rec_type)
			processRecurringEvent(ev, exceptions, events, from, to);
		else
			if ((!from || ev.end_date>from) && (!to || ev.start_date < to))
				events.push(ev);
	}

	return events;
}

function setException(ex, key, id){
	if (!ex[key])
		ex[key] = {};
	ex[key][id] = 1;
}

function getException(ex, key, id){
	return ex[key] ? (ex[key][id] ? true : false) : false;
}

function processRecurringEvent(ev, exceptions, events, from, to){
	var watchdog = 0;
	var start 	= new Date(ev.start_date);
	var end		= ev.end_date;
	var pattern	= ev.rec_type.split("#")[0];

	var from 	= from || start;
	var to 		= to || end;

	
	var shift = scheduler.transpose_type(pattern);
	shift(start, from);
	
	while (start < ev.start_date || (start.valueOf()+ev.event_length*1000) <= from.valueOf())
		start = mDate.add(start, 1, pattern, true);
	while (start < to && start < ev.end_date){
		var mark = getException(exceptions, start.valueOf(), ev.id);
		if (!mark){
			var real_end = new Date(start.valueOf()+ev.event_length*1000);
			var copy = {
				start_date: start,
				end_date : real_end,
				id: ev.id + "#" + Math.ceil(start.valueOf()/1000),
				event_pid : ev.id,
			};

			for (var key in ev)
				if (!copy[key])
					copy[key] = ev[key];
			delete copy.rec_type;
			delete copy.event_length;

			var shift = copy.start_date.getTimezoneOffset() - copy.end_date.getTimezoneOffset();
			if (shift){
				if (shift>0) 
					copy.end_date = new Date(start.valueOf()+ev.event_length*1000-shift*60*1000);
				else {
					copy.end_date = new Date(copy.end_date.valueOf() + shift*60*1000);
				}
			}
			events.push(copy);

			//prevent infinity loops
			watchdog++;
			if (watchdog > 1000) {
				console.log("Breaking infinity loop in scheduler-helper");
				return;
			}
		}
		start = mDate.add(start, 1, pattern, true);
	}		
}


module.exports = {
	getEvents: getEvents
};