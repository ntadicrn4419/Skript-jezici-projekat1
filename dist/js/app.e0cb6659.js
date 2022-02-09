(function(e){function t(t){for(var r,i,s=t[0],u=t[1],c=t[2],m=0,f=[];m<s.length;m++)i=s[m],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&f.push(a[i][0]),a[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);l&&l(t);while(f.length)f.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,s=1;s<n.length;s++){var u=n[s];0!==a[u]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},o=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var l=u;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"2ae9":function(e,t,n){"use strict";n("b878")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",[n("b-navbar",{attrs:{toggleable:"sm",type:"dark",variant:"info"}},[n("b-navbar-brand",{attrs:{to:"/"}},[e._v("Tennis club")]),n("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),n("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[n("b-navbar-nav",[n("b-nav-item",{attrs:{to:"/"}},[e._v("Home")]),n("b-nav-item-dropdown",{attrs:{text:"Tournament",right:""}},e._l(e.tournaments,(function(t){return n("b-dropdown-item",{key:t.id,attrs:{to:"/tournament/"+t.id+"/"+t.name}},[e._v(" "+e._s(t.name)+" ")])})),1)],1),n("b-navbar-nav",{staticClass:"ml-auto"},[e.token?e._e():n("b-nav-item",{attrs:{to:"/register"}},[e._v("Register")]),e.token?n("b-nav-item",{on:{click:function(t){return e.logout()}}},[e._v("Log Out")]):n("b-nav-item",{attrs:{to:"/login"}},[e._v("Log In")]),n("b-nav-form",[n("b-form-input",{staticClass:"mr-sm-2",attrs:{size:"sm",placeholder:"Search"},model:{value:e.searchQuery,callback:function(t){e.searchQuery=t},expression:"searchQuery"}})],1),n("b-nav-form",[n("b-button",{staticClass:"my-2 my-sm-0",attrs:{size:"sm",type:"submit"},on:{click:e.search}},[e._v("Search")])],1)],1)],1)],1)],1),n("router-view",{staticClass:"page"})],1)},o=[],i=n("5530"),s=n("2f62"),u={name:"App",data:function(){return{searchQuery:""}},computed:Object(i["a"])({},Object(s["d"])(["tournaments","token"])),mounted:function(){this.fetchTournaments(),localStorage.token&&this.setToken(localStorage.token)},methods:Object(i["a"])(Object(i["a"])(Object(i["a"])({},Object(s["b"])(["fetchTournaments"])),Object(s["c"])(["removeToken","setToken"])),{},{search:function(e){e.preventDefault();var t=this.searchQuery;this.searchQuery="",this.$router.push({name:"Search",query:{q:t}})},logout:function(){this.removeToken()}}),sockets:{error:function(e){alert(e)}}},c=u,l=(n("034f"),n("2877")),m=Object(l["a"])(c,a,o,!1,null,null,null),f=m.exports;n("4de4"),n("d3b7"),n("e9c4");r["default"].use(s["a"]);var p=new s["a"].Store({state:{items:[],tournaments:[],imageIDs:[],token:""},mutations:{addItem:function(e,t){e.items.push(t)},addTournaments:function(e,t){e.tournaments=t},setImageIDs:function(e,t){e.imageIDs=t},addIDsToTournament:function(e,t){var n=e.tournaments.filter((function(e){return e.tournamentId==t.id}))[0];n["imageIDs"]=t.imageIDs},setToken:function(e,t){e.token=t,localStorage.token=t},removeToken:function(e){e.token="",localStorage.token=""},addComment:function(e,t){var n=e.items.filter((function(e){return e.objectID==t.artId}))[0];n&&n.comments.push(t.comment)}},actions:{fetchTournaments:function(e){var t=e.commit;fetch("/admin/tournaments").then((function(e){return e.json()})).then((function(e){t("addTournaments",e)}))},register:function(e,t){var n=e.commit;fetch("/api_register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(e){console.log("ovo je tkn",e),n("setToken",e.token)}))},login:function(e,t){var n=e.commit;fetch("/api_login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(e){e.msg?alert(e.msg):n("setToken",e.token)}))},socket_comment:function(e,t){var n=e.commit,r=JSON.parse(t);n("addComment",{artId:r.artId,comment:r})}}}),d=n("5132"),b=n.n(d),h=n("5f5b"),g=n("b1e0"),v=(n("f9e3"),n("2dd8"),n("8c4f")),y=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[r("Header",{attrs:{subtitle:"Home"}}),r("img",{attrs:{alt:"Vue logo",src:n("af81")}})],1)},j=[],_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"title"},[n("h1",[e._v("The tennis coaches association")]),e.subtitle?n("h3",[e._v(e._s(e.subtitle))]):e._e()])},k=[],I={name:"Header",props:{subtitle:String}},O=I,w=(n("2ae9"),Object(l["a"])(O,_,k,!1,null,"5846cc44",null)),S=w.exports,x={name:"Home",components:{Header:S}},T=x,$=Object(l["a"])(T,y,j,!1,null,null,null),D=$.exports,P=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Header",{attrs:{subtitle:e.subtitle}}),n("ImageList")],1)},H=[],q=(n("b0c0"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("b-pagination",{attrs:{"total-rows":e.objects.length,"per-page":e.perPage,"aria-controls":"image-table"},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}}),n("b-table",{attrs:{id:"image-table",hover:"",fixed:"",items:e.items,fields:e.fields,small:"","per-page":e.perPage,"current-page":e.currentPage},on:{"row-clicked":e.rowClicked},scopedSlots:e._u([{key:"cell(isHighlight)",fn:function(e){return[e.value?n("b-icon",{attrs:{icon:"check-square",variant:"success",scale:"2"}}):n("b-icon",{attrs:{icon:"x-circle",variant:"danger",scale:"2"}})]}}])}),n("b-pagination",{attrs:{"total-rows":e.objects.length,"per-page":e.perPage,"aria-controls":"image-table"},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1)}),E=[],C=(n("d81d"),n("fb6a"),{name:"ImageList",data:function(){return{fields:["name","location","startDate","endDate"],items:[],currentPage:1,perPage:3}},props:{objects:Array},watch:{currentPage:function(e,t){var n=this;this.objects.slice(3*e,3*(e+1)).map((function(e){fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/".concat(e)).then((function(e){return e.json()})).then((function(e){return n.items.push(e)}))}))}},mounted:function(){var e=this;this.objects.slice(3*this.currentPage,3*(this.currentPage+1)).map((function(t){fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/".concat(t)).then((function(e){return e.json()})).then((function(t){return e.items.push(t)}))}))},methods:{rowClicked:function(e,t){this.$router.push({name:"Single",params:{id:e.objectID}})}}}),L=C,Q=(n("bd91"),Object(l["a"])(L,q,E,!1,null,"32bd3fc2",null)),J=Q.exports,N={name:"Tournament",components:{Header:S,ImageList:J},data:function(){return{subtitle:"",tourID:null}},watch:{$route:function(){this.subtitle=this.$route.params.name,this.tourID=this.$route.params.id,this.fetchIDsByTournament(this.tourID)}},mounted:function(){this.subtitle=this.$route.params.name,this.tourID=this.$route.params.id,this.fetchIDsByTournament(this.tourID)},methods:Object(i["a"])({},Object(s["b"])(["fetchIDsByTournament"]))},A=N,M=Object(l["a"])(A,P,H,!1,null,"5138205a",null),R=M.exports,B=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("Header",{attrs:{subtitle:e.subtitle}}),e.imageIDs?n("ImageList",{attrs:{objects:e.imageIDs}}):e._e()],1)},z=[],Y={name:"Search",components:{Header:S,ImageList:J},data:function(){return{subtitle:"Search results: ",imageIDs:null}},mounted:function(){var e=this;fetch("http://colectionapi.metmuseum.org/public/collection/search?q=".concat(this.$route.query.q)).then((function(e){return e.json()})).then((function(t){e.subtitle+=t.total,e.imageIDs=t.objectIDs}))}},V=Y,F=Object(l["a"])(V,B,z,!1,null,null,null),G=F.exports,K=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("Header",{attrs:{subtitle:e.subtitle}}),e.image?n("div",[e.image.primaryImageSmall?n("img",{attrs:{src:e.image.primaryImageSmall}}):n("p",[e._v("Image not available")]),n("ul",[n("li",[e._v("Author: "+e._s(e.image.artistDisplayName))]),n("li",[e._v("Highlight: "+e._s(e.image.isHighlight))]),n("li",[e._v("Year acquired: "+e._s(e.image.accessionYear))])])]):e._e()],1)},U=[],W={name:"Single",components:{Header:S},data:function(){return{image:null,subtitle:""}},mounted:function(){var e=this;fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/".concat(this.$route.params.id)).then((function(e){return e.json()})).then((function(t){e.image=t,e.subtitle=e.image.title}))}},X=W,Z=Object(l["a"])(X,K,U,!1,null,null,null),ee=Z.exports,te=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"register"}},[n("Header",{attrs:{subtitle:"Create account"}}),n("b-form",{on:{submit:e.onSubmit}},[n("b-form-group",{attrs:{label:"Name:","label-for":"name"}},[n("b-form-input",{attrs:{id:"name",placeholder:"Enter name",required:""},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),n("b-form-group",{attrs:{label:"Email address:","label-for":"email"}},[n("b-form-input",{attrs:{id:"email",type:"email",placeholder:"Enter email",required:""},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),n("b-form-group",{attrs:{label:"Password:","label-for":"password"}},[n("b-form-input",{attrs:{id:"password",type:"password",required:""},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),n("b-form-group",{attrs:{label:"Age:","label-for":"age"}},[n("b-form-input",{attrs:{id:"age",type:"number",required:""},model:{value:e.form.age,callback:function(t){e.$set(e.form,"age",t)},expression:"form.age"}})],1),n("b-form-group",{attrs:{label:"Player ID:","label-for":"playerId"}},[n("b-form-input",{attrs:{id:"playerId",type:"number",required:""},model:{value:e.form.playerId,callback:function(t){e.$set(e.form,"playerId",t)},expression:"form.playerId"}})],1),n("b-form-group",{attrs:{label:"Role:","label-for":"role"}},[n("b-form-input",{attrs:{id:"role",required:""},model:{value:e.form.role,callback:function(t){e.$set(e.form,"role",t)},expression:"form.role"}})],1),n("br"),n("b-button",{attrs:{type:"submit",variant:"primary"}},[e._v("Submit")])],1)],1)},ne=[],re={name:"Register",components:{Header:S},data:function(){return{form:{name:"",email:"",password:"",age:"",playerId:"",role:""}}},methods:Object(i["a"])(Object(i["a"])({},Object(s["b"])(["register"])),{},{onSubmit:function(e){e.preventDefault(),this.register(this.form),this.$router.push({name:"Home"})}})},ae=re,oe=Object(l["a"])(ae,te,ne,!1,null,"1abdbd1c",null),ie=oe.exports,se=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"login"}},[n("Header",{attrs:{subtitle:"Log In"}}),n("b-form",{on:{submit:e.onSubmit}},[n("b-form-group",{attrs:{label:"Email address:","label-for":"email"}},[n("b-form-input",{attrs:{id:"email",type:"email",placeholder:"Enter email",required:""},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),n("b-form-group",{attrs:{label:"Password:","label-for":"password"}},[n("b-form-input",{attrs:{id:"password",type:"password",required:""},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),n("b-button",{attrs:{type:"submit",variant:"primary"}},[e._v("Submit")])],1)],1)},ue=[],ce={name:"Login",components:{Header:S},data:function(){return{form:{email:"",password:""}}},methods:Object(i["a"])(Object(i["a"])({},Object(s["b"])(["login"])),{},{onSubmit:function(e){e.preventDefault(),this.login(this.form),this.$router.push({name:"Home"})}})},le=ce,me=Object(l["a"])(le,se,ue,!1,null,"9a2b6772",null),fe=me.exports;r["default"].use(v["a"]);var pe=[{path:"/",name:"Home",component:D},{path:"/tournament/:id/:name",name:"Tournament",component:R},{path:"/search",name:"Search",component:G},{path:"/single/:id",name:"Single",component:ee},{path:"/register",name:"Register",component:ie},{path:"/login",name:"Login",component:fe}],de=new v["a"]({mode:"history",base:"/",routes:pe}),be=de;r["default"].use(h["a"]),r["default"].use(g["a"]),r["default"].use(new b.a({debug:!1,connection:"https://ntadic4419rn.herokuapp.com/",vuex:{store:p,actionPrefix:"socket_"}})),r["default"].config.productionTip=!1,new r["default"]({store:p,router:be,render:function(e){return e(f)}}).$mount("#app")},"85ec":function(e,t,n){},af81:function(e,t,n){e.exports=n.p+"img/tennis_logo.8425b6a4.jpg"},b192:function(e,t,n){},b878:function(e,t,n){},bd91:function(e,t,n){"use strict";n("b192")}});
//# sourceMappingURL=app.e0cb6659.js.map