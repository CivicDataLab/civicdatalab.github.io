(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"8ujH":function(e,r,t){var n=t("GTTd")("jsonp");e.exports=function(e,r,t){"function"==typeof r&&(t=r,r={});r||(r={});var i,s,c=r.prefix||"__jp",u=r.name||c+o++,l=r.param||"callback",d=null!=r.timeout?r.timeout:6e4,f=encodeURIComponent,m=document.getElementsByTagName("script")[0]||document.head;d&&(s=setTimeout((function(){p(),t&&t(new Error("Timeout"))}),d));function p(){i.parentNode&&i.parentNode.removeChild(i),window[u]=a,s&&clearTimeout(s)}return window[u]=function(e){n("jsonp got",e),p(),t&&t(null,e)},e=(e+=(~e.indexOf("?")?"&":"?")+l+"="+f(u)).replace("?&","?"),n('jsonp req "%s"',e),(i=document.createElement("script")).src=e,m.parentNode.insertBefore(i,m),function(){window[u]&&p()}};var o=0;function a(){}},E3LA:function(e,r,t){"use strict";t.r(r);var n=t("q1tI"),o=t.n(n),a=t("vOnD"),i=t("G04T"),s=t.n(i);const c=a.default.form.withConfig({displayName:"SubscribeForm__FormContainer",componentId:"sc-14doogr-0"})(["display:flex;flex-direction:column;gap:0.5rem;width:30%;padding:1rem;margin:0 auto;border-radius:0.5rem;box-shadow:0 4px 6px rgba(0,0,0,0.1);@media (max-width:720px){width:80%;}"]),u=a.default.input.withConfig({displayName:"SubscribeForm__Input",componentId:"sc-14doogr-1"})(["padding:0.5rem;border:1px solid #ccc;border-radius:0.25rem;font-size:1rem;"]),l=a.default.label.withConfig({displayName:"SubscribeForm__Label",componentId:"sc-14doogr-2"})(["font-size:1rem;color:#333;margin-top:12px;"]),d=a.default.button.withConfig({displayName:"SubscribeForm__Button",componentId:"sc-14doogr-3"})(["padding:0.7rem 1rem;background-color:#000;color:white;border:none;border-radius:0.25rem;cursor:pointer;margin-top:20px;margin-bottom:20px;display:inline-block;white-space:nowrap;"]);r.default=()=>{const[e,r]=o.a.useState(!1),t=o.a.useRef(null),n=o.a.useRef(null),a=o.a.useRef(null),i=o.a.useRef(null);return o.a.createElement(c,{onSubmit:async e=>{var o,c;if(e.preventDefault(),r(!0),null!==(o=n.current)&&void 0!==o&&o.value&&null!==(c=t.current)&&void 0!==c&&c.value){var u,l,d,f;await s()(null===(u=n.current)||void 0===u?void 0:u.value,{FNAME:null===(l=t.current)||void 0===l?void 0:l.value,MMERGE6:null===(d=a.current)||void 0===d?void 0:d.value,MMERGE7:null===(f=i.current)||void 0===f?void 0:f.value});r(!1),n.current.value="",t.current.value="",a.current.value="",i.current.value=""}}},o.a.createElement("h2",null,"Subscribe"),o.a.createElement(l,{htmlFor:"name"},"Name:"),o.a.createElement(u,{ref:t,id:"name",type:"text",required:!0,autoCapitalize:"off",autoCorrect:"off",disabled:e}),o.a.createElement(l,{htmlFor:"email"},"Email:"),o.a.createElement(u,{ref:n,id:"email",type:"email",required:!0,autoCapitalize:"off",autoCorrect:"off",disabled:e}),o.a.createElement(l,{htmlFor:"organisation"},"Organisation:"),o.a.createElement(u,{ref:a,id:"organisation",type:"text"}),o.a.createElement(l,{htmlFor:"interest"},"Areas of Interest:"),o.a.createElement(u,{ref:i,id:"interest",type:"text"}),o.a.createElement(d,{disabled:e,type:"submit"},e?"Subscribing...":"Subscribe"))}},G04T:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n,o=(n=t("8ujH"))&&n.__esModule?n:{default:n},a=t("H/qo");var i=function(e){var r=e.url,t=e.timeout;return new Promise((function(e,n){return(0,o.default)(r,{param:"c",timeout:t},(function(r,t){r&&n(r),t&&e(t)}))}))},s=function(e){var r="";for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t)){var n="group["===t.substring(0,6)?t:t.toUpperCase();r=r.concat("&".concat(n,"=").concat(e[t]))}return r},c=function(e,r,t){var n=(0,a.validate)(e),o=encodeURIComponent(e);if(!n)return Promise.resolve({result:"error",msg:"The email you entered is not valid."});var c=" https://civicdatalab.us17.list-manage.com/subscribe/post?u=6d9135407622328dd66aff2ca&amp;id=891171b752&amp;f_id=00eec2e1f0",u=3500;arguments.length<3&&"string"==typeof r?c=r:"string"==typeof t&&(c=t),c=c.replace(/\/post/g,"/post-json");var l="&EMAIL=".concat(o).concat(s(r)),d="".concat(c).concat(l);return i({url:d,timeout:u})};r.default=c},GTTd:function(e,r,t){(function(n){function o(){var e;try{e=r.storage.debug}catch(t){}return!e&&void 0!==n&&"env"in n&&(e={}.DEBUG),e}(r=e.exports=t("bRoh")).log=function(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)},r.formatArgs=function(e){var t=this.useColors;if(e[0]=(t?"%c":"")+this.namespace+(t?" %c":" ")+e[0]+(t?"%c ":" ")+"+"+r.humanize(this.diff),!t)return;var n="color: "+this.color;e.splice(1,0,n,"color: inherit");var o=0,a=0;e[0].replace(/%[a-zA-Z%]/g,(function(e){"%%"!==e&&(o++,"%c"===e&&(a=o))})),e.splice(a,0,n)},r.save=function(e){try{null==e?r.storage.removeItem("debug"):r.storage.debug=e}catch(t){}},r.load=o,r.useColors=function(){if("undefined"!=typeof window&&window.process&&"renderer"===window.process.type)return!0;return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},r.storage="undefined"!=typeof chrome&&void 0!==chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(e){}}(),r.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],r.formatters.j=function(e){try{return JSON.stringify(e)}catch(r){return"[UnexpectedJSONParseError]: "+r.message}},r.enable(o())}).call(this,t("8oxB"))},"H/qo":function(e,r,t){"use strict";var n=/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;r.validate=function(e){if(!e)return!1;if(e.length>254)return!1;if(!n.test(e))return!1;var r=e.split("@");return!(r[0].length>64)&&!r[1].split(".").some((function(e){return e.length>63}))}},QXP7:function(e,r){var t=1e3,n=6e4,o=60*n,a=24*o;function i(e,r,t){if(!(e<r))return e<1.5*r?Math.floor(e/r)+" "+t:Math.ceil(e/r)+" "+t+"s"}e.exports=function(e,r){r=r||{};var s,c=typeof e;if("string"===c&&e.length>0)return function(e){if((e=String(e)).length>100)return;var r=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(!r)return;var i=parseFloat(r[1]);switch((r[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*i;case"days":case"day":case"d":return i*a;case"hours":case"hour":case"hrs":case"hr":case"h":return i*o;case"minutes":case"minute":case"mins":case"min":case"m":return i*n;case"seconds":case"second":case"secs":case"sec":case"s":return i*t;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return i;default:return}}(e);if("number"===c&&!1===isNaN(e))return r.long?i(s=e,a,"day")||i(s,o,"hour")||i(s,n,"minute")||i(s,t,"second")||s+" ms":function(e){if(e>=a)return Math.round(e/a)+"d";if(e>=o)return Math.round(e/o)+"h";if(e>=n)return Math.round(e/n)+"m";if(e>=t)return Math.round(e/t)+"s";return e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},bRoh:function(e,r,t){var n;function o(e){function t(){if(t.enabled){var e=t,o=+new Date,a=o-(n||o);e.diff=a,e.prev=n,e.curr=o,n=o;for(var i=new Array(arguments.length),s=0;s<i.length;s++)i[s]=arguments[s];i[0]=r.coerce(i[0]),"string"!=typeof i[0]&&i.unshift("%O");var c=0;i[0]=i[0].replace(/%([a-zA-Z%])/g,(function(t,n){if("%%"===t)return t;c++;var o=r.formatters[n];if("function"==typeof o){var a=i[c];t=o.call(e,a),i.splice(c,1),c--}return t})),r.formatArgs.call(e,i);var u=t.log||r.log||console.log.bind(console);u.apply(e,i)}}return t.namespace=e,t.enabled=r.enabled(e),t.useColors=r.useColors(),t.color=function(e){var t,n=0;for(t in e)n=(n<<5)-n+e.charCodeAt(t),n|=0;return r.colors[Math.abs(n)%r.colors.length]}(e),"function"==typeof r.init&&r.init(t),t}(r=e.exports=o.debug=o.default=o).coerce=function(e){return e instanceof Error?e.stack||e.message:e},r.disable=function(){r.enable("")},r.enable=function(e){r.save(e),r.names=[],r.skips=[];for(var t=("string"==typeof e?e:"").split(/[\s,]+/),n=t.length,o=0;o<n;o++)t[o]&&("-"===(e=t[o].replace(/\*/g,".*?"))[0]?r.skips.push(new RegExp("^"+e.substr(1)+"$")):r.names.push(new RegExp("^"+e+"$")))},r.enabled=function(e){var t,n;for(t=0,n=r.skips.length;t<n;t++)if(r.skips[t].test(e))return!1;for(t=0,n=r.names.length;t<n;t++)if(r.names[t].test(e))return!0;return!1},r.humanize=t("QXP7"),r.names=[],r.skips=[],r.formatters={}}}]);
//# sourceMappingURL=component---src-pages-subscribe-form-js-6bd29005bc81e447eda8.js.map