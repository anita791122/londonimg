  function toggleMenu(){
    var sb=document.querySelector('.sidebar');
    var open=sb.classList.toggle('menu-open');
    var ham=sb.querySelector('.hamburger');
    if(ham) ham.setAttribute('aria-expanded', open?'true':'false');
  }
  function closeMenu(){
    var sb=document.querySelector('.sidebar');
    if(!sb.classList.contains('menu-open')) return;
    sb.classList.remove('menu-open');
    var ham=sb.querySelector('.hamburger');
    if(ham) ham.setAttribute('aria-expanded','false');
  }
  function show(id){
    document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active')});
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.nav > a').forEach(function(a){a.classList.remove('active')});
    var navA=document.querySelector('.nav > a[data-t="'+id+'"]');
    if(navA) navA.classList.add('active');
    var sub=document.getElementById('subnav-lego');
    var par=document.querySelector('.nav a.has-sub');
    if(sub) sub.classList.add('open');
    if(par) par.classList.add('open');
    document.querySelectorAll('.subnav .sub-a').forEach(function(a){a.classList.remove('active')});
    if(id==='p2'){
      document.querySelectorAll('.lego').forEach(function(l){l.classList.remove('active')});
      var ov=document.getElementById('lego-overview');
      if(ov) ov.classList.add('active');
    }
    if(id!=='p2') closeMenu();
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function copyCode(btn){
    var box = btn.closest('.code,.field').querySelector('textarea');
    box.select();
    var lbl = btn.querySelector('.lbl');
    var done = function(){
      var t = lbl.getAttribute('data-o') || lbl.textContent;
      lbl.setAttribute('data-o', t);
      lbl.textContent = '已複製！'; btn.classList.add('ok');
      setTimeout(function(){lbl.textContent=t;btn.classList.remove('ok')}, 1500);
    };
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(box.value).then(done, function(){document.execCommand('copy');done();});
    }else{document.execCommand('copy');done();}
  }
  /* 樂高積木：側欄子選單切換（切到 p2＋展開子選單＋高亮子項＋顯示對應積木） */
  function showLego(id){
    document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active')});
    document.getElementById('p2').classList.add('active');
    document.querySelectorAll('.nav > a').forEach(function(a){a.classList.remove('active')});
    var par=document.querySelector('.nav a.has-sub');
    if(par){par.classList.add('active');par.classList.add('open');}
    var sub=document.getElementById('subnav-lego');
    if(sub) sub.classList.add('open');
    document.querySelectorAll('.lego').forEach(function(l){l.classList.remove('active')});
    var el=document.getElementById('lego-'+id);
    if(el) el.classList.add('active');
    document.querySelectorAll('.subnav .sub-a').forEach(function(a){a.classList.remove('active')});
    var sa=document.querySelector('.subnav [data-lego="'+id+'"]');
    if(sa) sa.classList.add('active');
    if(el){var y=el.getBoundingClientRect().top+window.pageYOffset-80;window.scrollTo({top:y,behavior:'smooth'});}
    closeMenu();
  }
  /* 測試方塊：把同事填的內容即時 render 出來 */
  function renderTest(btn){
    var box = btn.closest('.test');
    box.querySelector('.test-out').innerHTML = box.querySelector('textarea').value;
  }
  /* 動態生成「所有積木總覽」：從各積木 clone 範例預覽 + 標註語法去哪看分頁 */
  function buildOverview(){
    var ov=document.getElementById('lego-overview');
    if(!ov) return;
    var html='<div class="ov-intro">📦 <b>所有積木總覽</b>：下面是每個積木的「呈現樣式」。要拿某個積木的<b>填空語法</b>，點該積木右上角「看填空語法 →」，或左側選單對應的積木分頁。</div>';
    document.querySelectorAll('.subnav .sub-a').forEach(function(tab){
      var id=tab.getAttribute('data-lego');
      var seqEl=tab.querySelector('.sub-i');
      var seq=seqEl?seqEl.textContent.trim():'';
      var label=tab.textContent.trim();
      if(seq && label.indexOf(seq)===0) label=label.slice(seq.length).trim();
      var name=(seq?seq+'　':'')+label;
      var lego=document.getElementById('lego-'+id);
      var preview=lego?lego.querySelector('.preview'):null;
      html+='<div class="ov-item"><div class="ov-head"><h3>'+name+'</h3>';
      if(preview){
        html+='<button class="ov-link" onclick="showLego(\''+id+'\')">看填空語法 →</button></div>';
        html+='<div class="preview">'+preview.innerHTML+'</div>';
      }else{
        html+='<span class="ov-todo">🚧 製作中</span></div>';
      }
      html+='</div>';
    });
    ov.innerHTML=html;
  }
  buildOverview();
