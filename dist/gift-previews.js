const gifts = [
 ["lion","Lion","Real safari footage · notification with sender and gift image",5000,"Coverr · CC0 1.0","https://commons.wikimedia.org/wiki/File:Lions_in_the_wild.webm","https://creativecommons.org/publicdomain/zero/1.0/"],
 ["royal_lions","Royal Lions","A second safari excerpt · no generated effects",34000,"Coverr · CC0 1.0","https://commons.wikimedia.org/wiki/File:Lions_in_the_wild.webm","https://creativecommons.org/publicdomain/zero/1.0/"],
 ["gorilla","Jungle Silverback","Wild gorilla footage from Loango National Park",30000,"TheLeftCoast · CC BY 4.0","https://commons.wikimedia.org/wiki/File:Wild_Western_Lowland_gorilla_and_his_family_foraging_for_figs.webm","https://creativecommons.org/licenses/by/4.0/"],
 ["thunder_falcon","Thunder Falcon","Real peregrine falcon footage · no filters",39999,"Paul Hurtado · CC BY-SA 2.0","https://commons.wikimedia.org/wiki/File:Peregrine_falcon_(Falco_peregrinus)_in_West_Reno,_Nevada,_USA.webm","https://creativecommons.org/licenses/by-sa/2.0/"],
];
const grid=document.querySelector('#gifts');
const dialog=document.querySelector('#player');
const video=document.querySelector('#gift-video');
const status=document.querySelector('#playback-status');
const sound=document.querySelector('#sound');
let selected=null;
function play(){status.textContent='Loading preview…';video.play().catch(()=>{status.textContent='Tap the play control to start the preview.';});}
for(const [id,title,description,coins,credit,source,license] of gifts){
 const card=document.createElement('article');card.className='gift';
 const art=document.createElement('div');art.className='art';
 const image=document.createElement('img');image.src='assets/gifts/thumb_'+id+'.png';image.alt=title;image.loading='lazy';image.width=192;image.height=192;
 const duration=document.createElement('span');duration.className='duration';duration.textContent='WILDLIFE · 5s';art.append(image,duration);
 const info=document.createElement('div');info.className='gift-info';
 const identity=document.createElement('div');const heading=document.createElement('h3');heading.textContent=title;const caption=document.createElement('p');caption.textContent=description;const price=document.createElement('p');price.className='gift-price';price.textContent='◉ '+coins.toLocaleString()+' coins';identity.append(heading,caption,price);
 const button=document.createElement('button');button.className='preview';button.textContent='▷ Preview';button.setAttribute('aria-label','Preview '+title);
 button.onclick=()=>{
  selected=id;document.querySelector('#gift-title').textContent=title;
  document.querySelector('#notice-title').textContent='Sent '+title;document.querySelector('#notice-gift').src=image.src;
  const creditBox=document.querySelector('#footage-credit');creditBox.replaceChildren(document.createTextNode(credit+' · Trimmed, resized and re-encoded. '));
  for(const [label,url] of [['Source',source],['License',license]]){const a=document.createElement('a');a.href=url;a.textContent=label;a.target='_blank';a.rel='noopener';creditBox.append(a,document.createTextNode(' '));}
  if(id==='thunder_falcon')creditBox.append(document.createTextNode('This excerpt and thumbnail remain CC BY-SA 2.0.'));
  video.poster=image.src;video.src='assets/gifts/wildlife_'+id+'.mp4';video.muted=false;updateSound();
  status.textContent='';dialog.showModal();
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){status.textContent='Tap play when you are ready.';}else{play();}
 };
 info.append(identity,button);card.append(art,info);grid.append(card);
}
function updateSound(){sound.textContent=video.muted?'Sound off':'Sound on';sound.setAttribute('aria-pressed',String(video.muted));sound.setAttribute('aria-label',video.muted?'Turn sound on':'Mute preview');}
function close(){dialog.close();}
document.querySelector('#close-player').onclick=close;
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
dialog.addEventListener('close',()=>{video.pause();video.removeAttribute('src');video.load();selected=null;status.textContent='';});
sound.onclick=()=>{video.muted=!video.muted;updateSound();};
document.querySelector('#replay').onclick=()=>{if(!selected)return;video.currentTime=0;play();};
video.addEventListener('playing',()=>status.textContent='');
video.addEventListener('waiting',()=>{status.textContent='Buffering preview…';});
video.addEventListener('ended',()=>status.textContent='Preview complete. Replay it or choose another gift.');
video.addEventListener('error',()=>{if(selected)status.textContent='Could not load this preview. Check your connection, then close and try again.';});
document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();});
window.addEventListener('pagehide',()=>video.pause());

let demoTitle='Rose',demoCount=1;
function smallNotice(title){demoTitle=title;demoCount=1;renderSmall();}
function renderSmall(){document.querySelector('#small-title').textContent='Sent '+demoTitle;document.querySelector('#small-image').textContent=demoTitle==='Rose'?'🌹':'❤️';document.querySelector('#small-image').setAttribute('aria-label',demoTitle);document.querySelector('#small-count').textContent='×'+demoCount;}
document.querySelector('#demo-rose').onclick=()=>smallNotice('Rose');
document.querySelector('#demo-heart').onclick=()=>smallNotice('Heart');
document.querySelector('#demo-combo').onclick=()=>{demoCount++;renderSmall();};
