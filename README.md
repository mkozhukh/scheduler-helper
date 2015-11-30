# Recurring Events Helper

Helper allows to unpack recurring event information, that was stored by DHTMLX Scheduler or Webix Scheduler. 

### How to install 

```
npm install scheduler-helper
```

### How to use

```js
 var helper = require("scheduler-helper");
 var events = helper.getEvents( data, from , to)
```
- data - array of events
- from - optional, start date
- to - optional, end date


```js
//get all events
var events = helper.getEvents( data );
//get events for one year only
var events = helper.getEvents( data,
   new Date(2015,0,1),
   new Date(2016,0,1));
```

### Structure of data

Data is array of objects with the same structure as Scheduler stores in DB. 

```js
var data = [
		{ id:"1", text:"a", 
			start_date: new Date(2015, 1, 10), 
			end_date: new Date(2015, 1, 18),
			rec_type:"day_1___",
			event_length : 7200
		}
	]
```

### Recurring events without end date

To correctly handle such dates, always provide `from` and `to` parameters. If parameters were not provided, getValues method will return first 1000 occurences of event only.

### License 

**MIT License**

Copyright (c) 2015

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
