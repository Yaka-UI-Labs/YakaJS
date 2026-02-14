/*!
 * Yaka.js - Next-Gen JavaScript Library
 * Version: 1.0.0
 * More powerful than jQuery, simpler to write
 * 
 * Copyright (c) 2026
 * Released under the MIT license
 */
!function(e){function t(e,n){if(!(this instanceof t))return new t(e,n)
if(this.elements=[],"function"==typeof e)return"loading"!==document.readyState?e():document.addEventListener("DOMContentLoaded",e),this
if(!e)return this
if("string"==typeof e)if("<"===e[0]){const t=document.createElement("div")
t.innerHTML=e.trim(),this.elements=Array.from(t.children)}else{const t=n||document
this.elements=Array.from(t.querySelectorAll(e))}else e.nodeType?this.elements=[e]:Array.isArray(e)?this.elements=e:void 0!==e.length&&(this.elements=Array.from(e))
return this}const n=new WeakMap
if(t.prototype={constructor:t,each(e){return this.elements.forEach((t,n)=>{e.call(t,n,t)}),this},get(e){return void 0===e?this.elements:this.elements[e]},first(){return new t(this.elements[0]??[])},last(){return new t(this.elements[this.elements.length-1]??[])},eq(e){const n=this.elements[e]
return new t(void 0!==n?n:[])},text(e){return void 0===e?this.elements[0]?.textContent||"":this.each((t,n)=>n.textContent=e)},html(e,n=!1){return void 0===e?this.elements[0]?.innerHTML||"":this.each((r,o)=>{n&&t.security&&"function"==typeof t.security.sanitizeHtml?o.innerHTML=t.security.sanitizeHtml(e):n?o.textContent=e:o.innerHTML=e})},val(e){return void 0===e?this.elements[0]?.value||"":this.each((t,n)=>n.value=e)},attr(e,t){if("object"==typeof e){const t=Object.keys(e)
return this.each((n,r)=>{t.forEach(t=>r.setAttribute(t,e[t]))})}return void 0===t?this.elements[0]?.getAttribute(e):this.each((n,r)=>r.setAttribute(e,t))},removeAttr(e){return this.each((t,n)=>n.removeAttribute(e))},data(e,t){return void 0===t?this.elements[0]?.dataset[e]:this.each((n,r)=>r.dataset[e]=t)},addClass(e,t){if(t){const n=[]
return this.elements.forEach(t=>{const r=e.split(" "),o={},a=getComputedStyle(t);["opacity","height","width","margin","padding"].forEach(e=>{o[e]=a[e]}),n.push({elem:t,classes:r,before:o})}),n.forEach(({elem:e,classes:t})=>{t.forEach(t=>e.classList.add(t))}),n.forEach(({elem:e,before:n})=>{const r=getComputedStyle(e),o=[]
Object.keys(n).forEach(e=>{n[e]!==r[e]&&o.push(`${e} ${t}ms ease`)}),o.length>0&&(e.style.transition=o.join(", "),setTimeout(()=>e.style.transition="",t))}),this}return this.each((t,n)=>{e.split(" ").forEach(e=>n.classList.add(e))})},removeClass(e,t){if(!e)return console.warn("removeClass() with no arguments is deprecated. Use detach() to remove element from DOM."),this.each((e,t)=>t.remove())
if(t){const n=[]
return this.elements.forEach(t=>{const r=e.split(" "),o={},a=getComputedStyle(t);["opacity","height","width","margin","padding"].forEach(e=>{o[e]=a[e]}),n.push({elem:t,classes:r,before:o})}),n.forEach(({elem:e,classes:t})=>{t.forEach(t=>e.classList.remove(t))}),n.forEach(({elem:e,before:n})=>{const r=getComputedStyle(e),o=[]
Object.keys(n).forEach(e=>{n[e]!==r[e]&&o.push(`${e} ${t}ms ease`)}),o.length>0&&(e.style.transition=o.join(", "),setTimeout(()=>e.style.transition="",t))}),this}return this.each((t,n)=>{e.split(" ").forEach(e=>n.classList.remove(e))})},toggleClass(e,n){return this.each(n?(r,o)=>{const a=o.classList.contains(e),s=new t(o)
a?s.removeClass(e,n):s.addClass(e,n)}:(t,n)=>{e.split(" ").forEach(e=>n.classList.toggle(e))})},hasClass(e){return this.elements[0]?.classList.contains(e)||!1},detach(){return this.each((e,t)=>t.remove())},css(e,t){return"object"==typeof e?this.each((t,n)=>{Object.assign(n.style,e)}):void 0===t?getComputedStyle(this.elements[0])?.[e]:this.each((n,r)=>r.style[e]=t)},show(){return this.each((e,t)=>t.style.display="")},hide(){return this.each((e,t)=>t.style.display="none")},fadeIn(e=300){return this.each((t,n)=>{n.style.opacity="0",n.style.display="",n.style.transition=`opacity ${e}ms`,setTimeout(()=>n.style.opacity="1",10)})},fadeOut(e=300){return this.each((t,n)=>{n.style.transition=`opacity ${e}ms`,n.style.opacity="0",setTimeout(()=>n.style.display="none",e)})},slideDown(e=300){return this.each((t,n)=>{n.style.overflow="hidden",n.style.height="0",n.style.display=""
const r=n.scrollHeight
n.style.transition=`height ${e}ms`,setTimeout(()=>n.style.height=r+"px",10),setTimeout(()=>{n.style.height="",n.style.overflow=""},e)})},slideUp(e=300){return this.each((t,n)=>{n.style.overflow="hidden",n.style.height=n.scrollHeight+"px",n.style.transition=`height ${e}ms`,setTimeout(()=>n.style.height="0",10),setTimeout(()=>n.style.display="none",e)})},animate(e,t=400,n="ease"){return this.each((r,o)=>{const a=e=>{if(!e)return null
if(e.startsWith("#")){const t=e.substring(1)
return 3===t.length?{r:parseInt(t[0]+t[0],16),g:parseInt(t[1]+t[1],16),b:parseInt(t[2]+t[2],16),a:1}:{r:parseInt(t.substring(0,2),16),g:parseInt(t.substring(2,4),16),b:parseInt(t.substring(4,6),16),a:1}}if(e.startsWith("rgb")){const t=e.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*(\d+(?:\.\d+)?))?\s*\)/)
return t?{r:+t[1],g:+t[2],b:+t[3],a:void 0!==t[4]?+t[4]:1}:null}return null},s=["color","backgroundColor","borderColor"]
if(Object.keys(e).some(e=>s.includes(e))){const r={},i={}
Object.keys(e).forEach(t=>{if(s.includes(t)){const n=getComputedStyle(o)[t]
r[t]=a(n),i[t]=a(e[t])}})
const l=Date.now(),c=()=>{const e=Date.now()-l,n=Math.min(e/t,1)
Object.keys(r).forEach(e=>{if(r[e]&&i[e]){const t=Math.round(r[e].r+(i[e].r-r[e].r)*n),a=Math.round(r[e].g+(i[e].g-r[e].g)*n),s=Math.round(r[e].b+(i[e].b-r[e].b)*n),l=r[e].a+(i[e].a-r[e].a)*n
o.style[e]=1>l?`rgba(${t}, ${a}, ${s}, ${l})`:`rgb(${t}, ${a}, ${s})`}}),1>n&&requestAnimationFrame(c)}
c()
const d={}
if(Object.keys(e).forEach(t=>{s.includes(t)||(d[t]=e[t])}),Object.keys(d).length>0){const e=Object.keys(d).map(e=>`${e} ${t}ms ${n}`).join(", ")
o.style.transition=e,Object.assign(o.style,d),setTimeout(()=>o.style.transition="",t)}}else{const r=Object.keys(e).map(e=>`${e} ${t}ms ${n}`).join(", ")
o.style.transition=r,Object.assign(o.style,e),setTimeout(()=>o.style.transition="",t)}})},pulse(e=3){return this.each((t,n)=>{let r=0
const o=setInterval(()=>{n.style.transform=r%2==0?"scale(1.1)":"scale(1)",n.style.transition="transform 150ms",r++,2*e>r||(clearInterval(o),n.style.transform="")},150)})},shake(){return this.each((e,t)=>{t.style.animation="shake 0.5s",setTimeout(()=>t.style.animation="",500)})},bounce(e=3){return this.each((t,n)=>{n.style.animation="bounce 0.5s "+e,setTimeout(()=>n.style.animation="",500*e)})},flip(e="Y",t=600){return this.each((n,r)=>{r.style.transition=`transform ${t}ms`,r.style.transformStyle="preserve-3d"
const o="Y"===e.toUpperCase()?"rotateY(180deg)":"rotateX(180deg)"
r.style.transform=o,setTimeout(()=>r.style.transform="",t)})},zoomIn(e=400){return this.each((t,n)=>{n.style.transform="scale(0)",n.style.opacity="0",n.style.display="",n.style.transition=`transform ${e}ms, opacity ${e}ms`,setTimeout(()=>{n.style.transform="scale(1)",n.style.opacity="1"},10)})},zoomOut(e=400){return this.each((t,n)=>{n.style.transition=`transform ${e}ms, opacity ${e}ms`,n.style.transform="scale(0)",n.style.opacity="0",setTimeout(()=>n.style.display="none",e)})},swing(){return this.each((e,t)=>{t.style.animation="swing 0.8s",t.style.transformOrigin="top center",setTimeout(()=>t.style.animation="",800)})},rotateIn(e=600){return this.each((t,n)=>{n.style.transform="rotate(-360deg) scale(0)",n.style.opacity="0",n.style.display="",n.style.transition=`transform ${e}ms, opacity ${e}ms`,setTimeout(()=>{n.style.transform="rotate(0deg) scale(1)",n.style.opacity="1"},10)})},rotateOut(e=600){return this.each((t,n)=>{n.style.transition=`transform ${e}ms, opacity ${e}ms`,n.style.transform="rotate(360deg) scale(0)",n.style.opacity="0",setTimeout(()=>n.style.display="none",e)})},blurIn(e=400){return this.each((t,n)=>{n.style.filter="blur(20px)",n.style.opacity="0",n.style.display="",n.style.transition=`filter ${e}ms, opacity ${e}ms`,setTimeout(()=>{n.style.filter="blur(0px)",n.style.opacity="1"},10)})},blurOut(e=400){return this.each((t,n)=>{n.style.transition=`filter ${e}ms, opacity ${e}ms`,n.style.filter="blur(20px)",n.style.opacity="0",setTimeout(()=>n.style.display="none",e)})},slideInLeft(e=400){return this.each((t,n)=>{n.style.transform="translateX(-100%)",n.style.opacity="0",n.style.display="",n.style.transition=`transform ${e}ms, opacity ${e}ms`,setTimeout(()=>{n.style.transform="translateX(0)",n.style.opacity="1"},10)})},slideInRight(e=400){return this.each((t,n)=>{n.style.transform="translateX(100%)",n.style.opacity="0",n.style.display="",n.style.transition=`transform ${e}ms, opacity ${e}ms`,setTimeout(()=>{n.style.transform="translateX(0)",n.style.opacity="1"},10)})},slideInUp(e=400){return this.each((t,n)=>{n.style.transform="translateY(100%)",n.style.opacity="0",n.style.display="",n.style.transition=`transform ${e}ms, opacity ${e}ms`,setTimeout(()=>{n.style.transform="translateY(0)",n.style.opacity="1"},10)})},slideOutLeft(e=400){return this.each((t,n)=>{n.style.transition=`transform ${e}ms, opacity ${e}ms`,n.style.transform="translateX(-100%)",n.style.opacity="0",setTimeout(()=>n.style.display="none",e)})},slideOutRight(e=400){return this.each((t,n)=>{n.style.transition=`transform ${e}ms, opacity ${e}ms`,n.style.transform="translateX(100%)",n.style.opacity="0",setTimeout(()=>n.style.display="none",e)})},rubberBand(){return this.each((e,t)=>{t.style.animation="rubberBand 0.8s",setTimeout(()=>t.style.animation="",800)})},append(e){return this.each((t,n)=>{"string"==typeof e?n.insertAdjacentHTML("beforeend",e):e.elements?e.elements.forEach(e=>n.appendChild(e.cloneNode(!0))):e.nodeType&&n.appendChild(e)})},prepend(e){return this.each((t,n)=>{"string"==typeof e?n.insertAdjacentHTML("afterbegin",e):e.elements?e.elements.forEach(e=>n.insertBefore(e.cloneNode(!0),n.firstChild)):e.nodeType&&n.insertBefore(e,n.firstChild)})},after(e){return this.each((t,n)=>{"string"==typeof e?n.insertAdjacentHTML("afterend",e):e.nodeType&&n.parentNode&&n.parentNode.insertBefore(e,n.nextSibling)})},before(e){return this.each((t,n)=>{"string"==typeof e?n.insertAdjacentHTML("beforebegin",e):e.nodeType&&n.parentNode&&n.parentNode.insertBefore(e,n)})},empty(){return this.each((e,t)=>t.innerHTML="")},clone(){return new t(this.elements.map(e=>e.cloneNode(!0)))},replace(e){return this.each((t,n)=>{"string"==typeof e?n.outerHTML=e:e.nodeType&&n.parentNode.replaceChild(e,n)})},wrap(e){return this.each((t,n)=>{const r="string"==typeof e?document.createElement(e):e.cloneNode(!0)
n.parentNode.insertBefore(r,n),r.appendChild(n)})},parent(){return new t([...new Set(this.elements.map(e=>e.parentNode))])},children(e){const n=[]
this.each((e,t)=>n.push(...Array.from(t.children)))
const r=new t(n)
return e?r.filter(e):r},siblings(){const e=[]
return this.each((t,n)=>{const r=n.parentNode
r&&Array.from(r.children).forEach(t=>{t===n||e.includes(t)||e.push(t)})}),new t(e)},next(){return new t(this.elements.map(e=>e.nextElementSibling).filter(Boolean))},prev(){return new t(this.elements.map(e=>e.previousElementSibling).filter(Boolean))},find(e){const n=[]
return this.each((t,r)=>{n.push(...Array.from(r.querySelectorAll(e)))}),new t(n)},filter(e){return new t(this.elements.filter(t=>t.matches(e)))},closest(e){return new t(this.elements.map(t=>t.closest(e)).filter(Boolean))},is(e){return this.elements[0]?.matches(e)||!1},on(e,t,r){return"function"==typeof t&&(r=t,t=null),this.each((o,a)=>{if(t){const o=e=>{const n=e.target.closest(t)
n&&a.contains(n)&&r.call(n,e)}
n.has(r)||n.set(r,new WeakMap)
const s=n.get(r)
s.has(a)||s.set(a,new Map),s.get(a).set(`${e}:${t}`,o),a.addEventListener(e,o)}else a.addEventListener(e,r)})},off(e,t,r){return"function"==typeof t&&(r=t,t=null),this.each((o,a)=>{if(t&&n.has(r)){const o=n.get(r)
if(o.has(a)){const n=o.get(a),r=`${e}:${t}`,s=n.get(r)
s&&(a.removeEventListener(e,s),n.delete(r))}}else a.removeEventListener(e,r)})},once(e,t){return this.each((n,r)=>{r.addEventListener(e,t,{once:!0})})},trigger(e,t){return this.each((n,r)=>{const o=new CustomEvent(e,{bubbles:!0,detail:t})
r.dispatchEvent(o)})},click(e){return e?this.on("click",e):(this.elements[0]?.click(),this)},submit(e){return e?this.on("submit",e):(this.elements[0]?.submit(),this)},change(e){return this.on("change",e)},input(e){return this.on("input",e)},focus(e){return e?this.on("focus",e):(this.elements[0]?.focus(),this)},blur(e){return this.on("blur",e)},hover(e,t){return this.on("mouseenter",e).on("mouseleave",t||e)},scroll(e){return this.on("scroll",e)},resize(e){return this.on("resize",e)},debounce(e,t,n=300){return this.each((r,o)=>{let a
o.addEventListener(e,e=>{clearTimeout(a),a=setTimeout(()=>t.call(o,e),n)})})},throttle(e,t,n=300){return this.each((r,o)=>{let a=0
o.addEventListener(e,e=>{const r=Date.now()
n>r-a||(t.call(o,e),a=r)})})},onVisible(e,t={}){const n=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&e.call(t.target,t)})},t)
return this.each((e,t)=>n.observe(t)),this},lazyLoad(){return this.onVisible(function(){const e=this,t=e.dataset.src
t&&(e.src=t,e.removeAttribute("data-src"))})},copy(){const e=this.text()
return navigator.clipboard.writeText(e).catch(e=>console.warn("Yaka copy: clipboard write failed",e)),this},serialize(){const e=this.elements[0]
if(!e||"FORM"!==e.tagName)return{}
const t=new FormData(e),n={}
for(let[e,r]of t.entries())n[e]=r
return n},autoSave(e,n=1e3){return this.debounce("input",function(){try{const n=new t(this).serialize()
localStorage.setItem(e,JSON.stringify(n))}catch(e){console.warn("Yaka autoSave: localStorage unavailable",e)}},n)},restore(e){try{const t=JSON.parse(localStorage.getItem(e)||"{}")
return this.each((e,n)=>{"FORM"===n.tagName&&Object.keys(t).forEach(e=>{const r=n.querySelector(`[name="${e}"]`)
r&&(r.value=t[e])})})}catch(e){return console.warn("Yaka restore: localStorage unavailable",e),this}},validate(e){const t=this.elements[0]
if(!t)return{valid:!0,errors:{}}
const n={}
let r=!0
return Object.keys(e).forEach(o=>{const a=t.querySelector(`[name="${o}"]`)
if(!a)return
const s=e[o],i=a.value,l=[]
s.required&&!i&&l.push(s.requiredMessage||s.message||"This field is required"),i&&s.pattern&&!s.pattern.test(i)&&l.push(s.patternMessage||s.message||"Invalid format"),i&&s.min&&s.min>i.length&&l.push(s.minMessage||s.message||`Minimum ${s.min} characters`),i&&s.max&&i.length>s.max&&l.push(s.maxMessage||s.message||`Maximum ${s.max} characters`),l.length>0&&(n[o]=1!==l.length||!s.message||s.requiredMessage||s.patternMessage||s.minMessage||s.maxMessage?l:l[0],r=!1)}),{valid:r,errors:n}},scrollTo(e=500){return this.elements[0]&&this.elements[0].scrollIntoView({behavior:"smooth",block:"start"}),this},countUp(e,t=2e3){return this.each((n,r)=>{if("number"!=typeof e||isNaN(e))return void console.error("countUp target must be a valid number")
const o=parseInt(r.textContent)||0,a=e-o,s=performance.now(),i=e=>{const n=Math.min((e-s)/t,1)
r.textContent=Math.round(o+a*n),1>n&&requestAnimationFrame(i)}
requestAnimationFrame(i)})},typeWriter(e,t=50){return this.each((n,r)=>{if("string"!=typeof e)return void console.error("typeWriter requires a string")
r.textContent=""
let o=0
const a=setInterval(()=>{e.length>o?(r.textContent+=e.charAt(o),o++):clearInterval(a)},t)})},confetti(){return this.each((e,t)=>{t._yaka_confetti_timeouts||(t._yaka_confetti_timeouts=[])
const n=["#ff0000","#00ff00","#0000ff","#ffff00","#ff00ff","#00ffff"]
for(let e=0;50>e;e++){const e=document.createElement("div")
e.style.cssText=`\n                        position: absolute;\n                        width: 10px;\n                        height: 10px;\n                        background: ${n[Math.floor(6*Math.random())]};\n                        left: ${100*Math.random()}%;\n                        top: -10px;\n                        animation: fall ${2+3*Math.random()}s linear;\n                    `,t.style.position="relative",t.appendChild(e)
const r=setTimeout(()=>e.remove(),5e3)
t._yaka_confetti_timeouts.push(r)}t._yaka_confetti_cleanup||(t._yaka_confetti_cleanup=()=>{t._yaka_confetti_timeouts&&(t._yaka_confetti_timeouts.forEach(e=>clearTimeout(e)),t._yaka_confetti_timeouts=[]),delete t._yaka_confetti_cleanup})})}},t.get=async(e,t)=>{const n=t?"?"+new URLSearchParams(t):"",r=await fetch(e+n)
if(!r.ok)throw Error("HTTP error! status: "+r.status)
return r.json()},t.post=async(e,t)=>{const n=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})
if(!n.ok)throw Error("HTTP error! status: "+n.status)
return n.json()},t.put=async(e,t)=>{const n=await fetch(e,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})
if(!n.ok)throw Error("HTTP error! status: "+n.status)
return n.json()},t.delete=async e=>{const t=await fetch(e,{method:"DELETE"})
if(!t.ok)throw Error("HTTP error! status: "+t.status)
return t.json()},t.ajax=async e=>{const{url:t,method:n="GET",data:r,headers:o={}}=e,a={method:n,headers:{"Content-Type":"application/json",...o}}
"GET"!==n&&r&&(a.body=JSON.stringify(r))
const s="GET"===n&&r?t+"?"+new URLSearchParams(r):t,i=await fetch(s,a)
if(!i.ok)throw Error("HTTP error! status: "+i.status)
return i.json()},t.each=(e,t)=>{Array.isArray(e)?e.forEach(t):Object.keys(e).forEach(n=>t(n,e[n]))},t.map=(e,t)=>e.map(t),t.filter=(e,t)=>e.filter(t),t.ready=e=>{"loading"!==document.readyState?e():document.addEventListener("DOMContentLoaded",e)},t.debounce=function(e,t=300){let n
return function(...r){clearTimeout(n),n=setTimeout(()=>e.apply(this,r),t)}},t.throttle=function(e,t=300){let n=0
return function(...r){const o=Date.now()
t>o-n||(e.apply(this,r),n=o)}},t.randomId=(e="id")=>`${e}_${Math.random().toString(36).substr(2,9)}`,t.formatNumber=e=>(""+e).replace(/\B(?=(\d{3})+(?!\d))/g,","),t.formatCurrency=(e,n="$")=>`${n}${t.formatNumber(e.toFixed(2))}`,t.parseQuery=(t=e.location.search)=>{const n=new URLSearchParams(t),r={}
for(let[e,t]of n)r[e]=t
return r},t.deepClone=(e,n=new WeakMap)=>{if(null===e||"object"!=typeof e)return e
if(n.has(e))return n.get(e)
if(e instanceof Date)return new Date(e)
if(e instanceof RegExp)return RegExp(e)
if(Array.isArray(e)){const r=[]
return n.set(e,r),e.forEach((e,o)=>{r[o]=t.deepClone(e,n)}),r}const r=Object.create(Object.getPrototypeOf(e))
return n.set(e,r),Object.keys(e).forEach(o=>{r[o]=t.deepClone(e[o],n)}),r},t.merge=(...e)=>{const n={}
return e.forEach(e=>{e&&"object"==typeof e&&Object.keys(e).forEach(r=>{const o=e[r],a=n[r]
n[r]=Array.isArray(o)?t.deepClone(o):o&&"object"==typeof o&&!Array.isArray(o)?a&&"object"==typeof a?t.merge(a,o):t.deepClone(o):o})}),n},t.isEqual=(e,n)=>{if(e===n)return!0
if(null==e||null==n)return!1
if(typeof e!=typeof n)return!1
if(e instanceof Date&&n instanceof Date)return e.getTime()===n.getTime()
if(Array.isArray(e)&&Array.isArray(n))return e.length===n.length&&e.every((e,r)=>t.isEqual(e,n[r]))
if("object"==typeof e&&"object"==typeof n){const r=Object.keys(e)
return r.length===Object.keys(n).length&&r.every(r=>t.isEqual(e[r],n[r]))}return!1},t.get=(e,t,n)=>{if(!e||"string"!=typeof t)return n
const r=t.split(".")
let o=e
for(const e of r){if(null==o)return n
o=o[e]}return void 0!==o?o:n},t.set=(e,t,n)=>{if(!e||"string"!=typeof t)return e
const r=t.split("."),o=r.pop()
let a=e
for(const e of r)e in a&&"object"==typeof a[e]||(a[e]={}),a=a[e]
return a[o]=n,e},t.pick=(e,t)=>{const n={}
return t.forEach(t=>{t in e&&(n[t]=e[t])}),n},t.omit=(e,t)=>{const n={...e}
return t.forEach(e=>delete n[e]),n},t.chunk=(e,t=1)=>{const n=[]
for(let r=0;e.length>r;r+=t)n.push(e.slice(r,r+t))
return n},t.flatten=(e,n=1)=>0===n?e.slice():e.reduce((e,r)=>(Array.isArray(r)?e.push(...t.flatten(r,n-1)):e.push(r),e),[]),t.flattenDeep=e=>t.flatten(e,1/0),t.uniq=e=>[...new Set(e)],t.uniqBy=(e,t)=>{const n=new Set
return e.filter(e=>{const r="function"==typeof t?t(e):e[t]
return!n.has(r)&&(n.add(r),!0)})},t.range=(e,t,n=1)=>{void 0===t&&(t=e,e=0)
const r=[]
if(n>0)for(let o=e;t>o;o+=n)r.push(o)
else for(let o=e;o>t;o+=n)r.push(o)
return r},t.shuffle=e=>{const t=[...e]
for(let e=t.length-1;e>0;e--){const n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t},t.sample=(e,n=1)=>{if(1===n)return e[Math.floor(Math.random()*e.length)]
const r=t.shuffle(e)
return r.slice(0,Math.min(n,r.length))},t.groupBy=(e,t)=>e.reduce((e,n)=>{const r="function"==typeof t?t(n):n[t]
return e[r]||(e[r]=[]),e[r].push(n),e},{}),t.sortBy=(e,t)=>[...e].sort((e,n)=>{const r="function"==typeof t?t(e):e[t],o="function"==typeof t?t(n):n[t]
return o>r?-1:r>o?1:0}),t.partition=(e,t)=>{const n=[],r=[]
return e.forEach((o,a)=>{t(o,a,e)?n.push(o):r.push(o)}),[n,r]},t.intersection=(...e)=>{if(0===e.length)return[]
const[t,...n]=e
return t.filter(e=>n.every(t=>t.includes(e)))},t.union=(...e)=>t.uniq(e.flat()),t.difference=(e,...t)=>{const n=t.flat()
return e.filter(e=>!n.includes(e))},t.camelCase=e=>e.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g,(e,t)=>t.toUpperCase()),t.kebabCase=e=>e.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/[\s_]+/g,"-").toLowerCase(),t.snakeCase=e=>e.replace(/([a-z])([A-Z])/g,"$1_$2").replace(/[\s-]+/g,"_").toLowerCase(),t.capitalize=e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase(),t.capitalizeWords=e=>e.replace(/\b\w/g,e=>e.toUpperCase()),t.truncate=(e,t=50,n="...")=>e.length>t?e.substring(0,t-n.length)+n:e,t.slugify=e=>e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,""),t.escape=e=>{const t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}
return e.replace(/[&<>"'/]/g,e=>t[e])},t.unescape=e=>{const t={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#x27;":"'","&#x2F;":"/"}
return e.replace(/&(?:amp|lt|gt|quot|#x27|#x2F);/g,e=>t[e])},t.formatDate=(e,t="YYYY-MM-DD")=>{const n=new Date(e),r={YYYY:n.getFullYear(),MM:(n.getMonth()+1+"").padStart(2,"0"),DD:(n.getDate()+"").padStart(2,"0"),HH:(n.getHours()+"").padStart(2,"0"),mm:(n.getMinutes()+"").padStart(2,"0"),ss:(n.getSeconds()+"").padStart(2,"0")}
return t.replace(/YYYY|MM|DD|HH|mm|ss/g,e=>r[e])},t.fromNow=e=>{const t=Date.now()-new Date(e).getTime(),n=Math.floor(t/1e3),r=Math.floor(n/60),o=Math.floor(r/60),a=Math.floor(o/24),s=Math.floor(a/30),i=Math.floor(a/365)
return 60>n?"just now":60>r?`${r} minute${r>1?"s":""} ago`:24>o?`${o} hour${o>1?"s":""} ago`:30>a?`${a} day${a>1?"s":""} ago`:12>s?`${s} month${s>1?"s":""} ago`:`${i} year${i>1?"s":""} ago`},t.diffDates=(e,t,n="days")=>Math.floor((new Date(t)-new Date(e))/({milliseconds:1,seconds:1e3,minutes:6e4,hours:36e5,days:864e5,weeks:6048e5,months:2592e6,years:31536e6}[n]||864e5)),t.addDays=(e,t)=>{const n=new Date(e)
return n.setDate(n.getDate()+t),n},t.addHours=(e,t)=>{const n=new Date(e)
return n.setHours(n.getHours()+t),n},t.addMinutes=(e,t)=>{const n=new Date(e)
return n.setMinutes(n.getMinutes()+t),n},t.isArray=Array.isArray,t.isObject=e=>null!==e&&"object"==typeof e&&!Array.isArray(e),t.isFunction=e=>"function"==typeof e,t.isString=e=>"string"==typeof e,t.isNumber=e=>"number"==typeof e&&!isNaN(e),t.isBoolean=e=>"boolean"==typeof e,t.isNull=e=>null===e,t.isUndefined=e=>void 0===e,t.isNil=e=>null==e,t.isEmpty=e=>null==e||(Array.isArray(e)||"string"==typeof e?0===e.length:"object"==typeof e&&0===Object.keys(e).length),t.isDate=e=>e instanceof Date&&!isNaN(e),t.isRegExp=e=>e instanceof RegExp,t.isError=e=>e instanceof Error,t.sleep=e=>new Promise(t=>setTimeout(t,e)),t.retry=async(e,n={})=>{const{times:r=3,delay:o=1e3,backoff:a=2}=n
let s
for(let n=0;r>n;n++)try{return await e()}catch(e){s=e,r-1>n&&await t.sleep(o*Math.pow(a,n))}throw s},t.timeout=(e,t,n="Timeout")=>Promise.race([e,new Promise((e,r)=>setTimeout(()=>r(Error(n)),t))]),t.all=Promise.all.bind(Promise),t.race=Promise.race.bind(Promise),t.allSettled=e=>Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:"fulfilled",value:e})).catch(e=>({status:"rejected",reason:e})))),t.clamp=(e,t,n)=>Math.min(Math.max(e,t),n),t.random=(e=0,t=1,n=!1)=>n||e%1!=0||t%1!=0?Math.random()*(t-e)+e:Math.floor(Math.random()*(t-e+1))+e,t.sum=e=>e.reduce((e,t)=>e+t,0),t.mean=e=>t.sum(e)/e.length,t.median=e=>{const t=[...e].sort((e,t)=>e-t),n=Math.floor(t.length/2)
return t.length%2?t[n]:(t[n-1]+t[n])/2},t.min=e=>Math.min(...e),t.max=e=>Math.max(...e),t.cookie={set(e,t,n=7){const r=new Date
r.setTime(r.getTime()+864e5*n),document.cookie=`${e}=${t};expires=${r.toUTCString()};path=/`},get(e){const t=e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),n=document.cookie.match(RegExp("(^| )"+t+"=([^;]+)"))
return n?n[2]:null},remove(e){this.set(e,"",-1)}},t.storage={set(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(e){console.warn("Yaka.storage.set: localStorage unavailable or quota exceeded",e)}},get(e){const t=localStorage.getItem(e)
try{return JSON.parse(t)}catch{return t}},remove(e){try{localStorage.removeItem(e)}catch(e){console.warn("Yaka.storage.remove: localStorage unavailable",e)}},clear(){try{localStorage.clear()}catch(e){console.warn("Yaka.storage.clear: localStorage unavailable",e)}}},t.prototype.draggable=function(e={}){return this.each((t,n)=>{if(n._yaka_draggable)return
n._yaka_draggable=!0
let r,o,a,s,i=!1
n.style.cursor="move",n.style.position="relative",n.addEventListener("mousedown",t=>{i=!0,r=t.clientX,o=t.clientY,a=n.offsetLeft,s=n.offsetTop,n.style.zIndex=1e3,e.onStart&&e.onStart.call(n,t)})
const l=t=>{if(!i)return
const l=t.clientY-o
n.style.left=a+(t.clientX-r)+"px",n.style.top=s+l+"px",e.onDrag&&e.onDrag.call(n,t)},c=t=>{i&&(i=!1,n.style.zIndex="",e.onEnd&&e.onEnd.call(n,t))}
document.addEventListener("mousemove",l),document.addEventListener("mouseup",c),n._yaka_draggable_cleanup=()=>{document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",c),delete n._yaka_draggable,delete n._yaka_draggable_cleanup}})},t.prototype.sortable=function(e={}){return this.each((t,n)=>{let r=null
Array.from(n.children).forEach(t=>{t.draggable=!0,t.style.cursor="move",t.addEventListener("dragstart",e=>{r=t,t.style.opacity="0.5"}),t.addEventListener("dragend",()=>{t.style.opacity="",e.onChange&&e.onChange.call(n)}),t.addEventListener("dragover",e=>{e.preventDefault()
const t=((e,t)=>[...e.querySelectorAll('[draggable="true"]:not(.dragging)')].reduce((e,n)=>{const r=n.getBoundingClientRect(),o=t-r.top-r.height/2
return 0>o&&o>e.offset?{offset:o,element:n}:e},{offset:-1/0}).element)(n,e.clientY)
null===t?n.appendChild(r):n.insertBefore(r,t)})})})},t.prototype.resizable=function(e={}){return this.each((t,n)=>{if(n._yaka_resizable)return
n._yaka_resizable=!0
const r=e.handles||["se","e","s","sw","ne","nw","n","w"],o=e.minWidth||50,a=e.minHeight||50,s=e.maxWidth||1/0,i=e.maxHeight||1/0,l=e.aspectRatio||!1
"static"===getComputedStyle(n).position&&(n.style.position="relative")
const c={se:{cursor:"nwse-resize",right:"0",bottom:"0"},e:{cursor:"ew-resize",right:"0",top:"50%",transform:"translateY(-50%)"},s:{cursor:"ns-resize",bottom:"0",left:"50%",transform:"translateX(-50%)"},sw:{cursor:"nesw-resize",left:"0",bottom:"0"},ne:{cursor:"nesw-resize",right:"0",top:"0"},nw:{cursor:"nwse-resize",left:"0",top:"0"},n:{cursor:"ns-resize",top:"0",left:"50%",transform:"translateX(-50%)"},w:{cursor:"ew-resize",left:"0",top:"50%",transform:"translateY(-50%)"}},d=[]
r.forEach(t=>{const r=document.createElement("div")
r.className="yaka-resize-handle yaka-resize-"+t,r.style.cssText="\n                    position: absolute;\n                    width: 8px;\n                    height: 8px;\n                    background: #4285f4;\n                    border: 1px solid white;\n                    box-sizing: border-box;\n                    z-index: 1000;\n                ",Object.assign(r.style,c[t]),n.appendChild(r),d.push(r)
let p,u,h,m,y,f,g=!1
r.addEventListener("mousedown",r=>{r.preventDefault(),r.stopPropagation(),g=!0,p=r.clientX,u=r.clientY,h=n.offsetWidth,m=n.offsetHeight,y=n.offsetLeft,f=n.offsetTop,e.onStart&&e.onStart.call(n,r)
const c=r=>{if(!g)return
const c=r.clientX-p,d=r.clientY-u
let b=h,v=m,x=y,k=f
if(t.includes("e")&&(b=h+c),t.includes("w")&&(b=h-c,x=y+c),t.includes("s")&&(v=m+d),t.includes("n")&&(v=m-d,k=f+d),b=Math.max(o,Math.min(s,b)),v=Math.max(a,Math.min(i,v)),l){const e=h/m
t.includes("e")||t.includes("w")?v=b/e:b=v*e}n.style.width=b+"px",n.style.height=v+"px",(t.includes("w")||t.includes("n"))&&(t.includes("w")&&(n.style.left=x+"px"),t.includes("n")&&(n.style.top=k+"px")),e.onResize&&e.onResize.call(n,r,{width:b,height:v})},d=t=>{g&&(g=!1,document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",d),e.onStop&&e.onStop.call(n,t))}
document.addEventListener("mousemove",c),document.addEventListener("mouseup",d)})}),n._yaka_resizable_cleanup=()=>{d.forEach(e=>e.remove()),delete n._yaka_resizable,delete n._yaka_resizable_cleanup}})},t.prototype.droppable=function(e={}){return this.each((t,n)=>{if(n._yaka_droppable)return
n._yaka_droppable=!0
const r=e.accept||"*",o=e.hoverClass||"yaka-drop-hover",a=e.activeClass||"yaka-drop-active"
let s=!1
const i=t=>{t.preventDefault(),("*"===r||t.target.matches&&t.target.matches(r))&&(s=!0,n.classList.add(o),e.onDragEnter&&e.onDragEnter.call(n,t))},l=t=>{t.preventDefault(),t.dataTransfer.dropEffect="move",e.onDragOver&&e.onDragOver.call(n,t)},c=t=>{t.preventDefault(),t.target===n&&(s=!1,n.classList.remove(o),e.onDragLeave&&e.onDragLeave.call(n,t))},d=t=>{t.preventDefault(),t.stopPropagation(),s=!1,n.classList.remove(o),n.classList.remove(a)
const r=t.dataTransfer.getData("text/html")||t.dataTransfer.getData("text/plain")
e.onDrop&&e.onDrop.call(n,t,{data:r})}
n.addEventListener("dragenter",i),n.addEventListener("dragover",l),n.addEventListener("dragleave",c),n.addEventListener("drop",d)
const p=()=>{n.classList.add(a)},u=()=>{n.classList.remove(a),n.classList.remove(o)}
document.addEventListener("dragstart",p),document.addEventListener("dragend",u),n._yaka_droppable_cleanup=()=>{n.removeEventListener("dragenter",i),n.removeEventListener("dragover",l),n.removeEventListener("dragleave",c),n.removeEventListener("drop",d),document.removeEventListener("dragstart",p),document.removeEventListener("dragend",u),delete n._yaka_droppable,delete n._yaka_droppable_cleanup}})},t.prototype.selectable=function(e={}){return this.each((t,n)=>{if(n._yaka_selectable)return
n._yaka_selectable=!0
const r=e.filter||"*",o=e.cancel||"input,textarea,button,select,option",a=e.tolerance||"touch"
let s,i,l=!1,c=null,d=new Set
const p=(e,t)=>{const n=Math.min(s,e),r=Math.min(i,t),o=Math.abs(e-s),a=Math.abs(t-i)
c.style.left=n+"px",c.style.top=r+"px",c.style.width=o+"px",c.style.height=a+"px"},u=t=>{t.target.matches(o)||(t.ctrlKey||t.metaKey||(d.forEach(e=>{e.classList.remove("ui-selected")}),d.clear()),l=!0,s=t.clientX,i=t.clientY,c&&c.parentNode||(c=document.createElement("div"),c.style.cssText="\n                    position: fixed;\n                    border: 1px dashed #4285f4;\n                    background: rgba(66, 133, 244, 0.1);\n                    z-index: 9999;\n                    pointer-events: none;\n                ",document.body.appendChild(c)),p(t.clientX,t.clientY),e.onStart&&e.onStart.call(n,t))},h=t=>{l&&(p(t.clientX,t.clientY),(()=>{const t=c.getBoundingClientRect()
n.querySelectorAll(r).forEach(n=>{n.matches(o)||(((e,t)=>{const n=e.getBoundingClientRect()
return"fit"===a?!(t.left>n.left||n.right>t.right||t.top>n.top||n.bottom>t.bottom):!(t.left>n.right||n.left>t.right||t.top>n.bottom||n.top>t.bottom)})(n,t)?d.has(n)||(d.add(n),n.classList.add("ui-selected"),e.onSelect&&e.onSelect.call(n)):d.has(n)&&(d.delete(n),n.classList.remove("ui-selected"),e.onUnselect&&e.onUnselect.call(n)))})})())},m=t=>{l&&(l=!1,c&&c.parentNode&&c.remove(),c=null,e.onStop&&e.onStop.call(n,t,Array.from(d)))}
n.addEventListener("mousedown",u),document.addEventListener("mousemove",h),document.addEventListener("mouseup",m),n._yaka_selectable_cleanup=()=>{n.removeEventListener("mousedown",u),document.removeEventListener("mousemove",h),document.removeEventListener("mouseup",m),c&&c.parentNode&&c.remove(),d.forEach(e=>e.classList.remove("ui-selected")),delete n._yaka_selectable,delete n._yaka_selectable_cleanup}})},t.prototype.swipe=function(e){return this.each((t,n)=>{let r,o,a
n.addEventListener("touchstart",e=>{r=e.touches[0].clientX,o=e.touches[0].clientY,a=Date.now()}),n.addEventListener("touchend",t=>{const s=t.changedTouches[0].clientX-r,i=t.changedTouches[0].clientY-o
300>Date.now()-a&&(Math.abs(s)>Math.abs(i)?(s>50&&e.right&&e.right.call(n,t),-50>s&&e.left&&e.left.call(n,t)):(i>50&&e.down&&e.down.call(n,t),-50>i&&e.up&&e.up.call(n,t)))})})},t.state=(e={})=>{let t={...e}
const n=[]
return{get:e=>e?t[e]:t,set(e,r){"object"==typeof e?t={...t,...e}:t[e]=r,n.forEach(e=>e(t))},subscribe:e=>(n.push(e),()=>{const t=n.indexOf(e)
t>-1&&n.splice(t,1)}),reset(){t={...e},n.forEach(e=>e(t))}}},t.notify=(e,t="info",n=3e3)=>{const r=document.createElement("div"),o={info:"#2196F3",success:"#4CAF50",warning:"#FF9800",error:"#F44336"}
r.style.cssText=`\n            position: fixed;\n            top: 20px;\n            right: 20px;\n            background: ${o[t]||o.info};\n            color: white;\n            padding: 16px 24px;\n            border-radius: 8px;\n            box-shadow: 0 4px 12px rgba(0,0,0,0.15);\n            z-index: 10000;\n            animation: slideIn 0.3s ease;\n            max-width: 300px;\n            font-family: system-ui, -apple-system, sans-serif;\n        `,r.textContent=e,document.body.appendChild(r),setTimeout(()=>{r.style.animation="slideOut 0.3s ease",setTimeout(()=>r.remove(),300)},n)},t.toast=(e,t={})=>{const n=t.position||"top-right",r=t.duration||5e3,o=!1!==t.progressBar,a=!1!==t.closeButton,s={success:{bg:"#51A351",icon:"✓"},error:{bg:"#BD362F",icon:"✕"},warning:{bg:"#F89406",icon:"⚠"},info:{bg:"#2F96B4",icon:"ℹ"}},i=s[t.type||"info"]||s.info,l={"top-right":"top: 20px; right: 20px;","top-left":"top: 20px; left: 20px;","top-center":"top: 20px; left: 50%; transform: translateX(-50%);","bottom-right":"bottom: 20px; right: 20px;","bottom-left":"bottom: 20px; left: 20px;","bottom-center":"bottom: 20px; left: 50%; transform: translateX(-50%);"},c=document.createElement("div")
c.className="yaka-toast",c.style.cssText=`\n            position: fixed;\n            ${l[n]||l["top-right"]}\n            background: ${i.bg};\n            color: white;\n            padding: 16px 20px;\n            border-radius: 6px;\n            box-shadow: 0 4px 12px rgba(0,0,0,0.3);\n            z-index: 10001;\n            min-width: 250px;\n            max-width: 350px;\n            font-family: system-ui, -apple-system, sans-serif;\n            animation: toastSlideIn 0.3s ease;\n            cursor: pointer;\n        `
const d=document.createElement("div")
d.style.cssText="display: flex; align-items: center; gap: 12px;"
const p=document.createElement("span")
p.textContent=i.icon,p.style.cssText="font-size: 20px; font-weight: bold;"
const u=document.createElement("span")
if(u.textContent=e,u.style.cssText="flex: 1;",d.appendChild(p),d.appendChild(u),a){const e=document.createElement("span")
e.innerHTML="×",e.style.cssText="font-size: 24px; margin-left: 10px; cursor: pointer; opacity: 0.8;",e.onclick=()=>h(),d.appendChild(e)}if(c.appendChild(d),o){const e=document.createElement("div")
e.style.cssText=`\n                position: absolute;\n                bottom: 0;\n                left: 0;\n                height: 4px;\n                background: rgba(255,255,255,0.7);\n                width: 100%;\n                animation: toastProgress ${r}ms linear;\n            `,c.appendChild(e)}document.body.appendChild(c)
const h=()=>{c.style.animation="toastSlideOut 0.3s ease",setTimeout(()=>c.remove(),300)}
return c.onclick=()=>{t.onClick&&t.onClick(),h()},r>0&&setTimeout(h,r),{close:h}},t.alert=(e={})=>{const t=e.title||"",n=e.text||"",r=e.confirmButtonText||"OK",o=e.cancelButtonText||"Cancel",a=e.showCancelButton||!1,s=e.input||null,i={success:{icon:"✓",color:"#4CAF50"},error:{icon:"✕",color:"#F44336"},warning:{icon:"⚠",color:"#FF9800"},info:{icon:"ℹ",color:"#2196F3"},question:{icon:"?",color:"#9C27B0"}},l=i[e.type||"info"]||i.info
return new Promise((i,c)=>{const d=document.createElement("div")
d.style.cssText="\n                position: fixed;\n                top: 0;\n                left: 0;\n                width: 100%;\n                height: 100%;\n                background: rgba(0,0,0,0.6);\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                z-index: 10002;\n                animation: fadeIn 0.2s ease;\n            "
const p=document.createElement("div")
if(p.style.cssText="\n                background: white;\n                padding: 30px;\n                border-radius: 12px;\n                max-width: 500px;\n                min-width: 300px;\n                box-shadow: 0 10px 40px rgba(0,0,0,0.3);\n                animation: scaleIn 0.3s ease;\n                text-align: center;\n            ",l){const e=document.createElement("div")
e.style.cssText=`\n                    width: 80px;\n                    height: 80px;\n                    border-radius: 50%;\n                    border: 4px solid ${l.color};\n                    margin: 0 auto 20px;\n                    display: flex;\n                    align-items: center;\n                    justify-content: center;\n                    font-size: 48px;\n                    color: ${l.color};\n                    animation: iconPulse 0.5s ease;\n                `,e.textContent=l.icon,p.appendChild(e)}if(t){const e=document.createElement("h2")
e.textContent=t,e.style.cssText="margin: 0 0 15px 0; color: #333; font-size: 24px;",p.appendChild(e)}if(n){const e=document.createElement("p")
e.textContent=n,e.style.cssText="margin: 0 0 25px 0; color: #666; font-size: 16px; line-height: 1.5;",p.appendChild(e)}let u=null
s&&(u=document.createElement("input"),u.type="password"===s?"password":"text",u.placeholder=e.inputPlaceholder||"",u.value=e.inputValue||"",u.style.cssText="\n                    width: 100%;\n                    padding: 10px;\n                    border: 2px solid #ddd;\n                    border-radius: 6px;\n                    font-size: 14px;\n                    margin-bottom: 20px;\n                    box-sizing: border-box;\n                ",p.appendChild(u))
const h=document.createElement("div")
if(h.style.cssText="display: flex; gap: 10px; justify-content: center;",a){const e=document.createElement("button")
e.textContent=o,e.style.cssText="\n                    padding: 12px 30px;\n                    border: 2px solid #ddd;\n                    background: white;\n                    color: #666;\n                    border-radius: 6px;\n                    cursor: pointer;\n                    font-size: 14px;\n                    font-weight: 600;\n                    transition: all 0.2s;\n                ",e.onmouseover=()=>e.style.background="#f5f5f5",e.onmouseout=()=>e.style.background="white",e.onclick=()=>{d.remove(),i({isConfirmed:!1,isDismissed:!0})},h.appendChild(e)}const m=document.createElement("button")
m.textContent=r,m.style.cssText=`\n                padding: 12px 30px;\n                border: none;\n                background: ${l.color};\n                color: white;\n                border-radius: 6px;\n                cursor: pointer;\n                font-size: 14px;\n                font-weight: 600;\n                transition: all 0.2s;\n            `,m.onmouseover=()=>m.style.opacity="0.9",m.onmouseout=()=>m.style.opacity="1",m.onclick=()=>{const e=u?u.value:null
d.remove(),i({isConfirmed:!0,value:e})},h.appendChild(m),p.appendChild(h),d.appendChild(p),document.body.appendChild(d),u&&setTimeout(()=>u.focus(),100)})},t.modal=(e,t={})=>{const n=document.createElement("div")
n.style.cssText="\n            position: fixed;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            background: rgba(0,0,0,0.5);\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            z-index: 9999;\n            animation: fadeIn 0.3s ease;\n        "
const r=document.createElement("div")
return r.style.cssText=`\n            background: white;\n            padding: 30px;\n            border-radius: 12px;\n            max-width: ${t.width||"500px"};\n            max-height: 80vh;\n            overflow-y: auto;\n            box-shadow: 0 10px 40px rgba(0,0,0,0.3);\n            animation: scaleIn 0.3s ease;\n        `,r.innerHTML=e,n.appendChild(r),document.body.appendChild(n),n.addEventListener("click",e=>{e.target===n&&(n.style.animation="fadeOut 0.3s ease",setTimeout(()=>n.remove(),300))}),{close(){n.style.animation="fadeOut 0.3s ease",setTimeout(()=>n.remove(),300)}}},t.prototype.tooltip=function(e,t="top"){return this.each((n,r)=>{if(r._yaka_tooltip)return
r._yaka_tooltip=!0
const o=document.createElement("div")
o.textContent=e,o.style.cssText="\n                position: absolute;\n                background: #333;\n                color: white;\n                padding: 8px 12px;\n                border-radius: 6px;\n                font-size: 14px;\n                white-space: nowrap;\n                z-index: 10000;\n                pointer-events: none;\n                opacity: 0;\n                transition: opacity 0.2s;\n            "
const a=()=>{document.body.appendChild(o)
const e=r.getBoundingClientRect()
"top"===t?(o.style.left=e.left+e.width/2-o.offsetWidth/2+"px",o.style.top=e.top-o.offsetHeight-8+"px"):"bottom"===t&&(o.style.left=e.left+e.width/2-o.offsetWidth/2+"px",o.style.top=e.bottom+8+"px"),o.style.opacity="1"},s=()=>{o.style.opacity="0",setTimeout(()=>{o.parentNode&&o.remove()},200)}
r.addEventListener("mouseenter",a),r.addEventListener("mouseleave",s),r._yaka_tooltip_cleanup=()=>{r.removeEventListener("mouseenter",a),r.removeEventListener("mouseleave",s),o.parentNode&&o.remove(),delete r._yaka_tooltip,delete r._yaka_tooltip_cleanup}})},t.prototype.button=function(e={}){return this.each((t,n)=>{if(n._yaka_button)return
n._yaka_button=!0
const r=e.label||n.textContent||n.value,o=e.icon||null,a=e.iconPosition||"left",s=e.disabled||!1
if(n.classList.add("ui-button","ui-widget"),"INPUT"===n.tagName&&["button","submit","reset"].includes(n.type)?n.value=r:"A"===n.tagName?(n.setAttribute("role","button"),n.style.cssText+="\n                    display: inline-flex;\n                    align-items: center;\n                    gap: 6px;\n                    padding: 8px 16px;\n                    background: #4285f4;\n                    color: white;\n                    text-decoration: none;\n                    border-radius: 4px;\n                    cursor: pointer;\n                    border: none;\n                    font-size: 14px;\n                    transition: all 0.2s ease;\n                "):n.style.cssText+="\n                    display: inline-flex;\n                    align-items: center;\n                    gap: 6px;\n                    padding: 8px 16px;\n                    background: #4285f4;\n                    color: white;\n                    border-radius: 4px;\n                    cursor: pointer;\n                    border: none;\n                    font-size: 14px;\n                    transition: all 0.2s ease;\n                ",o){const e=document.createElement("span")
e.className="ui-button-icon",e.innerHTML=o,e.style.display="inline-flex","left"===a?n.insertBefore(e,n.firstChild):n.appendChild(e)}const i=()=>{n.disabled||n.classList.contains("ui-state-disabled")||(n.style.background="#357ae8")},l=()=>{n.disabled||n.classList.contains("ui-state-disabled")||(n.style.background="#4285f4")}
n.addEventListener("mouseenter",i),n.addEventListener("mouseleave",l),s&&(n.classList.add("ui-state-disabled"),n.disabled=!0,n.style.opacity="0.6",n.style.cursor="not-allowed"),n._yaka_button_api={enable(){n.classList.remove("ui-state-disabled"),n.disabled=!1,n.style.opacity="1",n.style.cursor="pointer"},disable(){n.classList.add("ui-state-disabled"),n.disabled=!0,n.style.opacity="0.6",n.style.cursor="not-allowed"}},n._yaka_button_cleanup=()=>{n.removeEventListener("mouseenter",i),n.removeEventListener("mouseleave",l),n.classList.remove("ui-button","ui-widget","ui-state-disabled"),delete n._yaka_button,delete n._yaka_button_api,delete n._yaka_button_cleanup}})},t.prototype.checkboxradio=function(e={}){return this.each((t,n)=>{if(n._yaka_checkboxradio)return
if("checkbox"!==n.type&&"radio"!==n.type)return
n._yaka_checkboxradio=!0
const r=document.createElement("label")
r.className="ui-checkboxradio-label",r.style.cssText="\n                display: inline-flex;\n                align-items: center;\n                gap: 8px;\n                cursor: pointer;\n                user-select: none;\n            "
const o=document.createElement("span")
o.className="ui-checkboxradio-icon",o.style.cssText=`\n                display: inline-block;\n                width: 18px;\n                height: 18px;\n                border: 2px solid #4285f4;\n                ${"checkbox"===n.type?"border-radius: 3px;":"border-radius: 50%;"}\n                background: white;\n                position: relative;\n                transition: all 0.2s ease;\n            `,n.parentNode.insertBefore(r,n),r.appendChild(n),r.appendChild(o)
const a=e.label||n.getAttribute("data-label")
if(a){const e=document.createElement("span")
e.textContent=a,r.appendChild(e)}n.style.cssText="\n                position: absolute;\n                opacity: 0;\n                pointer-events: none;\n            "
const s=()=>{n.checked?(o.style.background="#4285f4",o.innerHTML="checkbox"===n.type?'<span style="color: white; font-size: 14px; line-height: 14px;">✓</span>':'<span style="position: absolute; top: 3px; left: 3px; width: 8px; height: 8px; border-radius: 50%; background: white;"></span>'):(o.style.background="white",o.innerHTML="")}
n.addEventListener("change",s),s(),n._yaka_checkboxradio_cleanup=()=>{n.removeEventListener("change",s),r.parentNode&&(r.parentNode.insertBefore(n,r),r.remove()),n.style.cssText="",delete n._yaka_checkboxradio,delete n._yaka_checkboxradio_cleanup}})},t.prototype.controlgroup=function(e={}){return this.each((t,n)=>{if(n._yaka_controlgroup)return
n._yaka_controlgroup=!0
const r=e.direction||"horizontal"
n.classList.add("ui-controlgroup"),n.style.cssText=`\n                display: inline-flex;\n                ${"horizontal"===r?"flex-direction: row;":"flex-direction: column;"}\n                gap: 0;\n            `
const o=Array.from(n.children)
o.forEach((e,t)=>{e.classList.add("ui-controlgroup-item"),"horizontal"===r?(t>0&&(e.style.borderTopLeftRadius="0",e.style.borderBottomLeftRadius="0",e.style.marginLeft="-1px"),o.length-1>t&&(e.style.borderTopRightRadius="0",e.style.borderBottomRightRadius="0")):(t>0&&(e.style.borderTopLeftRadius="0",e.style.borderTopRightRadius="0",e.style.marginTop="-1px"),o.length-1>t&&(e.style.borderBottomLeftRadius="0",e.style.borderBottomRightRadius="0"))}),n._yaka_controlgroup_cleanup=()=>{n.classList.remove("ui-controlgroup"),o.forEach(e=>{e.classList.remove("ui-controlgroup-item")}),delete n._yaka_controlgroup,delete n._yaka_controlgroup_cleanup}})},t.prototype.menu=function(e={}){return this.each((t,n)=>{if(n._yaka_menu)return
n._yaka_menu=!0,n.classList.add("ui-menu","ui-widget"),n.setAttribute("role","menu"),n.style.cssText="\n                list-style: none;\n                padding: 8px 0;\n                margin: 0;\n                background: white;\n                border: 1px solid #ddd;\n                border-radius: 4px;\n                box-shadow: 0 2px 8px rgba(0,0,0,0.1);\n                min-width: 150px;\n            "
const r=n.querySelectorAll("li")
r.forEach((t,n)=>{t.classList.add("ui-menu-item"),t.setAttribute("role","menuitem"),t.setAttribute("tabindex",0===n?"0":"-1"),t.style.cssText="\n                    padding: 10px 16px;\n                    cursor: pointer;\n                    transition: background 0.2s ease;\n                "
const r=()=>{t.style.background="#f5f5f5"},o=()=>{t.style.background="white"},a=()=>{e.onSelect&&e.onSelect.call(t,t.textContent,n)}
t.addEventListener("mouseenter",r),t.addEventListener("mouseleave",o),t.addEventListener("click",a),t._yaka_menu_item_cleanup||(t._yaka_menu_item_cleanup=()=>{t.removeEventListener("mouseenter",r),t.removeEventListener("mouseleave",o),t.removeEventListener("click",a)})})
const o=e=>{const t=document.activeElement,n=Array.from(r),o=n.indexOf(t)
"ArrowDown"===e.key?(e.preventDefault(),n[(o+1)%n.length].focus()):"ArrowUp"===e.key?(e.preventDefault(),n[(o-1+n.length)%n.length].focus()):"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),t.click())}
n.addEventListener("keydown",o),n._yaka_menu_cleanup=()=>{n.removeEventListener("keydown",o),r.forEach(e=>{e._yaka_menu_item_cleanup&&(e._yaka_menu_item_cleanup(),delete e._yaka_menu_item_cleanup)}),n.classList.remove("ui-menu","ui-widget"),delete n._yaka_menu,delete n._yaka_menu_cleanup}})},t.prototype.selectbox=function(e={}){return this.each((t,n)=>{if(n._yaka_selectbox)return
if("SELECT"!==n.tagName)return
n._yaka_selectbox=!0
const r=n.multiple||e.multiple||!1,o=!1!==e.searchable,a=e.placeholder||"Select...",s=e.data||null
n.style.display="none"
const i=document.createElement("div")
i.className="yaka-selectbox",i.style.cssText=`\n                position: relative;\n                display: inline-block;\n                width: ${e.width||"100%"};\n            `
const l=document.createElement("div")
l.className="yaka-selectbox-display",l.style.cssText="\n                border: 2px solid #ddd;\n                border-radius: 6px;\n                padding: 10px 35px 10px 12px;\n                cursor: pointer;\n                background: white;\n                position: relative;\n                transition: border-color 0.2s;\n            "
const c=document.createElement("span")
c.innerHTML="▼",c.style.cssText="\n                position: absolute;\n                right: 12px;\n                top: 50%;\n                transform: translateY(-50%);\n                font-size: 12px;\n                color: #666;\n                transition: transform 0.2s;\n            ",l.appendChild(c)
const d=document.createElement("span")
d.textContent=a,d.style.color="#999",l.insertBefore(d,c)
const p=document.createElement("div")
if(p.className="yaka-selectbox-dropdown",p.style.cssText="\n                position: absolute;\n                top: 100%;\n                left: 0;\n                right: 0;\n                margin-top: 4px;\n                background: white;\n                border: 2px solid #ddd;\n                border-radius: 6px;\n                box-shadow: 0 4px 12px rgba(0,0,0,0.15);\n                max-height: 250px;\n                overflow-y: auto;\n                z-index: 1000;\n                display: none;\n            ",o){const e=document.createElement("input")
e.type="text",e.placeholder="Search...",e.style.cssText="\n                    width: 100%;\n                    padding: 8px 12px;\n                    border: none;\n                    border-bottom: 2px solid #f0f0f0;\n                    outline: none;\n                    box-sizing: border-box;\n                ",p.appendChild(e),e.addEventListener("input",e=>{const t=e.target.value.toLowerCase()
p.querySelectorAll(".yaka-selectbox-item").forEach(e=>{const n=e.textContent.toLowerCase()
e.style.display=n.includes(t)?"block":"none"})})}const u=document.createElement("div")
p.appendChild(u),l.addEventListener("click",e=>{e.stopPropagation()
const t="block"===p.style.display
p.style.display=t?"none":"block",c.style.transform=t?"translateY(-50%)":"translateY(-50%) rotate(180deg)",l.style.borderColor=t?"#ddd":"#4285f4"}),document.addEventListener("click",()=>{p.style.display="none",c.style.transform="translateY(-50%)",l.style.borderColor="#ddd"}),i.appendChild(l),i.appendChild(p),n.parentNode.insertBefore(i,n),(()=>{u.innerHTML=""
const e=s||Array.from(n.options)
e.forEach((t,o)=>{const s=document.createElement("div")
s.className="yaka-selectbox-item",s.textContent=t.text||t.label||t,s.setAttribute("data-value",t.value||t),s.style.cssText="\n                        padding: 10px 12px;\n                        cursor: pointer;\n                        transition: background 0.2s;\n                    ",s.addEventListener("mouseenter",()=>{s.style.background="#f5f5f5"}),s.addEventListener("mouseleave",()=>{s.style.background="white"}),s.addEventListener("click",()=>{r?(n.options[o].selected=!n.options[o].selected,(()=>{if(r){const e=Array.from(n.options).filter(e=>e.selected)
d.textContent=e.length>0?e.map(e=>e.text).join(", "):a,d.style.color=e.length>0?"#333":"#999"}})()):(n.selectedIndex=o,d.textContent=s.textContent,d.style.color="#333",p.style.display="none",c.style.transform="translateY(-50%)"),e.onChange&&e.onChange(n.value)}),u.appendChild(s)})})(),n._yaka_selectbox_cleanup=()=>{i.parentNode&&i.remove(),n.style.display="",delete n._yaka_selectbox,delete n._yaka_selectbox_cleanup}})},t.prototype.timepicker=function(e={}){return this.each((t,n)=>{if(n._yaka_timepicker)return
n._yaka_timepicker=!0
const r=e.format24||!1,o=e.minuteInterval||1
n.setAttribute("readonly","true"),n.style.cursor="pointer"
const a=document.createElement("div")
a.className="yaka-timepicker",a.style.cssText="\n                position: absolute;\n                background: white;\n                border: 2px solid #ddd;\n                border-radius: 8px;\n                padding: 15px;\n                box-shadow: 0 4px 12px rgba(0,0,0,0.15);\n                z-index: 1000;\n                display: none;\n            "
const s=document.createElement("div")
s.style.cssText="display: flex; gap: 10px;"
const i=document.createElement("select")
i.style.cssText="padding: 8px; border-radius: 4px; border: 2px solid #ddd; font-size: 16px;"
const l=r?23:12
for(let e=0;l>=e;e++){const t=document.createElement("option")
t.value=e,t.textContent=(""+e).padStart(2,"0"),i.appendChild(t)}const c=document.createElement("select")
c.style.cssText="padding: 8px; border-radius: 4px; border: 2px solid #ddd; font-size: 16px;"
for(let e=0;60>e;e+=o){const t=document.createElement("option")
t.value=e,t.textContent=(""+e).padStart(2,"0"),c.appendChild(t)}s.appendChild(i),s.appendChild(c)
let d=null
r||(d=document.createElement("select"),d.style.cssText="padding: 8px; border-radius: 4px; border: 2px solid #ddd; font-size: 16px;",["AM","PM"].forEach(e=>{const t=document.createElement("option")
t.value=e,t.textContent=e,d.appendChild(t)}),s.appendChild(d)),a.appendChild(s)
const p=document.createElement("button")
p.textContent="OK",p.style.cssText="\n                margin-top: 10px;\n                width: 100%;\n                padding: 8px;\n                background: #4285f4;\n                color: white;\n                border: none;\n                border-radius: 4px;\n                cursor: pointer;\n                font-size: 14px;\n            ",p.onclick=()=>{let t=parseInt(i.value)
const o=parseInt(c.value)
!r&&d&&("PM"===d.value&&12>t&&(t+=12),"AM"===d.value&&12===t&&(t=0)),n.value=`${(""+t).padStart(2,"0")}:${(""+o).padStart(2,"0")}`,a.style.display="none",e.onChange&&e.onChange(n.value)},a.appendChild(p),document.body.appendChild(a),n.addEventListener("click",()=>{const e=n.getBoundingClientRect()
a.style.left=e.left+"px",a.style.top=e.bottom+4+"px",a.style.display="block"}),document.addEventListener("click",e=>{a.contains(e.target)||e.target===n||(a.style.display="none")}),n._yaka_timepicker_cleanup=()=>{a.parentNode&&a.remove(),n.removeAttribute("readonly"),delete n._yaka_timepicker,delete n._yaka_timepicker_cleanup}})},t.prototype.fullpage=function(e={}){return this.each((t,n)=>{if(n._yaka_fullpage)return
n._yaka_fullpage=!0
const r=Array.from(n.children),o=!1!==e.navigation,a=e.scrollingSpeed||700,s=e.easing||"ease-in-out"
let i=0,l=!1
if(r.forEach((e,t)=>{e.style.cssText=`\n                    height: 100vh;\n                    width: 100%;\n                    scroll-snap-align: start;\n                    transition: opacity ${a}ms ${s};\n                `}),n.style.cssText="\n                height: 100vh;\n                overflow-y: scroll;\n                scroll-snap-type: y mandatory;\n                scroll-behavior: smooth;\n            ",o){const e=document.createElement("div")
e.style.cssText="\n                    position: fixed;\n                    right: 20px;\n                    top: 50%;\n                    transform: translateY(-50%);\n                    z-index: 100;\n                    display: flex;\n                    flex-direction: column;\n                    gap: 12px;\n                ",r.forEach((t,n)=>{const r=document.createElement("div")
r.style.cssText=`\n                        width: 12px;\n                        height: 12px;\n                        border-radius: 50%;\n                        border: 2px solid #333;\n                        background: ${0===n?"#333":"white"};\n                        cursor: pointer;\n                        transition: all 0.3s;\n                    `,r.onclick=()=>c(n),e.appendChild(r)}),document.body.appendChild(e),n._yaka_fullpage_nav=e}const c=e=>{l||0>e||e>=r.length||(l=!0,i=e,r[e].scrollIntoView({behavior:"smooth"}),o&&n._yaka_fullpage_nav&&Array.from(n._yaka_fullpage_nav.children).forEach((t,n)=>{t.style.background=n===e?"#333":"white"}),setTimeout(()=>{l=!1},a))},d=e=>{"ArrowDown"===e.key?(e.preventDefault(),c(i+1)):"ArrowUp"===e.key&&(e.preventDefault(),c(i-1))}
document.addEventListener("keydown",d),n._yaka_fullpage_cleanup=()=>{document.removeEventListener("keydown",d),n._yaka_fullpage_nav&&n._yaka_fullpage_nav.parentNode&&n._yaka_fullpage_nav.remove(),delete n._yaka_fullpage,delete n._yaka_fullpage_nav,delete n._yaka_fullpage_cleanup}})},t.prototype.imageUpload=function(e){return this.each((t,n)=>{n.addEventListener("change",t=>{const r=t.target.files[0]
if(r&&r.type.startsWith("image/")){const t=new FileReader
t.onload=t=>{e.call(n,t.target.result,r)},t.readAsDataURL(r)}})})},t.download=(e,t,n="text/plain")=>{const r=new Blob([e],{type:n}),o=URL.createObjectURL(r),a=document.createElement("a")
a.href=o,a.download=t,a.click(),URL.revokeObjectURL(o)},t.prototype.print=function(){const t=this.elements[0]?.innerHTML
if(!t)return this
const n=e.open("","","width=800,height=600")
return n&&(n.document.write(`\n                <html>\n                    <head><title>Print</title></head>\n                    <body>${t}</body>\n                </html>\n            `),n.document.close(),n.print()),this},t.prototype.fullscreen=function(){const e=this.elements[0]
return e?(e.requestFullscreen?e.requestFullscreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen(),this):this},t.exitFullscreen=()=>{document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.msExitFullscreen&&document.msExitFullscreen()},t.speak=(e,t={})=>{const n=new SpeechSynthesisUtterance(e)
n.rate=t.rate||1,n.pitch=t.pitch||1,n.volume=t.volume||1,n.lang=t.lang||"en-US",speechSynthesis.speak(n)},t.getLocation=(e,t)=>{if(navigator.geolocation)navigator.geolocation.getCurrentPosition(t=>{e({latitude:t.coords.latitude,longitude:t.coords.longitude,accuracy:t.coords.accuracy})},t||(e=>{console.error("Geolocation error:",e)}))
else{const e=Error("Geolocation not supported")
t?t(e):console.error(e)}},t.paste=async()=>{try{return await navigator.clipboard.readText()}catch(e){return console.error("Failed to read clipboard:",e),null}},t.share=e=>{navigator.share?navigator.share(e).catch(e=>console.error("Share failed:",e)):console.warn("Share API not supported")},t.vibrate=(e=200)=>{navigator.vibrate&&navigator.vibrate(e)},t.battery=async e=>{if(navigator.getBattery){const t=await navigator.getBattery()
e({level:100*t.level,charging:t.charging,chargingTime:t.chargingTime,dischargingTime:t.dischargingTime})}},t.onlineStatus=t=>{t(navigator.onLine),e.addEventListener("online",()=>t(!0)),e.addEventListener("offline",()=>t(!1))},t.onVisibilityChange=e=>{document.addEventListener("visibilitychange",()=>{e(!document.hidden)})},t.measure=(e,t)=>{const n=performance.now(),r=t(),o=performance.now()
return console.log(`${e}: ${(o-n).toFixed(2)}ms`),r},t.component=function(e,n){const r=t._components=t._components||{}
return r[e]={template:n.template||"",data:n.data||{},methods:n.methods||{},mounted:n.mounted||(()=>{}),render(e={}){let t=this.template
const n={...this.data,...e}
return Object.keys(n).forEach(e=>{t=t.replace(RegExp(`\\{\\{${e}\\}\\}`,"g"),n[e])}),t}},r[e]},t.prototype.component=function(e,n){const r=t._components?.[e]
return r?this.each((e,t)=>{t.innerHTML=r.render(n),r.mounted.call(t)}):this},t.router=function(t){const n={routes:t,current:null,navigate(e){const t=this.routes[e]
t&&(this.current=e,history.pushState({path:e},"",e),t.component&&_(t.target||"#app").html(t.component()),t.handler&&t.handler())},init(){e.addEventListener("popstate",e=>{e.state?.path&&this.navigate(e.state.path)})
const t=e.location.pathname
this.routes[t]&&this.navigate(t)}}
return n.init(),n},t.websocket=(e,t={})=>{const n=new WebSocket(e),r={onOpen:t.onOpen||(()=>{}),onMessage:t.onMessage||(()=>{}),onError:t.onError||(()=>{}),onClose:t.onClose||(()=>{})},o=e=>r.onOpen(e),a=e=>r.onMessage(JSON.parse(e.data)),s=e=>r.onError(e),i=e=>r.onClose(e)
return n.addEventListener("open",o),n.addEventListener("message",a),n.addEventListener("error",s),n.addEventListener("close",i),{send:e=>n.send(JSON.stringify(e)),close:()=>n.close(),ws:n,cleanup(){n.removeEventListener("open",o),n.removeEventListener("message",a),n.removeEventListener("error",s),n.removeEventListener("close",i),n.readyState===WebSocket.OPEN&&n.close()}}},t.webrtc=async(e={})=>{try{const t=await navigator.mediaDevices.getUserMedia({video:!1!==e.video,audio:!1!==e.audio})
return{stream:t,attachTo(e){e.srcObject=t},stop(){t.getTracks().forEach(e=>e.stop())}}}catch(e){throw console.error("Error accessing media devices:",e),e}},t.prototype.canvas=function(){const e=this.elements[0]
if(!e||"CANVAS"!==e.tagName)return console.warn("canvas() requires a canvas element"),null
const t=e.getContext("2d")
return{ctx:t,clear:()=>t.clearRect(0,0,e.width,e.height),rect(e,n,r,o,a){t.fillStyle=a,t.fillRect(e,n,r,o)},circle(e,n,r,o){t.fillStyle=o,t.beginPath(),t.arc(e,n,r,0,2*Math.PI),t.fill()},line(e,n,r,o,a,s=1){t.strokeStyle=a,t.lineWidth=s,t.beginPath(),t.moveTo(e,n),t.lineTo(r,o),t.stroke()},text(e,n,r,o,a=16){t.fillStyle=o,t.font=a+"px Arial",t.fillText(e,n,r)},image(e,n,r,o,a){t.drawImage(e,n,r,o,a)}}},t.chart=function(e,t,n={}){const r=e.getContext("2d"),o=e.width,a=e.height,s=n.type||"bar"
if(r.clearRect(0,0,o,a),"bar"===s){if(0===t.length)return this
const e=o/t.length,s=Math.max(...t.map(e=>e.value))
if(0>=s)return this
t.forEach((t,o)=>{const i=t.value/s*(a-40),l=o*e,c=a-i-20
r.fillStyle=n.color||"#667eea",r.fillRect(l+5,c,e-10,i),r.fillStyle="#333",r.font="12px Arial",r.fillText(t.label,l+e/2-10,a-5)})}else if("line"===s){if(2>t.length)return this
const e=o/(t.length-1),s=Math.max(...t.map(e=>e.value))
if(0>=s)return this
r.strokeStyle=n.color||"#667eea",r.lineWidth=2,r.beginPath(),t.forEach((t,o)=>{const i=o*e,l=a-t.value/s*(a-40)-20
0===o?r.moveTo(i,l):r.lineTo(i,l),r.fillStyle=n.color||"#667eea",r.fillRect(i-3,l-3,6,6)}),r.stroke()}},t.prototype.dataTable=function(e,t={}){return this.each((n,r)=>{if(!t.columns||!Array.isArray(t.columns))return void console.error("dataTable requires options.columns array")
let o=[...e],a=[]
const s=e=>{const t=document.createElement("div")
return t.textContent=e,t.innerHTML},i=()=>{a.forEach(({th:e,handler:t})=>{e.removeEventListener("click",t)}),a=[]
let e='<table style="width: 100%; border-collapse: collapse;">'
e+="<thead><tr>",t.columns.forEach(t=>{e+=`<th style="padding: 12px; background: #f5f5f5; cursor: pointer; border-bottom: 2px solid #ddd;" data-sort="${t.key}">${s(t.label)}</th>`}),e+="</tr></thead>",e+="<tbody>",o.forEach(n=>{e+="<tr>",t.columns.forEach(t=>{e+=`<td style="padding: 12px; border-bottom: 1px solid #eee;">${s((n[t.key]||"")+"")}</td>`}),e+="</tr>"}),e+="</tbody></table>",r.innerHTML=e,r.querySelectorAll("th[data-sort]").forEach(e=>{const t=()=>{const t=e.dataset.sort
o.sort((e,n)=>n[t]>e[t]?-1:e[t]>n[t]?1:0),i()}
e.addEventListener("click",t),a.push({th:e,handler:t})})}
i()})},t.prototype.autocomplete=function(e,t={}){return this.each((n,r)=>{if(!e||!Array.isArray(e))return void console.error("autocomplete requires a data array")
if(r._yaka_autocomplete)return
r._yaka_autocomplete=!0
const o=document.createElement("div")
o.style.cssText="\n                position: absolute;\n                background: white;\n                border: 1px solid #ddd;\n                border-radius: 8px;\n                max-height: 200px;\n                overflow-y: auto;\n                box-shadow: 0 4px 12px rgba(0,0,0,0.1);\n                display: none;\n                z-index: 1000;\n            ",r.parentNode.style.position="relative",r.parentNode.appendChild(o)
const a=()=>{const n=r.value.toLowerCase()
if(!n)return void(o.style.display="none")
const a=e.filter(e=>e.toLowerCase().includes(n))
a.length>0?(o.innerHTML=a.map(e=>`<div style="padding: 10px; cursor: pointer; border-bottom: 1px solid #f0f0f0;" class="autocomplete-item">${e}</div>`).join(""),o.style.display="block",o.querySelectorAll(".autocomplete-item").forEach(e=>{e.addEventListener("click",()=>{r.value=e.textContent,o.style.display="none",t.onSelect&&t.onSelect(e.textContent)})})):o.style.display="none"},s=e=>{e.target===r||o.contains(e.target)||(o.style.display="none")}
r.addEventListener("input",a),document.addEventListener("click",s),r._yaka_autocomplete_cleanup=()=>{r.removeEventListener("input",a),document.removeEventListener("click",s),o.remove(),delete r._yaka_autocomplete,delete r._yaka_autocomplete_cleanup}})},t.prototype.colorPicker=function(e){return this.each((t,n)=>{if(n._yaka_colorpicker)return
n._yaka_colorpicker=!0
const r=document.createElement("input")
r.type="color",r.style.display="none",n.appendChild(r)
const o=()=>r.click(),a=()=>{e.call(n,r.value)}
n.addEventListener("click",o),r.addEventListener("change",a),n._yaka_colorpicker_cleanup=()=>{n.removeEventListener("click",o),r.removeEventListener("change",a),r.remove(),delete n._yaka_colorpicker,delete n._yaka_colorpicker_cleanup}})},t.prototype.datePicker=function(e){return this.each((t,n)=>{if(n._yaka_datepicker)return
n._yaka_datepicker=!0
const r=document.createElement("input")
r.type="date",r.style.cssText="width: 100%; padding: 10px; border: 2px solid #ddd; border-radius: 8px;",n.appendChild(r)
const o=()=>{e.call(n,r.value)}
r.addEventListener("change",o),n._yaka_datepicker_cleanup=()=>{r.removeEventListener("change",o),r.remove(),delete n._yaka_datepicker,delete n._yaka_datepicker_cleanup}})},t.prototype.slider=function(e={}){return this.each((t,n)=>{if(n._yaka_slider)return
n._yaka_slider=!0
const r=document.createElement("input")
r.type="range",r.min=e.min||0,r.max=e.max||100,r.value=e.value||50,r.style.cssText="width: 100%;"
const o=document.createElement("div")
o.textContent=r.value,o.style.cssText="text-align: center; margin-top: 10px; font-weight: bold;",n.appendChild(r),n.appendChild(o)
const a=()=>{o.textContent=r.value,e.onChange&&e.onChange(parseInt(r.value))}
r.addEventListener("input",a),n._yaka_slider_cleanup=()=>{r.removeEventListener("input",a),r.remove(),o.remove(),delete n._yaka_slider,delete n._yaka_slider_cleanup}})},t.prototype.tabs=function(){return this.each((e,t)=>{if(t._yaka_tabs)return
t._yaka_tabs=!0
const n=t.querySelectorAll("[data-tab]"),r=t.querySelectorAll("[data-tab-content]"),o=[]
n.forEach(e=>{const a=()=>{const o=e.dataset.tab
n.forEach(e=>e.classList.remove("active")),r.forEach(e=>e.style.display="none"),e.classList.add("active")
const a=t.querySelector(`[data-tab-content="${o}"]`)
a&&(a.style.display="block")}
e.addEventListener("click",a),o.push({tab:e,handleClick:a})}),n[0]&&n[0].click(),t._yaka_tabs_cleanup=()=>{o.forEach(({tab:e,handleClick:t})=>{e.removeEventListener("click",t)}),delete t._yaka_tabs,delete t._yaka_tabs_cleanup}})},t.prototype.accordion=function(){return this.each((e,t)=>{if(t._yaka_accordion)return
t._yaka_accordion=!0
const n=t.querySelectorAll("[data-accordion-header]"),r=[]
n.forEach(e=>{e.style.cursor="pointer"
const t=e.nextElementSibling
t.style.display="none"
const n=()=>{t.style.display="block"===t.style.display?"none":"block"}
e.addEventListener("click",n),r.push({header:e,handleClick:n})}),t._yaka_accordion_cleanup=()=>{r.forEach(({header:e,handleClick:t})=>{e.removeEventListener("click",t)}),delete t._yaka_accordion,delete t._yaka_accordion_cleanup}})},t.prototype.carousel=function(e={}){return this.each((t,n)=>{n._yaka_carousel_cleanup&&n._yaka_carousel_cleanup(),n._yaka_carousel=!0
const r=n.children
let o=0
Array.from(r).forEach((e,t)=>{e.style.display=0===t?"block":"none"})
const a=()=>{r[o].style.display="none",o=(o+1)%r.length,r[o].style.display="block"}
let s=null
e.auto&&(s=setInterval(a,e.interval||3e3)),n._carousel={next:a,prev(){r[o].style.display="none",o=(o-1+r.length)%r.length,r[o].style.display="block"},intervalId:s},n._yaka_carousel_cleanup=()=>{n._carousel&&n._carousel.intervalId&&clearInterval(n._carousel.intervalId),delete n._carousel,delete n._yaka_carousel,delete n._yaka_carousel_cleanup}})},t.prototype.dropdown=function(e={}){return this.each((t,n)=>{if(n._yaka_dropdown)return
n._yaka_dropdown=!0
const r=e.items||[],o=e.multiSelect||!1,a=!1!==e.searchable,s=e.placeholder||"Select..."
n.style.position="relative"
const i=document.createElement("div")
i.style.cssText="\n                border: 1px solid #ddd;\n                border-radius: 4px;\n                padding: 8px 12px;\n                cursor: pointer;\n                background: white;\n                user-select: none;\n            ",i.textContent=s
const l=document.createElement("div")
l.style.cssText="\n                position: absolute;\n                top: 100%;\n                left: 0;\n                right: 0;\n                background: white;\n                border: 1px solid #ddd;\n                border-radius: 4px;\n                margin-top: 4px;\n                max-height: 300px;\n                overflow-y: auto;\n                z-index: 1000;\n                display: none;\n                box-shadow: 0 4px 6px rgba(0,0,0,0.1);\n            "
const c=document.createElement("input")
a&&(c.style.cssText="\n                    width: 100%;\n                    padding: 8px;\n                    border: none;\n                    border-bottom: 1px solid #ddd;\n                    box-sizing: border-box;\n                    outline: none;\n                ",c.placeholder="Search...",l.appendChild(c))
const d=document.createElement("div")
l.appendChild(d)
const p=new Set,u=(t="")=>{d.innerHTML="",r.filter(e=>e.toLowerCase().includes(t.toLowerCase())).forEach(t=>{const n=document.createElement("div")
n.textContent=t,n.style.cssText=`\n                        padding: 8px 12px;\n                        cursor: pointer;\n                        ${p.has(t)?"background: #e3f2fd;":""}\n                    `,n.addEventListener("mouseenter",()=>{n.style.background="#f5f5f5"}),n.addEventListener("mouseleave",()=>{n.style.background=p.has(t)?"#e3f2fd":"white"}),n.addEventListener("click",n=>{n.stopPropagation(),o?(p.has(t)?p.delete(t):p.add(t),i.textContent=p.size?Array.from(p).join(", "):s,u(c.value)):(p.clear(),p.add(t),i.textContent=t,l.style.display="none"),e.onChange&&e.onChange(o?Array.from(p):t)}),d.appendChild(n)})}
i.addEventListener("click",()=>{l.style.display="none"===l.style.display?"block":"none",a&&"block"===l.style.display&&c.focus(),u()}),a&&c.addEventListener("input",e=>{u(e.target.value)}),document.addEventListener("click",e=>{n.contains(e.target)||(l.style.display="none")}),n.appendChild(i),n.appendChild(l),n._yaka_dropdown_cleanup=()=>{i.remove(),l.remove(),delete n._yaka_dropdown,delete n._yaka_dropdown_cleanup}})},t.prototype.breadcrumb=function(e=[],t={}){return this.each((n,r)=>{const o=t.separator||">"
r.style.cssText="\n                display: flex;\n                align-items: center;\n                gap: 8px;\n                flex-wrap: wrap;\n            ",e.forEach((t,n)=>{const a=document.createElement(t.href?"a":"span")
if(a.textContent=t.label||t,a.style.cssText=`\n                    ${t.href?"color: #2196F3; text-decoration: none; cursor: pointer;":"color: #666;"}\n                `,t.href&&(a.href=t.href,a.addEventListener("mouseenter",()=>{a.style.textDecoration="underline"}),a.addEventListener("mouseleave",()=>{a.style.textDecoration="none"})),r.appendChild(a),e.length-1>n){const e=document.createElement("span")
e.textContent=o,e.style.color="#999",r.appendChild(e)}})})},t.prototype.pagination=function(e={}){return this.each((t,n)=>{const r=e.currentPage||1,o=e.totalPages||10,a=e.maxVisible||7,s=e.onChange||(()=>{})
n.style.cssText="\n                display: flex;\n                align-items: center;\n                gap: 4px;\n                flex-wrap: wrap;\n            "
const i=(e,t,n=!1)=>{const o=document.createElement("button")
return o.textContent=e,o.disabled=n,o.style.cssText=`\n                    padding: 8px 12px;\n                    border: 1px solid ${t===r?"#2196F3":"#ddd"};\n                    background: ${t===r?"#2196F3":"white"};\n                    color: ${t===r?"white":"#333"};\n                    cursor: ${n?"not-allowed":"pointer"};\n                    border-radius: 4px;\n                    opacity: ${n?"0.5":"1"};\n                `,n||(o.addEventListener("click",()=>s(t)),o.addEventListener("mouseenter",()=>{t!==r&&(o.style.background="#f5f5f5")}),o.addEventListener("mouseleave",()=>{t!==r&&(o.style.background="white")})),o}
n.appendChild(i("«",r-1,1===r))
let l=Math.max(1,r-Math.floor(a/2)),c=Math.min(o,l+a-1)
if(a-1>c-l&&(l=Math.max(1,c-a+1)),l>1&&(n.appendChild(i("1",1)),l>2)){const e=document.createElement("span")
e.textContent="...",e.style.padding="8px",n.appendChild(e)}for(let e=l;c>=e;e++)n.appendChild(i(""+e,e))
if(o>c){if(o-1>c){const e=document.createElement("span")
e.textContent="...",e.style.padding="8px",n.appendChild(e)}n.appendChild(i(""+o,o))}n.appendChild(i("»",r+1,r===o))})},t.prototype.badge=function(e,t={}){return this.each((n,r)=>{const o=t.dismissible||!1,a=t.icon||"",s={primary:{bg:"#2196F3",color:"white"},success:{bg:"#4CAF50",color:"white"},warning:{bg:"#FF9800",color:"white"},danger:{bg:"#F44336",color:"white"},info:{bg:"#00BCD4",color:"white"},secondary:{bg:"#9E9E9E",color:"white"}},i=s[t.variant||"primary"]||s.primary,l=document.createElement("span")
if(l.style.cssText=`\n                display: inline-flex;\n                align-items: center;\n                gap: 6px;\n                padding: 4px 12px;\n                background: ${i.bg};\n                color: ${i.color};\n                border-radius: 16px;\n                font-size: 0.875em;\n                font-weight: 500;\n            `,a){const e=document.createElement("span")
e.textContent=a,l.appendChild(e)}const c=document.createElement("span")
if(c.textContent=e,l.appendChild(c),o){const e=document.createElement("span")
e.textContent="×",e.style.cssText="\n                    cursor: pointer;\n                    font-size: 1.2em;\n                    margin-left: 4px;\n                ",e.addEventListener("click",()=>{l.style.animation="fadeOut 0.3s",setTimeout(()=>l.remove(),300),t.onDismiss&&t.onDismiss()}),l.appendChild(e)}r.appendChild(l)})},t.prototype.popover=function(t,n={}){return this.each((r,o)=>{if(o._yaka_popover)return
o._yaka_popover=!0
const a=n.position||"top",s=n.trigger||"click",i=n.width||"auto",l=document.createElement("div")
l.innerHTML=t,l.style.cssText=`\n                position: absolute;\n                background: white;\n                border: 1px solid #ddd;\n                border-radius: 8px;\n                padding: 12px;\n                box-shadow: 0 4px 12px rgba(0,0,0,0.15);\n                z-index: 1000;\n                width: ${i};\n                display: none;\n            `
const c=document.createElement("div")
c.style.cssText="\n                position: absolute;\n                width: 0;\n                height: 0;\n                border: 8px solid transparent;\n            ",l.appendChild(c)
const d=()=>{document.body.appendChild(l),l.style.display="block"
const t=o.getBoundingClientRect(),n=l.getBoundingClientRect()
let r,s
switch(a){case"top":r=t.top-n.height-12,s=t.left+t.width/2-n.width/2,c.style.cssText+="\n                            bottom: -16px;\n                            left: 50%;\n                            transform: translateX(-50%);\n                            border-top-color: white;\n                        "
break
case"bottom":r=t.bottom+12,s=t.left+t.width/2-n.width/2,c.style.cssText+="\n                            top: -16px;\n                            left: 50%;\n                            transform: translateX(-50%);\n                            border-bottom-color: white;\n                        "
break
case"left":r=t.top+t.height/2-n.height/2,s=t.left-n.width-12,c.style.cssText+="\n                            right: -16px;\n                            top: 50%;\n                            transform: translateY(-50%);\n                            border-left-color: white;\n                        "
break
case"right":r=t.top+t.height/2-n.height/2,s=t.right+12,c.style.cssText+="\n                            left: -16px;\n                            top: 50%;\n                            transform: translateY(-50%);\n                            border-right-color: white;\n                        "}l.style.top=r+e.scrollY+"px",l.style.left=s+e.scrollX+"px"},p=()=>{l.style.display="none",l.parentNode&&l.remove()}
"click"===s?(o.addEventListener("click",e=>{e.stopPropagation(),"none"===l.style.display?d():p()}),document.addEventListener("click",e=>{l.contains(e.target)||p()})):"hover"===s&&(o.addEventListener("mouseenter",d),o.addEventListener("mouseleave",p),l.addEventListener("mouseenter",d),l.addEventListener("mouseleave",p)),o._yaka_popover_cleanup=()=>{p(),delete o._yaka_popover,delete o._yaka_popover_cleanup}})},t.prototype.stepper=function(e={}){return this.each((t,n)=>{const r=e.steps||[]
let o=0
n.style.cssText="\n                display: flex;\n                flex-direction: column;\n                gap: 20px;\n            "
const a=document.createElement("div")
a.style.cssText="\n                display: flex;\n                align-items: center;\n                justify-content: space-between;\n                margin-bottom: 20px;\n            "
const s=[]
r.forEach((e,t)=>{const n=document.createElement("div")
n.style.cssText="\n                    display: flex;\n                    flex-direction: column;\n                    align-items: center;\n                    flex: 1;\n                    position: relative;\n                "
const i=document.createElement("div")
i.textContent=""+(t+1),i.style.cssText=`\n                    width: 36px;\n                    height: 36px;\n                    border-radius: 50%;\n                    background: ${t===o?"#2196F3":o>t?"#4CAF50":"#ddd"};\n                    color: white;\n                    display: flex;\n                    align-items: center;\n                    justify-content: center;\n                    font-weight: bold;\n                    z-index: 1;\n                `
const l=document.createElement("div")
if(l.textContent=e.label||"Step "+(t+1),l.style.cssText=`\n                    margin-top: 8px;\n                    font-size: 0.875em;\n                    color: ${t===o?"#2196F3":"#666"};\n                `,n.appendChild(i),n.appendChild(l),r.length-1>t){const e=document.createElement("div")
e.style.cssText=`\n                        position: absolute;\n                        top: 18px;\n                        left: 50%;\n                        width: 100%;\n                        height: 2px;\n                        background: ${o>t?"#4CAF50":"#ddd"};\n                        z-index: 0;\n                    `,n.appendChild(e)}s.push({circle:i,label:l}),a.appendChild(n)})
const i=document.createElement("div")
i.style.cssText="\n                min-height: 200px;\n                padding: 20px;\n                border: 1px solid #ddd;\n                border-radius: 4px;\n            "
const l=document.createElement("div")
l.style.cssText="\n                display: flex;\n                justify-content: space-between;\n                margin-top: 20px;\n            "
const c=document.createElement("button")
c.textContent="Previous",c.style.cssText="\n                padding: 10px 20px;\n                background: #9E9E9E;\n                color: white;\n                border: none;\n                border-radius: 4px;\n                cursor: pointer;\n            ",c.disabled=!0
const d=document.createElement("button")
d.textContent="Next",d.style.cssText="\n                padding: 10px 20px;\n                background: #2196F3;\n                color: white;\n                border: none;\n                border-radius: 4px;\n                cursor: pointer;\n            "
const p=()=>{s.forEach((e,t)=>{e.circle.style.background=t===o?"#2196F3":o>t?"#4CAF50":"#ddd",e.label.style.color=t===o?"#2196F3":"#666"}),r[o]&&r[o].content&&(i.innerHTML=r[o].content),c.disabled=0===o,c.style.opacity=0===o?"0.5":"1",c.style.cursor=0===o?"not-allowed":"pointer",d.textContent=o===r.length-1?"Finish":"Next",e.onStepChange&&e.onStepChange(o)}
c.addEventListener("click",()=>{o>0&&(o--,p())}),d.addEventListener("click",()=>{r.length-1>o?(o++,p()):e.onFinish&&e.onFinish()}),l.appendChild(c),l.appendChild(d),n.appendChild(a),n.appendChild(i),n.appendChild(l),p()})},t.prototype.parallax=function(t=.5){return this.each((n,r)=>{if(r._yaka_parallax)return
r._yaka_parallax=!0
const o=()=>{r.style.transform=`translateY(${e.pageYOffset*t}px)`}
e.addEventListener("scroll",o),r._yaka_parallax_cleanup=()=>{e.removeEventListener("scroll",o),delete r._yaka_parallax,delete r._yaka_parallax_cleanup}})},t.prototype.infiniteScroll=function(e){return this.each((t,n)=>{const r=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&e.call(n)})})
r.observe(n),n._yaka_scroll_observer=r,n._yaka_scroll_cleanup=()=>{n._yaka_scroll_observer&&(n._yaka_scroll_observer.disconnect(),delete n._yaka_scroll_observer,delete n._yaka_scroll_cleanup)}})},t.prototype.masonry=function(e=3){return this.each((t,n)=>{n.style.cssText=`\n                display: grid;\n                grid-template-columns: repeat(${e}, 1fr);\n                gap: 20px;\n                grid-auto-rows: 20px;\n            `,Array.from(n.children).forEach(e=>{e.style.gridRowEnd="span "+Math.ceil(e.offsetHeight/20)})})},t.prototype.filter=function(e){return this.each((t,n)=>{n.style.filter={grayscale:"grayscale(100%)",sepia:"sepia(100%)",blur:"blur(5px)",brightness:"brightness(150%)",contrast:"contrast(200%)",invert:"invert(100%)",saturate:"saturate(200%)",hueRotate:"hue-rotate(90deg)"}[e]||e})},t.qrcode=(e,t=200)=>`https://api.qrserver.com/v1/create-qr-code/?size=${t}x${t}&data=${encodeURIComponent(e)}`,t.barcode=e=>"https://bwipjs-api.metafloor.com/?bcid=code128&text="+encodeURIComponent(e),t.markdown=e=>e.replace(/^### (.*$)/gim,"<h3>$1</h3>").replace(/^## (.*$)/gim,"<h2>$1</h2>").replace(/^# (.*$)/gim,"<h1>$1</h1>").replace(/\*\*(.*)\*\*/gim,"<strong>$1</strong>").replace(/\*(.*)\*/gim,"<em>$1</em>").replace(/\n/gim,"<br>"),t.highlight=(e,t="javascript")=>{let n=e
return["const","let","var","function","if","else","return","for","while"].forEach(e=>{n=n.replace(RegExp(`\\b${e}\\b`,"g"),`<span style="color: #569cd6;">${e}</span>`)}),n=n.replace(/'([^']*)'/g,"<span style=\"color: #ce9178;\">'$1'</span>"),n=n.replace(/"([^"]*)"/g,'<span style="color: #ce9178;">"$1"</span>'),`<pre style="background: #1e1e1e; color: #d4d4d4; padding: 20px; border-radius: 8px; overflow-x: auto;"><code>${n}</code></pre>`},t.db={open:async(e,t)=>new Promise((n,r)=>{const o=indexedDB.open(e,1)
o.onerror=()=>r(o.error),o.onsuccess=()=>n(o.result),o.onupgradeneeded=e=>{const n=e.target.result
n.objectStoreNames.contains(t)||n.createObjectStore(t,{keyPath:"id",autoIncrement:!0})}}),async add(e,t,n){const r=e.transaction(t,"readwrite").objectStore(t)
return new Promise((e,t)=>{const o=r.add(n)
o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)})},async get(e,t,n){const r=e.transaction(t,"readonly").objectStore(t)
return new Promise(e=>{const t=r.get(n)
t.onsuccess=()=>e(t.result)})},async getAll(e,t){const n=e.transaction(t,"readonly").objectStore(t)
return new Promise(e=>{const t=n.getAll()
t.onsuccess=()=>e(t.result)})},async delete(e,t,n){const r=e.transaction(t,"readwrite").objectStore(t)
return new Promise((e,t)=>{const o=r.delete(n)
o.onsuccess=()=>e(o.result),o.onerror=()=>t(o.error)})}},t.serviceWorker=async e=>{if("serviceWorker"in navigator)try{const t=await navigator.serviceWorker.register(e)
return console.log("Service Worker registered:",t),t}catch(e){console.error("Service Worker registration failed:",e)}},t.pushNotification=async(t,n={})=>{"Notification"in e&&"granted"===await Notification.requestPermission()&&new Notification(t,n)},t.screenRecord=async()=>{try{const e=await navigator.mediaDevices.getDisplayMedia({video:!0}),t=new MediaRecorder(e),n=[]
return t.ondataavailable=e=>n.push(e.data),t.onstop=()=>{const e=new Blob(n,{type:"video/webm"}),t=URL.createObjectURL(e),r=document.createElement("a")
r.href=t,r.download="recording.webm",r.click()},{start:()=>t.start(),stop:()=>t.stop(),recorder:t}}catch(e){console.error("Screen recording failed:",e)}},t.vdom={create:(e,t={},n=[])=>({tag:e,props:t,children:n}),render(e){if("string"==typeof e)return document.createTextNode(e)
const t=document.createElement(e.tag)
return Object.keys(e.props||{}).forEach(n=>{n.startsWith("on")?t.addEventListener(n.substring(2).toLowerCase(),e.props[n]):t.setAttribute(n,e.props[n])}),(e.children||[]).forEach(e=>{t.appendChild(this.render(e))}),t},diff:(e,t)=>e?t?typeof e!=typeof t?{type:"REPLACE",newNode:t}:"string"==typeof e?e!==t?{type:"TEXT",newNode:t}:null:e.tag!==t.tag?{type:"REPLACE",newNode:t}:{type:"UPDATE",props:t.props,children:t.children}:{type:"REMOVE"}:{type:"CREATE",newNode:t}},t.template=(e,t)=>{let n=e
return n=n.replace(/\{\{([^}]+)\}\}/g,(e,n)=>{const r=n.trim().split(".")
let o=t
return r.forEach(e=>o=o?.[e]),void 0!==o?o:""}),n=n.replace(/\{\{#if\s+([^}]+)\}\}([\s\S]*?)\{\{\/if\}\}/g,(e,n,r)=>{const o=n.trim().split(".")
let a=t
return o.forEach(e=>a=a?.[e]),a?r:""}),n=n.replace(/\{\{#each\s+([^}]+)\}\}([\s\S]*?)\{\{\/each\}\}/g,(e,n,r)=>{const o=t[n.trim()]
return Array.isArray(o)?o.map(e=>r.replace(/\{\{this\.([^}]+)\}\}/g,(t,n)=>e[n]||"")).join(""):""}),n},t.http={interceptors:{request:[],response:[]},addRequestInterceptor(e){this.interceptors.request.push(e)},addResponseInterceptor(e){this.interceptors.response.push(e)},async fetch(e,t={}){let n={url:e,...t}
for(const e of this.interceptors.request)n=await e(n)
let r=await fetch(n.url,n)
for(const e of this.interceptors.response)r=await e(r)
return r}},t.plugins={},t.use=function(e,n={}){"function"==typeof e.install&&(e.install(t,n),this.plugins[e.name||"anonymous"]=e)},t.timeline=function(){return{animations:[],add(e,t,n,r=0){return this.animations.push({selector:e,props:t,duration:n,delay:r}),this},async play(){for(const e of this.animations)await new Promise(t=>{setTimeout(()=>{_(e.selector).animate(e.props,e.duration),setTimeout(t,e.duration)},e.delay)})},playAll(){this.animations.forEach(e=>{setTimeout(()=>{_(e.selector).animate(e.props,e.duration)},e.delay)})}}},t.prototype.position=function(t={}){return this.each((n,r)=>{const o=t.of||e,a=t.at||"center",s=t.collision||"flip",i=t.offset||{x:0,y:0},l=e=>{const t=e.split(" ")
return{x:t[0]||"center",y:t[1]||"center"}},c=l(t.my||"center"),d=l(a),p=o===e||o.nodeType?o:document.querySelector(o)
if(!p)return
const u=r.getBoundingClientRect()
let h
h=p===e?{left:0,top:0,width:e.innerWidth,height:e.innerHeight}:p.getBoundingClientRect()
let m=h.left,y=h.top
"left"===d.x?m=h.left:"center"===d.x?m=h.left+h.width/2:"right"===d.x&&(m=h.left+h.width),"center"===c.x?m-=u.width/2:"right"===c.x&&(m-=u.width),"top"===d.y?y=h.top:"center"===d.y?y=h.top+h.height/2:"bottom"===d.y&&(y=h.top+h.height),"center"===c.y?y-=u.height/2:"bottom"===c.y&&(y-=u.height),m+=i.x||0,y+=i.y||0,"flip"===s?(0>m?m=h.right:m+u.width>e.innerWidth&&(m=h.left-u.width),0>y?y=h.bottom:y+u.height>e.innerHeight&&(y=h.top-u.height)):"fit"===s&&(m=Math.max(0,Math.min(m,e.innerWidth-u.width)),y=Math.max(0,Math.min(y,e.innerHeight-u.height))),r.style.position="absolute",r.style.left=m+"px",r.style.top=y+"px"})},t.prototype.transform3d=function(e={}){return this.each((t,n)=>{const r=[]
e.rotateX&&r.push(`rotateX(${e.rotateX}deg)`),e.rotateY&&r.push(`rotateY(${e.rotateY}deg)`),e.rotateZ&&r.push(`rotateZ(${e.rotateZ}deg)`),e.translateX&&r.push(`translateX(${e.translateX}px)`),e.translateY&&r.push(`translateY(${e.translateY}px)`),e.translateZ&&r.push(`translateZ(${e.translateZ}px)`),e.scale&&r.push(`scale3d(${e.scale}, ${e.scale}, ${e.scale})`),n.style.transform=r.join(" "),n.style.transformStyle="preserve-3d"})},t.prototype.particles=function(e={}){return this.each((t,n)=>{const r=e.count||50,o=e.color||"#667eea",a=e.size||5,s=e.speed||2
n.style.position="relative",n.style.overflow="hidden"
for(let e=0;r>e;e++){const e=document.createElement("div")
e.style.cssText=`\n                    position: absolute;\n                    width: ${a}px;\n                    height: ${a}px;\n                    background: ${o};\n                    border-radius: 50%;\n                    left: ${100*Math.random()}%;\n                    top: ${100*Math.random()}%;\n                    opacity: ${Math.random()};\n                    animation: float ${s+3*Math.random()}s infinite;\n                `,n.appendChild(e)}})},t.audio={context:null,init(){return this.context||(this.context=new(e.AudioContext||e.webkitAudioContext)),this.context},play(e){const t=new Audio(e)
return t.play(),t},beep(e=440,t=200){const n=this.init(),r=n.createOscillator(),o=n.createGain()
r.connect(o),o.connect(n.destination),r.frequency.value=e,r.type="sine",o.gain.setValueAtTime(.3,n.currentTime),o.gain.exponentialRampToValueAtTime(.01,n.currentTime+t/1e3),r.start(n.currentTime),r.stop(n.currentTime+t/1e3)},async record(){try{const e=await navigator.mediaDevices.getUserMedia({audio:!0}),t=new MediaRecorder(e),n=[]
return t.ondataavailable=e=>n.push(e.data),{start:()=>t.start(),stop:()=>new Promise(r=>{t.onstop=()=>{const e=new Blob(n,{type:"audio/webm"})
r(e)},t.stop(),e.getTracks().forEach(e=>e.stop())})}}catch(e){throw console.error("Error accessing microphone:",e),e}}},t.prototype.videoControls=function(e={}){return this.each((e,t)=>{"VIDEO"===t.tagName&&(t._controls={play:()=>t.play(),pause:()=>t.pause(),stop(){t.pause(),t.currentTime=0},seek:e=>t.currentTime=e,volume:e=>t.volume=e,speed:e=>t.playbackRate=e,fullscreen:()=>t.requestFullscreen(),screenshot(){const e=document.createElement("canvas")
return e.width=t.videoWidth,e.height=t.videoHeight,e.getContext("2d").drawImage(t,0,0),e.toDataURL("image/png")}})})},t.crypto={async hash(e,t="SHA-256"){const n=(new TextEncoder).encode(e),r=await crypto.subtle.digest(t,n)
return Array.from(new Uint8Array(r)).map(e=>e.toString(16).padStart(2,"0")).join("")},uuid:()=>crypto.randomUUID(),random(e=0,t=100){const n=new Uint32Array(1)
return crypto.getRandomValues(n),e+n[0]%(t-e+1)},encrypt:async(e,t)=>btoa(e+":"+t),async decrypt(e,t){const n=atob(e).split(":")
if(2>n.length)return null
const r=n.pop(),o=n.join(":")
return r===t?o:null}},t.device={isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isTablet:/iPad|Android/i.test(navigator.userAgent)&&!/Mobile/i.test(navigator.userAgent),isDesktop:!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isIOS:/iPad|iPhone|iPod/.test(navigator.userAgent),isAndroid:/Android/.test(navigator.userAgent),info:()=>({userAgent:navigator.userAgent,platform:navigator.platform,language:navigator.language,cookieEnabled:navigator.cookieEnabled,onLine:navigator.onLine,screenWidth:screen.width,screenHeight:screen.height,windowWidth:e.innerWidth,windowHeight:e.innerHeight,devicePixelRatio:e.devicePixelRatio})},t.storage.quota=async()=>{if(navigator.storage&&navigator.storage.estimate){const e=await navigator.storage.estimate()
return{usage:e.usage,quota:e.quota,percentage:(e.usage/e.quota*100).toFixed(2),available:e.quota-e.usage}}return null},t.prototype.lazyLoadBlur=function(){return this.each((e,t)=>{const n=t.dataset.src
if(!n)return
t.style.filter="blur(20px)",t.style.transition="filter 0.3s"
const r=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){const e=new Image
e.onload=()=>{t.src=n,t.style.filter="blur(0)"},e.src=n,r.unobserve(t)}})})
r.observe(t)})},t.prototype.scrollSpy=function(e){return this.each((t,n)=>{const r=new IntersectionObserver(t=>{t.forEach(t=>{e.call(n,t.isIntersecting,t.intersectionRatio)})},{threshold:[0,.25,.5,.75,1]})
r.observe(n),n._yaka_scrollspy_observer=r,n._yaka_scrollspy_cleanup=()=>{n._yaka_scrollspy_observer&&(n._yaka_scrollspy_observer.disconnect(),delete n._yaka_scrollspy_observer,delete n._yaka_scrollspy_cleanup)}})},t.prototype.sticky=function(t=0){return this.each((n,r)=>{if(r._yaka_sticky)return
r._yaka_sticky=!0
const o=r.offsetTop,a=()=>{o-t>e.pageYOffset?r.style.position="static":(r.style.position="fixed",r.style.top=t+"px")}
e.addEventListener("scroll",a),r._yaka_sticky_cleanup=()=>{e.removeEventListener("scroll",a),delete r._yaka_sticky,delete r._yaka_sticky_cleanup}})},t.prototype.ripple=function(e="rgba(255,255,255,0.6)"){return this.each((t,n)=>{n.style.position="relative",n.style.overflow="hidden",n.addEventListener("click",t=>{const r=document.createElement("span"),o=n.getBoundingClientRect(),a=Math.max(o.width,o.height)
r.style.cssText=`\n                    position: absolute;\n                    width: ${a}px;\n                    height: ${a}px;\n                    border-radius: 50%;\n                    background: ${e};\n                    left: ${t.clientX-o.left-a/2}px;\n                    top: ${t.clientY-o.top-a/2}px;\n                    transform: scale(0);\n                    animation: ripple-effect 0.6s ease-out;\n                    pointer-events: none;\n                `,n.appendChild(r),setTimeout(()=>r.remove(),600)})})},t.prototype.tilt=function(e={}){return this.each((t,n)=>{if(n._yaka_tilt)return
n._yaka_tilt=!0
const r=e.max||15,o=e=>{const t=n.getBoundingClientRect(),o=t.width/2,a=t.height/2
n.style.transform=`perspective(1000px) rotateX(${(e.clientY-t.top-a)/a*r}deg) rotateY(${-(e.clientX-t.left-o)/o*r}deg)`},a=()=>{n.style.transform="perspective(1000px) rotateX(0) rotateY(0)"}
n.addEventListener("mousemove",o),n.addEventListener("mouseleave",a),n._yaka_tilt_cleanup=()=>{n.removeEventListener("mousemove",o),n.removeEventListener("mouseleave",a),delete n._yaka_tilt,delete n._yaka_tilt_cleanup}})},t.prototype.magnetic=function(e=.3){return this.each((t,n)=>{if(n._yaka_magnetic)return
n._yaka_magnetic=!0
const r=t=>{const r=n.getBoundingClientRect()
n.style.transform=`translate(${(t.clientX-r.left-r.width/2)*e}px, ${(t.clientY-r.top-r.height/2)*e}px)`},o=()=>{n.style.transform="translate(0, 0)"}
n.addEventListener("mousemove",r),n.addEventListener("mouseleave",o),n._yaka_magnetic_cleanup=()=>{n.removeEventListener("mousemove",r),n.removeEventListener("mouseleave",o),delete n._yaka_magnetic,delete n._yaka_magnetic_cleanup}})},t.prototype.scramble=function(e,t=1e3){return this.each((n,r)=>{const o=e.length
let a=0
const s=t/50,i=setInterval(()=>{let t=""
for(let n=0;o>n;n++)t+=a/s>n/o?e[n]:"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"[Math.floor(44*Math.random())]
r.textContent=t,a++,s>a||(r.textContent=e,clearInterval(i))},50)})},t.prototype.glitch=function(e=2e3){return this.each((t,n)=>{const r=n.textContent
let o=!0
setTimeout(()=>o=!1,e)
const a=setInterval(()=>{if(!o)return n.textContent=r,void clearInterval(a)
const e=["█","▓","▒","░","▀","▄","▌","▐"]
let t=""
for(let n of r)t+=Math.random()>.7?e[Math.floor(8*Math.random())]:n
n.textContent=t},50)})},t.prototype.progress=function(e,t={}){return this.each((n,r)=>{const o=t.color||"#667eea",a=!1!==t.animated
r.style.cssText=`\n                width: 100%;\n                height: ${t.height||"20px"};\n                background: #e0e0e0;\n                border-radius: 10px;\n                overflow: hidden;\n            `
const s=document.createElement("div")
s.style.cssText=`\n                width: ${e}%;\n                height: 100%;\n                background: ${o};\n                transition: ${a?"width 0.5s ease":"none"};\n            `,r.innerHTML="",r.appendChild(s)})},t.spinner=(e={})=>{const t=e.size||50,n=e.color||"#667eea",r=e.container||document.body,o=document.createElement("div")
return o.style.cssText=`\n            position: fixed;\n            top: 50%;\n            left: 50%;\n            transform: translate(-50%, -50%);\n            width: ${t}px;\n            height: ${t}px;\n            border: 4px solid #f3f3f3;\n            border-top: 4px solid ${n};\n            border-radius: 50%;\n            animation: spin 1s linear infinite;\n            z-index: 10000;\n        `,r.appendChild(o),{remove:()=>o.remove()}},t.prototype.skeleton=function(e={}){return this.each((t,n)=>{const r=e.lines||3,o=e.height||"20px"
n.innerHTML=""
for(let e=0;r>e;e++){const e=document.createElement("div")
e.style.cssText=`\n                    height: ${o};\n                    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);\n                    background-size: 200% 100%;\n                    animation: skeleton-loading 1.5s infinite;\n                    margin-bottom: 10px;\n                    border-radius: 4px;\n                `,n.appendChild(e)}})},t.prototype.cleanup=function(){return this.each((e,t)=>{["_yaka_parallax_cleanup","_yaka_sticky_cleanup","_yaka_draggable_cleanup","_yaka_resizable_cleanup","_yaka_droppable_cleanup","_yaka_selectable_cleanup","_yaka_scroll_cleanup","_yaka_scrollspy_cleanup","_yaka_tilt_cleanup","_yaka_magnetic_cleanup","_yaka_tooltip_cleanup","_yaka_button_cleanup","_yaka_checkboxradio_cleanup","_yaka_controlgroup_cleanup","_yaka_menu_cleanup","_yaka_selectbox_cleanup","_yaka_timepicker_cleanup","_yaka_fullpage_cleanup","_yaka_colorpicker_cleanup","_yaka_datepicker_cleanup","_yaka_slider_cleanup","_yaka_tabs_cleanup","_yaka_accordion_cleanup","_yaka_carousel_cleanup","_yaka_confetti_cleanup","_yaka_autocomplete_cleanup"].forEach(e=>{"function"==typeof t[e]&&t[e]()})})},t.debug=!1,t._log=(e,n,r)=>{if(!t.debug)return
const o={info:"color: #3498db; font-weight: bold;",warn:"color: #f39c12; font-weight: bold;",error:"color: #e74c3c; font-weight: bold;",success:"color: #2ecc71; font-weight: bold;"},a=`[Yaka ${e.toUpperCase()}]`
console.log("%c"+a,o[e]||o.info,n,r||"")},t.prototype.safe=function(){return this.elements&&0!==this.elements.length?this:(t._log("warn","Safe mode: Operating on empty selector",{selector:this}),new Proxy(this,{get(e,n){return"function"==typeof t.prototype[n]?()=>(t._log("warn",`Safe mode: Skipping .${n}() on empty elements`),e):e[n]}}))},t.supports=n=>{const r={webrtc:()=>!(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia),geolocation:()=>!!navigator.geolocation,bluetooth:()=>!!navigator.bluetooth,webworker:()=>"undefined"!=typeof Worker,serviceworker:()=>"serviceWorker"in navigator,indexeddb:()=>!!e.indexedDB,websocket:()=>"undefined"!=typeof WebSocket,"intersection-observer":()=>"undefined"!=typeof IntersectionObserver,"mutation-observer":()=>"undefined"!=typeof MutationObserver,"performance-observer":()=>"undefined"!=typeof PerformanceObserver,"view-transition":()=>!!document.startViewTransition,webnn:()=>!!navigator.ml,battery:()=>!!navigator.getBattery,share:()=>!!navigator.share,clipboard:()=>!!navigator.clipboard,vibrate:()=>!!navigator.vibrate,fullscreen:()=>!(!document.fullscreenEnabled&&!document.webkitFullscreenEnabled),webgl(){try{const e=document.createElement("canvas")
return!(!e.getContext("webgl")&&!e.getContext("experimental-webgl"))}catch(e){return!1}},webgl2(){try{return!!document.createElement("canvas").getContext("webgl2")}catch(e){return!1}}}[n.toLowerCase()]
if(!r)return t._log("warn","Unknown feature: "+n),!1
try{return r()}catch(e){return t._log("error",`Error detecting feature ${n}:`,e),!1}},t.prototype.observeVisibility=function(e,n={}){const r=n.threshold||.1,o=n.rootMargin||"0px",a=!1!==n.once,s=n.unobserveOnLeave||!1
return this.each((n,i)=>{if(!t.supports("intersection-observer"))return t._log("warn","IntersectionObserver not supported, calling callback immediately"),void e.call(i,i,!0)
const l=new IntersectionObserver(t=>{t.forEach(t=>{const n=t.isIntersecting
n&&a?(e.call(t.target,t.target,!0),l.unobserve(t.target)):!n&&s||(e.call(t.target,t.target,n),!n&&s&&l.unobserve(t.target))})},{threshold:r,rootMargin:o})
l.observe(i),i._yaka_visibility_cleanup=()=>{l.disconnect()}})},t.signal=e=>{let n=e
const r=new Set,o=()=>(t.signal._currentEffect&&r.add(t.signal._currentEffect),n)
return o.set=e=>{n!==e&&(n=e,t._log("info","Signal updated",{value:n}),r.forEach(e=>e()))},o.update=e=>{const o=e(n)
n!==o&&(n=o,t._log("info","Signal updated",{value:n}),r.forEach(e=>e()))},o},t.effect=e=>{const n=()=>{t.signal._currentEffect=n
try{e()}finally{t.signal._currentEffect=null}}
n()},t.computed=e=>{const n=t.signal(void 0)
return t.effect(()=>n.set(e())),n},t.detectLeaks=()=>{const e=[]
return document.querySelectorAll("*").forEach(t=>{let n=0
Object.keys(t).filter(e=>e.startsWith("_yaka_")).forEach(e=>{e.endsWith("_cleanup")&&n++}),n>5&&e.push({element:t,tagName:t.tagName,id:t.id,cleanupMethods:n})}),e.length>0?t._log("warn",`Potential memory leaks detected: ${e.length} elements`,e):t._log("success","No memory leaks detected"),e},t.pageTransition=(n,r={})=>t.supports("view-transition")?document.startViewTransition(async()=>{r.beforeTransition&&await r.beforeTransition()
const e=await fetch(n),t=await e.text(),o=(new DOMParser).parseFromString(t,"text/html"),a=r.target||"body",s=document.querySelector(a),i=o.querySelector(a)
s&&i&&(s.innerHTML=i.innerHTML),r.afterTransition&&await r.afterTransition()}).finished:(t._log("warn","View Transition API not supported, using regular navigation"),e.location.href=n,Promise.resolve()),t.prototype.mask=function(e,n={}){const r="string"==typeof e?{phone:{pattern:"(###) ###-####",placeholder:"_",filter:/[0-9]/},creditCard:{pattern:"#### #### #### ####",placeholder:"_",filter:/[0-9]/},date:{pattern:"##/##/####",placeholder:"_",filter:/[0-9]/},ssn:{pattern:"###-##-####",placeholder:"_",filter:/[0-9]/},zipcode:{pattern:"#####",placeholder:"_",filter:/[0-9]/}}[e]:e
return r?this.each((e,t)=>{if("INPUT"!==t.tagName)return
const n=e=>{const n=t.value,o=t.selectionStart,a=(e=>{const t=e.replace(/[^0-9]/g,"")
let n="",o=0
for(let e=0;r.pattern.length>e&&t.length>o;e++)"#"===r.pattern[e]?(n+=t[o],o++):n+=r.pattern[e]
return n})(t.value)
if(n===a)return
t.value=a
let s=o,i=0
for(let e=0;Math.min(o,n.length)>e;e++)/[0-9]/.test(n[e])&&i++
let l=0
for(let e=0;a.length>e;e++)if(/[0-9]/.test(a[e])&&(l++,l===i)){s=e+1
break}t.setSelectionRange(s,s)}
t.addEventListener("input",n),t._yaka_mask_cleanup=()=>{t.removeEventListener("input",n)}}):(t._log("error","Unknown mask type: "+e),this)},t.prototype.honeypot=function(e={}){return this.each((n,r)=>{if("FORM"!==r.tagName)return
const o=document.createElement("input")
o.type="text",o.name=e.name||"website",o.style.cssText="position: absolute; left: -9999px; width: 1px; height: 1px;",o.tabIndex=-1,o.autocomplete="off",o.setAttribute("aria-hidden","true"),r.appendChild(o)
const a=n=>{if(o.value)return n.preventDefault(),t._log("warn","Honeypot triggered - potential spam detected"),e.onSpam&&e.onSpam(n),!1}
r.addEventListener("submit",a),r._yaka_honeypot_cleanup=()=>{r.removeEventListener("submit",a),o.parentNode&&o.parentNode.removeChild(o)}})},t.hotkeys={},t.hotkey=(e,n,r={})=>{const o=e.toLowerCase().replace(/\s+/g,"").replace(/cmd/g,"ctrl").replace(/meta/g,"ctrl"),a=e=>{const t=[];(e.ctrlKey||e.metaKey)&&t.push("ctrl"),e.altKey&&t.push("alt"),e.shiftKey&&t.push("shift"),t.push(e.key.toLowerCase()),t.join("+")===o&&(!1!==r.preventDefault&&e.preventDefault(),n(e))}
return document.addEventListener("keydown",a),t.hotkeys[o]=a,t._log("info","Hotkey registered: "+e),{remove(){document.removeEventListener("keydown",a),delete t.hotkeys[o]}}},t.removeHotkey=e=>{const n=e.toLowerCase().replace(/\s+/g,"")
t.hotkeys[n]&&(document.removeEventListener("keydown",t.hotkeys[n]),delete t.hotkeys[n])},t.worker=(e,n)=>t.supports("webworker")?new Promise((t,r)=>{try{const o=`\n                    self.onmessage = function(e) {\n                        const fn = ${""+e};\n                        try {\n                            const result = fn(e.data);\n                            self.postMessage({ success: true, result });\n                        } catch (error) {\n                            self.postMessage({ success: false, error: error.message });\n                        }\n                    };\n                `,a=new Blob([o],{type:"application/javascript"}),s=new Worker(URL.createObjectURL(a))
s.onmessage=e=>{e.data.success?t(e.data.result):r(Error(e.data.error)),s.terminate()},s.onerror=e=>{r(e),s.terminate()},s.postMessage(n)}catch(e){r(e)}}):Promise.reject(Error("Web Workers not supported")),t.db&&(t.db.saveMany=async function(e,n){if(!t.supports("indexeddb"))return Promise.reject(Error("IndexedDB not supported"))
const r=(await this._open()).transaction(e,"readwrite").objectStore(e),o=n.map(e=>new Promise((t,n)=>{const o=r.add(e)
o.onsuccess=()=>t(o.result),o.onerror=()=>n(o.error)}))
return Promise.all(o)},t.db.query=async function(e,n){if(!t.supports("indexeddb"))return Promise.reject(Error("IndexedDB not supported"))
const r=(await this._open()).transaction(e,"readonly").objectStore(e)
return new Promise((e,t)=>{const o=r.getAll()
o.onsuccess=()=>{let t=o.result
n&&(t=t.filter(n)),e(t)},o.onerror=()=>t(o.error)})},t.db.count=async function(e){if(!t.supports("indexeddb"))return Promise.reject(Error("IndexedDB not supported"))
const n=(await this._open()).transaction(e,"readonly").objectStore(e)
return new Promise((e,t)=>{const r=n.count()
r.onsuccess=()=>e(r.result),r.onerror=()=>t(r.error)})}),t.ai={isAvailable:()=>t.supports("webnn")||!!e.ai,async summarize(n,r={}){if(!this.isAvailable())return Promise.reject(Error("AI capabilities not supported in this browser"))
try{if(e.ai&&e.ai.summarizer){const t=await e.ai.summarizer.create(r)
return await t.summarize(n)}throw Error("Summarization API not available")}catch(e){throw t._log("error","AI summarization failed:",e),e}},async analyzeSentiment(n){if(!this.isAvailable())return Promise.reject(Error("AI capabilities not supported in this browser"))
try{if(e.ai&&e.ai.languageModel){const t=await e.ai.languageModel.create(),r=`Analyze the sentiment of this text and return only "positive", "negative", or "neutral": "${n}"`
return(await t.prompt(r)).toLowerCase().trim()}throw Error("Language model API not available")}catch(e){throw t._log("error","Sentiment analysis failed:",e),e}},async translate(n,r){if(!this.isAvailable())return Promise.reject(Error("AI capabilities not supported in this browser"))
try{if(e.ai&&e.ai.translator){const t=await e.ai.translator.create({sourceLanguage:"en",targetLanguage:r})
return await t.translate(n)}throw Error("Translation API not available")}catch(e){throw t._log("error","Translation failed:",e),e}}},t.theme={_current:null,_listeners:[],_storageAvailable:!0,_initCurrent(){if(null===this._current)try{this._current=localStorage.getItem("yaka-theme")||"light"}catch(e){t._log("warn","localStorage not available, theme will not persist across sessions"),this._storageAvailable=!1,this._current="light"}},get current(){return this._initCurrent(),this._current},set(e){if(this._initCurrent(),"light"===e||"dark"===e){if(this._current=e,this._storageAvailable)try{localStorage.setItem("yaka-theme",e)}catch(e){t._log("warn","Failed to save theme to localStorage:",e.message)}document.documentElement.setAttribute("data-theme",e),Object.entries("dark"===e?{"--bg-color":"#1a1a1a","--text-color":"#ffffff","--primary-color":"#667eea","--secondary-color":"#764ba2","--border-color":"#333333","--card-bg":"#2a2a2a","--shadow":"0 2px 8px rgba(0,0,0,0.5)"}:{"--bg-color":"#ffffff","--text-color":"#333333","--primary-color":"#667eea","--secondary-color":"#764ba2","--border-color":"#e0e0e0","--card-bg":"#f9f9f9","--shadow":"0 2px 8px rgba(0,0,0,0.1)"}).forEach(([e,t])=>{document.documentElement.style.setProperty(e,t)}),this._listeners.forEach(t=>t(e)),t._log("info","Theme changed to: "+e)}else t._log("error",`Invalid theme: ${e}. Use 'light' or 'dark'`)},dark(){this.set("dark")},light(){this.set("light")},toggle(){this.set("dark"===this._current?"light":"dark")},onChange(e){this._listeners.push(e)},init(){this.set(this.current),e.matchMedia&&e.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{let t=!1
if(this._storageAvailable)try{t=null!==localStorage.getItem("yaka-theme")}catch(e){}t||this.set(e.matches?"dark":"light")})}},"loading"===document.readyState?document.addEventListener("DOMContentLoaded",()=>t.theme.init()):t.theme.init(),t.plugins={},t.use=(e,n)=>{if("function"==typeof n||"object"==typeof n)if(t.plugins[e])t._log("warn",`Plugin "${e}" is already registered`)
else try{"function"==typeof n?n(t):n.install?n.install(t):Object.assign(t,n),t.plugins[e]=n,t._log("success",`Plugin "${e}" registered successfully`)}catch(n){t._log("error",`Failed to register plugin "${e}":`,n)}else t._log("error","Plugin must be a function or object")},t.createPlugin=(e,t)=>({name:e,install(e){t.methods&&Object.assign(e.prototype,t.methods),t.statics&&Object.assign(e,t.statics),t.init&&t.init(e)}}),t.dev={profile(e,t){const n=performance.now(),r=t(),o=performance.now()
return console.log("%c[Yaka Profile] "+e,"color: #9b59b6; font-weight: bold;",(o-n).toFixed(2)+"ms"),r},memory(){if(performance.memory){const e=(performance.memory.usedJSHeapSize/1048576).toFixed(2),t=(performance.memory.totalJSHeapSize/1048576).toFixed(2)
return console.log("%c[Yaka Memory]","color: #e67e22; font-weight: bold;",`${e}MB / ${t}MB`),{used:e,total:t}}return console.warn("Performance.memory not available"),null},inspect(t){const n=document.querySelector(t)
if(!n)return void console.warn("Element not found: "+t)
const r={tagName:n.tagName,id:n.id,classes:Array.from(n.classList),attributes:{},styles:{},listeners:[],yakaFeatures:[]}
Array.from(n.attributes).forEach(e=>{r.attributes[e.name]=e.value})
const o=e.getComputedStyle(n)
return["display","position","width","height","margin","padding"].forEach(e=>{r.styles[e]=o[e]}),Object.keys(n).forEach(e=>{e.startsWith("_yaka_")&&r.yakaFeatures.push(e)}),console.log("%c[Yaka Inspector]","color: #3498db; font-weight: bold;",t,r),r},plugins:()=>(console.log("%c[Yaka Plugins]","color: #2ecc71; font-weight: bold;",Object.keys(t.plugins)),t.plugins),hotkeys:()=>(console.log("%c[Yaka Hotkeys]","color: #f39c12; font-weight: bold;",Object.keys(t.hotkeys)),t.hotkeys)},t.memoize=function(e,n={}){const r=new Map,o=n.keyFn||(e=>{try{if(e.every(e=>{const t=typeof e
return null===e||"undefined"===t||"boolean"===t||"number"===t||"string"===t||"bigint"===t}))return JSON.stringify(e)
if(0===e.length)return"complex_0_empty"
const t=typeof e[0]
try{const t=void 0!==e[0]?JSON.stringify(e[0]):"undefined"
return`complex_${e.length}_${t}`}catch(n){return`complex_${e.length}_${t}`}}catch(t){return`fallback_${e.length}_${e.length>0?typeof e[0]:"empty"}`}})
return function(...n){const a=o(n)
if(r.has(a))return t._log("info","Memoize: Cache hit",{key:a}),r.get(a)
const s=e.apply(this,n)
return r.set(a,s),t._log("info","Memoize: Cache miss, storing result",{key:a}),s}},t.router){const e=t.router
t.router=(n,r={})=>{const o=r.middleware||[],a=e(n),s=a.navigate
return a.navigate=async e=>{for(const n of o)if(!1===await n(e,a))return void t._log("info",`Navigation to ${e} blocked by middleware`)
s.call(a,e)},a}}t.prototype.lottie=function(e={}){return this.each((n,r)=>{if("undefined"==typeof lottie)return void t._log("error","Lottie library not loaded. Include it from: https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js")
const o=lottie.loadAnimation({container:r,renderer:e.renderer||"svg",loop:!1!==e.loop,autoplay:!1!==e.autoplay,path:e.path||e.animationData})
r._yaka_lottie=o,r._yaka_lottie_cleanup=()=>{o.destroy()}})},t.bluetooth={isAvailable:()=>t.supports("bluetooth"),async connect(e={}){if(!this.isAvailable())return Promise.reject(Error("Bluetooth not supported"))
try{const n=await navigator.bluetooth.requestDevice({filters:e.filters||[{services:["heart_rate"]}],optionalServices:e.optionalServices||[]})
t._log("info","Bluetooth device connected:",n.name)
const r=await n.gatt.connect()
return{device:n,server:r,getService:async e=>await r.getPrimaryService(e),disconnect(){r.disconnect(),t._log("info","Bluetooth device disconnected")}}}catch(e){throw t._log("error","Bluetooth connection failed:",e),e}},async heartRateMonitor(e){try{const t=await this.connect({filters:[{services:["heart_rate"]}]}),n=await t.getService("heart_rate"),r=await n.getCharacteristic("heart_rate_measurement")
return r.addEventListener("characteristicvaluechanged",t=>{const n=t.target.value.getUint8(1)
e(n)}),await r.startNotifications(),t}catch(e){throw t._log("error","Heart rate monitor failed:",e),e}}}
class r extends Error{constructor(e,t,n){super(e),this.name="YakaHttpError",this.status=t,this.response=n}}const o=async(e,n,o,a={})=>{const{timeout:s=3e4,retries:i=0,retryDelay:l=1e3,onError:c=null,validateStatus:d=e=>e>=200&&300>e,parseResponse:p=!0}=a
let u
const h=i+1
for(let i=0;h>i;i++)try{const l=new AbortController,c=setTimeout(()=>l.abort(),s),u={method:e,headers:{"Content-Type":"application/json",...a.headers||{}},signal:l.signal}
"GET"!==e&&"DELETE"!==e&&o&&(u.body=JSON.stringify(o))
const h="GET"===e&&o?n+"?"+new URLSearchParams(o):n,m=await fetch(h,u)
if(clearTimeout(c),!d(m.status)){const e=await m.text()
throw new r(`HTTP ${m.status}: ${m.statusText}`,m.status,e)}let y
if(p){const e=m.headers.get("content-type")
y=e&&e.includes("application/json")?await m.json():await m.text()}else y=m
return t._log("info",`HTTP ${e} ${n} succeeded`,{attempt:i+1}),y}catch(o){if(u=o,"AbortError"===o.name&&(u=new r(`Request timeout after ${s}ms`,0,null)),t._log("warn",`HTTP ${e} ${n} failed (attempt ${i+1}/${h})`,o.message),h-1>i){const e=l*Math.pow(2,i)
await new Promise(t=>setTimeout(t,e))}else c&&c(u)}throw u}
t.get=async(e,t,n)=>o("GET",e,t,n),t.post=async(e,t,n)=>o("POST",e,t,n),t.put=async(e,t,n)=>o("PUT",e,t,n),t.delete=async(e,t,n)=>o("DELETE",e,t,n),t.ajax=async e=>{const{url:t,method:n="GET",data:r,...a}=e
return o(n,t,r,a)},t.cache={_store:new Map,_ttl:new Map,set(e,n,r=3e5){this._store.set(e,n),this._ttl.set(e,Date.now()+r),t._log("info","Cache set: "+e,{ttl:r+"ms"})},get(e){return this.has(e)?this._store.get(e):null},has(e){if(!this._store.has(e))return!1
const t=this._ttl.get(e)
return Date.now()<=t||(this.delete(e),!1)},delete(e){this._store.delete(e),this._ttl.delete(e),t._log("info","Cache deleted: "+e)},clear(){this._store.clear(),this._ttl.clear(),t._log("info","Cache cleared")},async request(e,n={}){const r=`${n.method||"GET"}:${e}:${JSON.stringify(n.data||{})}`
if(!1!==n.cache&&this.has(r))return t._log("info","Cache hit: "+e),this.get(r)
const o=await t.ajax({url:e,...n})
return!1!==n.cache&&this.set(r,o,n.cacheTTL),o}},t.Router=class{constructor(e={}){this.routes=[],this.guards={before:[],after:[]},this.current=null,this.params={},this.query={},this.notFoundHandler=e.notFoundHandler||(()=>console.warn("404: Route not found")),this.baseUrl=e.baseUrl||""}addRoute(e,t){const{component:n,handler:r,children:o,beforeEnter:a,name:s,redirect:i}=t,l=[],c=e.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/:(\w+)/g,(e,t)=>(l.push(t),"([^\\/]+)")).replace(/\*/g,".*").replace(/\//g,"\\/")
return this.routes.push({path:e,pattern:RegExp(`^${c}$`),paramNames:l,component:n,handler:r,children:o||[],beforeEnter:a,name:s,redirect:i}),this}addRoutes(e){return Object.entries(e).forEach(([e,t])=>{this.addRoute(e,t)}),this}beforeEach(e){return this.guards.before.push(e),this}afterEach(e){return this.guards.after.push(e),this}match(e){for(const t of this.routes){const n=e.match(t.pattern)
if(n){const e={}
return t.paramNames.forEach((t,r)=>{e[t]=n[r+1]}),{route:t,params:e}}}return null}parseQuery(e){const t={}
return new URLSearchParams(e).forEach((e,n)=>{t[n]=e}),t}async navigate(n,r={}){const{replace:o=!1,state:a={}}=r,s=new URL(n,e.location.origin),i=s.pathname.replace(this.baseUrl,"")
this.query=this.parseQuery(s.search)
const l=this.match(i)
if(!l)return t._log("warn","Route not found: "+i),this.notFoundHandler(i),!1
const{route:c,params:d}=l
if(this.params=d,c.redirect){const e="function"==typeof c.redirect?c.redirect(d):c.redirect
return this.navigate(e,r)}for(const e of this.guards.before)if(!1===await e(c,this.current))return t._log("info","Navigation cancelled by guard"),!1
if(c.beforeEnter&&!1===await c.beforeEnter(c,this.current))return t._log("info","Navigation cancelled by route guard"),!1
const p=this.baseUrl+n
if(o?history.replaceState({...a,path:p},"",p):history.pushState({...a,path:p},"",p),c.component){const e=c.target||"#app",t="function"==typeof c.component?c.component(d,this.query):c.component
_(e).html(t)}c.handler&&c.handler(d,this.query)
const u=this.current
this.current=c
for(const e of this.guards.after)e(c,u)
return t._log("info","Navigated to: "+i,{params:d,query:this.query}),!0}navigateTo(e,n={},r={}){const o=this.routes.find(t=>t.name===e)
if(!o)return t._log("error","Route name not found: "+e),!1
let a=o.path
Object.entries(n).forEach(([e,t])=>{a=a.replace(":"+e,t)})
const s=""+new URLSearchParams(r)
return this.navigate(s?`${a}?${s}`:a)}back(){history.back()}forward(){history.forward()}init(){return e.addEventListener("popstate",t=>{this.navigate(t.state?.path?t.state.path:e.location.pathname+e.location.search,{replace:!0})}),this.navigate(e.location.pathname+e.location.search,{replace:!0}),this}},t.createRouter=e=>new t.Router(e),t.validator={rules:{required:e=>null!=e&&""!==e,email:e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),url(e){try{return new URL(e),!0}catch{return!1}},number:e=>!isNaN(parseFloat(e))&&isFinite(e),integer:e=>Number.isInteger(+e),min:(e,t)=>+e>=t,max:(e,t)=>t>=+e,minLength:(e,t)=>(e+"").length>=t,maxLength:(e,t)=>t>=(e+"").length,pattern:(e,t)=>t.test(e),match:(e,t,n)=>e===n[t],alpha:e=>/^[a-zA-Z]+$/.test(e),alphanumeric:e=>/^[a-zA-Z0-9]+$/.test(e),phone:e=>/^[\d\s\-\+\(\)]+$/.test(e),creditCard(e){const t=e.replace(/\D/g,"")
if(13>t.length||t.length>19)return!1
let n=0,r=!1
for(let e=t.length-1;e>=0;e--){let o=parseInt(t[e])
r&&(o*=2,o>9&&(o-=9)),n+=o,r=!r}return n%10==0}},messages:{required:"This field is required",email:"Please enter a valid email address",url:"Please enter a valid URL",number:"Please enter a valid number",integer:"Please enter a valid integer",min:"Value must be at least {min}",max:"Value must be at most {max}",minLength:"Minimum length is {minLength} characters",maxLength:"Maximum length is {maxLength} characters",pattern:"Invalid format",match:"Fields do not match",alpha:"Only letters are allowed",alphanumeric:"Only letters and numbers are allowed",phone:"Please enter a valid phone number",creditCard:"Please enter a valid credit card number"},addRule(e,t,n){this.rules[e]=t,this.messages[e]=n},validate(e,n,r={}){const o=[]
for(const[a,s]of Object.entries(n)){const i=this.rules[a]
if(!i){t._log("warn","Unknown validation rule: "+a)
continue}let l
if(l="boolean"==typeof s&&s?i(e):"match"===a?i(e,s,r):i(e,s),!l){let e=n.message||this.messages[a]||"Invalid value"
e=e.replace(`{${a}}`,s),o.push(e)}}return o},async validateAsync(e,t){try{const n=await t(e)
return!0===n?[]:[n||"Validation failed"]}catch(e){return[e.message||"Validation error"]}}},t.prototype.validateForm=function(e,n={}){const{realTime:r=!1,showErrors:o=!0}=n,a=this.elements[0]
if(!a)return{valid:!0,errors:{}}
const s={}
let i=!0
const l={}
return a.querySelectorAll("[name]").forEach(e=>{l[e.name]=e.value}),Object.entries(e).forEach(([e,n])=>{const c=a.querySelector(`[name="${e}"]`)
if(!c)return
const d=t.validator.validate(c.value,n,l)
if(d.length>0){if(s[e]=d,i=!1,o){c.classList.add("yaka-error")
let e=c.parentElement.querySelector(".yaka-error-message")
e||(e=document.createElement("div"),e.className="yaka-error-message",c.parentElement.appendChild(e)),e.textContent=d[0]}}else if(o){c.classList.remove("yaka-error")
const e=c.parentElement.querySelector(".yaka-error-message")
e&&e.remove()}r&&!c._yakaValidationBound&&(c.addEventListener("blur",()=>{const e=t.validator.validate(c.value,n,l)
if(e.length>0&&o){c.classList.add("yaka-error")
let t=c.parentElement.querySelector(".yaka-error-message")
t||(t=document.createElement("div"),t.className="yaka-error-message",c.parentElement.appendChild(t)),t.textContent=e[0]}else if(o){c.classList.remove("yaka-error")
const e=c.parentElement.querySelector(".yaka-error-message")
e&&e.remove()}}),c._yakaValidationBound=!0)}),{valid:i,errors:s}},t.security={sanitizeHtml(e){const t=document.createElement("div")
return t.textContent=e,t.innerHTML},escapeHtml(e){const t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;","\\":"&#x5C;"}
return(e+"").replace(/[&<>"'/\\]/g,e=>t[e])},csrf:{_token:null,_headerName:"X-CSRF-Token",setToken(e){this._token=e
let n=document.querySelector('meta[name="csrf-token"]')
n||(n=document.createElement("meta"),n.name="csrf-token",document.head.appendChild(n)),n.content=e,t._log("info","CSRF token set")},getToken(){if(this._token)return this._token
const e=document.querySelector('meta[name="csrf-token"]')
return e&&(this._token=e.content),this._token},addToRequest(e){const t=this.getToken()
return t&&(e.headers=e.headers||{},e.headers[this._headerName]=t),e}},csp:{nonce:null,setNonce(e){this.nonce=e},getNonce(){if(this.nonce)return this.nonce
const e=document.querySelector("script[nonce]")
return e&&(this.nonce=e.getAttribute("nonce")),this.nonce}},sanitizeInput(e){return(e+"").replace(/['";\\]/g,"").trim()},sanitizeUrl(t){try{const n=new URL(t,e.location.origin)
return["http:","https:"].includes(n.protocol)?n.href:""}catch{return""}}},t.http.addRequestInterceptor(e=>t.security.csrf.addToRequest(e)),t.Store=class{constructor(e={}){this._state=e.state||{},this._getters=e.getters||{},this._mutations=e.mutations||{},this._actions=e.actions||{},this._subscribers=[],this._history=[],this._historyIndex=-1,this._maxHistory=e.maxHistory||50,this._plugins=e.plugins||[],this._makeReactive(),this._plugins.forEach(e=>e(this)),this._saveHistory()}_makeReactive(){const e=this
this.state=new Proxy(this._state,{set(t,n,r){const o=t[n]
return t[n]=r,e._notify({type:"state",key:n,value:r,oldValue:o}),!0},get(e,t){return e[t]}})}_notify(e){this._subscribers.forEach(t=>t(e,this.state))}_saveHistory(){this._history.length-1>this._historyIndex&&(this._history=this._history.slice(0,this._historyIndex+1)),this._history.push(JSON.parse(JSON.stringify(this._state))),this._history.length>this._maxHistory?this._history.shift():this._historyIndex++}get(e){const n=this._getters[e]
if(n)return n(this.state,this._getters)
t._log("warn","Getter not found: "+e)}commit(e,n){const r=this._mutations[e]
r?(t._log("info","Mutation: "+e,n),r(this._state,n),this._notify({type:"mutation",mutation:e,payload:n}),this._saveHistory()):t._log("error","Mutation not found: "+e)}async dispatch(e,n){const r=this._actions[e]
if(r)return t._log("info","Action: "+e,n),r({state:this.state,commit:this.commit.bind(this),dispatch:this.dispatch.bind(this),getters:this._getters},n)
t._log("error","Action not found: "+e)}subscribe(e){return this._subscribers.push(e),()=>{const t=this._subscribers.indexOf(e)
t>-1&&this._subscribers.splice(t,1)}}watch(e,t){return this.subscribe((n,r)=>{n.key===e&&t(r[e],n.oldValue)})}timeTravel(e){e>=0&&this._history.length>e?(this._historyIndex=e,this._state=JSON.parse(JSON.stringify(this._history[e])),this._makeReactive(),this._notify({type:"timeTravel",index:e}),t._log("info","Time traveled to state #"+e)):t._log("warn","Invalid history index")}undo(){this._historyIndex>0&&this.timeTravel(this._historyIndex-1)}redo(){this._history.length-1>this._historyIndex&&this.timeTravel(this._historyIndex+1)}persist(e="yaka-store"){try{localStorage.setItem(e,JSON.stringify(this._state)),t._log("info","State persisted")}catch(e){t._log("error","Failed to persist state:",e)}}restore(e="yaka-store"){try{const n=localStorage.getItem(e)
n&&(this._state=JSON.parse(n),this._makeReactive(),this._saveHistory(),t._log("info","State restored"))}catch(e){t._log("error","Failed to restore state:",e)}}},t.createStore=e=>new t.Store(e),t.performance={marks:{},measures:{},_observers:[],mark(e){this.marks[e]=performance.now(),performance.mark&&performance.mark(e)},measure(e,n,r){const o=this.marks[n],a=r?this.marks[r]:performance.now()
if(void 0===o)return t._log("warn","Start mark not found: "+n),null
const s=a-o
if(this.measures[e]=s,performance.measure)try{performance.measure(e,n,r)}catch(e){}return t._log("info","Performance: "+e,s.toFixed(2)+"ms"),s},getFPS(e,t=1e3){let n=0
const r=performance.now(),o=a=>{n++,t>a-r?requestAnimationFrame(o):e(Math.round(n/(t/1e3)))}
requestAnimationFrame(o)},observeLongTasks(n){if("PerformanceObserver"in e)try{const e=new PerformanceObserver(e=>{e.getEntries().forEach(e=>{n({name:e.name,duration:e.duration,startTime:e.startTime})})})
e.observe({entryTypes:["longtask"]}),this._observers.push(e)}catch(e){t._log("warn","Long task monitoring not supported")}},getReport(){const e={marks:this.marks,measures:this.measures,memory:null,navigation:null}
if(performance.memory&&(e.memory={usedJSHeapSize:(performance.memory.usedJSHeapSize/1048576).toFixed(2)+" MB",totalJSHeapSize:(performance.memory.totalJSHeapSize/1048576).toFixed(2)+" MB",limit:(performance.memory.jsHeapSizeLimit/1048576).toFixed(2)+" MB"}),performance.getEntriesByType){const t=performance.getEntriesByType("navigation")
if(t.length>0){const n=t[0]
e.navigation={domContentLoaded:n.domContentLoadedEventEnd-n.domContentLoadedEventStart,loadComplete:n.loadEventEnd-n.loadEventStart,domInteractive:n.domInteractive,totalTime:n.loadEventEnd-n.fetchStart}}}return e},clear(){this.marks={},this.measures={},performance.clearMarks&&performance.clearMarks(),performance.clearMeasures&&performance.clearMeasures()}},t.onOffline=t=>(e.addEventListener("offline",t),()=>e.removeEventListener("offline",t)),t.onOnline=t=>(e.addEventListener("online",t),()=>e.removeEventListener("online",t)),t.isOnline=()=>navigator.onLine,t.paste=async()=>{try{if(navigator.clipboard&&navigator.clipboard.readText)return await navigator.clipboard.readText()
throw Error("Clipboard API not available")}catch(e){return console.warn("Yaka.paste: Failed to read clipboard",e),null}},t.socket=function(e,n={}){const r=new WebSocket(e),o={},a={on(e,t){return o[e]||(o[e]=[]),o[e].push(t),"open"===e?r.addEventListener("open",t):"close"===e?r.addEventListener("close",t):"error"===e?r.addEventListener("error",t):"message"===e&&r.addEventListener("message",e=>{try{const r=!1!==n.json?JSON.parse(e.data):e.data
t(r,e)}catch{t(e.data,e)}}),this},send(e){return r.readyState===WebSocket.OPEN?r.send("object"==typeof e?JSON.stringify(e):e):console.warn("WebSocket not open. ReadyState:",r.readyState),this},close(e,t){return r.close(e,t),this},get readyState(){return r.readyState},get raw(){return r}}
if(n.autoReconnect){let o
r.addEventListener("close",()=>{clearTimeout(o),o=setTimeout(()=>{console.log("Reconnecting WebSocket..."),t.socket(e,n)},n.reconnectDelay||3e3)})}return a},t.prototype.loadingState=function(e,t={}){const n={loading:"Loading...",success:"Success!",error:"Error!",successDuration:2e3,errorDuration:3e3,...t}
return this.each((t,r)=>{const o=r.textContent,a=r.disabled
r.textContent=n.loading,r.disabled=!0,r.classList.add("yaka-loading"),e.then(e=>(r.textContent=n.success,r.classList.remove("yaka-loading"),r.classList.add("yaka-success"),setTimeout(()=>{r.textContent=o,r.disabled=a,r.classList.remove("yaka-success")},n.successDuration),e)).catch(e=>{throw r.textContent=n.error,r.classList.remove("yaka-loading"),r.classList.add("yaka-error"),setTimeout(()=>{r.textContent=o,r.disabled=a,r.classList.remove("yaka-error")},n.errorDuration),e})})},t.share=async(t={})=>{if(!navigator.share)return console.warn("Web Share API not supported"),!1
try{return await navigator.share({title:t.title||document.title,text:t.text||"",url:t.url||e.location.href}),!0}catch(e){return"AbortError"!==e.name&&console.warn("Share failed:",e),!1}},t.batch=e=>{requestAnimationFrame(()=>{e()})},t.preload=e=>{const t=[]
return(Array.isArray(e)?e:[e]).forEach(e=>{const n=e.split(".").pop().toLowerCase()
let r
r=["jpg","jpeg","png","gif","webp","svg"].includes(n)?new Promise((t,n)=>{const r=new Image
r.onload=()=>t(e),r.onerror=n,r.src=e}):["woff","woff2","ttf","otf"].includes(n)?new Promise((t,r)=>{const o=document.createElement("link")
o.rel="preload",o.as="font",o.type="font/"+n,o.crossOrigin="anonymous",o.href=e,o.onload=()=>t(e),o.onerror=r,document.head.appendChild(o)}):fetch(e).then(()=>e),t.push(r)}),Promise.all(t)},t.prototype.timeAgo=function(e={}){const t={live:!1,updateInterval:6e4,...e},n=e=>{const t=Math.floor((new Date-e)/1e3),n={year:31536e3,month:2592e3,week:604800,day:86400,hour:3600,minute:60,second:1}
for(const[e,r]of Object.entries(n)){const n=Math.floor(t/r)
if(n>=1)return 1===n?`1 ${e} ago`:`${n} ${e}s ago`}return"just now"}
return this.each((e,r)=>{const o=r.getAttribute("data-timestamp")||r.getAttribute("datetime")
if(!o)return
const a=new Date(o)
if(r.textContent=n(a),t.live){const e=setInterval(()=>{r.textContent=n(a)},t.updateInterval)
r._yaka_timeago_interval=e}})},t.prototype.patch=function(e){return this.each((t,n)=>{const r=document.createElement("div")
r.innerHTML=e
const o=r.firstElementChild
if(!o)return void(n.innerHTML=e)
const a=(e,t)=>{if(3===e.nodeType&&3===t.nodeType)return void(e.textContent!==t.textContent&&(e.textContent=t.textContent))
if(1===e.nodeType&&1===t.nodeType){const n=e.attributes,r=t.attributes
for(let t of r)e.getAttribute(t.name)!==t.value&&e.setAttribute(t.name,t.value)
for(let r of n)t.hasAttribute(r.name)||e.removeAttribute(r.name)}const n=Array.from(e.childNodes),r=Array.from(t.childNodes),o=Math.max(n.length,r.length)
for(let t=0;o>t;t++){const o=n[t],s=r[t]
!o&&s?e.appendChild(s.cloneNode(!0)):o&&!s?e.removeChild(o):o&&s&&(o.nodeName!==s.nodeName?e.replaceChild(s.cloneNode(!0),o):a(o,s))}}
a(n,o)})},t.commandPalette=(e={})=>{const t={commands:[],placeholder:"Type a command...",hotkey:"k",hotkeyModifier:"ctrl",...e}
let n,r,o,a=!1
const s=e=>{o.innerHTML="",e.forEach((e,t)=>{const n=document.createElement("div")
n.className="yaka-command-item"+(0===t?" selected":""),n.textContent=e.name,n.addEventListener("click",()=>{e.action(),l()}),o.appendChild(n)})},i=()=>{n||(n=document.createElement("div"),n.className="yaka-command-palette-overlay",n.innerHTML=`\n                <div class="yaka-command-palette">\n                    <input type="text" class="yaka-command-input" placeholder="${t.placeholder}">\n                    <div class="yaka-command-results"></div>\n                </div>\n            `,document.body.appendChild(n),r=n.querySelector(".yaka-command-input"),o=n.querySelector(".yaka-command-results"),n.addEventListener("click",e=>{e.target===n&&l()}),r.addEventListener("keydown",e=>{if("Escape"===e.key&&l(),"Enter"===e.key){const e=o.querySelector(".yaka-command-item.selected")
e&&e.click()}"ArrowDown"===e.key&&(e.preventDefault(),(()=>{const e=o.querySelectorAll(".yaka-command-item"),t=o.querySelector(".selected"),n=e[Array.from(e).indexOf(t)+1]||e[0]
t.classList.remove("selected"),n.classList.add("selected"),n.scrollIntoView({block:"nearest"})})()),"ArrowUp"===e.key&&(e.preventDefault(),(()=>{const e=o.querySelectorAll(".yaka-command-item"),t=o.querySelector(".selected"),n=e[Array.from(e).indexOf(t)-1]||e[e.length-1]
t.classList.remove("selected"),n.classList.add("selected"),n.scrollIntoView({block:"nearest"})})())}),r.addEventListener("input",()=>{const e=r.value.toLowerCase(),n=t.commands.filter(t=>t.name.toLowerCase().includes(e))
s(n)}),s(t.commands)),n.style.display="flex",r.value="",r.focus(),s(t.commands),a=!0},l=()=>{n&&(n.style.display="none"),a=!1}
return document.addEventListener("keydown",e=>{("ctrl"===t.hotkeyModifier?e.ctrlKey:"meta"===t.hotkeyModifier?e.metaKey:"alt"===t.hotkeyModifier&&e.altKey)&&e.key.toLowerCase()===t.hotkey&&(e.preventDefault(),a?l():i())}),{open:i,close:l}},t.prototype.virtualScroll=function(e={}){const t={items:[],itemHeight:50,buffer:5,render:e=>`<div>${e}</div>`,...e}
return this.each((e,n)=>{const r=t.items.length*t.itemHeight,o=document.createElement("div")
o.style.cssText=`\n                height: ${n.clientHeight||400}px;\n                overflow-y: auto;\n                position: relative;\n            `
const a=document.createElement("div")
a.style.cssText=`\n                height: ${r}px;\n                position: relative;\n            `,o.appendChild(a),n.innerHTML="",n.appendChild(o)
const s=()=>{const e=o.scrollTop,n=o.clientHeight,r=Math.max(0,Math.floor(e/t.itemHeight)-t.buffer),s=Math.min(t.items.length,Math.ceil((e+n)/t.itemHeight)+t.buffer)
a.innerHTML=""
for(let e=r;s>e;e++){const n=document.createElement("div")
n.style.cssText=`\n                        position: absolute;\n                        top: ${e*t.itemHeight}px;\n                        width: 100%;\n                        height: ${t.itemHeight}px;\n                    `,n.innerHTML=t.render(t.items[e]),a.appendChild(n)}}
o.addEventListener("scroll",s),s()})},t.tour=(e=[])=>{let t,n,r=0
const o=s=>{if(s>=e.length)return void a()
r=s
const i=e[s],l=document.querySelector(i.element)
if(!l)return void console.warn("Tour: Element not found: "+i.element)
const c=l.getBoundingClientRect()
t.style.cssText=`\n                clip-path: polygon(\n                    0 0, 0 100%, \n                    ${c.left-5}px 100%, \n                    ${c.left-5}px ${c.top-5}px, \n                    ${c.right+5}px ${c.top-5}px, \n                    ${c.right+5}px ${c.bottom+5}px, \n                    ${c.left-5}px ${c.bottom+5}px, \n                    ${c.left-5}px 100%, \n                    100% 100%, 100% 0\n                );\n            `,n.innerHTML=`\n                <div class="yaka-tour-content">\n                    <div class="yaka-tour-text">${i.text}</div>\n                    <div class="yaka-tour-buttons">\n                        ${s>0?'<button class="yaka-tour-prev">Previous</button>':""}\n                        ${e.length-1>s?'<button class="yaka-tour-next">Next</button>':'<button class="yaka-tour-finish">Finish</button>'}\n                        <button class="yaka-tour-skip">Skip Tour</button>\n                    </div>\n                    <div class="yaka-tour-progress">${s+1} / ${e.length}</div>\n                </div>\n            `,n.style.cssText=`\n                top: ${c.bottom+15}px;\n                left: ${c.left}px;\n            `
const d=n.querySelector(".yaka-tour-next, .yaka-tour-finish"),p=n.querySelector(".yaka-tour-prev"),u=n.querySelector(".yaka-tour-skip")
d&&d.addEventListener("click",()=>o(r+1)),p&&p.addEventListener("click",()=>o(r-1)),u&&u.addEventListener("click",a)},a=()=>{t&&t.remove(),n&&n.remove()}
return t||(t=document.createElement("div"),t.className="yaka-tour-overlay",document.body.appendChild(t),n=document.createElement("div"),n.className="yaka-tour-tooltip",document.body.appendChild(n)),o(0),{next:()=>o(r+1),prev:()=>o(r-1),end:a}},t.prototype.blurLazyLoad=function(e={}){const t={placeholder:null,rootMargin:"50px",...e},n=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){const t=e.target,r=t.getAttribute("data-src")
if(r){const e=new Image
e.onload=()=>{t.src=r,t.classList.add("yaka-lazy-loaded"),t.classList.remove("yaka-lazy-loading")},e.src=r,t.classList.add("yaka-lazy-loading")}n.unobserve(t)}})},{rootMargin:t.rootMargin})
return this.each((e,r)=>{t.placeholder&&(r.src=t.placeholder,r.classList.add("yaka-lazy-blur")),n.observe(r)})},t.pullToRefresh=(t={})=>{const n={...{threshold:60,async onRefresh(){},element:document.body},...t}
let r=0,o=0,a=!1
const s=document.createElement("div")
s.className="yaka-pull-refresh",s.textContent="Pull to refresh",n.element.insertBefore(s,n.element.firstChild),n.element.addEventListener("touchstart",t=>{0===e.scrollY&&(r=t.touches[0].pageY,a=!0)}),n.element.addEventListener("touchmove",e=>{if(!a)return
o=e.touches[0].pageY
const t=o-r
t>0&&(e.preventDefault(),s.style.height=Math.min(t,n.threshold)+"px",n.threshold>t?(s.textContent="Pull to refresh",s.classList.remove("ready")):(s.textContent="Release to refresh",s.classList.add("ready")))}),n.element.addEventListener("touchend",async()=>{a&&(n.threshold>o-r||(s.textContent="Refreshing...",s.classList.add("refreshing"),await n.onRefresh(),s.classList.remove("refreshing","ready")),s.style.height="0",a=!1)})},t.pwa={deferredPrompt:null,onInstallable(t){e.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),this.deferredPrompt=e,t(e)})},async install(){if(!this.deferredPrompt)return console.warn("PWA install prompt not available"),!1
this.deferredPrompt.prompt()
const e=await this.deferredPrompt.userChoice
return this.deferredPrompt=null,"accepted"===e.outcome},isInstalled(){return e.matchMedia("(display-mode: standalone)").matches||!0===e.navigator.standalone}},t.onShake=(t,n={})=>{const r={threshold:15,timeout:1e3,...n}
let o=Date.now(),a=0,s=0,i=0
const l=e=>{const n=Date.now()
r.timeout>n-o||((Math.abs(e.accelerationIncludingGravity.x-a)>r.threshold||Math.abs(e.accelerationIncludingGravity.y-s)>r.threshold||Math.abs(e.accelerationIncludingGravity.z-i)>r.threshold)&&(t(),o=n),a=e.accelerationIncludingGravity.x,s=e.accelerationIncludingGravity.y,i=e.accelerationIncludingGravity.z)}
return e.addEventListener("devicemotion",l),()=>e.removeEventListener("devicemotion",l)},t.voice={recognition:null,commands:{},isListening:!1,listen(t={}){"webkitSpeechRecognition"in e||"SpeechRecognition"in e?(this.recognition=new(e.SpeechRecognition||e.webkitSpeechRecognition),this.recognition.continuous=!0,this.recognition.interimResults=!1,this.commands=t,this.recognition.onresult=e=>{const t=e.results[e.results.length-1][0].transcript.toLowerCase().trim()
if(console.log("Voice command:",t),this.commands[t])this.commands[t]()
else for(const[e,n]of Object.entries(this.commands))if(t.includes(e.toLowerCase())){n()
break}},this.recognition.onerror=e=>{console.warn("Voice recognition error:",e.error)},this.start()):console.warn("Speech recognition not supported")},start(){this.recognition&&!this.isListening&&(this.recognition.start(),this.isListening=!0)},stop(){this.recognition&&this.isListening&&(this.recognition.stop(),this.isListening=!1)}},t.prototype.cropper=function(e={}){const t={...{ratio:1,onCrop(e){}},...e}
return this.each((e,n)=>{const r=document.createElement("div")
r.className="yaka-cropper-overlay",r.innerHTML=`\n                <div class="yaka-cropper-container">\n                    <img src="${n.src}" class="yaka-cropper-image">\n                    <div class="yaka-cropper-box"></div>\n                    <div class="yaka-cropper-controls">\n                        <button class="yaka-cropper-crop">Crop</button>\n                        <button class="yaka-cropper-cancel">Cancel</button>\n                    </div>\n                </div>\n            `,document.body.appendChild(r)
const o=r.querySelector(".yaka-cropper-image"),a=r.querySelector(".yaka-cropper-box"),s=r.querySelector(".yaka-cropper-crop"),i=r.querySelector(".yaka-cropper-cancel")
a.style.cssText=`\n                width: 200px;\n                height: ${200/t.ratio}px;\n                left: 50%;\n                top: 50%;\n                transform: translate(-50%, -50%);\n            `,s.addEventListener("click",()=>{const e=document.createElement("canvas"),n=e.getContext("2d"),s=a.getBoundingClientRect(),i=o.getBoundingClientRect()
e.width=s.width,e.height=s.height,n.drawImage(o,s.left-i.left,s.top-i.top,s.width,s.height,0,0,s.width,s.height),e.toBlob(t.onCrop),r.remove()}),i.addEventListener("click",()=>{r.remove()})})},t.prototype.richEditor=function(e={}){const t={toolbar:["bold","italic","underline","link","image"],...e}
return this.each((e,n)=>{const r=document.createElement("div")
r.className="yaka-rich-editor"
const o=document.createElement("div")
o.className="yaka-rich-toolbar"
const a=document.createElement("div")
a.className="yaka-rich-content",a.contentEditable=!0,a.innerHTML=n.value||n.innerHTML,t.toolbar.forEach(e=>{const t=document.createElement("button")
t.textContent=e,t.addEventListener("click",t=>{if(t.preventDefault(),"link"===e){const e=prompt("Enter URL:")
e&&document.execCommand("createLink",!1,e)}else if("image"===e){const e=prompt("Enter image URL:")
e&&document.execCommand("insertImage",!1,e)}else document.execCommand(e,!1,null)}),o.appendChild(t)}),r.appendChild(o),r.appendChild(a),n.style.display="none",n.parentNode.insertBefore(r,n),a.addEventListener("input",()=>{"TEXTAREA"===n.tagName||"INPUT"===n.tagName?n.value=a.innerHTML:n.innerHTML=a.innerHTML})})},t.inspect={enabled:!1,overlay:null,enable(){this.enabled||(this.enabled=!0,this.overlay=document.createElement("div"),this.overlay.className="yaka-inspect-overlay",document.body.appendChild(this.overlay),document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("click",this.handleClick))},disable(){this.enabled&&(this.enabled=!1,this.overlay&&this.overlay.remove(),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("click",this.handleClick))},handleMouseMove(e){if(!t.inspect.enabled)return
const n=e.target.getBoundingClientRect()
t.inspect.overlay.style.cssText=`\n                top: ${n.top}px;\n                left: ${n.left}px;\n                width: ${n.width}px;\n                height: ${n.height}px;\n            `},handleClick(e){if(!t.inspect.enabled)return
e.preventDefault(),e.stopPropagation()
const n=e.target,r={tag:n.tagName,id:n.id,classes:Array.from(n.classList),attributes:Array.from(n.attributes).map(e=>({name:e.name,value:e.value})),yakaMethods:Object.keys(t.prototype).slice(0,10)}
console.group("🔍 Yaka Element Inspector"),console.log("Element:",n),console.log("Tag:",r.tag),console.log("ID:",r.id||"(none)"),console.log("Classes:",r.classes),console.log("Attributes:",r.attributes),console.log("Available Yaka methods:",r.yakaMethods.join(", "),"..."),console.groupEnd(),alert(`Element: ${r.tag}${r.id?"#"+r.id:""}\nClasses: ${r.classes.join(", ")}\n\nCheck console for more details.`)}},t.eyeTrack={tracking:!1,callback:null,async start(t){if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)return console.warn("getUserMedia not supported"),!1
try{const n=await navigator.mediaDevices.getUserMedia({video:!0})
this.tracking=!0,this.callback=t
const r=document.createElement("video")
r.srcObject=n,r.style.display="none",document.body.appendChild(r),r.play()
const o=()=>{if(!this.tracking)return n.getTracks().forEach(e=>e.stop()),void r.remove()
const t=Math.random()*e.innerWidth,a=Math.random()*e.innerHeight
this.callback&&this.callback(t,a),requestAnimationFrame(o)}
return o(),!0}catch(e){return console.warn("Eye tracking failed:",e),!1}},stop(){this.tracking=!1}}
const a=document.createElement("style")
a.textContent="\n        @keyframes shake {\n            0%, 100% { transform: translateX(0); }\n            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }\n            20%, 40%, 60%, 80% { transform: translateX(10px); }\n        }\n        @keyframes fall {\n            to { transform: translateY(100vh) rotate(360deg); opacity: 0; }\n        }\n        @keyframes slideIn {\n            from { transform: translateX(100%); opacity: 0; }\n            to { transform: translateX(0); opacity: 1; }\n        }\n        @keyframes slideOut {\n            from { transform: translateX(0); opacity: 1; }\n            to { transform: translateX(100%); opacity: 0; }\n        }\n        @keyframes fadeIn {\n            from { opacity: 0; }\n            to { opacity: 1; }\n        }\n        @keyframes fadeOut {\n            from { opacity: 1; }\n            to { opacity: 0; }\n        }\n        @keyframes scaleIn {\n            from { transform: scale(0.7); opacity: 0; }\n            to { transform: scale(1); opacity: 1; }\n        }\n        @keyframes float {\n            0%, 100% { transform: translateY(0) translateX(0); }\n            50% { transform: translateY(-20px) translateX(10px); }\n        }\n        @keyframes ripple-effect {\n            to { transform: scale(2); opacity: 0; }\n        }\n        @keyframes spin {\n            to { transform: rotate(360deg); }\n        }\n        @keyframes skeleton-loading {\n            0% { background-position: 200% 0; }\n            100% { background-position: -200% 0; }\n        }\n        @keyframes bounce {\n            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }\n            40% { transform: translateY(-30px); }\n            60% { transform: translateY(-15px); }\n        }\n        @keyframes swing {\n            20% { transform: rotate(15deg); }\n            40% { transform: rotate(-10deg); }\n            60% { transform: rotate(5deg); }\n            80% { transform: rotate(-5deg); }\n            100% { transform: rotate(0deg); }\n        }\n        @keyframes rubberBand {\n            0% { transform: scale(1); }\n            30% { transform: scaleX(1.25) scaleY(0.75); }\n            40% { transform: scaleX(0.75) scaleY(1.25); }\n            50% { transform: scaleX(1.15) scaleY(0.85); }\n            65% { transform: scaleX(0.95) scaleY(1.05); }\n            75% { transform: scaleX(1.05) scaleY(0.95); }\n            100% { transform: scale(1); }\n        }\n        @keyframes toastSlideIn {\n            from { transform: translateX(100%); opacity: 0; }\n            to { transform: translateX(0); opacity: 1; }\n        }\n        @keyframes toastSlideOut {\n            from { transform: translateX(0); opacity: 1; }\n            to { transform: translateX(100%); opacity: 0; }\n        }\n        @keyframes toastProgress {\n            from { width: 100%; }\n            to { width: 0%; }\n        }\n        @keyframes iconPulse {\n            0%, 100% { transform: scale(1); }\n            50% { transform: scale(1.1); }\n        }\n        \n        /* Validation styles */\n        .yaka-error {\n            border-color: #e74c3c !important;\n            box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2) !important;\n        }\n        .yaka-error-message {\n            color: #e74c3c;\n            font-size: 0.875em;\n            margin-top: 0.25rem;\n        }\n        \n        /* Loading state styles */\n        .yaka-loading {\n            opacity: 0.6;\n            cursor: wait;\n            pointer-events: none;\n        }\n        .yaka-success {\n            background-color: #2ecc71 !important;\n            color: white !important;\n        }\n        .yaka-error {\n            background-color: #e74c3c !important;\n            color: white !important;\n        }\n        \n        /* Command Palette */\n        .yaka-command-palette-overlay {\n            position: fixed;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background: rgba(0, 0, 0, 0.5);\n            display: none;\n            align-items: flex-start;\n            justify-content: center;\n            padding-top: 100px;\n            z-index: 10000;\n        }\n        .yaka-command-palette {\n            background: white;\n            border-radius: 8px;\n            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);\n            width: 600px;\n            max-width: 90%;\n            overflow: hidden;\n        }\n        .yaka-command-input {\n            width: 100%;\n            padding: 16px;\n            border: none;\n            font-size: 18px;\n            outline: none;\n            border-bottom: 1px solid #eee;\n        }\n        .yaka-command-results {\n            max-height: 400px;\n            overflow-y: auto;\n        }\n        .yaka-command-item {\n            padding: 12px 16px;\n            cursor: pointer;\n            transition: background 0.2s;\n        }\n        .yaka-command-item:hover,\n        .yaka-command-item.selected {\n            background: #f0f0f0;\n        }\n        \n        /* Tour styles */\n        .yaka-tour-overlay {\n            position: fixed;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background: rgba(0, 0, 0, 0.7);\n            z-index: 9999;\n        }\n        .yaka-tour-tooltip {\n            position: fixed;\n            background: white;\n            padding: 20px;\n            border-radius: 8px;\n            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);\n            max-width: 350px;\n            z-index: 10000;\n        }\n        .yaka-tour-text {\n            margin-bottom: 15px;\n            font-size: 15px;\n            line-height: 1.5;\n        }\n        .yaka-tour-buttons {\n            display: flex;\n            gap: 8px;\n        }\n        .yaka-tour-buttons button {\n            flex: 1;\n            padding: 8px 16px;\n            border: none;\n            border-radius: 4px;\n            cursor: pointer;\n            font-size: 14px;\n        }\n        .yaka-tour-next,\n        .yaka-tour-finish {\n            background: #3498db;\n            color: white;\n        }\n        .yaka-tour-prev,\n        .yaka-tour-skip {\n            background: #ecf0f1;\n            color: #34495e;\n        }\n        .yaka-tour-progress {\n            text-align: center;\n            margin-top: 10px;\n            font-size: 12px;\n            color: #7f8c8d;\n        }\n        \n        /* Lazy load blur effect */\n        .yaka-lazy-blur {\n            filter: blur(10px);\n            transition: filter 0.3s;\n        }\n        .yaka-lazy-loaded {\n            filter: blur(0);\n        }\n        .yaka-lazy-loading {\n            opacity: 0.7;\n        }\n        \n        /* Pull to refresh */\n        .yaka-pull-refresh {\n            height: 0;\n            overflow: hidden;\n            text-align: center;\n            padding: 10px;\n            background: #f0f0f0;\n            transition: height 0.3s;\n            font-size: 14px;\n        }\n        .yaka-pull-refresh.ready {\n            background: #3498db;\n            color: white;\n        }\n        .yaka-pull-refresh.refreshing {\n            background: #2ecc71;\n            color: white;\n        }\n        \n        /* Cropper styles */\n        .yaka-cropper-overlay {\n            position: fixed;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background: rgba(0, 0, 0, 0.9);\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            z-index: 10000;\n        }\n        .yaka-cropper-container {\n            position: relative;\n            max-width: 90%;\n            max-height: 90%;\n        }\n        .yaka-cropper-image {\n            max-width: 100%;\n            max-height: 80vh;\n        }\n        .yaka-cropper-box {\n            position: absolute;\n            border: 2px solid #3498db;\n            box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);\n            cursor: move;\n        }\n        .yaka-cropper-controls {\n            position: absolute;\n            bottom: -60px;\n            left: 50%;\n            transform: translateX(-50%);\n            display: flex;\n            gap: 10px;\n        }\n        .yaka-cropper-controls button {\n            padding: 10px 20px;\n            border: none;\n            border-radius: 4px;\n            cursor: pointer;\n            font-size: 14px;\n        }\n        .yaka-cropper-crop {\n            background: #3498db;\n            color: white;\n        }\n        .yaka-cropper-cancel {\n            background: #ecf0f1;\n            color: #34495e;\n        }\n        \n        /* Rich text editor */\n        .yaka-rich-editor {\n            border: 1px solid #ddd;\n            border-radius: 4px;\n            overflow: hidden;\n        }\n        .yaka-rich-toolbar {\n            background: #f5f5f5;\n            padding: 8px;\n            border-bottom: 1px solid #ddd;\n            display: flex;\n            gap: 5px;\n        }\n        .yaka-rich-toolbar button {\n            padding: 6px 12px;\n            border: 1px solid #ddd;\n            background: white;\n            border-radius: 3px;\n            cursor: pointer;\n            font-size: 13px;\n        }\n        .yaka-rich-toolbar button:hover {\n            background: #e0e0e0;\n        }\n        .yaka-rich-content {\n            padding: 15px;\n            min-height: 200px;\n            outline: none;\n        }\n        \n        /* Element inspector */\n        .yaka-inspect-overlay {\n            position: fixed;\n            border: 2px solid #3498db;\n            background: rgba(52, 152, 219, 0.1);\n            pointer-events: none;\n            z-index: 9999;\n        }\n    ",document.head.appendChild(a),t.prototype.add=function(e,t){return console.warn("add() is deprecated. Use addClass() instead."),this.addClass(e,t)},t.prototype.remove=function(e,t){return e?(console.warn("remove() is deprecated. Use removeClass() to remove CSS classes."),this.removeClass(e,t)):(console.warn("remove() with no arguments is deprecated. Use detach() to remove element from DOM."),this.detach())},t.prototype.toggle=function(e,t){return console.warn("toggle() is deprecated. Use toggleClass() instead."),this.toggleClass(e,t)},t.prototype.has=function(e){return console.warn("has() is deprecated. Use hasClass() instead."),this.hasClass(e)},e.Yaka=t,e._=e._||t,"undefined"!=typeof module&&module.exports&&(module.exports=t,module.exports.default=t)}("undefined"!=typeof window?window:"undefined"!=typeof global?global:globalThis)
