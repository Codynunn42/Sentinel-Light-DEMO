/* Proposed DIRKS handoff contract. Local simulation; not the production NunnPay SDK. */
(function(root){
 function fingerprint(t){return JSON.stringify({currency:'USD',recipient:'field-and-table-demo',fundingSource:'simulation-only',budget:t.budget,revision:t.revision,items:t.items.map(i=>[i.id,i.price,i.qty])});}
 function prepare(t,total){return {schema:'dirks.nunnpay.handoff.v1',mode:'simulation',liveEnabled:false,actionId:t.id+'-payment-r'+t.revision,idempotencyKey:t.id+'-payment-r'+t.revision,taskId:t.id,revision:t.revision,amountMinor:Math.round(total*100),currency:'USD',recipient:'field-and-table-demo',fundingSource:'simulation-only',fingerprint:fingerprint(t),status:'prepared',providerReference:null,events:[{type:'PAYMENT_PROPOSED',at:new Date().toISOString()}]};}
 function approve(t,total){if(!t.payment||t.payment.fingerprint!==fingerprint(t)||t.payment.amountMinor!==Math.round(total*100))throw Error('The NunnPay handoff changed. Prepare and approve it again.');t.payment.status='approved';t.payment.events.push({type:'PAYMENT_APPROVED',at:new Date().toISOString()});}
 function submit(t,total,result='pending'){
  if(!['pending','confirmed','failed','timeout'].includes(result))throw Error('Unknown payment simulation.');
  const p=t.payment;
  if(!p||p.mode!=='simulation'||p.liveEnabled!==false)throw Error('Live NunnPay payments are not enabled.');
  if(p.status!=='approved'||p.fingerprint!==fingerprint(t)||p.amountMinor!==Math.round(total*100)||p.recipient!=='field-and-table-demo'||p.fundingSource!=='simulation-only'||p.currency!=='USD')throw Error('Current exact payment approval is required.');
  p.status=result==='timeout'?'unresolved':result;p.providerReference=result==='confirmed'?'MOCK-'+p.actionId:null;p.events.push({type:'PAYMENT_SIMULATED_'+p.status.toUpperCase(),at:new Date().toISOString()});
 }
 function cancel(t){if(t.payment){t.payment.status='cancelled';t.payment.events.push({type:'PAYMENT_CANCELLED',at:new Date().toISOString()});}}
 function check(t){const p=t.payment;if(!t.dispatched||!p||p.mode!=='simulation'||!['pending','unresolved'].includes(p.status))throw Error('No uncertain simulated payment to check.');p.status='confirmed';p.providerReference='MOCK-'+p.actionId;p.events.push({type:'PAYMENT_STATUS_CHECK_SIMULATED',at:new Date().toISOString()});}
 const api={prepare,approve,submit,cancel,check,fingerprint};if(typeof module!=='undefined')module.exports=api;else root.NunnPayHandoff=api;
})(typeof window!=='undefined'?window:globalThis);
