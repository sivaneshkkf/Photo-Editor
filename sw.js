if(!self.define){let e,i={};const r=(r,s)=>(r=new URL(r+".js",s).href,i[r]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=i,document.head.appendChild(e)}else e=r,importScripts(r),i()})).then((()=>{let e=i[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(s,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const d=e=>r(e,o),l={module:{uri:o},exports:t,require:d};i[o]=Promise.all(s.map((e=>l[e]||d(e)))).then((e=>(n(...e),t)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/browser-CNb6llKx.js",revision:null},{url:"assets/index-C-9TMltY.js",revision:null},{url:"assets/index-DZhtcMig.css",revision:null},{url:"index.html",revision:"ec17b9e24baa7063d2f77a3522770dc9"},{url:"registerSW.js",revision:"bbd2fb4db8e94f36ccf78d98f7854bc1"},{url:"android-chrome-144x144.png",revision:"eae598529d9c81e7416f0ab9fe8beb1e"},{url:"android-chrome-192x192.png",revision:"eaddf7098aa6566fa363132cf8e4ada3"},{url:"android-chrome-512x512.png",revision:"eac9c2ed6c97e33524df612a688157d3"},{url:"manifest.webmanifest",revision:"b0f51a39c5d484fbc47e438349f15221"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));