(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[538],{1703:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/gradius_game_screen",function(){return n(7069)}])},7069:function(e,t,n){"use strict";n.r(t);var s=n(5893),a=n(7294),i=n(2237),r=n(8239),c=n(1290),u=n(4471),l=n.n(u);let o=()=>{let[e,t]=(0,a.useState)(),[n,u]=(0,a.useState)([]),[o,g]=(0,a.useState)([]),[h,_]=(0,a.useState)(0),[w,d]=(0,a.useState)(!1),f=(0,a.useRef)(new window.Image),x=(0,a.useRef)(new window.Image);x.current.src="/images/GAMIRASU.jpg";let m=async()=>{let e=await c.x.player.$get(),n=await c.x.enemy.$get(),s=await c.x.laser.$get();t(e),u(n),g(s),_(e=>e-1)};return((0,a.useEffect)(()=>{let e=setInterval(m,10);return()=>{clearInterval(e)}},[]),(0,a.useEffect)(()=>{f.current.src="/images/YAMATO.jpg",f.current.onload=()=>{d(!0)}},[]),w&&e)?(0,s.jsxs)(i.Hf,{width:1800,height:780,className:l().container,style:{backgroundPosition:"".concat(h,"px 0")},children:[(0,s.jsx)(i.mh,{children:(0,s.jsx)(i.Ee,{image:f.current,width:250,height:75,x:e[0],y:e[1]})}),(0,s.jsxs)(i.mh,{children:[n.map((e,t)=>(0,s.jsx)(i.Ee,{image:x.current,width:120,height:40,id:"enemy_".concat(t),fill:"black",x:e.pos.x,y:e.pos.y},t)),o.map((e,t)=>(0,s.jsx)(i.UL,{id:"laser_".concat(t),fill:"blue",width:20,height:20,x:e.pos.x,y:e.pos.y},t))]})]}):(0,s.jsx)(r.g,{visible:!0})};t.default=o},4471:function(e){e.exports={container:"gradius_game_screen_container__XPy3V"}}},function(e){e.O(0,[237,774,888,179],function(){return e(e.s=1703)}),_N_E=e.O()}]);