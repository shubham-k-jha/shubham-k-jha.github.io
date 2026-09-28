const body=document.body;
const themeToggle=document.getElementById('themeToggle');
const menuToggle=document.getElementById('menuToggle');
const navLinks=document.getElementById('navLinks');
const progress=document.getElementById('scrollProgress');
const backTop=document.getElementById('backTop');

themeToggle.addEventListener('click',()=>{ 
  // Site is intentionally dark-first to match the GitHub README visual system.
  body.classList.toggle('soft');
  themeToggle.textContent=body.classList.contains('soft')?'☾':'☀';
});

menuToggle.addEventListener('click',()=>{
  const open=navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',String(open));
});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded','false');
}));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});
},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const sections=[...document.querySelectorAll('main section[id]')];
const links=[...document.querySelectorAll('.nav-links a[href^="#"]')];
new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));});
},{rootMargin:'-35% 0px -55% 0px'}).observe ? sections.forEach(s=>{}) : null;
const activeObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));});
},{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s=>activeObserver.observe(s));

function onScroll(){
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=`${Math.min(100,scrollY/Math.max(max,1)*100)}%`;
  backTop.classList.toggle('show',scrollY>650);
}
addEventListener('scroll',onScroll,{passive:true}); onScroll();
backTop.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

document.querySelectorAll('.filter').forEach(filter=>filter.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));
  filter.classList.add('active');
  const selected=filter.dataset.filter;
  document.querySelectorAll('[data-project]').forEach(card=>{
    card.classList.toggle('is-hidden',selected!=='all'&&!card.dataset.project.includes(selected));
  });
}));
document.getElementById('year').textContent=new Date().getFullYear();
document.addEventListener('keydown',(e)=>{
  if(e.target.matches('input,textarea')) return;
  const map={1:'#projects',2:'#apps',3:'#games',4:'#research'};
  if(map[e.key]) document.querySelector(map[e.key])?.scrollIntoView({behavior:'smooth'});
});
document.querySelectorAll('a[href*="streamlit.app"]').forEach(a=>{
  a.addEventListener('click',()=>{a.setAttribute('aria-label','Open live Streamlit app in a new tab')});
});
