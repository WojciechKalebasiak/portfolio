function onePageScroll(element,options){var defaults={sectionContainer:"section",easing:"ease",animationTime:1e3,pagination:true,updateURL:false,keyboard:true,beforeMove:null,afterMove:null,loop:false,responsiveFallback:false},_root=this,settings=Object.extend({},defaults,options),el=document.querySelector(element),sections=document.querySelectorAll(settings.sectionContainer),total=sections.length,status="off",topPos=0,lastAnimation=0,quietPeriod=500,paginationList="",body=document.querySelector("body");this.init=function(){_addClass(el,"onepage-wrapper");el.style.position="relative";for(var i=0;i<sections.length;i++){_addClass(sections[i],"ops-section");sections[i].dataset.index=i+1;topPos=topPos+100;if(settings.pagination==true){paginationList+="<li><a data-index='"+(i+1)+"' href='#"+(i+1)+"'></a></li>"}}_swipeEvents(el);document.addEventListener("swipeDown",function(event){if(!_hasClass(body,"disabled-onepage-scroll"))event.preventDefault();moveUp(el)});document.addEventListener("swipeUp",function(event){if(!_hasClass(body,"disabled-onepage-scroll"))event.preventDefault();moveDown(el)});if(settings.pagination==true){var pagination=document.createElement("ul");pagination.setAttribute("class","onepage-pagination");body.appendChild(pagination);pagination.innerHTML=paginationList;var posTop=document.querySelector(".onepage-pagination").offsetHeight/2*-1;document.querySelector(".onepage-pagination").style.marginTop=posTop}if(window.location.hash!=""&&window.location.hash!="#1"){var init_index=window.location.hash.replace("#",""),next=document.querySelector(settings.sectionContainer+"[data-index='"+init_index+"']"),next_index=next.dataset.index;_addClass(document.querySelector(settings.sectionContainer+"[data-index='"+init_index+"']"),"active");_addClass(body,"viewing-page-"+init_index);if(settings.pagination==true)_addClass(document.querySelector(".onepage-pagination li a"+"[data-index='"+init_index+"']"),"active");if(next){_addClass(next,"active");if(settings.pagination==true)_addClass(document.querySelector(".onepage-pagination li a"+"[data-index='"+init_index+"']"),"active");body.className=body.className.replace(/\bviewing-page-\d.*?\b/g,"");_addClass(body,"viewing-page-"+next_index);if(history.replaceState&&settings.updateURL==true){var href=window.location.href.substr(0,window.location.href.indexOf("#"))+"#"+init_index;history.pushState({},document.title,href)}}var pos=(init_index-1)*100*-1;_transformPage(el,settings,pos,init_index)}else{_addClass(document.querySelector(settings.sectionContainer+"[data-index='1']"),"active");_addClass(body,"viewing-page-1");if(settings.pagination==true)_addClass(document.querySelector(".onepage-pagination li a[data-index='1']"),"active")}_paginationHandler=function(){var page_index=this.dataset.index;moveTo(el,page_index)};if(settings.pagination==true){var pagination_links=document.querySelectorAll(".onepage-pagination li a");for(var i=0;i<pagination_links.length;i++){pagination_links[i].addEventListener("click",_paginationHandler)}}_mouseWheelHandler=function(event){event.preventDefault();var delta=event.wheelDelta||-event.detail;if(!_hasClass(body,"disabled-onepage-scroll"))_init_scroll(event,delta)};document.addEventListener("mousewheel",_mouseWheelHandler);document.addEventListener("DOMMouseScroll",_mouseWheelHandler);if(settings.responsiveFallback!=false){window.onresize=function(){_responsive()};_responsive()}_keydownHandler=function(e){var tag=e.target.tagName.toLowerCase();if(!_hasClass(body,"disabled-onepage-scroll")){switch(e.which){case 38:if(tag!="input"&&tag!="textarea")moveUp(el);break;case 40:if(tag!="input"&&tag!="textarea")moveDown(el);break;default:return}}return false};if(settings.keyboard==true){document.onkeydown=_keydownHandler}return false};_swipeEvents=function(el){var startX,startY;document.addEventListener("touchstart",touchstart);function touchstart(event){var touches=event.touches;if(touches&&touches.length){startX=touches[0].pageX;startY=touches[0].pageY;document.addEventListener("touchmove",touchmove)}}function touchmove(event){var touches=event.touches;if(touches&&touches.length){event.preventDefault();var deltaX=startX-touches[0].pageX;var deltaY=startY-touches[0].pageY;if(deltaX>=50){var event=new Event("swipeLeft");document.dispatchEvent(event)}if(deltaX<=-50){var event=new Event("swipeRight");document.dispatchEvent(event)}if(deltaY>=50){var event=new Event("swipeUp");document.dispatchEvent(event)}if(deltaY<=-50){var event=new Event("swipeDown");document.dispatchEvent(event)}if(Math.abs(deltaX)>=50||Math.abs(deltaY)>=50){document.removeEventListener("touchmove",touchmove)}}}};_trim=function(str){return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"")};_hasClass=function(ele,cls){if(ele.className){return ele.className.match(new RegExp("(\\s|^)"+cls+"(\\s|$)"))}else{return ele.className=cls}};_addClass=function(ele,cls){if(!_hasClass(ele,cls))ele.className+=" "+cls;ele.className=_trim(ele.className)};_removeClass=function(ele,cls){if(_hasClass(ele,cls)){var reg=new RegExp("(\\s|^)"+cls+"(\\s|$)");ele.className=ele.className.replace(reg," ")}ele.className=_trim(ele.className)};_whichTransitionEvent=function(){var t;var el=document.createElement("fakeelement");var transitions={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in transitions){if(el.style[t]!==undefined){return transitions[t]}}};_scrollTo=function(element,to,duration){if(duration<0)return;var difference=to-element.scrollTop;var perTick=difference/duration*10;setTimeout(function(){element.scrollTop=element.scrollTop+perTick;if(element.scrollTop==to)return;_scrollTo(element,to,duration-10)},10)};_transformPage=function(el2,settings,pos,index,next_el){if(typeof settings.beforeMove=="function")settings.beforeMove(index,next_el);var transformCSS="-webkit-transform: translate3d(0, "+pos+"%, 0); -webkit-transition: -webkit-transform "+settings.animationTime+"ms "+settings.easing+"; -moz-transform: translate3d(0, "+pos+"%, 0); -moz-transition: -moz-transform "+settings.animationTime+"ms "+settings.easing+"; -ms-transform: translate3d(0, "+pos+"%, 0); -ms-transition: -ms-transform "+settings.animationTime+"ms "+settings.easing+"; transform: translate3d(0, "+pos+"%, 0); transition: transform "+settings.animationTime+"ms "+settings.easing+";";el2.style.cssText=transformCSS;var transitionEnd=_whichTransitionEvent();el2.addEventListener(transitionEnd,endAnimation,false);function endAnimation(){if(typeof settings.afterMove=="function")settings.afterMove(index,next_el);el2.removeEventListener(transitionEnd,endAnimation)}};_responsive=function(){if(document.body.clientWidth<settings.responsiveFallback){_addClass(body,"disabled-onepage-scroll");document.removeEventListener("mousewheel",_mouseWheelHandler);document.removeEventListener("DOMMouseScroll",_mouseWheelHandler);_swipeEvents(el);document.removeEventListener("swipeDown");document.removeEventListener("swipeUp")}else{if(_hasClass(body,"disabled-onepage-scroll")){_removeClass(body,"disabled-onepage-scroll");_scrollTo(document.documentElement,0,2e3)}_swipeEvents(el);document.addEventListener("swipeDown",function(event){if(!_hasClass(body,"disabled-onepage-scroll"))event.preventDefault();moveUp(el)});document.addEventListener("swipeUp",function(event){if(!_hasClass(body,"disabled-onepage-scroll"))event.preventDefault();moveDown(el)});document.addEventListener("mousewheel",_mouseWheelHandler);document.addEventListener("DOMMouseScroll",_mouseWheelHandler)}};_init_scroll=function(event,delta){var deltaOfInterest=delta,timeNow=(new Date).getTime();if(timeNow-lastAnimation<quietPeriod+settings.animationTime){event.preventDefault();return}if(deltaOfInterest<0){moveDown(el)}else{moveUp(el)}lastAnimation=timeNow};this.moveDown=function(el3){if(typeof el3=="string")el3=document.querySelector(el3);var index=document.querySelector(settings.sectionContainer+".active").dataset.index,current=document.querySelector(settings.sectionContainer+"[data-index='"+index+"']"),next=document.querySelector(settings.sectionContainer+"[data-index='"+(parseInt(index)+1)+"']");if(!next){if(settings.loop==true){pos=0;next=document.querySelector(settings.sectionContainer+"[data-index='1']")}else{return}}else{pos=index*100*-1}var next_index=next.dataset.index;_removeClass(current,"active");_addClass(next,"active");if(settings.pagination==true){_removeClass(document.querySelector(".onepage-pagination li a"+"[data-index='"+index+"']"),"active");_addClass(document.querySelector(".onepage-pagination li a"+"[data-index='"+next_index+"']"),"active")}body.className=body.className.replace(/\bviewing-page-\d.*?\b/g,"");_addClass(body,"viewing-page-"+next_index);if(history.replaceState&&settings.updateURL==true){var href=window.location.href.substr(0,window.location.href.indexOf("#"))+"#"+(parseInt(index)+1);history.pushState({},document.title,href)}_transformPage(el3,settings,pos,next_index,next)};this.moveUp=function(el4){if(typeof el4=="string")el4=document.querySelector(el4);var index=document.querySelector(settings.sectionContainer+".active").dataset.index,current=document.querySelector(settings.sectionContainer+"[data-index='"+index+"']"),next=document.querySelector(settings.sectionContainer+"[data-index='"+(parseInt(index)-1)+"']");if(!next){if(settings.loop==true){pos=(total-1)*100*-1;next=document.querySelector(settings.sectionContainer+"[data-index='"+total+"']")}else{return}}else{pos=(next.dataset.index-1)*100*-1}var next_index=next.dataset.index;_removeClass(current,"active");_addClass(next,"active");if(settings.pagination==true){_removeClass(document.querySelector(".onepage-pagination li a"+"[data-index='"+index+"']"),"active");_addClass(document.querySelector(".onepage-pagination li a"+"[data-index='"+next_index+"']"),"active")}body.className=body.className.replace(/\bviewing-page-\d.*?\b/g,"");_addClass(body,"viewing-page-"+next_index);if(history.replaceState&&settings.updateURL==true){var href=window.location.href.substr(0,window.location.href.indexOf("#"))+"#"+(parseInt(index)-1);history.pushState({},document.title,href)}_transformPage(el4,settings,pos,next_index,next)};this.moveTo=function(el5,page_index){if(typeof el5=="string")el5=document.querySelector(el5);var current=document.querySelector(settings.sectionContainer+".active"),next=document.querySelector(settings.sectionContainer+"[data-index='"+page_index+"']");if(next){var next_index=next.dataset.index;_removeClass(current,"active");_addClass(next,"active");if(settings.pagination){_removeClass(document.querySelector(".onepage-pagination li a"+".active"),"active");_addClass(document.querySelector(".onepage-pagination li a"+"[data-index='"+page_index+"']"),"active")}body.className=body.className.replace(/\bviewing-page-\d.*?\b/g,"");_addClass(body,"viewing-page-"+next_index);pos=(page_index-1)*100*-1;if(history.replaceState&&settings.updateURL==true){var href=window.location.href.substr(0,window.location.href.indexOf("#"))+"#"+(parseInt(page_index)-1);history.pushState({},document.title,href)}_transformPage(el5,settings,pos,page_index,next)}};this.init()}Object.extend=function(orig){if(orig==null)return orig;for(var i=1;i<arguments.length;i++){var obj=arguments[i];if(obj!=null){for(var prop in obj){var getter=obj.__lookupGetter__(prop),setter=obj.__lookupSetter__(prop);if(getter||setter){if(getter)orig.__defineGetter__(prop,getter);if(setter)orig.__defineSetter__(prop,setter)}else{orig[prop]=obj[prop]}}}}return orig};"use strict";document.addEventListener("DOMContentLoaded",function(){var menuColors=["#49c8a7","#c84949","#c89049","#bdc849","#49c87d","#497cc8","#6a49c8","#ad49c8","#c849b6","#c84978"];var jumbotronArrow=document.getElementById("jumbotronArrow");var nav=document.getElementsByTagName("nav")[0];var menuToggler=document.getElementById("menu-toggler");var backdrop=document.getElementById("backdrop");var navLinks=document.getElementsByClassName("nav-link");var prevButton=document.getElementById("prevButton");var nextButton=document.getElementById("nextButton");var slide=document.getElementById("slide");var projects=document.getElementsByClassName("project");var counter=1;slide.style.transform="translateX("+-100*counter+"%)";nextButton.addEventListener("click",function(){if(counter>=7){return}counter++;slide.style.transition="transform .3s ease-in";slide.style.transform="translateX("+-100*counter+"%)"});prevButton.addEventListener("click",function(){if(counter<=0){return}counter--;slide.style.transition="transform .3s ease-in";slide.style.transform="translateX("+-100*counter+"%)"});slide.addEventListener("transitionend",function(){if(projects[counter].id==="fristClone"){counter=1;slide.style.transition="none";slide.style.transform="translateX("+-100*counter+"%)"}if(projects[counter].id==="lastClone"){counter=projects.length-2;slide.style.transition="none";slide.style.transform="translateX("+-100*counter+"%)"}});var _loop=function _loop(i){navLinks[i].addEventListener("click",function(){moveTo(".main",i+2);closeMenu()})};for(var i=0;i<navLinks.length;i++){_loop(i)}jumbotronArrow.addEventListener("click",function(){moveDown(".main")});function closeMenu(){var BackdropAnimation=backdrop.animate([{opacity:.8,backgroundColor:"#000"},{opacity:0,backgroundColor:"#000"}],{duration:500});BackdropAnimation.onfinish=function(){backdrop.classList.remove("toggled")};nav.classList.remove("toggled");nav.style.backgroundColor="#3f3e3e";menuToggler.classList.remove("fa-times");menuToggler.classList.add("fa-bars")}function openMenu(){nav.classList.add("toggled");nav.style.backgroundColor=menuColors[Math.floor(Math.random()*10)];backdrop.classList.add("toggled");menuToggler.classList.remove("fa-bars");menuToggler.classList.add("fa-times")}menuToggler.addEventListener("click",function(){if(nav.classList.contains("toggled")){closeMenu()}else{openMenu()}});backdrop.addEventListener("click",function(){if(nav.classList.contains("toggled")){closeMenu()}});var technologies=document.getElementsByClassName("logo-tech-wrapper");var contactLinks=document.querySelectorAll(".contact a");var techAlreadyShowed=false;var contactAlreadyShowed=false;onePageScroll(".main",{sectionContainer:"section",animationTime:500,pagination:false,updateURL:false,loop:true,keyboard:true,responsiveFallback:false,afterMove:function afterMove(index){if(index==2&&!contactAlreadyShowed){for(var i=0;i<contactLinks.length;i++){contactLinks[i].style.transition="opacity .5s ease "+(500+i*250)+"ms";contactLinks[i].style.opacity=1}contactAlreadyShowed=true}if(index==3&&!techAlreadyShowed){for(var _i=0;_i<technologies.length;_i++){technologies[_i].style.transition="opacity .5s ease "+(250+_i*200)+"ms";technologies[_i].style.opacity=1}techAlreadyShowed=true}}})});