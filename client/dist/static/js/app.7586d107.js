(function(e){function t(t){for(var r,a,i=t[0],u=t[1],s=t[2],f=0,l=[];f<i.length;f++)a=i[f],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&l.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);h&&h(t);while(l.length)l.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(r=!1)}r&&(c.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},a={app:0},o={app:0},c=[];function i(e){return u.p+"static/js/"+({}[e]||e)+"."+{"chunk-07d8ecca":"c4d1c01f","chunk-0bbfc7d4":"6630d346","chunk-14a1f11f":"2d7c7cea","chunk-12822d5a":"59dcf942","chunk-558037e6":"3b562f92","chunk-dbee805e":"34ce5bba"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-07d8ecca":1,"chunk-0bbfc7d4":1,"chunk-14a1f11f":1,"chunk-12822d5a":1,"chunk-558037e6":1,"chunk-dbee805e":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="static/css/"+({}[e]||e)+"."+{"chunk-07d8ecca":"98704052","chunk-0bbfc7d4":"56c562bd","chunk-14a1f11f":"752952ca","chunk-12822d5a":"9b3919e1","chunk-558037e6":"95ae1c37","chunk-dbee805e":"50f5b462"}[e]+".css",o=u.p+r,c=document.getElementsByTagName("link"),i=0;i<c.length;i++){var s=c[i],f=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(f===r||f===o))return t()}var l=document.getElementsByTagName("style");for(i=0;i<l.length;i++){s=l[i],f=s.getAttribute("data-href");if(f===r||f===o)return t()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=t,h.onerror=function(t){var r=t&&t.target&&t.target.src||o,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete a[e],h.parentNode.removeChild(h),n(c)},h.href=o;var d=document.getElementsByTagName("head")[0];d.appendChild(h)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=c);var s,f=document.createElement("script");f.charset="utf-8",f.timeout=120,u.nc&&f.setAttribute("nonce",u.nc),f.src=i(e);var l=new Error;s=function(t){f.onerror=f.onload=null,clearTimeout(h);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",l.name="ChunkLoadError",l.type=r,l.request=a,n[1](l)}o[e]=void 0}};var h=setTimeout((function(){s({type:"timeout",target:f})}),12e4);f.onerror=f.onload=s,document.head.appendChild(f)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],f=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var h=f;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},o=[],c={name:"App"},i=c,u=(n("5c0b"),n("2877")),s=Object(u["a"])(i,a,o,!1,null,null,null),f=s.exports,l=(n("b0c0"),n("d3b7"),n("ac1f"),n("5319"),n("8c4f")),h=n("2f62"),d=n("ade3"),p=n("bc3a"),m=n.n(p),g=m.a.create({baseURL:"/api",timeout:5e3});g.defaults.headers.post["Content-Type"]="application/json";var b,v,E,O=g,S={login:function(e,t){return O.post("/login/",{username:e,password:t})},logout:function(){return O.post("/logout/",{})},createAccount:function(e,t,n){return O.post("/register/",{username:e,password:t,passwordConfirmation:n})},getArticle:function(e){return O.get("/search/",{params:{keys:e}})}},k="LOGIN_BEGIN",y="LOGIN_FAILURE",A="LOGIN_SUCCESS",j="LOGOUT",_="REGISTRATION_BEGIN",C="REGISTRATION_CLEAR",L="REGISTRATION_FAILURE",I="REGISTRATION_SUCCESS",T="SEARCH_BEGIN",w="SEARCH_CLEAR",R="SEARCH_FAILURE",N="SEARCH_SUCCESS",P="SET_TOKEN",G="UPDATE_TOKEN",U="REMOVE_TOKEN",x="SET_USER",B="TOKEN_STORAGE_KEY",D="USER_NAME",H={authenticating:!1,error:!1,token:null,user:{name:""}},K={isAuthenticated:function(e){return!!e.token},userInfo:function(e){return e.user}},M={login:function(e,t){var n=e.commit,r=t.username,a=t.password;return n(k),S.login(r,a).then((function(e){n(P,e.data.token),n(x,e.data.user)})).then((function(){return n(A)})).catch((function(e){console.log(e),n(y)}))},logout:function(e){var t=e.commit;return S.logout().then((function(){return t(j)})).finally((function(){return t(U)}))},initialize:function(e){var t=e.commit,n=sessionStorage.getItem(B);n&&t(P,n);var r=sessionStorage.getItem(D);r&&t(x,{name:r})},update:function(e){var t=e.commit;t(G)}},z=(b={},Object(d["a"])(b,k,(function(e){e.authenticating=!0,e.error=!1})),Object(d["a"])(b,y,(function(e){e.authenticating=!1,e.error=!0})),Object(d["a"])(b,A,(function(e){e.authenticating=!1,e.error=!1})),Object(d["a"])(b,j,(function(e){e.authenticating=!1,e.error=!1})),Object(d["a"])(b,P,(function(e,t){sessionStorage.setItem(B,t),O.defaults.headers.Authorization="token ".concat(t),e.token=t})),Object(d["a"])(b,G,(function(e){var t=sessionStorage.getItem(B);e.token=t})),Object(d["a"])(b,U,(function(e){sessionStorage.removeItem(B),delete O.defaults.headers.Authorization,e.token=null,sessionStorage.removeItem(D),e.user.name=""})),Object(d["a"])(b,x,(function(e,t){var n=t.name;e.user={name:n},sessionStorage.setItem(D,n)})),b),F={namespaced:!0,state:H,getters:K,actions:M,mutations:z},q={registrationCompleted:!1,registrationError:!1,registrationLoading:!1},J={createAccount:function(e,t){var n=e.commit,r=t.username,a=t.password,o=t.passwordConfirmation;return n(_),S.createAccount(r,a,o).then((function(e){console.log(e.data),n(I)})).catch((function(){return n(L)}))},clearRegistrationStatus:function(e){var t=e.commit;t(C)}},$=(v={},Object(d["a"])(v,_,(function(e){e.registrationLoading=!0})),Object(d["a"])(v,C,(function(e){e.registrationCompleted=!1,e.registrationError=!1,e.registrationLoading=!1})),Object(d["a"])(v,L,(function(e){e.registrationError=!0,e.registrationLoading=!1})),Object(d["a"])(v,I,(function(e){e.registrationCompleted=!0,e.registrationError=!1,e.registrationLoading=!1})),v),V={namespaced:!0,state:q,actions:J,mutations:$},Y={searchCompleted:!1,searchError:!1,searchLoading:!1,searchData:{articles:[],time:""}},Q={getArticle:function(e,t){var n=e.commit;return n(T),S.getArticle(t).then((function(e){n(N),Y.searchData=e.data,Y.searchData.articles.sort((function(e,t){return t["times"]-e["times"]}))})).catch((function(){return R}))},clearSearchStatus:function(e){var t=e.commit;t(w)}},W=(E={},Object(d["a"])(E,T,(function(e){e.searchLoading=!0})),Object(d["a"])(E,w,(function(e){e.searchCompleted=!1,e.searchError=!1,e.searchLoading=!1})),Object(d["a"])(E,R,(function(e){e.searchError=!0,e.searchLoading=!1})),Object(d["a"])(E,N,(function(e){e.searchCompleted=!0,e.searchError=!1,e.searchLoading=!1})),E),X={namespaced:!0,state:Y,actions:Q,mutations:W};r["a"].use(h["a"]);var Z=new h["a"].Store({modules:{auth:F,register:V,search:X}}),ee=l["a"].prototype.replace;l["a"].prototype.replace=function(e){return ee.call(this,e).catch((function(e){return e}))};var te=l["a"].prototype.push;l["a"].prototype.push=function(e){return te.call(this,e).catch((function(e){return e}))};var ne=n.e("chunk-12822d5a").then(n.bind(null,"bb51")),re=Promise.all([n.e("chunk-07d8ecca"),n.e("chunk-0bbfc7d4")]).then(n.bind(null,"a55b")),ae=n.e("chunk-558037e6").then(n.bind(null,"2d3b")),oe=Promise.all([n.e("chunk-07d8ecca"),n.e("chunk-14a1f11f")]).then(n.bind(null,"73cf")),ce=n.e("chunk-dbee805e").then(n.bind(null,"3ad6"));r["a"].use(l["a"]);var ie=function(e,t,n){Z.dispatch("auth/initialize").then((function(){Z.getters["auth/isAuthenticated"]?n():n("/home/login")}))},ue=function(e,t,n){Z.dispatch("auth/initialize").then((function(){Z.getters["auth/isAuthenticated"]?n("/home"):n()}))},se=[{path:"/",redirect:"/home"},{path:"/home",name:"Home",component:function(){return ne},children:[{path:"search",name:"Search",component:function(){return ae},beforeEnter:ie},{path:"login",name:"Login",component:function(){return re},beforeEnter:ue},{path:"register",name:"Register",component:function(){return oe}},{path:"article",name:"Article",component:function(){return ce},beforeEnter:ie}]},{name:"Lost",path:"*"}],fe=new l["a"]({mode:"history",base:"/",routes:se});fe.beforeEach((function(e,t,n){document.title=e.matched[0].name,n()}));var le=fe;r["a"].config.productionTip=!1,new r["a"]({router:le,store:Z,render:function(e){return e(f)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var r=n("9c0c"),a=n.n(r);a.a},"9c0c":function(e,t,n){}});
//# sourceMappingURL=app.7586d107.js.map