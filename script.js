const body=document.body;
const themeToggle=document.getElementById('themeToggle');
const menuToggle=document.getElementById('menuToggle');
const navLinks=document.getElementById('navLinks');
const progress=document.getElementById('scrollProgress');
const backTop=document.getElementById('backTop');

const storedTheme=localStorage.getItem('theme');
if(storedTheme==='dark') body.classList.add('dark');
function syncTheme(){
  const dark=body.classList.contains('dark');
  themeToggle.textContent=dark?'☀':'☾';
  themeToggle.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
}
syncTheme();
themeToggle.addEventListener('click',()=>{
  body.classList.toggle('dark');
  localStorage.setItem('theme',body.classList.contains('dark')?'dark':'light');
  syncTheme();
});

menuToggle.addEventListener('click',()=>{
  const open=navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',String(open));
  menuToggle.setAttribute('aria-label',open?'Close menu':'Open menu');
});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded','false');
  menuToggle.setAttribute('aria-label','Open menu');
}));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
  });
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const sections=[...document.querySelectorAll('main section[id]')];
const links=[...document.querySelectorAll('.nav-links a')];
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      links.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id));
    }
  });
},{rootMargin:'-30% 0px -60% 0px'});
sections.forEach(section=>sectionObserver.observe(section));

function onScroll(){
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=`${Math.min(100,(window.scrollY/Math.max(max,1))*100)}%`;
  backTop.classList.toggle('show',window.scrollY>600);
}
window.addEventListener('scroll',onScroll,{passive:true});
onScroll();
backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const filters=document.querySelectorAll('.filter');
const projectCards=document.querySelectorAll('[data-project]');
filters.forEach(filter=>filter.addEventListener('click',()=>{
  filters.forEach(x=>x.classList.remove('active'));
  filter.classList.add('active');
  const selected=filter.dataset.filter;
  projectCards.forEach(card=>{
    const match=selected==='all'||card.dataset.project.includes(selected);
    card.classList.toggle('is-hidden',!match);
  });
}));

const copyEmail=document.getElementById('copyEmail');
const copyStatus=document.getElementById('copyStatus');
copyEmail.addEventListener('click',async()=>{
  const email=copyEmail.dataset.email;
  try{
    await navigator.clipboard.writeText(email);
    copyStatus.textContent='Copied';
  }catch{
    copyStatus.textContent=email;
  }
  setTimeout(()=>copyStatus.textContent='',1800);
});

document.getElementById('year').textContent=new Date().getFullYear();
