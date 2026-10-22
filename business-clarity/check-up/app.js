(() => {
'use strict';
const B=window.BC,$=id=>document.getElementById(id),profileKeys=['businessName','industry','teamSize','businessAge','businessSummary'];
const empty=()=>({version:B.version,businessName:'',industry:'',teamSize:'',businessAge:'',businessSummary:'',answers:{},step:0,completedAt:null});
let state=empty(),result=null,downloadUrl=null,storageOK=true,hasSaved=false;
try{
 const value=JSON.parse(localStorage.getItem(B.storageKey));
 if(value?.version===B.version){
  for(const key of profileKeys)if(typeof value[key]==='string')state[key]=value[key].slice(0,key==='businessSummary'?600:80);
  state.step=Number.isInteger(value.step)?Math.max(0,Math.min(8,value.step)):0;
  for(const q of B.questions)if(Number.isInteger(value.answers?.[q.id])&&q.options[value.answers[q.id]])state.answers[q.id]=value.answers[q.id];
  state.completedAt=Number.isFinite(value.completedAt)&&value.completedAt>0&&value.completedAt<=8640000000000000?value.completedAt:null;
  hasSaved=!!state.businessName;
 }
 $('legacyNotice').hidden=!localStorage.getItem('business-clarity-checkup-v4');
}catch{storageOK=false;}
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const activeQuestions=()=>B.applicableQuestions(state.answers);
const blockQuestions=b=>activeQuestions().filter(q=>q.blockId===b.id);
const answered=q=>Number.isInteger(state.answers[q.id])&&!!q.options[state.answers[q.id]];
const completeProfile=()=>state.businessName.trim()&&B.industries[state.industry]&&B.teams[state.teamSize]&&B.ages[state.businessAge]&&state.businessAge!=='pre';
const completeAnswers=()=>activeQuestions().every(answered);
function storageMessage(){document.querySelectorAll('.storage-status').forEach(el=>el.textContent=storageOK?'Jawaban disimpan di browser ini, tidak dikirim ke server. Bisa dilanjutkan di perangkat yang sama.':'Browser tidak bisa menyimpan jawaban. Anda tetap bisa lanjut dan mengunduh PDF sebelum menutup halaman.');}
function save(){try{localStorage.setItem(B.storageKey,JSON.stringify(state));storageOK=true;}catch{storageOK=false;}storageMessage();}
function show(id,focus=true){document.querySelectorAll('.view').forEach(el=>el.classList.toggle('active',el.id===id));document.body.dataset.view=id;if(focus){window.scrollTo({top:0,behavior:'instant'});const heading=$(id).querySelector('h1,h2');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}}}
for(const [id,values] of [['industry',B.industries],['teamSize',B.teams],['businessAge',B.ages]])$(id).innerHTML='<option value="" disabled selected>Pilih salah satu</option>'+Object.entries(values).map(([v,t])=>`<option value="${v}">${esc(t)}</option>`).join('');
function showPreNotice(){const pre=$('businessAge').value==='pre';$('preNotice').hidden=!pre;$('startQuiz').disabled=pre;}
function profile(){profileKeys.forEach(k=>$(k).value=state[k]);$('savedNotice').hidden=!hasSaved;if(hasSaved)$('savedNotice').textContent='Jawaban Anda masih tersimpan. Lanjutkan check-up atau perbarui profil di bawah.';showPreNotice();show('profile');}
profileKeys.forEach(key=>$(key).addEventListener('input',()=>{state[key]=$(key).value;state.completedAt=null;if(key==='businessAge')showPreNotice();save();}));
$('profileForm').onsubmit=event=>{event.preventDefault();profileKeys.forEach(k=>state[k]=$(k).value.trim());$('profileError').textContent='';if(!completeProfile()){$('profileError').textContent=state.businessAge==='pre'?'Check-up ini untuk usaha yang sudah mulai menawarkan atau menjual.':'Lengkapi nama, bidang, jumlah orang, dan lama usaha terlebih dahulu.';$('profileForm').reportValidity();return;}save();renderBlock();};
$('changeProfile').onclick=profile;
function updateProgress(){const qs=activeQuestions(),n=qs.filter(answered).length;$('countLabel').textContent=n+' / '+qs.length+' terjawab';$('bar').style.width=n/qs.length*100+'%';const track=document.querySelector('.track');track.setAttribute('aria-valuemax',qs.length);track.setAttribute('aria-valuenow',n);}
function renderNav(){
 $('blockNav').innerHTML=B.blocks.map((b,i)=>{const qs=blockQuestions(b),n=qs.filter(answered).length;return `<li><button class="block-tab ${i===state.step?'active':''}" ${i===state.step?'aria-current="step"':''} data-step="${i}"><span class="num">${n===qs.length?'✓':String(i+1).padStart(2,'0')}</span><span>${esc(b.name)}</span><small>${n}/${qs.length}</small></button></li>`;}).join('');
 $('blockNav').querySelectorAll('button').forEach(el=>el.onclick=()=>{state.step=Number(el.dataset.step);save();renderBlock();});
}
function renderBlock(scroll=true){
 if(!completeProfile())return profile();result=null;const b=B.blocks[state.step],qs=blockQuestions(b);
 $('sideBusiness').textContent=state.businessName;$('stepLabel').textContent='Blok '+(state.step+1)+' dari 9';renderNav();updateProgress();
 $('questionBody').innerHTML=`<div class="block-intro"><p class="eyebrow">${esc(b.bmc.toUpperCase())}</p><h2 id="blockTitle">${esc(b.name)}</h2><p>${esc(b.intro)}</p><p class="micro">Pilih satu jawaban yang paling sesuai dengan keadaan sekarang.</p></div>`+qs.map((q,i)=>`<section class="question-card" id="card-${q.id}"><p class="question-number">PERTANYAAN ${i+1} DARI ${qs.length}</p><h3 class="question-title" id="title-${q.id}">${esc(q.title)}</h3><p class="hint" id="hint-${q.id}">${esc(q.hint)}</p><fieldset class="options" aria-describedby="hint-${q.id}"><legend class="sr-only">${esc(q.title)}</legend>${q.options.map((o,j)=>`<label class="option"><input type="radio" name="${q.id}" value="${j}" ${state.answers[q.id]===j?'checked':''}><span>${esc(o.label)}</span></label>`).join('')}</fieldset></section>`).join('')+(b.id==='partners'&&qs.length===1?'<p class="notice" role="status">Anda memilih tidak membutuhkan pihak luar. Dua pertanyaan lanjutan dilewati. Ini tidak menurunkan status blok Mitra Utama.</p>':'');
 $('questionBody').querySelectorAll('input').forEach(el=>el.onchange=()=>{
  state.answers[el.name]=Number(el.value);state.completedAt=null;
  if(el.name==='partnerNeed'&&B.questions.find(q=>q.id==='partnerNeed').options[state.answers.partnerNeed].noPartner){delete state.answers.partnerRole;delete state.answers.partnerReason;}
  save();$('quizError').textContent='';
  if(el.name==='partnerNeed'){const value=el.value;renderBlock(false);document.querySelector(`input[name="partnerNeed"][value="${value}"]`).focus({preventScroll:true});}
  else{$('card-'+el.name).classList.remove('missing');updateProgress();renderNav();}
 });
 $('quizError').textContent='';$('prev').textContent=state.step===0?'← Profil usaha':'← Sebelumnya';$('next').textContent=state.step===8?'Periksa jawaban →':'Lanjut →';show('quiz',false);
 if(scroll){window.scrollTo({top:0,behavior:'instant'});$('blockTitle').tabIndex=-1;$('blockTitle').focus({preventScroll:true});}
}
function markMissing(q){$('quizError').textContent='Masih ada yang belum dijawab. Pilih jawaban pada pertanyaan yang ditandai.';const card=$('card-'+q.id);card.classList.add('missing');card.scrollIntoView({behavior:'smooth',block:'center'});card.querySelector('input').focus({preventScroll:true});}
$('prev').onclick=()=>{if(state.step===0)return profile();state.step--;save();renderBlock();};
$('next').onclick=()=>{const missing=blockQuestions(B.blocks[state.step]).find(q=>!answered(q));if(missing)return markMissing(missing);if(state.step===8)return renderReview();state.step++;save();renderBlock();};
function renderReview(){
 $('reviewError').textContent='';
 $('reviewList').innerHTML=`<div class="review-profile"><h2>${esc(state.businessName)}</h2><p>${esc(B.industries[state.industry])} · ${esc(B.teams[state.teamSize])} · ${esc(B.ages[state.businessAge])}</p>${state.businessSummary?`<p>${esc(state.businessSummary)}</p>`:''}<button class="text-btn" id="editProfile">Ubah profil usaha</button></div>`+B.blocks.map((b,i)=>`<section class="review-block"><h2>${i+1}. ${esc(b.name)}</h2>${blockQuestions(b).map(q=>`<div class="review-answer"><div><strong>${esc(q.title)}</strong><button class="text-btn" data-edit="${i}" data-question="${q.id}" aria-label="Ubah jawaban: ${esc(q.title)}">Ubah</button></div><p>${esc(q.options[state.answers[q.id]]?.label||'Belum dijawab')}</p></div>`).join('')}</section>`).join('');
 $('editProfile').onclick=profile;$('reviewList').querySelectorAll('[data-edit]').forEach(el=>el.onclick=()=>{state.step=Number(el.dataset.edit);save();renderBlock();const card=$('card-'+el.dataset.question);card.scrollIntoView({block:'center'});card.querySelector('input').focus({preventScroll:true});});show('review');
}
$('reviewBack').onclick=renderBlock;$('edit').onclick=renderReview;
$('analyze').onclick=()=>{const missing=activeQuestions().find(q=>!answered(q));if(missing){state.step=B.blocks.findIndex(b=>b.id===missing.blockId);renderBlock();markMissing(missing);return;}try{renderResults();}catch(e){$('reviewError').textContent=e.message;}};
const badge=a=>`<span class="badge level-${a.status}"><span class="status-dot" aria-hidden="true"></span>${esc(a.label)}</span>`;
function renderResults(){
 result=B.analyze(state.answers,state);if(!state.completedAt)state.completedAt=Date.now();save();
 $('resultIdentity').textContent=state.businessName+' · '+new Date(state.completedAt).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'});
 $('overallLabel').textContent=result.overallLabel;$('overallSteps').innerHTML=B.overallLabels.map((_,i)=>`<span class="${i<=result.overallLevel?'on':''}"></span>`).join('');$('overallScale').textContent='Tingkat '+(result.overallLevel+1)+' dari 4';$('resultSummary').textContent=result.narrative;
 $('profileContext').innerHTML=`<p><strong>${esc(state.businessName)}</strong><br>${esc(B.industries[state.industry])} · ${esc(B.teams[state.teamSize])} · ${esc(B.ages[state.businessAge])}</p>${state.businessSummary?`<p>${esc(state.businessSummary)}</p><p class="micro">Catatan dari Anda; tidak dianalisis otomatis.</p>`:''}`;
 $('legend').innerHTML=B.labels.map((name,i)=>`<span class="level-${i}"><i class="status-dot" aria-hidden="true"></i>${esc(name)}</span>`).join('');
 $('resultMap').innerHTML=result.areas.map((a,i)=>`<a class="map-item ${a.id} level-${a.status}" href="#detail-${a.id}" data-open="${a.id}" aria-label="${esc(a.name+': '+a.label+'. Baca penjelasan dan rekomendasi')}"><small>${String(i+1).padStart(2,'0')} / ${esc(a.bmc)}</small><span class="map-arrow" aria-hidden="true"><svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg></span><strong>${esc(a.name)}</strong>${badge(a)}</a>`).join('');
 $('blockResults').innerHTML=result.areas.map((a,i)=>`<details class="block-detail" id="detail-${a.id}" open><summary><span class="detail-index">${String(i+1).padStart(2,'0')}</span><span class="detail-name">${esc(a.name)}</span>${badge(a)}<span class="detail-chevron" aria-hidden="true"></span></summary><div class="detail-content">
 <p class="block-about">${esc(a.about)}</p>
 <div class="detail-reading"><h3>Mengapa statusnya ${esc(a.label.toLowerCase())}?</h3><p>${esc(a.reason)}</p><ul>${a.findings.map(f=>`<li>${esc(f.noPartner?a.meaning:f.meaning)}</li>`).join('')}</ul></div>
 <div class="detail-meaning"><h3>Apa artinya untuk usaha Anda?</h3><p>${esc(a.why)}</p><p class="detail-example">${esc(a.example)} <span>Ini contoh penjelas, bukan kesimpulan tentang usaha Anda.</span></p></div>
 <div class="recommendation"><h3>REKOMENDASI</h3><p>${esc(a.action)}</p></div>
 <details class="evidence-list"><summary>Lihat jawaban yang menjadi dasar</summary>${a.findings.map(f=>`<p><strong>${esc(f.question)}</strong><br>${esc(f.label)}</p>`).join('')}</details></div></details>`).join('');
 $('resultMap').querySelectorAll('a').forEach(el=>el.onclick=event=>{event.preventDefault();const detail=$('detail-'+el.dataset.open);detail.open=true;detail.scrollIntoView({behavior:'smooth',block:'start'});detail.querySelector('summary').focus({preventScroll:true});});
 $('downloadStatus').textContent='Gratis, tanpa email atau nomor HP.';show('results');
}
document.querySelectorAll('.download').forEach(btn=>btn.onclick=async()=>{
 if(!result)return;const status=$('downloadStatus');document.querySelectorAll('.download').forEach(b=>b.disabled=true);status.textContent='Menyiapkan laporan PDF…';
 try{
  if(!window.jspdf?.jsPDF)throw Error('Pembuat PDF belum termuat. Muat ulang halaman dan coba kembali.');
  const doc=window.createBCReport(window.jspdf.jsPDF,state,result),blob=doc.output('blob');
  if(downloadUrl)URL.revokeObjectURL(downloadUrl);downloadUrl=URL.createObjectURL(blob);
  const name='Business-Clarity-'+(state.businessName.replace(/[^a-zA-Z0-9 _-]/g,'').slice(0,60)||'Laporan')+'.pdf';
  const a=document.createElement('a');a.href=downloadUrl;a.download=name;document.body.appendChild(a);a.click();a.remove();
  status.textContent='Laporan PDF berhasil dibuat. Jika unduhan belum muncul, ';const fallback=document.createElement('a');fallback.href=downloadUrl;fallback.download=name;fallback.textContent='unduh melalui tautan ini';status.appendChild(fallback);
 }catch(e){status.textContent='PDF belum berhasil dibuat. '+e.message;}
 finally{document.querySelectorAll('.download').forEach(b=>b.disabled=false);status.scrollIntoView({behavior:'smooth',block:'center'});}
});
$('restart').onclick=()=>{if(!confirm('Mulai check-up baru? Unduh hasil terlebih dahulu. Jawaban versi ini akan diganti.'))return;state=empty();result=null;hasSaved=false;if(downloadUrl){URL.revokeObjectURL(downloadUrl);downloadUrl=null;}save();profile();};
storageMessage();if(completeProfile()){if(state.completedAt&&completeAnswers())renderResults();else renderBlock();}else profile();
})();
