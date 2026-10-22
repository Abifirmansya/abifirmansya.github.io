const assert=require('node:assert/strict');
const B=require('../business-clarity/check-up/data.js');require('../business-clarity/check-up/assessment.js');
const fill=value=>Object.fromEntries(B.questions.map(q=>[q.id,value]));
const profile={businessAge:'early'};
assert.equal(B.questions.length,27);assert.equal(new Set(B.questions.map(q=>q.id)).size,27);
for(let n=0;n<4;n++){
 const r=B.analyze(fill(n),profile);
 assert.equal(r.overallLabel,['Rendah','Sedang','Tinggi','Sangat tinggi'][n]);
 assert.ok(r.areas.every(a=>a.status===n));assert.equal(r.counts[n],9);
 for(const a of r.areas){assert.ok(a.meaning.length>20);assert.ok(a.action.length>20);}
}
for(const core of ['customers','value','revenue'])for(const [score,expected] of [[0,'Sedang'],[1,'Tinggi']]){
 const answers=fill(3);B.blocks.find(b=>b.id===core).questions.forEach(q=>answers[q.id]=score);
 assert.equal(B.analyze(answers,profile).overallLabel,expected);
}
let answers=fill(3);answers.target=0;
let r=B.analyze(answers,profile);assert.equal(r.areas[0].status,2);assert.equal(r.areas[0].action,B.questions[0].action);
answers=fill(3);answers.partnerNeed=4;delete answers.partnerRole;delete answers.partnerReason;
r=B.analyze(answers,profile);assert.equal(r.findings.length,25);assert.equal(r.areas.find(a=>a.id==='partners').status,3);assert.match(r.areas.find(a=>a.id==='partners').meaning,/Tidak memakai mitra bukan kekurangan/);
answers.partnerNeed=3;assert.throws(()=>B.analyze(answers,profile),/belum lengkap/);
for(const value of [-1,4,'3',null,1.5,NaN]){const x=fill(3);x.target=value;assert.throws(()=>B.analyze(x,profile),/belum lengkap/);}
assert.throws(()=>B.analyze(fill(3),{businessAge:'pre'}),/sudah mulai/);
// Same score, different missing indicator must give a different recommendation and explanation.
const x=fill(3),y=fill(3);x.target=1;y.need=1;
const rx=B.analyze(x,profile).areas[0],ry=B.analyze(y,profile).areas[0];
assert.equal(rx.status,ry.status);assert.notEqual(rx.action,ry.action);assert.notEqual(rx.meaning,ry.meaning);
// Monotonicity: knowing more on any question must never reduce the overall level.
for(const q of B.questions)for(let n=0;n<3;n++){const x=fill(1);x[q.id]=n;const before=B.analyze(x,profile);x[q.id]=n+1;const after=B.analyze(x,profile);assert.ok(after.overallLevel>=before.overallLevel);}
assert.deepEqual(B.analyze(fill(2),{businessAge:'new',industry:'food',businessSummary:'Apa saja'}),B.analyze(fill(2),{businessAge:'mature',industry:'service',businessSummary:'Berbeda'}));
console.log('PASS: 4 levels, all 3 core limits, missing/invalid answers, no-partner branch, recommendation variation, score monotonicity, and unscored profile.');
