"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"===("undefined"==typeof exports?"undefined":_typeof(exports))?require("jquery"):jQuery)}(function(t){function e(a,i){this.$element=t(a),this.options=t.extend({},e.DEFAULTS,t.isPlainObject(i)&&i),this.init()}var a=window._,i=t(document),n="qor.product.variants",r="enable."+n,s="disable."+n,o="qor.replicator",l="added.qor.replicator",d='.qor-product__property select[data-toggle="qor.chooser"]',c=".qor-product__property-selector",h=".qor-product__table tbody",u=".qor-product__container",p=".qor-fieldset__add",f="qor_variants_id_",v="should_remove",m=".qor-fieldset[variant-data]";return e.prototype={constructor:e,init:function(){var t=this.$element;this.bind(),this.variants={},this.productMetas=[],this.templateData=[],this.templateData=[],this.$tbody=t.find(h),this.$replicatorBtn=t.find(p),this.initMetas()},bind:function(){i.on(l,this.addVariantReplicator.bind(this)),this.$element.on("select2:select select2:unselect",d,this.selectVariants.bind(this))},unbind:function(){},initMetas:function(){var e=this.$element.find("td.qor-product__meta");a.each(e,function(e){this.productMetas.push(t(e).data("inputName"))}.bind(this)),this.setTemplate()},removeSpace:function(t){return t.toString().replace(/\s/g,"")},setTemplate:function(){var t=this.productMetas,e="<tr>";a.each(t,function(t){e=e+"<td>[["+t+"]]</td>"}.bind(this)),this.template=e+"</tr>"},selectVariants:function(e){var a=t(e.target).closest(c).data("variant-type"),i=e.params.data,n=i.selected,r=i.text||i.title||i.Name,s=a+"s",o={};this.variants[s]=this.variants[s]||[],n?(o[a]=r,o.id=i.id,this.variants[s].push(o)):(o=this.variants[s].filter(function(t){return t[a]!=r}),this.variants[s]=o),this.renderVariants()},renderVariants:function(){var t=this.variants,e=[];return e=Object.keys(t).filter(function(e){return t[e].length>0}),0===e.length?void this.$tbody.html(""):(this.variantsKey=e,void this.convertVariantsData())},convertVariantsData:function(){var t=this.variants,e=[],i=this.variantsKey;if(a.each(i,function(a){e.push(t[a].length)}),this.lastTemplateData=this.templateData,this.templateData=[],1===i.length)for(var n=t[i[0]],r=0,s=n.length;s>r;r++){var o=n[r],l=a.keys(o)[0],d=o[l],c={};c[l]=d,c.id=o.id,c.variantID=""+f+d.replace(/\s/g,""),this.templateData.push(c)}else this.handleMultipleVariantsData(e,this.generateData.bind(this));this.renderVariantsTable()},renderVariantsTable:function(){var t=this.$tbody,e=this.template,a=this.templateData;t.html("");for(var i=0,n=a.length;n>i;i++)t.append(window.Mustache.render(e,a[i]));this.doReplicator()},generateData:function(t){for(var e=this.variantsKey,i=this.variants,n=void 0,r={},s=0,o=t.length;o>s;s++){var l=i[e[s]][t[s]];r[e[s]+"_ID"]=l.id,r=Object.assign({},r,l)}delete r.id,n=a.values(r).map(this.removeSpace),r.variantID=""+f+n.join("_"),this.templateData.push(r)},handleMultipleVariantsData:function(t,e){this.convertMultipleVariantsData(t,e,[],0)},convertMultipleVariantsData:function(t,e,a,i){if(0==t.length)e(a);else{var n=t.slice(1);for(a[i]=0;a[i]<t[0];++a[i])this.convertMultipleVariantsData(n,e,a,i+1)}},addVariantReplicator:function(t,e,a){e.attr({"variant-data":JSON.stringify(a),id:a.variantID}).hide(),this.syncReplicatorData(e,a)},syncReplicatorData:function(t,e){for(var a=Object.keys(e),i=0,n=a.length;n>i;i++){var r=t.find("[name$="+a[i]+"]").not('[type="hidden"]'),s=void 0;r.length&&r.is("select")&&r.data("remote-data")&&(s=a[i]+"s_ID",r.append("<option value='"+(e.id||e[s])+"'>"+e[a[i]]+"</option>").trigger("change"))}},doReplicator:function(){var e=this,i=this.templateData,n=this.lastTemplateData,r=void 0,s=[];this.$element.find(m).addClass(v);for(var l=function(e,o){var l=i[e];if(r=a.filter(n,function(t){return a.isEqual(t,l)}),r.length){var d=t("#"+r[0].variantID);d.length&&d.removeClass(v)}else s.push(l)},d=0,c=i.length;c>d;d++)l(d,c);this.replicator=this.replicator||this.$element.find(u).data(o),setTimeout(function(){e.replicator.addReplicators(s,e.$replicatorBtn)},500),this.$element.find(m+"."+v).remove()},destroy:function(){this.unbind(),this.$element.removeData(n)}},e.plugin=function(a){return this.each(function(){var i=t(this),r=i.data(n),s=void 0;if(!r){if(/destroy/.test(a))return;i.data(n,r=new e(this,a))}"string"==typeof a&&t.isFunction(s=r[a])&&s.apply(r)})},t(function(){var a='[data-toggle="qor.product.variants"]';t(document).on(s,function(i){e.plugin.call(t(a,i.target),"destroy")}).on(r,function(i){e.plugin.call(t(a,i.target))}).triggerHandler(r)}),e});