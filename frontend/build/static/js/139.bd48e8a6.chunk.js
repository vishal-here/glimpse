"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[139],{533:function(e,r,s){s.r(r),s.d(r,{default:function(){return g}});var t=s(165),a=s(861),n=s(439),c=s(791),l=(s.p,s(87)),i=s(184),o=function(e){return e.list?(0,i.jsx)(i.Fragment,{children:e.list.map((function(e,r){return(0,i.jsx)("div",{children:(0,i.jsx)(l.rU,{to:"place/user/".concat(e._id),children:(0,i.jsxs)("div",{className:" bg-white min-h-20 p-5 flex hover:scale-105 hover:shadow-lg duration-300 ease-out",children:[(0,i.jsx)("div",{className:"w-2/5",children:(0,i.jsx)("img",{className:"w-12 h-12 my-auto rounded-full ring-2 ring-gray-300 dark:ring-gray-500",src:"/".concat(e.image),alt:"Bordered avatar"})}),(0,i.jsxs)("div",{children:[(0,i.jsx)("h1",{className:"block text-3xl font-bold capitalize text-gray-600",children:e.name}),(0,i.jsxs)("p",{className:"block text-xl capitalize text-gray-600",children:["Places : ",e.places.length]})]})]})})},r)}))}):(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{className:" text-center text-4xl text-black font mono",children:"No members currently !! Be a member and add your places .."})})},d=s.p+"static/media/index_page_img.2182cc192996e2fc61ac.jpg",u=s(174),g=function(e){var r=e.fillProgress,s=e.checkProgress,l=(0,c.useState)([]),g=(0,n.Z)(l,2),x=g[0],h=g[1],m=(0,c.useState)(""),p=(0,n.Z)(m,2),f=(p[0],p[1]);return(0,c.useEffect)((function(){var e=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(){var s,a;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r(10),e.next=4,fetch("/api/user/");case 4:return s=e.sent,r(50),e.next=8,s.json();case 8:if(a=e.sent,h(a.user),r(100),s.ok){e.next=13;break}throw new Error("Could net get list of users !! ");case 13:e.next=20;break;case 15:e.prev=15,e.t0=e.catch(0),r(100),f(e.t0.message),u.Am.error(e.t0.message,{position:"top-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"});case 20:case"end":return e.stop()}}),e,null,[[0,15]])})));return function(){return e.apply(this,arguments)}}();e()}),[r]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(u.Ix,{position:"top-center",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),(0,i.jsx)("div",{children:(0,i.jsx)("img",{src:d,alt:"index-img",className:"h-[60vh] md:h-[70vh] w-full"})}),(0,i.jsxs)("div",{className:" bg-slate-50 h-full",children:[(0,i.jsx)("div",{className:" text-center font-bold text-4xl md:text-6xl text-gray-600 font-mono pt-5 uppercase ",children:"travellers"}),(0,i.jsx)("hr",{className:"w-1/2 h-1 mx-auto  bg-gray-100 border-0 rounded  dark:bg-gray-500 mb-4"}),(0,i.jsx)("div",{className:" grid gap-4 p-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",children:!s&&x&&(0,i.jsx)(o,{list:x})})]})]})}}}]);
//# sourceMappingURL=139.bd48e8a6.chunk.js.map