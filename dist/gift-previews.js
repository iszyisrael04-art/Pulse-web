const gifts = [
 ["voltage_dominion","Voltage Dominion","Electric filaments take over the screen",29999],
 ["void_rift","Void Rift","A split in space, lit by violet plasma",34999],
 ["solar_overdrive","Solar Overdrive","Golden solar flares and a radiant core",39999],
 ["quantum_cathedral","Quantum Cathedral","Rotating energy geometry in ultraviolet",49999],
 ["prism_avalanche","Prism Avalanche","A storm of iridescent glass shards",59999],
 ["aurora_ascension","Aurora Ascension","Luminous ribbons rise through the darkness",69999],
 ["gravity_collapse","Gravity Collapse","A glowing accretion disk bends the light",79999],
 ["pulse_supernova","Pulse Supernova","Expanding shockwaves of mint and gold",99999],
 ["galaxy","Pulse Universe","An entire universe of appreciation",2500]
];
const grid=document.querySelector('#gifts');
const dialog=document.querySelector('#player');
const video=document.querySelector('#gift-video');
const status=document.querySelector('#playback-status');
const sound=document.querySelector('#sound');
let selected=null;
function play(){status.textContent='Loading preview…';video.play().catch(()=>{status.textContent='Tap the play control to start the preview.';});}
for(const [id,title,description,coins] of gifts){
 const card=document.createElement('article');card.className='gift';
 const art=document.createElement('div');art.className='art';
 const image=document.createElement('img');image.src='assets/gifts/thumb_'+id+'.png';image.alt=title;image.loading='lazy';image.width=192;image.height=192;
 const duration=document.createElement('span');duration.className='duration';duration.textContent='CINEMA · 6s';art.append(image,duration);
 const info=document.createElement('div');info.className='gift-info';
 const identity=document.createElement('div');const heading=document.createElement('h3');heading.textContent=title;const caption=document.createElement('p');caption.textContent=description;const price=document.createElement('p');price.className='gift-price';price.textContent='◉ '+coins.toLocaleString()+' coins';identity.append(heading,caption,price);
 const button=document.createElement('button');button.className='preview';button.textContent='▷ Preview';button.setAttribute('aria-label','Preview '+title);
 button.onclick=()=>{
  selected=id;document.querySelector('#gift-title').textContent=title;
  video.poster=image.src;video.src='assets/gifts/cinema_'+id+'.mp4';video.muted=false;updateSound();
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
