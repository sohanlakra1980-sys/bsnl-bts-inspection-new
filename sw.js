const CACHE='bsnl-bts-v5.1-shell-1';
const SHELL=['./','./index.html','./config.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
  const u=new URL(event.request.url);
  if(u.origin===location.origin && event.request.method==='GET'){
    event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
      const copy=response.clone(); caches.open(CACHE).then(c=>c.put(event.request,copy)); return response;
    }).catch(()=>caches.match('./index.html'))));
  }
});
