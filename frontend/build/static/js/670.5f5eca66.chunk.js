"use strict";(self.webpackChunkchakraui=self.webpackChunkchakraui||[]).push([[670],{5670:function(e,a,r){r.r(a),r.d(a,{default:function(){return E}});var t=r(4165),n=r(5861),i=r(4942),s=r(1413),l=r(9439),o=r(7313),d=r(6074),u=r(3964),c=r(9748),m=r(4148),h=r(7758),v=r(4961),f=r(6995),p=r(720),g=r(5987),x=r(7762),b=r(6658),k=r(4988),y=["className","rows"],Z=function(){for(var e=arguments.length,a=new Array(e),r=0;r<e;r++)a[r]=arguments[r];return a.filter(Boolean).join(" ")};var j=["h","minH","height","minHeight"],C=(0,b.Gp)((function(e,a){var r=(0,b.mq)("Textarea",e),t=(0,k.Lr)(e),n=t.className,i=t.rows,l=(0,g.Z)(t,y),d=(0,p.Yp)(l),u=i?function(e){var a,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],t=Object.assign({},e),n=(0,x.Z)(r);try{for(n.s();!(a=n.n()).done;){var i=a.value;i in t&&delete t[i]}}catch(s){n.e(s)}finally{n.f()}return t}(r,j):r;return o.createElement(b.m$.textarea,(0,s.Z)((0,s.Z)({ref:a,rows:i},d),{},{className:Z("chakra-textarea",n),__css:u}))}));C.displayName="Textarea";var w=r(6417);function I(e){return(0,w.jsxs)(p.NI,{mb:4,children:[(0,w.jsx)(p.lX,{fontWeight:"bold",children:e.label}),(0,w.jsx)(C,{placeholder:e.placeholder,name:e.name,onChange:e.onChange,variant:e.variant,size:"md"})]})}I.defaultProps={label:"Message",placeholder:"Write your query ...",name:"message",variant:"filled"};var S=r(9507),z=r(6045),_=r(8467);function E(){var e=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,a=(0,z.$)().addToast,r=(0,o.useState)(!1),p=(0,l.Z)(r,2),g=p[0],x=p[1],b=(0,o.useState)({name:"",email:"",message:""}),k=(0,l.Z)(b,2),y=k[0],Z=k[1],j=(0,_.s0)(),C=(0,d.If)(),E=C.colorMode,N=C.toggleColorMode,P=function(e){Z((function(a){return(0,s.Z)((0,s.Z)({},a),{},(0,i.Z)({},e.target.name,e.target.value))}))},T=function(){var r=(0,n.Z)((0,t.Z)().mark((function r(n){var i;return(0,t.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(n.preventDefault(),y.email.match(e)){r.next=4;break}return a({title:"Invalid Email",message:"Please Enter a valid email address",status:"warning"}),r.abrupt("return");case 4:return x(!0),r.next=7,(0,S.UU)(y);case 7:if(i=r.sent,x(!1),200!==i.status){r.next=13;break}return a({title:"Mail Sent Success",message:"Will resolve your query as soon as possible",status:"success"}),j("/"),r.abrupt("return");case 13:return a({title:"Mail Sent Failed",message:"Server Error",status:"error"}),r.abrupt("return");case 15:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}();return(0,w.jsx)(u.W2,{width:"container.xlg",minHeight:"80vh",display:"flex",children:(0,w.jsxs)(u.xu,{border:["none","2px"],mx:"auto",my:10,borderColor:["none","gray.300"],p:[5,10],w:["100%","md"],alignSelf:["flex-start","flex-start"],borderRadius:["none","8px"],children:[(0,w.jsx)(u.xu,{textAlign:"right",children:(0,w.jsx)(c.hU,{icon:"light"===E?(0,w.jsx)(h.kL,{}):(0,w.jsx)(h.NW,{color:"yellow.300"}),onClick:N,variant:"ghost","aria-label":"switch_theme"})}),(0,w.jsxs)(u.gC,{spacing:4,width:"full",children:[(0,w.jsx)(u.kC,{justifyContent:"flex-start",width:"100%",children:(0,w.jsx)(u.X6,{children:"Contact US"})}),(0,w.jsxs)(v.Z,{handleSubmit:T,children:[(0,w.jsx)(f.Z,{label:"Full Name",variant:"filled",name:"name",placeholder:"Joe Stark",size:"lg",onChange:P}),(0,w.jsx)(f.Z,{label:"Email Address",variant:"filled",name:"email",placeholder:"joestartk@monkey.com",size:"lg",onChange:P}),(0,w.jsx)(I,{name:"message",label:"Message",onChange:P}),(0,w.jsxs)(u.gC,{children:[!g&&(0,w.jsx)(c.zx,{type:"submit",width:"100%",size:"lg",bg:"blue.400",_hover:{bg:"blue.300"},"aria-label":"submit_btn",children:"Submit"}),g&&(0,w.jsx)(m.D8,{isIndeterminate:!0,color:"blue.300"})]})]})]})]})})}},4961:function(e,a,r){r.d(a,{Z:function(){return s}});var t=r(1413),n=r(7313),i=r(6417);function s(e){return(0,i.jsx)("form",{onSubmit:e.handleSubmit,style:{width:"100%"},children:n.Children.map(e.children,(function(e){return(0,n.isValidElement)(e)?(0,n.cloneElement)(e,(0,t.Z)({},e.props)):null}))})}},6995:function(e,a,r){r.d(a,{Z:function(){return s}});var t=r(720),n=r(3068),i=r(6417);function s(e){return(0,i.jsxs)(t.NI,{mb:4,isInvalid:e.isInvalid,children:[(0,i.jsx)(t.lX,{fontWeight:"bold",children:e.label}),(0,i.jsx)(n.II,{isRequired:e.isRequired,disabled:e.disabled,type:e.type,name:e.name,onChange:e.onChange,placeholder:e.placeholder,value:e.defaultValue,size:e.size,variant:e.variant})]})}s.defaultProps={name:"name",label:"simple input",type:"text",size:"sm",variant:"filled",disabled:!1,isRequired:!1}},4148:function(e,a,r){r.d(a,{D8:function(){return Z}});var t=r(9439),n=r(1413),i=r(5987),s=r(7313),l=r(6658),o=r(686),d=r(4988),u=r(6195),c=["size","isIndeterminate"],m=["size","max","min","valueText","getValueText","value","capIsRound","children","thickness","color","trackColor","isIndeterminate"],h=["min","max","value","isIndeterminate","role"],v=["value","min","max","hasStripe","isAnimated","children","borderRadius","isIndeterminate","aria-label","aria-labelledby","title","role"];var f=(0,o.F4)({"0%":{strokeDasharray:"1, 400",strokeDashoffset:"0"},"50%":{strokeDasharray:"400, 400",strokeDashoffset:"-100"},"100%":{strokeDasharray:"400, 400",strokeDashoffset:"-260"}}),p=(0,o.F4)({"0%":{transform:"rotate(0deg)"},"100%":{transform:"rotate(360deg)"}}),g=(0,o.F4)({"0%":{left:"-40%"},"100%":{left:"100%"}}),x=(0,o.F4)({from:{backgroundPosition:"1rem 0"},to:{backgroundPosition:"0 0"}});function b(e){var a=e.value,r=void 0===a?0:a,t=e.min,n=e.max,i=e.valueText,s=e.getValueText,l=e.isIndeterminate,o=e.role,d=void 0===o?"progressbar":o,u=function(e,a,r){return 100*(e-a)/(r-a)}(r,t,n);return{bind:{"data-indeterminate":l?"":void 0,"aria-valuemax":n,"aria-valuemin":t,"aria-valuenow":l?void 0:r,"aria-valuetext":function(){if(null!=r)return"function"===typeof s?s(r,u):i}(),role:d},percent:u,value:r}}var k=function(e){var a=e.size,r=e.isIndeterminate,t=(0,i.Z)(e,c);return s.createElement(l.m$.svg,(0,n.Z)({viewBox:"0 0 100 100",__css:{width:a,height:a,animation:r?"".concat(p," 2s linear infinite"):void 0}},t))};k.displayName="Shape";var y=function(e){return s.createElement(l.m$.circle,(0,n.Z)({cx:50,cy:50,r:42,fill:"transparent"},e))};y.displayName="Circle";var Z=(0,l.Gp)((function(e,a){var r,t=e.size,o=void 0===t?"48px":t,d=e.max,u=void 0===d?100:d,c=e.min,h=void 0===c?0:c,v=e.valueText,p=e.getValueText,g=e.value,x=e.capIsRound,Z=e.children,j=e.thickness,C=void 0===j?"10px":j,w=e.color,I=void 0===w?"#0078d4":w,S=e.trackColor,z=void 0===S?"#edebe9":S,_=e.isIndeterminate,E=(0,i.Z)(e,m),N=b({min:h,max:u,value:g,valueText:v,getValueText:p,isIndeterminate:_}),P=_?void 0:2.64*(null!==(r=N.percent)&&void 0!==r?r:0),T=null==P?void 0:"".concat(P," ").concat(264-P),D=_?{css:{animation:"".concat(f," 1.5s linear infinite")}}:{strokeDashoffset:66,strokeDasharray:T,transitionProperty:"stroke-dasharray, stroke",transitionDuration:"0.6s",transitionTimingFunction:"ease"},R={display:"inline-block",position:"relative",verticalAlign:"middle",fontSize:o};return s.createElement(l.m$.div,(0,n.Z)((0,n.Z)((0,n.Z)({ref:a,className:"chakra-progress"},N.bind),E),{},{__css:R}),s.createElement(k,{size:o,isIndeterminate:_},s.createElement(y,{stroke:z,strokeWidth:C,className:"chakra-progress__track"}),s.createElement(y,(0,n.Z)({stroke:I,strokeWidth:C,className:"chakra-progress__indicator",strokeLinecap:x?"round":void 0,opacity:0!==N.value||_?void 0:0},D))),Z)}));Z.displayName="CircularProgress";var j=(0,u.k)({name:"ProgressStylesContext",errorMessage:"useProgressStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<Progress />\" "}),C=(0,t.Z)(j,2),w=C[0],I=C[1],S=(0,l.Gp)((function(e,a){var r=e.min,t=e.max,o=e.value,d=e.isIndeterminate,u=e.role,c=(0,i.Z)(e,h),m=b({value:o,min:r,max:t,isIndeterminate:d,role:u}),v=I(),f=(0,n.Z)({height:"100%"},v.filledTrack);return s.createElement(l.m$.div,(0,n.Z)((0,n.Z)((0,n.Z)({ref:a,style:(0,n.Z)({width:"".concat(m.percent,"%")},c.style)},m.bind),c),{},{__css:f}))}));(0,l.Gp)((function(e,a){var r,t=(0,d.Lr)(e),o=t.value,u=t.min,c=void 0===u?0:u,m=t.max,h=void 0===m?100:m,f=t.hasStripe,p=t.isAnimated,b=t.children,k=t.borderRadius,y=t.isIndeterminate,Z=t["aria-label"],j=t["aria-labelledby"],C=t.title,I=t.role,z=(0,i.Z)(t,v),_=(0,l.jC)("Progress",e),E=null!==k&&void 0!==k?k:null==(r=_.track)?void 0:r.borderRadius,N={animation:"".concat(x," 1s linear infinite")},P=!y&&f&&p,T=(0,n.Z)((0,n.Z)({},P&&N),y&&{position:"absolute",willChange:"left",minWidth:"50%",animation:"".concat(g," 1s ease infinite normal none running")}),D=(0,n.Z)({overflow:"hidden",position:"relative"},_.track);return s.createElement(l.m$.div,(0,n.Z)({ref:a,borderRadius:E,__css:D},z),s.createElement(w,{value:_},s.createElement(S,{"aria-label":Z,"aria-labelledby":j,min:c,max:h,value:o,isIndeterminate:y,css:T,borderRadius:E,title:C,role:I}),b))})).displayName="Progress";(0,l.m$)("div",{baseStyle:{fontSize:"0.24em",top:"50%",left:"50%",width:"100%",textAlign:"center",position:"absolute",transform:"translate(-50%, -50%)"}}).displayName="CircularProgressLabel"}}]);