(function(){
  var root=document.querySelector('.thing-deck');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) root.classList.add('rm');
  function clamp(v,a,b){a=a===undefined?0:a;b=b===undefined?1:b;return v<a?a:v>b?b:v;}
  function $(s,c){return (c||document).querySelector(s);}
  function $$(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s));}
  function tok(n,f){return getComputedStyle(root).getPropertyValue(n).trim()||f;}

  var heroStage=$('.hero .stage'), heroIn=$('.hero-in');
  var reveals=$$('[data-reveal]');
  var etym=$('.etym'); if(!reduce) etym.classList.add('scrub');
  var matrix=$('.matrix'), wfSec=$('[data-wf]'), tam=$('[data-tam]'), statement=$('[data-statement]');

  /* ---------- hero intro: slams, shakes, rings, burst ---------- */
  var bc=$('#burst'), bx=bc.getContext('2d'), parts=[], bursting=false;
  function sizeBurst(){var r=bc.getBoundingClientRect(),d=Math.min(2,window.devicePixelRatio||1);bc.width=Math.max(1,r.width*d);bc.height=Math.max(1,r.height*d);bx.setTransform(d,0,0,d,0,0);}
  function shake(big){heroIn.classList.remove('shake','shake-big');void heroIn.offsetWidth;heroIn.classList.add(big?'shake-big':'shake');}
  function ring(el,big){
    var s=heroStage.getBoundingClientRect(),r=el.getBoundingClientRect(),d=document.createElement('div');
    d.className='ring'+(big?' big':'');d.style.left=(r.left+r.width/2-s.left)+'px';d.style.top=(r.top+r.height/2-s.top)+'px';
    heroStage.appendChild(d);setTimeout(function(){d.remove();},1300);
  }
  function burst(el){
    sizeBurst();
    var s=heroStage.getBoundingClientRect(),r=el.getBoundingClientRect(),cx=r.left+r.width/2-s.left,cy=r.top+r.height/2-s.top;
    var cols=[tok('--accent','#ff8a2a'),tok('--inv-accent','#59b7ff'),tok('--inv-ink','#eef5ff')];
    var words=['thing','Thing','things','THING','synergy','þing'];
    for(var i=0;i<170;i++){
      var a=Math.random()*Math.PI*2,v=6+Math.random()*22,w=Math.random()<.22;
      parts.push({x:cx,y:cy,vx:Math.cos(a)*v,vy:Math.sin(a)*v-6,r:Math.random()*6,vr:(Math.random()-.5)*.5,s:w?14+Math.random()*20:4+Math.random()*9,c:cols[i%3],w:w?words[i%words.length]:null,life:1});
    }
    if(!bursting){bursting=true;requestAnimationFrame(stepBurst);}
  }
  function stepBurst(){
    var w=bc.clientWidth,h=bc.clientHeight;bx.clearRect(0,0,w,h);
    parts=parts.filter(function(p){return p.life>0;});
    parts.forEach(function(p){
      p.x+=p.vx;p.y+=p.vy;p.vy+=.55;p.vx*=.985;p.r+=p.vr;p.life-=.011;
      bx.save();bx.globalAlpha=Math.max(0,p.life);bx.translate(p.x,p.y);bx.rotate(p.r);bx.fillStyle=p.c;
      if(p.w){bx.font='200 '+Math.round(p.s)+'px "Montserrat", sans-serif';bx.textAlign='center';bx.fillText(p.w,0,0);}
      else bx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);
      bx.restore();
    });
    if(parts.length) requestAnimationFrame(stepBurst); else {bursting=false;bx.clearRect(0,0,w,h);}
  }
  if(!reduce){
    var lis=$$('.li');
    lis.forEach(function(el){
      var t=(parseFloat(el.style.getPropertyValue('--d'))+0.42)*1000;
      setTimeout(function(){shake(false);ring(el,false);},t);
    });
    setTimeout(function(){var mid=lis[2];shake(true);ring(mid,true);setTimeout(function(){ring(mid,true);},140);burst(mid);},2000);
  }

  /* ---------- statement canvas ---------- */
  var cv=$('#things'), ctx=cv.getContext('2d'), MAX=900, lastN=-1, thingsN=0, items=[];
  var seed=930; function rnd(){seed=(seed*1664525+1013904223)%4294967296;return seed/4294967296;}
  var tw=['things','things','things','things','Thing','things.','THING','thing'];
  // random albedo: each word sits somewhere between darker-than-ground and the light tone, skewed dark, so normal alpha blending keeps the ground's brightness
  for(var i=0;i<MAX;i++){items.push({x:rnd(),y:rnd(),s:12+Math.pow(rnd(),2.2)*54,r:(rnd()-.5)*.9,a:.18+rnd()*.42,l:Math.pow(rnd(),2.2),acc:rnd()<.08,w:tw[Math.floor(rnd()*tw.length)],it:rnd()<.3});}
  function rgb(hex){hex=hex.replace('#','');if(hex.length===3)hex=hex.replace(/./g,'$&$&');var n=parseInt(hex,16);return [n>>16&255,n>>8&255,n&255];}
  function sizeCanvas(){var r=cv.getBoundingClientRect(),d=Math.min(2,window.devicePixelRatio||1);cv.width=Math.max(1,r.width*d);cv.height=Math.max(1,r.height*d);ctx.setTransform(d,0,0,d,0,0);lastN=-1;}
  function drawThings(p){
    var N=Math.floor(Math.pow(p,1.3)*MAX); thingsN=N;
    if(N===lastN) return; lastN=N;
    var w=cv.clientWidth,h=cv.clientHeight; ctx.clearRect(0,0,w,h);
    var lt=rgb(tok('--inv-2','#b7c7d9')),gd=rgb(tok('--inv','#03070d')),ac=tok('--inv-accent','#59b7ff');
    var dk=gd.map(function(c){return Math.round(c*.25);});
    ctx.globalCompositeOperation='source-over'; ctx.textAlign='center'; ctx.textBaseline='middle';
    for(var i=0;i<N;i++){var t=items[i];ctx.globalAlpha=t.a;
      ctx.fillStyle=t.acc?ac:'rgb('+dk.map(function(c,j){return Math.round(c+(lt[j]-c)*t.l);}).join(',')+')';ctx.save();ctx.translate(t.x*w,t.y*h);ctx.rotate(t.r);ctx.font=(t.it?'100 ':'200 ')+Math.round(t.s)+'px "Montserrat", sans-serif';ctx.fillText(t.w,0,0);ctx.restore();}
    ctx.globalAlpha=1; $('.things-n').textContent=N.toLocaleString();
  }

  var div=$('[data-divinity]'), thingRow=$('.thingrow'), divTable=$('table',div);
  var counters=$$('[data-count]');
  var tpsEls=$$('h1,h2,h3,p,td,th,li,strong.cn').filter(function(el){return !el.closest('.hud-pill');}).map(function(el){return [el,(el.textContent.match(/thing/gi)||[]).length];}).filter(function(x){return x[1]>0;});

  function flowP(el,vh,a,b){var r=el.getBoundingClientRect();return clamp((vh*a-r.top)/(vh*b));}
  function rev(el,vh){if(reduce)return 1;var r=el.getBoundingClientRect(),d=parseFloat(el.dataset.delay||0);return clamp((vh-r.top-d*vh*0.06)/(vh*0.5));}

  var ticking=false;
  function frame(){
    ticking=false;
    var vh=window.innerHeight;

    // quadrant
    var qp=reduce?1:flowP(matrix,vh,0.95,0.6);
    matrix.style.setProperty('--p',qp.toFixed(4));
    $$('.chip,.stamp',matrix).forEach(function(c){c.style.setProperty('--k',clamp((qp-parseFloat(c.dataset.start))/0.2).toFixed(4));});

    // etymology: sideways pan while the section scrolls up
    var vp=$('.viewport',etym),track=$('.track',etym);
    var ep=reduce?0:flowP(vp,vh,1,0.85);
    etym.style.setProperty('--p',ep.toFixed(4));
    etym.style.setProperty('--shift',reduce?'0px':Math.max(0,track.scrollWidth-vp.clientWidth)+'px');

    // TAM: circles grow as the section enters; SOM floods as the finale rises
    var tr0=tam.getBoundingClientRect(),q=reduce?1:clamp((vh-tr0.top)/vh);
    var fin=$('.tam-final',tam),g=reduce?0:clamp((vh-fin.getBoundingClientRect().top)/(vh*0.85));
    $$('.orbit',tam).forEach(function(c,i){var k=clamp((q-0.15-i*0.2)/0.3);c.style.setProperty('--c',(i===2?k*(1+g*g*16):k).toFixed(4));});
    tam.style.setProperty('--g',g.toFixed(4));
    fin.style.setProperty('--fo',reduce?0:clamp((g-0.55)/0.3).toFixed(3));
    $('.pen-n',tam).textContent=Math.round(g*100);

    // waterfall
    var wp=reduce?1:flowP($('.wf',wfSec),vh,0.95,0.55),sum=0;
    $$('.bar[data-i]',wfSec).forEach(function(b){var i=+b.dataset.i,k=clamp((wp-0.02-i*0.17)/0.14);b.parentElement.style.setProperty('--k',k.toFixed(4));if(i<4)sum+=k;});
    var n=Math.round(sum);$('.tps-n',wfSec).textContent=n;
    $$('.t',wfSec).forEach(function(w){w.classList.toggle('on',n>=+w.dataset.i);});

    // statement: things pile up behind the scrolling text
    var sr=statement.getBoundingClientRect();
    drawThings(reduce?0.45:clamp((vh-sr.top)/sr.height));

    // reveals and counters
    reveals.forEach(function(el){
      var r=rev(el,vh);el.style.setProperty('--r',r.toFixed(4));
      if(el.tagName==='TR')el.style.setProperty('--f',clamp((r-0.45)*2.5).toFixed(4));
    });
    var line=$('[data-reveal-line]');line.style.setProperty('--r',rev(line,vh).toFixed(4));
    counters.forEach(function(el){
      var r=rev(el.parentElement,vh),to=+el.dataset.count;
      el.textContent=el.hasAttribute('data-spin')?(r<1?String(Math.floor(r*97)%10):'0'):String(Math.round(r*to));
    });
    var dt=divTable.getBoundingClientRect(),tp=reduce?1:clamp((vh*0.55-dt.top)/dt.height);
    var v=50-(50-35.7)*clamp((tp-0.55)/0.3);
    div.style.setProperty('--fill',(v/100).toFixed(4));
    div.style.setProperty('--strike',clamp((tp-0.8)/0.15).toFixed(4));
    $('.div-n',div).textContent=v.toFixed(1);
    thingRow.classList.toggle('lit',tp>0.6);

    // HUD
    var max=root.scrollHeight-vh,prog=max>0?clamp(window.scrollY/max):1;
    root.style.setProperty('--prog',prog.toFixed(4));
    $('.syn').textContent=Math.round(prog*100)+'%';
    var tps=0;
    tpsEls.forEach(function(x){var b=x[0].getBoundingClientRect();if(b.bottom>0&&b.top<vh&&b.width>0)tps+=x[1];});
    if(sr.top<vh&&sr.bottom>0)tps+=thingsN;
    $('.tps').textContent=tps.toLocaleString();
  }
  var hdr=document.querySelector('.page-header');
  function sizeHead(){if(hdr)root.style.setProperty('--masthead-h',hdr.offsetHeight+parseFloat(getComputedStyle(hdr).marginTop)+'px');}
  function req(){if(!ticking){ticking=true;requestAnimationFrame(frame);}}
  window.addEventListener('scroll',req,{passive:true});
  window.addEventListener('resize',function(){sizeHead();sizeCanvas();sizeBurst();req();});
  sizeHead();sizeCanvas();sizeBurst();frame();
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){sizeHead();lastN=-1;frame();});
})();
