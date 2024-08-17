/*!
 * @package Autofill
 * @author T. H. Doan
 * @copyright (c) 2010-2023
 * @link https://www.tohodo.com/
 */
var Wizard;document.getElementById("autofill-wizard")||chrome.storage.local.get((function(e){if(!chrome.runtime.lastError){var t,a,n,i,s,r,l,o,d,c,u,g,p,m,f,h,b,w,C=e;t=document,a=chrome.runtime.getManifest().name,n="Backup - ",i=a+" "+chrome.i18n.getMessage("wizardUpdateAlert"),s=t.createElement("div"),r=t.createElement("input"),l=t.createElement("datalist"),o=t.createElement("select"),d=t.createElement("button"),c=t.createElement("b"),u=[{k:"all",n:chrome.i18n.getMessage("optionsProfilesMenuAll")},{k:"",n:chrome.i18n.getMessage("optionsProfilesMenuUnfiled")}],g=C.catnow>2?C.catnow-4:0,p=" ("+chrome.i18n.getMessage("optionsProfilesMenuActive")+")",m=chrome.i18n.getMessage("buttonsGenerateRules"),f=chrome.i18n.getMessage("buttonsGenerateRulesTT"),h="af-",b=navigator.userAgent.toLowerCase().indexOf("firefox")>-1,w=chrome.runtime.connect({name:"wizard"}),chrome.storage.onChanged.addListener((function(e){for(var t in e)C[t]=e[t].newValue})),w.onDisconnect.addListener((function(){w=void 0})),(Wizard={addCat:function(){if(!Wizard.disconnected()){var e=(prompt(chrome.i18n.getMessage("promptProfileName")+":")||"").trim();if(e)if(e.length>60)alert("["+a+"] "+chrome.i18n.getMessage("statusProfileCharLimit")),o.selectedIndex=g;else if(/^(all|unfiled|manage\.\.\.|new\.\.\.)$/i.test(e)||0===e.indexOf(n)||0===e.indexOf("——"))alert("["+a+"] "+chrome.i18n.getMessage("statusProfileReserved")),o.selectedIndex=g;else{for(var t=0;t<u.length;++t)if(u[t].n===e)return alert("["+a+"] "+chrome.i18n.getMessage("statusProfileDuplicate")),void(o.selectedIndex=g);Wizard.sendMessage({type:"saveCat",data:{cat:{n:e}}})}else o.selectedIndex=g}},close:function(){s.setAttribute("style","transform:translateY(-150%)!important"),Wizard.disconnected()||(Wizard.sendMessage({type:"clearHighlight"}),t.removeEventListener("keydown",Wizard.handleKeyDown),w.disconnect(),setTimeout((function(){s.parentNode.removeChild(s)}),400))},create:function(){Wizard.setStatus(void 0,chrome.i18n.getMessage("statusGenerating")),Wizard.sendMessage({type:"gatherRules",data:o.value})},disconnected:function(){return!w&&(alert(i),!0)},exeCat:function(e){e.preventDefault();var t=l.querySelector('[value="'+(this.value||r.value)+'"]');t&&!t.executing&&(t.executing=!0,Wizard.sendMessage({type:"executeRules",data:{catnow:+t.getAttribute("data-ci")}},(function(e){Wizard.resetDL(),delete t.executing,setTimeout((function(){C.other.closeinfobar&&1!==C.closeinfobar&&Wizard.close()}),2500)})))},popCats:function(e,a){var i,s="gen"===a;if(u.length=2,u=u.concat(C.cats),s){u.push({k:"new",n:chrome.i18n.getMessage("optionsProfilesMenuNew")}),e.length=0;for(var l=1;l<u.length;++l)if(0!==u[l].n.indexOf(n)){if(C.other.filtercats&&u[l].s&&!new RegExp(u[l].s,"im").test(AF_WIZARD.siteHaystack))continue;(i=t.createElement("option")).value=u[l].k,i.text=u[l].n,l===g+1?i.selected=!0:l===u.length-1&&(i.className=h+"menu-action"),e.add(i)}}else{var o;for(e.innerHTML="",l=0;l<u.length;++l)if(0!==u[l].n.indexOf(n)){if(C.other.filtercats&&u[l].s&&!new RegExp(u[l].s,"im").test(AF_WIZARD.siteHaystack))continue;o=l>1?l+3:l+1,(i=t.createElement("option")).value=u[l].n,i.setAttribute("data-ci",o),o===C.catnow?(i.value+=p,i.value===r.value+p&&(r.value+=p)):i.value+p===r.value&&(r.value=r.value.replace(p,""),Wizard.resetDL()),e.appendChild(i)}}},resetDL:function(){r.blur(),setTimeout((function(){r.focus()}),50)},selCat:function(){"new"===this.value?Wizard.addCat():g=this.selectedIndex},sendMessage:function(e,a,n){try{chrome.runtime.sendMessage(e,"function"==typeof a?a:function(e){chrome.runtime.lastError})}catch(e){n&&"beforeunload"===n.type||!t.getElementById("autofill-wizard")||alert(i)}},setStatus:function(e,t){isNaN(e)?(c.className="",c.textContent=t||""):(c.className=h+(e?"warning":"success"),c.textContent=t)},show:function(){var e="autofill-wizard",n=t.createElement("table"),i=t.createElement("tr"),u=t.createElement("td"),g=t.createElement("td"),p=t.createElement("td"),C=t.createElement("input"),z=t.createElement("div"),M=t.createElement("button"),v=t.createElement("form"),W=t.createElement("div"),x=t.createElement("button"),A=t.createElement("fieldset"),E=t.createElement("span"),y=t.createElement("span"),R=t.createElement("span"),L=t.createElement("button"),T="gen"===window.AF_WIZARD.type;if(s.id=e,s.onselectstart=function(){return!1},C.type="image",C.src=chrome.runtime.getURL("images/icon24.png"),C.className=h+"reset",C.alt=a+" logo",C.title=a+"\n"+chrome.i18n.getMessage("wizardTT"),C.width=24,C.height=24,C.setAttribute("role","link"),C.onclick=function(){Wizard.sendMessage({type:"openOptions"})},z.id=e+"-exe",T&&(z.className=h+"off"),M.id=e+"-exe-label",M.className="af-label af-reset",M.textContent=chrome.i18n.getMessage("generalExecute"),M.title=chrome.i18n.getMessage(T?"generalExpand":"generalCollapse"),M.setAttribute("aria-controls",e+"-exe-content"),M.setAttribute("aria-expanded",T?"false":"true"),M.onclick=Wizard.toggle,v.id=e+"-exe-content",v.className=h+"toggle",v.setAttribute("role","region"),v.setAttribute("aria-labelledby",e+"-exe-label"),v.onsubmit=Wizard.exeCat,r.type="search",r.placeholder=chrome.i18n.getMessage("wizardSearchProfiles"),r.title=chrome.i18n.getMessage("wizardSearchProfilesTT"),r.setAttribute("list",e+"-profiles"),r.required=!0,r.oninput=Wizard.exeCat,Wizard.popCats(l,"exe"),l.id=e+"-profiles",W.id=e+"-gen",T||(W.className=h+"off"),x.id=e+"-gen-label",x.className="af-label af-reset",x.textContent=chrome.i18n.getMessage("wizardGen"),x.title=chrome.i18n.getMessage(T?"generalCollapse":"generalExpand"),x.setAttribute("aria-controls",e+"-gen-content"),x.setAttribute("aria-expanded",T?"true":"false"),x.onclick=Wizard.toggle,A.id=e+"-gen-content",A.className=h+"toggle",A.setAttribute("role","region"),A.setAttribute("aria-labelledby",e+"-gen-label"),E.id=e+"-step1",E.innerHTML="<b>&#10122;</b> "+chrome.i18n.getMessage(window.AF_WIZARD.editable?"wizardFillField":"wizardFillForm"),y.id=e+"-step2",y.innerHTML="<b>&#10123;</b> "+chrome.i18n.getMessage("wizardChooseProfile")+": ",R.id=e+"-step3",R.innerHTML="<b>&#10124;</b> ",Wizard.popCats(o,"gen"),o.title=chrome.i18n.getMessage("wizardChooseProfileTT"),o.onchange=Wizard.selCat,y.appendChild(o),d.id=e+"-create",d.textContent=window.AF_WIZARD.editable?m.replace("Rules","Rule"):m,d.title=window.AF_WIZARD.editable?f.replace("rules","rule"):f,d.onclick=Wizard.create,R.appendChild(d),c.id=e+"-status",L.id=e+"-close",L.className=h+"reset",L.textContent=" ",L.title=chrome.i18n.getMessage("buttonsClose"),L.onclick=Wizard.close,u.appendChild(C),v.appendChild(r),v.appendChild(l),b){var D=t.createElement("button");D.type="reset",D.className="reset",D.title=chrome.i18n.getMessage("buttonsClearTT"),D.innerHTML="&times;",v.appendChild(D),v.onreset=function(){r.focus()}}z.appendChild(M),z.appendChild(v),g.appendChild(z),A.appendChild(E),A.appendChild(y),A.appendChild(R),A.appendChild(c),W.appendChild(x),W.appendChild(A),g.appendChild(W),p.appendChild(L),i.appendChild(u),i.appendChild(g),i.appendChild(p),n.appendChild(i),s.appendChild(n),t.body.appendChild(s),setTimeout((function(){s.setAttribute("style","transform:inherit!important"),T?o.focus():r.focus()}),50),t.addEventListener("keydown",Wizard.handleKeyDown),w.onMessage.addListener(Wizard.handleMessage)},toggle:function(){if(!Wizard.disconnected()){var e=this.parentNode;e.classList.toggle(h+"off"),e.classList.contains(h+"off")?(this.title=chrome.i18n.getMessage("generalExpand"),this.setAttribute("aria-expanded","false")):(e.contains(r)?r.focus():e.contains(o)&&o.focus(),this.title=chrome.i18n.getMessage("generalCollapse"),this.setAttribute("aria-expanded","true"))}},updateCats:function(){g=Math.max(C.catnow-4,0),Wizard.popCats(l,"exe"),Wizard.popCats(o,"gen")},updateText:function(){t.getElementById("autofill-wizard-step1").innerHTML="<b>&#10122;</b> "+chrome.i18n.getMessage("wizardFill"+(window.AF_WIZARD.editable?"Field":"Form")),d.innerHTML=window.AF_WIZARD.editable?m.replace("Rules","Rule"):m,d.title=window.AF_WIZARD.editable?f.replace("rules","rule"):f,Wizard.setStatus(),"gen"===window.AF_WIZARD.type&&(t.getElementById("autofill-wizard-exe").classList.add(h+"off"),t.getElementById("autofill-wizard-gen").classList.remove(h+"off"),o.focus())},handleKeyDown:function(e){"Escape"===e.key&&Wizard.close()},handleMessage:function(e){if("gotRules"===e.type){var a=e.data,n=["elric","jeannie","merlin","sabrina","samantha","simon"];if(a.length){var i=t.querySelector("#autofill-wizard-step3>button");i.disabled=!0,Wizard.sendMessage({type:"saveRules",data:{rules:a}}),Wizard.setStatus(0,chrome.i18n.getMessage("statusDone")),C.other.voice&&new Audio(chrome.runtime.getURL("sounds/"+n[C.voice<6?C.voice:R(0,5)]+".ogg")).play(),setTimeout((function(){C.other.closeinfobar&&C.closeinfobar>0?Wizard.close():(Wizard.setStatus(),i.disabled=!1)}),2500)}else Wizard.setStatus(1,e.field?chrome.i18n.getMessage("statusEnterValue"):chrome.i18n.getMessage("statusNoChange")),C.other.voice&&new Audio(chrome.runtime.getURL("sounds/"+n[C.voice<6?C.voice:R(0,5)]+"-err.ogg")).play()}}}).show()}}));
