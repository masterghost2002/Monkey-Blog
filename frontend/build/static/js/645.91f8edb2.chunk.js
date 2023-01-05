"use strict";(self.webpackChunkchakraui=self.webpackChunkchakraui||[]).push([[645],{2768:function(e,n,r){r.d(n,{u:function(){return z}});var t=r(4942),o=r(1413),i=r(5987),a=r(7762),l=r(7313),c=r(2002),u=r(8276),s=r(6658),d=r(4988),v=r(4413),f=r(2280),p=r(73),g=r(4490),h=r(4401),w=["openDelay","closeDelay","closeOnClick","closeOnMouseDown","closeOnScroll","closeOnPointerDown","closeOnEsc","onOpen","onClose","placement","id","isOpen","defaultIsOpen","arrowSize","arrowShadowColor","arrowPadding","modifiers","isDisabled","gutter","offset","direction"],m=["children","label","shouldWrapChildren","aria-label","hasArrow","bg","portalProps","background","backgroundColor","bgColor","motionProps"];var b={exit:{scale:.85,opacity:0,transition:{opacity:{duration:.15,easings:"easeInOut"},scale:{duration:.2,easings:"easeInOut"}}},enter:{scale:1,opacity:1,transition:{opacity:{easings:"easeOut",duration:.2},scale:{duration:.2,ease:[.175,.885,.4,1.1]}}}};function C(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return function(e){n.some((function(n){return null==n||n(e),null==e?void 0:e.defaultPrevented}))}}var O=function(e){var n;return(null==(n=e.current)?void 0:n.ownerDocument)||document},k=function(e){var n,r;return(null==(r=null==(n=e.current)?void 0:n.ownerDocument)?void 0:r.defaultView)||window};var P="chakra-ui:close-tooltip";function y(e,n){return(0,l.useEffect)((function(){var r=O(e);return r.addEventListener(P,n),function(){return r.removeEventListener(P,n)}}),[n,e]),function(){var n=O(e),r=k(e);n.dispatchEvent(new r.CustomEvent(P))}}var Z=(0,s.m$)(v.E.div),z=(0,s.Gp)((function(e,n){var r,v,P=(0,s.mq)("Tooltip",e),z=(0,d.Lr)(e),E=(0,s.Fg)(),M=z.children,_=z.label,x=z.shouldWrapChildren,D=z["aria-label"],T=z.hasArrow,I=z.bg,A=z.portalProps,B=z.background,L=z.backgroundColor,S=z.bgColor,F=z.motionProps,$=(0,i.Z)(z,m),j=null!==(r=null!==(v=null!==B&&void 0!==B?B:L)&&void 0!==v?v:I)&&void 0!==r?r:S;if(j){P.bg=j;var R=(0,d.K1)(E,"colors",j);P[c.j.arrowBg.var]=R}var q,N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.openDelay,r=void 0===n?0:n,a=e.closeDelay,u=void 0===a?0:a,s=e.closeOnClick,d=void 0===s||s,v=e.closeOnMouseDown,f=e.closeOnScroll,m=e.closeOnPointerDown,b=void 0===m?v:m,P=e.closeOnEsc,Z=void 0===P||P,z=e.onOpen,E=e.onClose,M=e.placement,_=e.id,x=e.isOpen,D=e.defaultIsOpen,T=e.arrowSize,I=void 0===T?10:T,A=e.arrowShadowColor,B=e.arrowPadding,L=e.modifiers,S=e.isDisabled,F=e.gutter,$=e.offset,j=e.direction,R=(0,i.Z)(e,w),q=(0,g.q)({isOpen:x,defaultIsOpen:D,onOpen:z,onClose:E}),N=q.isOpen,V=q.onOpen,G=q.onClose,H=(0,c.D)({enabled:N,placement:M,arrowPadding:B,modifiers:L,gutter:F,offset:$,direction:j}),W=H.referenceRef,K=H.getPopperProps,Q=H.getArrowInnerProps,Y=H.getArrowProps,J=(0,l.useId)(),U="tooltip-".concat(null!==_&&void 0!==_?_:J),X=(0,l.useRef)(null),ee=(0,l.useRef)(),ne=(0,l.useCallback)((function(){ee.current&&(clearTimeout(ee.current),ee.current=void 0)}),[]),re=(0,l.useRef)(),te=(0,l.useCallback)((function(){re.current&&(clearTimeout(re.current),re.current=void 0)}),[]),oe=(0,l.useCallback)((function(){te(),G()}),[G,te]),ie=y(X,oe),ae=(0,l.useCallback)((function(){if(!S&&!ee.current){ie();var e=k(X);ee.current=e.setTimeout(V,r)}}),[ie,S,V,r]),le=(0,l.useCallback)((function(){ne();var e=k(X);re.current=e.setTimeout(oe,u)}),[u,oe,ne]),ce=(0,l.useCallback)((function(){N&&d&&le()}),[d,le,N]),ue=(0,l.useCallback)((function(){N&&b&&le()}),[b,le,N]),se=(0,l.useCallback)((function(e){N&&"Escape"===e.key&&le()}),[N,le]);(0,p.O)((function(){return O(X)}),"keydown",Z?se:void 0),(0,p.O)((function(){return O(X)}),"scroll",(function(){N&&f&&oe()})),(0,l.useEffect)((function(){S&&(ne(),N&&G())}),[S,N,G,ne]),(0,l.useEffect)((function(){return function(){ne(),te()}}),[ne,te]),(0,p.O)((function(){return X.current}),"pointerleave",le);var de=(0,l.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return(0,o.Z)((0,o.Z)({},e),{},{ref:(0,h.lq)(X,n,W),onPointerEnter:C(e.onPointerEnter,(function(e){"touch"!==e.pointerType&&ae()})),onClick:C(e.onClick,ce),onPointerDown:C(e.onPointerDown,ue),onFocus:C(e.onFocus,ae),onBlur:C(e.onBlur,le),"aria-describedby":N?U:void 0})}),[ae,le,ue,N,U,ce,W]),ve=(0,l.useCallback)((function(){var e,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return K((0,o.Z)((0,o.Z)({},n),{},{style:(0,o.Z)((0,o.Z)({},n.style),{},(e={},(0,t.Z)(e,c.j.arrowSize.var,I?"".concat(I,"px"):void 0),(0,t.Z)(e,c.j.arrowShadowColor.var,A),e))}),r)}),[K,I,A]),fe=(0,l.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=(0,o.Z)((0,o.Z)({},e.style),{},{position:"relative",transformOrigin:c.j.transformOrigin.varRef});return(0,o.Z)((0,o.Z)((0,o.Z)({ref:n},R),e),{},{id:U,role:"tooltip",style:r})}),[R,U]);return{isOpen:N,show:ae,hide:le,getTriggerProps:de,getTooltipProps:fe,getTooltipPositionerProps:ve,getArrowProps:Y,getArrowInnerProps:Q}}((0,o.Z)((0,o.Z)({},$),{},{direction:E.direction}));if("string"===typeof M||x)q=l.createElement(s.m$.span,(0,o.Z)({display:"inline-block",tabIndex:0},N.getTriggerProps()),M);else{var V=l.Children.only(M);q=(0,l.cloneElement)(V,N.getTriggerProps(V.props,V.ref))}var G=!!D,H=N.getTooltipProps({},n),W=G?function(e){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],t=Object.assign({},e),o=(0,a.Z)(r);try{for(o.s();!(n=o.n()).done;){var i=n.value;i in t&&delete t[i]}}catch(l){o.e(l)}finally{o.f()}return t}(H,["role","id"]):H,K=function(e,n){var r,t={},o=(0,a.Z)(n);try{for(o.s();!(r=o.n()).done;){var i=r.value;i in e&&(t[i]=e[i])}}catch(l){o.e(l)}finally{o.f()}return t}(H,["role","id"]);return _?l.createElement(l.Fragment,null,q,l.createElement(f.M,null,N.isOpen&&l.createElement(u.h_,(0,o.Z)({},A),l.createElement(s.m$.div,(0,o.Z)((0,o.Z)({},N.getTooltipPositionerProps()),{},{__css:{zIndex:P.zIndex,pointerEvents:"none"}}),l.createElement(Z,(0,o.Z)((0,o.Z)((0,o.Z)({variants:b,initial:"exit",animate:"enter",exit:"exit"},F),W),{},{__css:P}),_,G&&l.createElement(s.m$.span,(0,o.Z)({srOnly:!0},K),D),T&&l.createElement(s.m$.div,{"data-popper-arrow":!0,className:"chakra-tooltip__arrow-wrapper"},l.createElement(s.m$.div,{"data-popper-arrow-inner":!0,className:"chakra-tooltip__arrow",__css:{bg:P.bg}}))))))):l.createElement(l.Fragment,null,M)}));z.displayName="Tooltip"},2522:function(e,n,r){r.d(n,{Fi5:function(){return a},jm8:function(){return i},tTQ:function(){return o},yGY:function(){return l}});var t=r(1260);function o(e){return(0,t.w_)({tag:"svg",attr:{version:"1.1",viewBox:"0 0 32 32"},child:[{tag:"path",attr:{d:"M4.665 3.411l2.063 23.176 9.258 2.574 9.284-2.578 2.065-23.172h-22.671zM8.951 8.911l-0.068-0.763h7.107v2.842h-4.005l0.259 2.911h3.746v2.842h-6.341l-0.698-7.833zM22.518 14.665l-0.667 7.483-0.043 0.48-5.822 1.616-5.814-1.616-0.398-4.463h2.849l0.202 2.267 3.163 0.854 3.165-0.856 0.329-3.686h-3.485v-2.842h6.587l-0.069 0.763zM23.032 8.911l-0.129 1.441-0.057 0.639h-6.846v-2.842h7.1l-0.068 0.762z"}}]})(e)}function i(e){return(0,t.w_)({tag:"svg",attr:{version:"1.1",viewBox:"0 0 32 32"},child:[{tag:"path",attr:{d:"M12.557 23.22c0 0-0.982 0.571 0.699 0.765 2.037 0.232 3.079 0.199 5.324-0.226 0 0 0.59 0.37 1.415 0.691-5.033 2.157-11.39-0.125-7.437-1.23zM11.942 20.405c0 0-1.102 0.816 0.581 0.99 2.176 0.224 3.895 0.243 6.869-0.33 0 0 0.411 0.417 1.058 0.645-6.085 1.779-12.863 0.14-8.508-1.305zM17.127 15.63c1.24 1.428-0.326 2.713-0.326 2.713s3.149-1.625 1.703-3.661c-1.351-1.898-2.386-2.841 3.221-6.093 0 0-8.801 2.198-4.598 7.042zM23.783 25.302c0 0 0.727 0.599-0.801 1.062-2.905 0.88-12.091 1.146-14.643 0.035-0.917-0.399 0.803-0.953 1.344-1.069 0.564-0.122 0.887-0.1 0.887-0.1-1.020-0.719-6.594 1.411-2.831 2.021 10.262 1.664 18.706-0.749 16.044-1.95zM13.029 17.489c0 0-4.673 1.11-1.655 1.513 1.274 0.171 3.814 0.132 6.181-0.066 1.934-0.163 3.876-0.51 3.876-0.51s-0.682 0.292-1.175 0.629c-4.745 1.248-13.911 0.667-11.272-0.609 2.232-1.079 4.046-0.956 4.046-0.956zM21.412 22.174c4.824-2.506 2.593-4.915 1.037-4.591-0.382 0.079-0.552 0.148-0.552 0.148s0.142-0.222 0.412-0.318c3.079-1.083 5.448 3.193-0.994 4.887-0 0 0.075-0.067 0.097-0.126zM18.503 3.337c0 0 2.671 2.672-2.534 6.781-4.174 3.296-0.952 5.176-0.002 7.323-2.436-2.198-4.224-4.133-3.025-5.934 1.761-2.644 6.638-3.925 5.56-8.17zM13.503 28.966c4.63 0.296 11.74-0.164 11.908-2.355 0 0-0.324 0.831-3.826 1.49-3.952 0.744-8.826 0.657-11.716 0.18 0 0 0.592 0.49 3.635 0.685z"}}]})(e)}function a(e){return(0,t.w_)({tag:"svg",attr:{version:"1.1",viewBox:"0 0 32 32"},child:[{tag:"path",attr:{d:"M4.698 3.419l2.057 23.073 9.231 2.563 9.256-2.566 2.059-23.069h-22.604zM13.226 9.394l-0.409 4.441 9.671 0.001-0.069 0.76-0.665 7.45-0.042 0.478-5.804 1.609-5.796-1.609-0.396-4.443h2.84l0.202 2.257 3.154 0.85 3.156-0.852 0.328-3.67-9.671-0.001 0.069-0.76 0.665-7.45 0.209-2.086h11.287l0.131 1.598 0.403 4.453h-2.841l-0.262-2.922-2.889-0.174h-0.515v-0.004l-2.755 0.074z"}}]})(e)}function l(e){return(0,t.w_)({tag:"svg",attr:{version:"1.1",viewBox:"0 0 32 32"},child:[{tag:"path",attr:{d:"M5.082 5.593c-0.564 0.564-0.423 1.213 0.564 2.679 0.508 0.761 1.1 1.946 1.326 2.623 0.226 0.705 0.677 1.664 0.987 2.143 0.564 0.79 0.564 0.959 0.197 2.397-0.226 0.902-0.31 2.031-0.197 2.736 0.169 1.185 1.128 2.905 1.72 3.102 0.508 0.169 1.241-0.733 1.269-1.551 0-0.705 0.028-0.733 0.338-0.226 0.536 0.874 2.228 2.735 2.369 2.594 0.056-0.056-0.31-0.79-0.846-1.607-0.508-0.846-1.1-1.946-1.325-2.454-0.31-0.846-0.423-0.902-0.79-0.508-0.226 0.226-0.508 0.874-0.592 1.466-0.226 1.354-0.733 1.523-1.128 0.367s-0.395-3.131 0-4.484c0.282-0.931 0.254-1.184-0.226-1.89-0.31-0.423-0.79-1.438-1.044-2.256-0.254-0.79-0.846-1.974-1.325-2.595-1.1-1.551-1.1-2.115 0.056-1.89 0.479 0.085 1.213 0.423 1.664 0.733 0.423 0.31 1.156 0.564 1.607 0.564 1.354 0 3.723 1.326 5.443 3.046 1.326 1.325 2.002 2.397 3.441 5.302 1.692 3.44 1.833 3.638 2.877 3.976 1.241 0.423 3.835 2.002 3.835 2.341 0 0.113-0.649 0.282-1.438 0.338-2.115 0.226-2.313 0.62-0.931 1.861 0.649 0.564 1.862 1.438 2.736 1.918l1.579 0.902-0.733-0.931c-0.423-0.508-1.297-1.297-1.974-1.72s-1.213-0.874-1.213-0.987c0-0.113 0.479-0.31 1.072-0.395 1.579-0.282 2.030-0.423 2.030-0.705 0-0.423-2.848-2.566-4.202-3.159-1.156-0.536-1.297-0.762-2.792-3.835-1.326-2.82-1.861-3.61-3.553-5.302-2.171-2.171-3.666-3.102-5.584-3.384-0.649-0.113-1.551-0.451-1.946-0.733-0.931-0.705-2.82-0.959-3.272-0.479z"}}]})(e)}},2709:function(e,n,r){r.d(n,{IeF:function(){return o},LRI:function(){return i},t$b:function(){return a}});var t=r(1260);function o(e){return(0,t.w_)({tag:"svg",attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"title",attr:{},child:[]},{tag:"path",attr:{d:"M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"}}]})(e)}function i(e){return(0,t.w_)({tag:"svg",attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"title",attr:{},child:[]},{tag:"path",attr:{d:"M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"}}]})(e)}function a(e){return(0,t.w_)({tag:"svg",attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"title",attr:{},child:[]},{tag:"path",attr:{d:"M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"}}]})(e)}}}]);