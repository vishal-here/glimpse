"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[942],{654:function(e,t,n){n.r(t);var r=n(165),s=n(861),a=n(439),c=n(791),o=n(689),l=n(409),i=n(174),u=n(184),d=c.lazy((function(){return n.e(378).then(n.bind(n,378))}));t.default=function(e){var t=e.fillProgress,n=e.checkProgress,f=(0,c.useState)([]),p=(0,a.Z)(f,2),h=p[0],x=p[1],g=(0,o.UO)().uid;(0,c.useEffect)((function(){var e=function(){var e=(0,s.Z)((0,r.Z)().mark((function e(){var n,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t(30),e.next=4,fetch("".concat("https://agreeable-khakis-toad.cyclic.app/","/api/place/user/").concat(g));case 4:return n=e.sent,t(70),e.next=8,n.json();case 8:if(s=e.sent,t(100),n.ok){e.next=12;break}throw new Error(s.message);case 12:x(s.places),e.next=19;break;case 15:e.prev=15,e.t0=e.catch(0),console.log(e.t0),t(100);case 19:case"end":return e.stop()}}),e,null,[[0,15]])})));return function(){return e.apply(this,arguments)}}();e()}),[]);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(i.Ix,{position:"top-center",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),(0,u.jsxs)("div",{className:"  bg-slate-50 h-full",children:[(0,u.jsx)("div",{className:" text-center font-bold text-4xl md:text-6xl text-gray-600 font-mono pt-5 uppercase ",children:"places"}),(0,u.jsx)("hr",{className:"w-1/2 h-1 mx-auto  bg-gray-100 border-0 rounded  dark:bg-gray-500 mb-4"}),(0,u.jsx)("div",{className:"w-11/12 m-auto",children:(0,u.jsx)("div",{className:"grid gap-4 grid-cols-1 lg:grid-cols-2 ",children:!n&&h&&(0,u.jsx)(c.Suspense,{fallback:(0,u.jsx)(l.Z,{size:100}),children:(0,u.jsx)(d,{list:h,onPlaceDelete:function(e){x((function(t){return t.filter((function(t){return t._id!==e}))}))}})})})})]})]})}}}]);
//# sourceMappingURL=942.172ed2e1.chunk.js.map