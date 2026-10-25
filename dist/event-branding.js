const original='assets/pulse.png';
export function applyEventBranding(row,url,now=Date.now()){
  const expiry=Date.parse(row?.until_at||'');
  const active=!!row?.path&&Number.isFinite(expiry)&&expiry>now&&!!url;
  const source=active?url:original;
  for(const image of document.querySelectorAll('img[data-pulse-brand]')){
    image.onerror=()=>{image.onerror=null;image.src=original;};
    if(image.getAttribute('src')!==source)image.src=source;
  }
  const icon=document.querySelector('link[rel="icon"]');
  if(icon)icon.href=source;
  return active;
}
export function startEventBranding(client){
  let row=null,url=null,busy=false,expiryTimer;
  function apply(){
    clearTimeout(expiryTimer);applyEventBranding(row,url);
    const delay=Date.parse(row?.until_at||'')-Date.now();
    if(row?.path&&delay>0)expiryTimer=setTimeout(apply,Math.min(delay+10,2147483647));
  }
  async function refresh(){
    if(busy)return;busy=true;
    try{const result=await client.from('pulse_event_branding').select('path,title,until_at').eq('singleton',true).single();
      if(result.error)throw result.error;
      row=result.data;url=row?.path?client.storage.from('pulse-branding').getPublicUrl(row.path).data.publicUrl:null;
    }catch(_){}finally{busy=false;apply();}
  }
  const visible=()=>{apply();if(!document.hidden)refresh();};
  document.addEventListener('visibilitychange',visible);const timer=setInterval(refresh,30000);refresh();
  return ()=>{clearInterval(timer);clearTimeout(expiryTimer);document.removeEventListener('visibilitychange',visible);};
}
