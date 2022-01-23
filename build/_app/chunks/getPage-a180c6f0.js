const e=async(a,n)=>{const t=await a(n);if(!t.ok)return;const{html:s}=await t.json();return s};export{e as g};
