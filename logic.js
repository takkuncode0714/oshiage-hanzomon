(function(root){
 'use strict';
 const minutes = text => { const [h,m]=text.split(':').map(Number); return h*60+m; };
 function japanNow(date=new Date()) { const p=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(date).map(x=>[x.type,x.value]));return {minutes:Number(p.hour)*60+Number(p.minute)+Number(p.second)/60,label:p.hour+':'+p.minute,date:p.year+'-'+p.month+'-'+p.day,weekDay:new Date(p.year+'-'+p.month+'-'+p.day+'T12:00:00+09:00').getUTCDay()}; }
 function upcoming(rows, nowMinutes, count=10) { return rows.filter(r=>minutes(r.departureTime)>nowMinutes).sort((a,b)=>minutes(a.departureTime)-minutes(b.departureTime)).slice(0,count); }
 const api={minutes,japanNow,upcoming}; if(typeof module==='object') module.exports=api; else root.TrainLogic=api;
})(typeof window==='object'?window:globalThis);
