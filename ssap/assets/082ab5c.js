(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{577:function(t,e,a){var r=a(578);r.__esModule&&(r=r.default),"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);(0,a(20).default)("1c8f4490",r,!0,{sourceMap:!1})},578:function(t,e,a){var r=a(19)((function(t){return t[1]}));r.push([t.i,'.theme--light.v-alert .v-alert--prominent .v-alert__icon:after{background:rgba(0,0,0,.12)}.theme--dark.v-alert .v-alert--prominent .v-alert__icon:after{background:hsla(0,0%,100%,.12)}.v-sheet.v-alert{border-radius:4px}.v-sheet.v-alert:not(.v-sheet--outlined){box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.v-sheet.v-alert.v-sheet--shaped{border-radius:16px 4px}.v-alert{display:block;font-size:16px;margin-bottom:16px;padding:16px;position:relative;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-alert:not(.v-sheet--tile){border-radius:4px}.v-application--is-ltr .v-alert>.v-alert__content,.v-application--is-ltr .v-alert>.v-icon{margin-right:16px}.v-application--is-rtl .v-alert>.v-alert__content,.v-application--is-rtl .v-alert>.v-icon{margin-left:16px}.v-application--is-ltr .v-alert>.v-icon+.v-alert__content{margin-right:0}.v-application--is-rtl .v-alert>.v-icon+.v-alert__content{margin-left:0}.v-application--is-ltr .v-alert>.v-alert__content+.v-icon{margin-right:0}.v-application--is-rtl .v-alert>.v-alert__content+.v-icon{margin-left:0}.v-alert__border{border-style:solid;border-width:4px;content:"";position:absolute}.v-alert__border:not(.v-alert__border--has-color){opacity:.26}.v-alert__border--left,.v-alert__border--right{bottom:0;top:0}.v-alert__border--bottom,.v-alert__border--top{left:0;right:0}.v-alert__border--bottom{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit;bottom:0}.v-application--is-ltr .v-alert__border--left{border-bottom-left-radius:inherit;border-top-left-radius:inherit;left:0}.v-application--is-ltr .v-alert__border--right,.v-application--is-rtl .v-alert__border--left{border-bottom-right-radius:inherit;border-top-right-radius:inherit;right:0}.v-application--is-rtl .v-alert__border--right{border-bottom-left-radius:inherit;border-top-left-radius:inherit;left:0}.v-alert__border--top{border-top-left-radius:inherit;border-top-right-radius:inherit;top:0}.v-alert__content{flex:1 1 auto}.v-application--is-ltr .v-alert__dismissible{margin:-16px -8px -16px 8px}.v-application--is-rtl .v-alert__dismissible{margin:-16px 8px -16px -8px}.v-alert__icon{align-self:flex-start;border-radius:50%;height:24px;min-width:24px;position:relative}.v-application--is-ltr .v-alert__icon{margin-right:16px}.v-application--is-rtl .v-alert__icon{margin-left:16px}.v-alert__icon.v-icon{font-size:24px}.v-alert__wrapper{align-items:center;border-radius:inherit;display:flex}.v-application--is-ltr .v-alert--border.v-alert--prominent .v-alert__icon{margin-left:8px}.v-application--is-rtl .v-alert--border.v-alert--prominent .v-alert__icon{margin-right:8px}.v-alert--dense{padding-bottom:8px;padding-top:8px}.v-alert--dense .v-alert__border{border-width:medium}.v-alert--outlined{background:transparent!important;border:thin solid!important}.v-alert--outlined .v-alert__icon{color:inherit!important}.v-alert--prominent .v-alert__icon{align-self:center;height:48px;min-width:48px}.v-alert--prominent .v-alert__icon.v-icon{font-size:32px}.v-alert--prominent .v-alert__icon.v-icon:after{background:currentColor!important;border-radius:50%;bottom:0;content:"";left:0;opacity:.16;position:absolute;right:0;top:0}.v-alert--prominent.v-alert--dense .v-alert__icon.v-icon:after{transform:scale(1)}.v-alert--text{background:transparent!important}.v-alert--text:before{background-color:currentColor;border-radius:inherit;bottom:0;content:"";left:0;opacity:.12;pointer-events:none;position:absolute;right:0;top:0}',""]),r.locals={},t.exports=r},586:function(t,e,a){"use strict";a(10),a(8),a(15),a(16),a(11),a(4),a(9);var r=a(0),o=(a(42),a(577),a(108)),s=a(551),i=a(97),n=a(52),l=a(22),c=a(256),d=a(7),v=a(17),u=a(1);function _(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function p(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?_(Object(a),!0).forEach((function(e){Object(r.a)(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):_(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}e.a=Object(d.a)(o.a,n.a,c.a).extend({name:"v-alert",props:{border:{type:String,validator:function(t){return["top","right","bottom","left"].includes(t)}},closeLabel:{type:String,default:"$vuetify.close"},coloredBorder:Boolean,dense:Boolean,dismissible:Boolean,closeIcon:{type:String,default:"$cancel"},icon:{default:"",type:[Boolean,String],validator:function(t){return"string"==typeof t||!1===t}},outlined:Boolean,prominent:Boolean,text:Boolean,type:{type:String,validator:function(t){return["info","error","success","warning"].includes(t)}},value:{type:Boolean,default:!0}},computed:{__cachedBorder:function(){if(!this.border)return null;var t={staticClass:"v-alert__border",class:Object(r.a)({},"v-alert__border--".concat(this.border),!0)};return this.coloredBorder&&((t=this.setBackgroundColor(this.computedColor,t)).class["v-alert__border--has-color"]=!0),this.$createElement("div",t)},__cachedDismissible:function(){var t=this;if(!this.dismissible)return null;var e=this.iconColor;return this.$createElement(s.a,{staticClass:"v-alert__dismissible",props:{color:e,icon:!0,small:!0},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:function(){return t.isActive=!1}}},[this.$createElement(i.a,{props:{color:e}},this.closeIcon)])},__cachedIcon:function(){return this.computedIcon?this.$createElement(i.a,{staticClass:"v-alert__icon",props:{color:this.iconColor}},this.computedIcon):null},classes:function(){var t=p(p({},o.a.options.computed.classes.call(this)),{},{"v-alert--border":Boolean(this.border),"v-alert--dense":this.dense,"v-alert--outlined":this.outlined,"v-alert--prominent":this.prominent,"v-alert--text":this.text});return this.border&&(t["v-alert--border-".concat(this.border)]=!0),t},computedColor:function(){return this.color||this.type},computedIcon:function(){return!1!==this.icon&&("string"==typeof this.icon&&this.icon?this.icon:!!["error","info","success","warning"].includes(this.type)&&"$".concat(this.type))},hasColoredIcon:function(){return this.hasText||Boolean(this.border)&&this.coloredBorder},hasText:function(){return this.text||this.outlined},iconColor:function(){return this.hasColoredIcon?this.computedColor:void 0},isDark:function(){return!(!this.type||this.coloredBorder||this.outlined)||l.a.options.computed.isDark.call(this)}},created:function(){this.$attrs.hasOwnProperty("outline")&&Object(v.a)("outline","outlined",this)},methods:{genWrapper:function(){var t=[Object(u.n)(this,"prepend")||this.__cachedIcon,this.genContent(),this.__cachedBorder,Object(u.n)(this,"append"),this.$scopedSlots.close?this.$scopedSlots.close({toggle:this.toggle}):this.__cachedDismissible];return this.$createElement("div",{staticClass:"v-alert__wrapper"},t)},genContent:function(){return this.$createElement("div",{staticClass:"v-alert__content"},Object(u.n)(this))},genAlert:function(){var t={staticClass:"v-alert",attrs:{role:"alert"},on:this.listeners$,class:this.classes,style:this.styles,directives:[{name:"show",value:this.isActive}]};this.coloredBorder||(t=(this.hasText?this.setTextColor:this.setBackgroundColor)(this.computedColor,t));return this.$createElement("div",t,[this.genWrapper()])},toggle:function(){this.isActive=!this.isActive}},render:function(t){var e=this.genAlert();return this.transition?t("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[e]):e}})},598:function(t,e,a){"use strict";a.r(e);var r=a(586),o=a(573),s=a(570),i=a(572),n=(a(38),{props:{charge:{type:Object,default:null}}}),l=a(45),c=Object(l.a)(n,(function(){var t=this,e=t._self._c;return e(s.a,[e(r.a,{attrs:{border:"left","colored-border":"",color:t.charge.isActive?"deposit":"black",elevation:"1"}},[e(i.a,{attrs:{dense:""}},[e(o.a,{staticClass:"font-weight-bold",attrs:{cols:"8"}},[t._v(" "+t._s(t.charge.name))]),t._v(" "),e(o.a,{staticClass:"d-flex justify-start",attrs:{cols:"4"}}),t._v(" "),e(o.a,{staticClass:"font-weight-bold",attrs:{cols:"8"}},[t._v(" Amount")]),t._v(" "),e(o.a,{staticClass:"d-flex justify-start",attrs:{cols:"4"}},[t._v("\n        "+t._s(t._f("currency")(t.charge.amountOrPercentage))+"\n        "+t._s(t.charge.chargeCalculationType.value))]),t._v(" "),e(o.a,{staticClass:"font-weight-bold",attrs:{cols:"8"}},[t._v(" Paid:")]),t._v(" "),e(o.a,{staticClass:"d-flex justify-start",attrs:{cols:"4"}},[t._v(t._s(t.charge.currency.code)+" "+t._s(t._f("currency")(t.charge.amountPaid)))]),t._v(" "),e(o.a,{staticClass:"font-weight-bold",attrs:{cols:"8"}},[t._v(" Waved:")]),t._v(" "),e(o.a,{staticClass:"d-flex justify-start",attrs:{cols:"4"}},[t._v(t._s(t.charge.currency.code)+"\n        "+t._s(t._f("currency")(t.charge.amountWaived)))]),t._v(" "),e(o.a,{staticClass:"font-weight-bold",attrs:{cols:"8"}},[t._v(" Outstanding:")]),t._v(" "),e(o.a,{staticClass:"d-flex justify-start",attrs:{cols:"4"}},[t._v(t._s(t.charge.currency.code)+"\n        "+t._s(t._f("currency")(t.charge.amountOutstanding)))])],1)],1)],1)}),[],!1,null,null,null);e.default=c.exports},625:function(t,e,a){"use strict";a.r(e);var r=a(552),o=a(236),s=a(570),i=a(554),n=a(153),l=a(238),c=a(152),d=a(239),v=a(14),u=a(240),_=a(242),p=a(572),h=a(565),m=a(675),b=a(711),f=a(710),g=a(670),y=a(637),C=a(66),x=a(158),w={components:{"charge-component":a(598).default},props:{account:{type:Object,default:null}},data:function(){return{details:!0,tab:null,selected:null,items:["Transactions","Charges","QR Code"]}}},k=a(45),O=Object(k.a)(w,(function(){var t=this,e=t._self._c;return e(s.a,{staticClass:"ma-0 pa-0",attrs:{fluid:""}},[e(s.a,{staticClass:"ma-0 pa-0",attrs:{fluid:""}},[t.details?e(o.a,{attrs:{tile:""}},[e(l.a,{attrs:{dense:""}},[e(c.a,{staticClass:"py-0 my-0",attrs:{"two-lin":"",dense:"","two-line":""}},[e(v.b,[e(v.d,[t._v("Account Balance")]),t._v(" "),e(v.c,{staticClass:"text-body-2 font-weight-normal mt-1"},[t._v(t._s(t.account.currency.code)+"\n              "+t._s(t._f("currency")(t.account.summary.accountBalance)))])],1)],1),t._v(" "),e(c.a,{staticClass:"py-0 my-0",attrs:{dense:"","two-lin":""}},[e(v.b,[e(v.d,[t._v("Account Status")]),t._v(" "),e(v.c,{staticClass:"text-body-2 font-weight-normal mt-1"},[e(n.a,{attrs:{"x-small":"",color:t.account.status.active?"yellow darken-2":"gray"}},[t._v("mdi-circle")]),t._v("  "+t._s(t.account.status.value)+"\n            ")],1)],1)],1),t._v(" "),e(c.a,{staticClass:"py-0 my-0",attrs:{dense:"","two-line":""}},[e(v.b,[e(v.d,[t._v("Account Number")]),t._v(" "),e(v.c,{staticClass:"text-body-2 font-weight-normal mt-1"},[t._v("\n              "+t._s(t.account.accountNo)+"\n            ")])],1)],1),t._v(" "),e(c.a,{staticClass:"py-0 my-0",attrs:{dense:"","two-line":""}},[e(v.b,[e(v.d,[t._v("Nominal Interest Rate")]),t._v(" "),e(v.c,{staticClass:"text-body-2 font-weight-normal mt-1"},[t._v("\n              "+t._s(t._f("percentage")(t.account.nominalAnnualInterestRate))+"\n            ")])],1)],1),t._v(" "),e(c.a,{staticClass:"py-0 my-0",attrs:{dense:"","two-line":""}},[e(v.b,[e(v.d,[t._v("Total deposits")]),t._v(" "),e(v.c,{staticClass:"text-body-2 font-weight-normal mt-1"},[t._v("\n              "+t._s(t.account.currency.code)+"\n              "+t._s(t._f("currency")(t.account.summary.totalDeposits))+"\n            ")])],1)],1),t._v(" "),e(c.a,{staticClass:"py-0 my-0",attrs:{dense:"","two-line":""}},[e(v.b,[e(v.d,[t._v("Total Withdrawals")]),t._v(" "),e(v.c,{staticClass:"text-body-2 font-weight-normal mt-1"},[t._v("\n              "+t._s(t.account.summary.totalWithdrawals?t.account.currency.code:"")+"\n              "+t._s(t._f("currency")(t.account.summary.totalWithdrawals?t.account.summary.totalWithdrawals:"No withdrawals"))+"\n            ")])],1)],1),t._v(" "),e(c.a,{staticClass:"pr-5"},[e(p.a,[e(h.a),t._v(" "),e(r.a,{staticClass:"text-capitalize mr-3",attrs:{color:"primary"}},[t._v("Deposit")]),t._v(" "),e(r.a,{staticClass:"text-capitalize",attrs:{color:"primary"}},[t._v("Make Transfer")])],1)],1)],1)],1):t._e(),t._v(" "),t.details?e(s.a,{staticClass:"ma-0 pa-0",attrs:{fluid:""}},[e("p",{staticClass:"pa-3"},[t._v("Last Transaction Details")]),t._v(" "),e(o.a,[e(l.a,[e(c.a,{staticClass:"py-0 my-0",attrs:{dense:"","two-line":""}},[e(v.b,[e(v.d,[t._v("Last Transaction")]),t._v(" "),e(v.c,{staticClass:"text-body-2 font-weight-normal mt-1"},[t._v("\n                "+t._s(t._f("dateformat")(t.account.lastActiveTransactionDate))+"\n              ")])],1)],1),t._v(" "),e(c.a,{staticClass:"py-0 my-0",attrs:{dense:"","two-line":""}},[e(v.b,[e(v.d,[t._v("Made On")]),t._v(" "),e(v.c,{staticClass:"text-body-2 font-weight-normal mt-1"},[t._v("\n                "+t._s(t._f("dateformat")(t.account.lastActiveTransactionDate))+"\n              ")])],1)],1),t._v(" "),e(c.a,{staticClass:"py-0 my-0",attrs:{dense:"","two-line":""}},[e(v.b,[e(v.d,[t._v("Min. Required Balance")]),t._v(" "),e(v.c,{staticClass:"text-body-2 font-weight-normal mt-1"},[t._v("\n                "+t._s(t.account.currency.code)+"\n                "+t._s(t._f("currency")(t.account.minRequiredOpeningBalance))+"\n              ")])],1)],1)],1)],1),t._v(" "),e("p",{staticClass:"pa-3"},[t._v("Monitor")]),t._v(" "),e(o.a,[e(l.a,[e(c.a,{staticClass:"py-0 my-0",attrs:{dense:"","two-line":""},on:{click:function(e){t.details=!t.details}}},[e(u.a,{attrs:{color:"grey lighten-3"}},[e(n.a,{attrs:{color:"primary",dark:""}},[t._v(" mdi-swap-horizontal ")])],1),t._v(" "),e(v.b,[e(v.d,[t._v("Transactions")]),t._v(" "),e(v.c,{staticClass:"mt-1"},[t._v("\n                View Transactions\n              ")])],1)],1),t._v(" "),e(c.a,{staticClass:"py-0 my-0",attrs:{dense:"","two-line":""},on:{click:function(e){t.details=!t.details,t.tab=1}}},[e(u.a,{attrs:{color:"grey lighten-3"}},[e(n.a,{attrs:{color:"primary",dark:""}},[t._v("mdi-currency-rub ")])],1),t._v(" "),e(v.b,[e(v.d,[t._v("Savings Charges")]),t._v(" "),e(v.c,{staticClass:"mt-1"},[t._v("\n                View Charges\n              ")])],1)],1),t._v(" "),e(c.a,{staticClass:"py-0 my-0",attrs:{dense:"","two-line":""},on:{click:function(e){t.details=!t.details,t.tab=2}}},[e(u.a,{attrs:{color:"grey lighten-3"}},[e(n.a,{attrs:{color:"primary",dark:""}},[t._v(" mdi-qrcode ")])],1),t._v(" "),e(v.b,[e(v.d,[t._v("QR Code")]),t._v(" "),e(v.c,{staticClass:"mt-1"},[t._v("\n                View QR Code for this account\n              ")])],1)],1)],1)],1)],1):e(o.a,{attrs:{tile:"",flat:""}},[e(C.a,{attrs:{color:"primary",dark:"",flat:""},scopedSlots:t._u([{key:"extension",fn:function(){return[e(f.a,{attrs:{grow:"","align-with-title":""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[e(y.a,{attrs:{color:"blue"}}),t._v(" "),t._l(t.items,(function(a){return e(m.a,{key:a},[t._v("\n              "+t._s(a)+"\n            ")])}))],2)]},proxy:!0}])},[e(x.b,[t._v("Account Details")]),t._v(" "),e(h.a),t._v(" "),e(r.a,{attrs:{icon:""},on:{click:function(e){t.details=!t.details}}},[e(n.a,[t._v("mdi-eye-off")])],1)],1),t._v(" "),e(g.a,{model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[e(b.a,[e(o.a,{attrs:{flat:""}},[e(l.a,{staticClass:"py-0 my-0",attrs:{dense:"","two-line":""}},[e(_.a,{attrs:{"active-class":"pink--text",multiple:""},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},t._l(t.account.transactions,(function(a,r){return e("div",{key:r},[e(c.a,{key:a.id},[e(u.a,[e(n.a,{attrs:{color:"red"}},[t._v(t._s(a.transactionType.interestPosting||a.transactionType.deposit?"mdi-chevron-double-up":"mdi-chevron-double-down"))])],1),t._v(" "),e(v.b,[e(v.d,[t._v(t._s(t._f("dateformat")(a.date)))]),t._v(" "),e(v.c,{domProps:{textContent:t._s(a.transactionType.value)}})],1),t._v(" "),e(d.a,[e(v.a,{staticClass:"text-body-2 black--text"},[t._v("\n                        "+t._s(a.currency.code)+"\n                        "+t._s(t._f("currency")(a.amount)))]),t._v(" "),e(v.a,{staticClass:"text-body-1"},[t._v("\n                        "+t._s(a.currency.code)+"\n                        "+t._s(t._f("currency")(a.runningBalance))+"\n                      ")])],1)],1),t._v(" "),e(i.a,{key:r})],1)})),0)],1)],1)],1),t._v(" "),e(b.a,[e(l.a,{attrs:{"three-line":""}},t._l(t.account.charges,(function(t,a){return e(c.a,{key:a,staticClass:"ma-0 pa-0"},[e("charge-component",{attrs:{charge:t}})],1)})),1)],1),t._v(" "),e(b.a,[e(o.a,[e(s.a,{staticClass:"fill-height"},[e(p.a,{staticClass:"fill-height",attrs:{align:"center",justify:"center"}},[e(n.a,{attrs:{size:"200"}},[t._v("mdi-qrcode")])],1)],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=O.exports}}]);