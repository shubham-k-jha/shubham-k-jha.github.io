const body=document.body;
const themeBtn=document.getElementById('themeBtn');
const menuBtn=document.getElementById('menuBtn');
const navLinks=document.getElementById('navLinks');
const saved=localStorage.getItem('theme');
if(saved==='dark') body.classList.add('dark');
function updateThemeIcon(){themeBtn.textContent=body.classList.contains('dark')?'☀':'◐'}
updateThemeIcon();
themeBtn.addEventListener('click',()=>{body.classList.toggle('dark');localStorage.setItem('theme',body.classList.contains('dark')?'dark':'light');updateThemeIcon()});
menuBtn.addEventListener('click',()=>navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));
const progress=document.getElementById('progress');
window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(scrollY/Math.max(h,1)*100)+'%'});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;document.querySelectorAll('.project').forEach(p=>p.classList.toggle('hidden',f!=='all'&&!p.dataset.type.includes(f)))}));
document.getElementById('year').textContent=new Date().getFullYear();
