(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"3XHS":function(n,e,t){"use strict";t.r(e);var a=t("MUpH"),i=t("q1tI"),r=t.n(i),l=t("vOnD"),c=t("WlUB"),o=t("RXBc"),m=t("xkl6"),d=t("96Do"),p=t("JeVZ"),u=t("KEe/"),g=t("fwOy"),h=t("8kVo"),s=t("lYPS");function f(){var n=Object(a.a)(["\n  margin: 20px auto;\n\n  .content {\n    padding: 0;\n  }\n\n  h2 {\n    font-size: 25px;\n  }\n\n  .number {\n    color: #1dcccc;\n    margin: 0;\n  }\n\n  .title {\n    text-transform: uppercase;\n    margin-top: 0;\n    margin-bottom: 3rem;\n    color: #1dcccc;\n  }\n\n  p {\n    line-height: 1.5em;\n  }\n\n  .image-container {\n    background-color: #ccc;\n    height: 300px;\n    width: 100%;\n  }\n\n  @media (min-width: 900px) {\n    display: flex;\n\n    .content {\n      padding: 0;\n      max-width: 480px;\n    }\n  }\n\n  @media (min-width: 1280px) {\n    padding-right: 20px;\n\n    .title {\n      min-height: 100px;\n    }\n  }\n\n  @media (min-width: 1440px) {\n    h2 {\n      font-size: 40px;\n    }\n  }\n\n  @media (min-width: 1920px) {\n    h2 {\n      font-size: 45px;\n    }\n  }\n"]);return f=function(){return n},n}var x=l.c.div(f()),b=function(n){n.number;var e=n.title,t=n.bodyHTML;return r.a.createElement(x,null,r.a.createElement("div",{className:"content"},r.a.createElement("h2",{className:"title"},e),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:t}})))},v=t("ZEsj"),w=t("yTRO"),E=t("Wbzz"),k=t("9eSz"),y=t.n(k);function O(){var n=Object(a.a)(["\nmargin-top: 60px;\n\np {\n  margin-top: 40px;\n  line-height: 1.5em;\n}\n\n.pillars-container {\n  display:grid;\n  grid-template-columns: 50% 50%;\n  grid-column-gap: 25px;\n  grid-row-gap: 25px;\n  margin-right: 50px;\n\n  .image-container {\n    z-index: -1;\n  }\n}\n\n  h3 {\n    font-size: 22px;\n    height: 70px;\n    display: flex;\n    align-items: flex-end;\n    justify-content: center;\n    margin-left: auto;\n    margin-right: auto;\n    margin-bottom: 10px;\n    text-align: center;\n    font-family: Bungee;\n  }\n\n@media (min-width: 768px) {\n  .pillars-container {\n    grid-template-columns: repeat(4,1fr);\n    margin-right: 18px;   \n  }\n\n  h3 {\n    font-size: 28px;\n    max-width: 80px;\n  }\n}\n\n@media (min-width: 1280px) {\n  padding: 0;\n  margin-top: 80px;\n\n  p {\n    margin-top: 60px;\n    width: 60%;\n  }\n  \n  h3 {\n    font-size: 40px;\n  }\n}\n\n@media (min-width: 1440px) {\n    padding: 0;\n  }\n}\n"]);return O=function(){return n},n}l.c.div(O());var j=function(){var n=Object(E.c)("2088639262");return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"image-container"},r.a.createElement("h3",null,"Data"),r.a.createElement(y.a,{fluid:n.dataPillar.childImageSharp.fluid})),r.a.createElement("div",{className:"image-container"},r.a.createElement("h3",null,"Tech"),r.a.createElement(y.a,{fluid:n.technologyPillar.childImageSharp.fluid})),r.a.createElement("div",{className:"image-container"},r.a.createElement("h3",null,"Design"),r.a.createElement(y.a,{fluid:n.designPillar.childImageSharp.fluid})),r.a.createElement("div",{className:"image-container"},r.a.createElement("h3",null,"Social Science"),r.a.createElement(y.a,{fluid:n.socialPillar.childImageSharp.fluid})))},z=t("QTAf"),S=t("1eu9"),I=t.n(S),T=function(n){var e=n.children,t=Object(E.c)("1916337981"),a=r.a.useState(t.allFile.nodes[0].childImageSharp.fluid),i=a[0],l=a[1];return r.a.useEffect((function(){var n=0,e=setInterval((function(){l(t.allFile.nodes[n].childImageSharp.fluid),n=2===n?0:n+1}),4e3);return function(){clearInterval(e)}}),[t.allFile.nodes]),r.a.createElement(I.a,{fluid:i},e)};function N(){var n=Object(a.a)(["\n  padding-top: 40px;\n\n  @media (min-width: 1280px) {\n    padding-top: 80px;\n  }\n\n  @media (min-width: 1440px) {\n    padding-top: 100px;\n  }\n"]);return N=function(){return n},n}function D(){var n=Object(a.a)(["\n  .image-container {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    text-align: center;\n    z-index: -1;\n\n    h3 {\n      margin-top: 0;\n      min-height: 40px;\n    }\n  }\n\n  .gatsby-image-wrapper {\n    height: 100%;\n    width: 80%;\n  }\n\n  grid-template-columns: repeat(2, 1fr);\n  > * {\n    grid-column: span 1;\n  }\n\n  @media (min-width: 1280px) {\n    grid-template-columns: repeat(12, 1fr);\n    > * {\n      grid-column: span 3;\n    }\n    .gatsby-image-wrapper {\n      height: 100%;\n      width: 50%;\n    }\n\n    > * {\n      grid-column: span 3;\n    }\n  }\n"]);return D=function(){return n},n}function M(){var n=Object(a.a)(["\n  @media (min-width: 1280px) {\n    padding: 40px 0;\n    > * {\n      grid-column: span 6;\n    }\n  }\n"]);return M=function(){return n},n}function H(){var n=Object(a.a)(["\n  @media (min-width: 1280px) {\n    padding: 40px 0;\n    > * {\n      grid-column: span 4;\n    }\n  }\n"]);return H=function(){return n},n}function J(){var n=Object(a.a)(["\n  background-color: rgba(178, 201, 220, 0.27);\n  padding: 48px 0;\n\n  p {\n    line-height: 1.5em;\n  }\n\n  .description-text {\n    margin-top: 40px;\n  }\n\n  @media (min-width: 1280px) {\n    padding: 80px 0;\n\n    .description-text {\n      margin-top: 60px;\n      width: 60%;\n    }\n  }\n\n  @media (min-width: 1440px) {\n    padding: 100px 0;\n  }\n"]);return J=function(){return n},n}function W(){var n=Object(a.a)(["\n  height: 40vh;\n  color: white;\n  padding-top: 100px;\n  padding-left: 16px;\n  padding-right: 16px;\n  background-color: transparent;\n\n  @media (min-width: 550px) {\n    height: 50vh;\n  }\n\n  @media (min-width: 1024px) {\n    padding-top: 140px;\n    height: 60vh;\n  }\n"]);return W=function(){return n},n}var P=Object(l.c)(o.Section)(W()),F=l.c.div(J()),R=Object(l.c)(w.a)(H()),U=Object(l.c)(w.a)(M()),q=Object(l.c)(w.a)(D()),A=l.c.div(N()),B=[{link:"https://medium.com/civicdatalab/the-many-lives-of-open-data-1eb44becc261",title:"The Many Lives of Open Data"},{link:"https://medium.com/civicdatalab/work-in-the-time-of-coronavirus-8663bb6e3908",title:"Work in the time of Coronavirus"},{link:"https://medium.com/civicdatalab/the-scrumji-experiment-44b25fe60b55",title:"The ScrumJi Experiment!"}];e.default=function(n){var e=n.data.allMarkdownRemark.edges;return r.a.createElement(l.a,{theme:c.b},r.a.createElement(c.a,null),r.a.createElement(v.a,{title:"About"}),r.a.createElement("main",null,r.a.createElement(T,null,r.a.createElement(p.a,{dark:!0}),r.a.createElement(P,null)),r.a.createElement(F,null,r.a.createElement(s.a,null,r.a.createElement(h.a,null,"About Us"),r.a.createElement(U,null,r.a.createElement("div",null,r.a.createElement("p",null,"We are a research lab working on the intersection use data, tech, design and social science to strengthen the course of civic engagements in India."),r.a.createElement("p",null,"We work to harness the potential of open knowledge movements and better enable citizens to engage in matters of public reform."),r.a.createElement("p",null,"We aim to grow data and tech literacy of governments, non-profits, think-tanks, media houses, universities, and more to enable data-driven decision making at scale.")),r.a.createElement(q,null,r.a.createElement(j,null))))),r.a.createElement(s.a,null,r.a.createElement(A,null,r.a.createElement("div",null,r.a.createElement(h.a,null,"Our Values")),r.a.createElement(R,null,e.map((function(n){return r.a.createElement(b,{key:n.node.id,number:n.node.frontmatter.number,title:n.node.frontmatter.title,bodyHTML:n.node.html})}))))),r.a.createElement(z.a,{resources:B}),r.a.createElement(u.a,null),r.a.createElement(g.a,null),r.a.createElement(m.CivicDays,null)),r.a.createElement(d.a,null))}},QTAf:function(n,e,t){"use strict";t.d(e,"a",(function(){return f}));var a=t("MUpH"),i=t("q1tI"),r=t.n(i),l=t("vOnD"),c=t("4qeJ"),o=t("lYPS"),m=t("8kVo"),d=t("yTRO"),p=t("p2Js");function u(){var n=Object(a.a)(["\n  a {\n    display: block;\n    font-weight: 500;\n    color: #0da3b7;\n    text-decoration: none;\n    padding-bottom: 8px;\n    border-bottom: 1px solid #0da3b7;\n    margin: 20px 0;\n\n    &:hover {\n      color: #1dcccc;\n    }\n  }\n\n  .upper-content-section {\n    max-width: 100%;\n  }\n\n  h1 {\n    overflow-wrap: break-word;\n    max-width: 100%;\n  }\n"]);return u=function(){return n},n}function g(){var n=Object(a.a)(["\n  a {\n    display: block;\n    font-weight: 500;\n    color: #0da3b7;\n    text-decoration: none;\n    padding-bottom: 8px;\n    border-bottom: 1px solid #0da3b7;\n    margin: 20px 0;\n\n    &:hover {\n      color: #1dcccc;\n    }\n  }\n\n  .upper-content-section {\n    max-width: 100%;\n  }\n\n  h1 {\n    overflow-wrap: break-word;\n    max-width: 100%;\n  }\n\n  @media (min-width: 1280px) {\n    width: 80%;\n  }\n"]);return g=function(){return n},n}var h=Object(l.c)(p.a)(g()),s=Object(l.c)(c.a)(u()),f=function(n){var e=n.resources;return r.a.createElement(o.a,null,r.a.createElement(s,null,r.a.createElement(d.a,null,r.a.createElement("div",{className:"content upper-content-section"},r.a.createElement(m.a,{className:"section-heading"},"blogs")),r.a.createElement("div",{className:"content lower-content-section"},r.a.createElement("hr",null),null==e?void 0:e.map((function(n){return r.a.createElement("a",{key:n.link,href:n.link,target:"_blank",rel:"noopener noreferrer"},n.title)}))))))};e.b=function(n){var e=n.resources;return r.a.createElement(r.a.Fragment,null,r.a.createElement(h,null,r.a.createElement("h3",null,"Resources"),r.a.createElement("div",null,null==e?void 0:e.map((function(n){return r.a.createElement("a",{key:n.link,href:n.link,target:"_blank",rel:"noopener noreferrer"},n.title)})))))}},p2Js:function(n,e,t){"use strict";t.d(e,"a",(function(){return g}));var a=t("MUpH"),i=t("q1tI"),r=t.n(i),l=t("Wbzz"),c=t("vOnD"),o=t("9eSz"),m=t.n(o);function d(){var n=Object(a.a)(["\n  text-decoration: none;\n\n  .gatsby-image-wrapper {\n    height: 200px;\n  }\n\n  p {\n    font-size: 16px;\n    font-weight: 500;\n    text-align: center;\n    font-weight: 600;\n    color: black;\n  }\n\n  @media (min-width: 1280px) {\n    p {\n      font-size: 18px;\n    }\n\n    .gatsby-image-wrapper {\n      height: 240px;\n      width: 100%;\n    }\n  }\n\n  @media (min-width: 1440px) {\n    .gatsby-image-wrapper {\n      height: 300px;\n      width: 100%;\n    }\n  }\n"]);return d=function(){return n},n}function p(){var n=Object(a.a)(["\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-gap: 20px;\n\n  @media (min-width: 834px) {\n    grid-template-columns: repeat(4, 150px);\n    column-gap: 60px;\n    row-gap: 60px;\n  }\n\n  @media (min-width: 1024px) {\n    grid-template-columns: repeat(3, 150px);\n  }\n\n  @media (min-width: 1280px) {\n    grid-template-columns: repeat(3, 180px);\n  }\n\n  @media (min-width: 1440px) {\n    grid-template-columns: repeat(4, 180px);\n  }\n"]);return p=function(){return n},n}function u(){var n=Object(a.a)(["\n  padding: 0;\n  h3 {\n    font-family: Bungee;\n    font-size: 32px;\n    width: 60px;\n    display: inline-block;\n    text-align: left;\n    margin-bottom: 16px;\n  }\n\n  @media (min-width: 1024px) {\n    padding: 0;\n    margin-bottom: 50px;\n    h3 {\n      font-size: 44px;\n      width: max-content;\n      margin-bottom: 35px;\n    }\n  }\n"]);return u=function(){return n},n}var g=c.c.div(u()),h=c.c.div(p()),s=Object(c.c)(l.a)(d()),f=function(n){var e=n.image,t=n.name,a=n.link;return r.a.createElement(s,{to:a},r.a.createElement(m.a,{fluid:e}),r.a.createElement("p",null,t))};e.b=function(n){var e=n.members;return r.a.createElement(g,null,r.a.createElement("h3",null,"Team"),r.a.createElement(h,null,e.map((function(n){var e;return r.a.createElement(f,{key:n.id,link:n.fields.slug,image:null===(e=n.frontmatter.image)||void 0===e?void 0:e.childImageSharp.fluid,name:n.frontmatter.name})}))))}}}]);
//# sourceMappingURL=component---src-pages-about-js-dae2181487df3e221210.js.map