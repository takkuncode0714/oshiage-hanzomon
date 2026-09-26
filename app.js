'use strict';
const byId=id=>document.getElementById(id);
const {minutes,japanNow,upcoming}=window.TrainLogic;
const day=byId('dayType');
day.value=[0,6].includes(japanNow().weekDay)?'holiday':'weekday';
function makeRows(target,rows,now,all=false){
 target.replaceChildren();
 if(!rows.length){const p=document.createElement('p');p.className='empty';p.textContent=day.value==='holiday'?'土・休日の時刻表は未登録です。':'この時刻以降の登録データはありません。運行終了を意味するものではありません。';target.append(p);return;}
 for(const train of rows){const article=document.createElement('article');article.className='train-row'+(train.startsHere?' origin':'');const time=document.createElement('time');time.className='time';time.dateTime=train.departureTime;time.textContent=train.departureTime;const info=document.createElement('div');const dest=document.createElement('div');dest.className='destination';dest.textContent=train.destination+'行';const meta=document.createElement('div');meta.className='meta';if(!all){const wait=document.createElement('span');wait.textContent='あと'+Math.ceil(minutes(train.departureTime)-now.minutes)+'分';meta.append(wait);}if(train.startsHere){const tag=document.createElement('span');tag.className='origin-tag';tag.textContent='押上始発';meta.append(tag);}info.append(dest,meta);const platform=document.createElement('span');platform.className='platform';platform.textContent=train.platform;platform.setAttribute('aria-label',train.platform+'番線');article.append(time,info,platform);target.append(article);}
}
function render(){const now=japanNow();byId('clock').textContent=now.label+' JST';const rows=window.TIMETABLE_DATA[day.value];const next=upcoming(rows,now.minutes);byId('listSummary').textContent=day.value==='holiday'?'土・休日：データ未登録':now.minutes<minutes(rows[0].departureTime)?'07:03より前の列車は未登録です。収録範囲内の次の'+next.length+'本を表示しています。':'平日データ・収録範囲内の次の'+next.length+'本を表示しています。';makeRows(byId('trainList'),next,now);makeRows(byId('allTrains'),rows,now,true);}
day.addEventListener('change',render);byId('refreshButton').addEventListener('click',render);document.addEventListener('visibilitychange',()=>{if(!document.hidden)render();});setInterval(render,15000);render();
