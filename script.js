const screens=[...document.querySelectorAll('.screen')];
const questions=[
{icon:'🥞',text:'Qual è la tua colazione ideale?',answers:[['A','Pancake colorati con glitter edibili e sciroppo di stelle.'],['B','Una macedonia di frutta fresca e molto colorata.'],['C','Caffè e un cornetto veloce mentre controlli le email.']]},
{icon:'🌈',text:'Come reagisci quando vedi un arcobaleno?',answers:[['A','Corro fuori a cercarne l’inizio per scivolarci sopra!'],['B','Mi fermo a scattare una foto: è sempre uno spettacolo magico.'],['C','Lo guardo un secondo e penso: “Ah, rifrazione della luce”.']]},
{icon:'👗',text:'Il tuo stile di abbigliamento è solitamente…',answers:[['A','Paillettes, colori pastello e magari un cerchietto con un corno.'],['B','Accessori colorati e originali che spiccano.'],['C','Sobrio, pratico e preferibilmente dai colori neutri.']]},
{icon:'✨',text:'Se potessi avere un superpotere, quale sceglieresti?',answers:[['A','Trasformare tutto ciò che tocco in zucchero filato o cristalli.'],['B','Guarire le persone con un tocco e portare la felicità.'],['C','La telepatia o il volo, per pura efficienza.']]},
{icon:'💖',text:'Cosa fai se un amico è triste?',answers:[['A','Organizzo una festa a sorpresa con coriandoli e musica a palla.'],['B','Lo ascolto e cerco di portargli un po’ di ottimismo e calore.'],['C','Gli offro un consiglio pratico per risolvere il problema.']]}
];
const results={A:{icon:'🦄',title:'Unicorno puro al 100%!',text:'Vivi in un mondo di magia, glitter e sogni. La realtà per te è solo una tela bianca da colorare con i colori dell’arcobaleno. Probabilmente hai del sangue magico nelle vene!'},B:{icon:'🌈',title:'Unicorno nell’anima',text:'Sei una persona solare, gentile e vedi il lato positivo in ogni cosa. Magari non hai un corno visibile, ma la tua energia è puramente leggendaria.'},C:{icon:'😎',title:'Unicorno in incognito',text:'Sei una persona pragmatica e con i piedi per terra. Forse gli unicorni ti sembrano un po’ troppo caotici, ma chissà… magari sotto quella giacca seria nascondi dei calzini con le nuvolette!'}};
let current=0,scores={A:0,B:0,C:0};
function show(id){screens.forEach(s=>s.classList.toggle('active',s.id===id));window.scrollTo({top:0,behavior:'smooth'})}
function glitter(n=24){const layer=document.getElementById('sparkles'),symbols=['✨','⭐','💖','🌟','💫'];for(let i=0;i<n;i++){const x=document.createElement('span');x.className='sparkle';x.textContent=symbols[Math.floor(Math.random()*symbols.length)];x.style.left=Math.random()*100+'%';x.style.fontSize=14+Math.random()*22+'px';x.style.animationDuration=1.8+Math.random()*2.5+'s';x.style.animationDelay=Math.random()*.25+'s';layer.appendChild(x);setTimeout(()=>x.remove(),5000)}}
function render(){const q=questions[current];questionIcon.textContent=q.icon;question.textContent=q.text;counter.textContent=`Domanda ${current+1} di ${questions.length}`;progressBar.style.width=((current+1)/questions.length*100)+'%';answers.innerHTML='';q.answers.forEach(([l,t])=>{const b=document.createElement('button');b.className='answer';b.innerHTML=`<b>${l}</b>${t}`;b.onclick=()=>choose(l);answers.appendChild(b)})}
function choose(l){scores[l]++;glitter(18);if(current<questions.length-1){current++;setTimeout(render,220)}else{show('loading');glitter(35);setTimeout(result,2200)}}
function result(){const winner=['A','B','C'].reduce((best,l)=>scores[l]>scores[best]?l:best,'A'),r=results[winner];resultIcon.textContent=r.icon;resultTitle.textContent=r.title;resultText.textContent=r.text;show('result');glitter(44)}
start.onclick=()=>{current=0;scores={A:0,B:0,C:0};render();show('quiz');glitter(24)};
openCard.onclick=()=>{show('final');glitter(70)};
printCardButton.onclick=()=>window.print();
restart.onclick=()=>{current=0;scores={A:0,B:0,C:0};show('welcome')};
setInterval(()=>document.visibilityState==='visible'&&glitter(4),3000);
