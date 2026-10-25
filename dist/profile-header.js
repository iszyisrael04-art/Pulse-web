const element=(tag,text,cls)=>{const e=document.createElement(tag);if(text!=null)e.textContent=text;if(cls)e.className=cls;return e;};
const compact=value=>{const n=Math.max(0,Number(value)||0);return n<1000?String(n):`${Math.floor(n/(n>=1e6?1e6:1000)*10)/10}${n>=1e6?'M':'K'}`;};

export function profileHeader(profile,{avatarURL,bannerURL,signal,onSignOut}={}){
  const card=element('article',null,'profilecard'),hero=element('section',null,'profilehero');
  hero.setAttribute('aria-label','Profile banner header');
  let video,cleanup=()=>{};
  if(bannerURL){
    video=element('video',null,'profilebanner');video.muted=true;video.loop=true;video.playsInline=true;video.preload='metadata';video.setAttribute('aria-hidden','true');video.src=bannerURL;hero.append(video);
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const playback=()=>{if(reduced.matches||document.hidden||!video.isConnected)video.pause();else video.play().catch(()=>{});};
    document.addEventListener('visibilitychange',playback);reduced.addEventListener('change',playback);
    video.addEventListener('loadeddata',playback,{once:true});
    cleanup=()=>{document.removeEventListener('visibilitychange',playback);reduced.removeEventListener('change',playback);video.pause();video.removeAttribute('src');video.load();};
  }
  hero.append(element('div',null,'profileshade'));
  const content=element('div',null,'profileherocontent'),tools=element('div',null,'profiletools');
  if(onSignOut){const signout=element('button','Sign out');signout.onclick=onSignOut;tools.append(signout);}
  const row=element('div',null,'profileidentityrow'),identity=element('div',null,'profileidentity'),name=element('h2',profile.display_name||'Pulse creator');
  if(profile.verified){const badge=element('span','✓','verified');badge.setAttribute('aria-label','Verified');name.append(badge);}
  identity.append(name,element('p','@'+(profile.username||'pulse_user'),'profileusername'));
  const counts=element('div',null,'profilecounts');
  for(const [label,value] of [['Following',profile.following],['Followers',profile.followers],['Likes',profile.likes??profile.analytics?.likes]]){
    const stat=element('div');stat.append(element('strong',compact(value)),element('span',label));counts.append(stat);
  }
  identity.append(counts);
  const portrait=element('div',null,'profileportraitcolumn');
  if(signal)portrait.append(element('p',signal,'profilesignal'));
  const image=element('img',null,'profileportrait');image.alt='Profile picture';image.src=avatarURL||'assets/pulse.png';image.addEventListener('error',()=>{image.src='assets/pulse.png';},{once:true});portrait.append(image);
  row.append(identity,portrait);content.append(tools,row);hero.append(content);card.append(hero);
  if(profile.bio)card.append(element('p',profile.bio,'profilebio'));
  card.append(element('h3','Posts','profilepostsheading'));
  return {element:card,dispose:cleanup};
}
