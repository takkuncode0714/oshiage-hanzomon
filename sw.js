'use strict';
// 配布内容を変更するたびに VERSION を変更してください。
const VERSION='v1-20260924';
const PREFIX='oshiage-hanzomon-'+encodeURIComponent(self.registration.scope)+'-';
const CACHE=PREFIX+VERSION;
const FILES=['./','./index.html','./return.html','./privacy.html','./styles.css','./logic.js','./app.js','./pwa.js','./timetable.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));
self.addEventListener('message',event=>{if(event.data==='ACTIVATE')self.skipWaiting();});
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==location.origin||!url.href.startsWith(self.registration.scope))return;const key=new URL(url);key.search='';key.hash='';event.respondWith(caches.open(CACHE).then(async cache=>(await cache.match(key.href))||fetch(event.request)));});
