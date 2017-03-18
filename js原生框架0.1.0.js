/*
* @Author: Administrator
* @Date:   2017-03-17 22:21:24
* @Last Modified by:   Administrator

* @Last Modified time: 2017-03-18 20:49:23

*/
(function (global){
	'use strict';
	var document=global.document,
		arr=[],
		push=arr.push,
		splice=arr.splice;
	function itcast(selector){
		return new itcast.fn.init(selector);
	}
	//功能类方法
	itcast.fn=itcast.prototype={
		constructor:itcast,
		length:0,
		//伪数组转化成数组的toArray方法
		toArray:function(){
			return slice.call(this);
		},
		//给据索引获取dom元素
		get:function(index){
			if( index ==null){
				return this.toArray();
			}
			return index<0?this[this.length+index] : this[index];

		},
		//给据索引获取dom元素,返回值为itcast类型
		eq:function(index){
			return itcast (index<0?this[this.length+index] : this[index]) ;
		},
		//获取itcast对象上的第一个元素
		first:function(){
			return this.eq(0);
		},
		//获取itcast对象上的最后一个元素
		last:function(){
			return this.eq(-1);
		},
		//遍历itcast对象上的元素
		each:function(callback){
			itcast.each(this,callback);
			return this;

		},
		splice:splice

	}
	var init=itcast.fn.init=function(selector){
		//selector 参数类型与逻辑
		if( !selector ){
			return this;
		}else if(itcast.isString(selector)){
			if(itcast.isHTML(selector)){
				push.apply(this,itcast.parseHTML(selector));
			}else{
				// console.log(document.querySelectorAll(selector));
				// console.log(typeof selector);
				push.apply(this,document.querySelectorAll( selector ));
				// console.log(this+1);
			}
		}else if(itcast.isDOM(selector)){
			this[0]=selector;
			this.length=1;
		}else if (itcast.isArrayLike(selector)){
			push.apply(this,selector);
		}else if(itcast.isFunction(selector)){
			document.addEventListener('DOMContentLoaded', function(){
				selector();
			});
		}

	}
	init.prototype=itcast.fn;
	//混入式继承
	itcast.extend=itcast.fn.extend=function (){
		var ags=arguments,
			i=0,
			l=ags.length,
			obj;
			for(;i<l;i++){
				obj=ags[i];
				for(var k in obj){
					this[k]=obj[k];
				}
			}
			return this;
	}
	//工具类型
	itcast.extend({
		//遍历数组或伪数组对象，或者枚举对象的属性
		each:function(obj, callback){
			var i=0,
				l=obj.length;
				if(itcast.isArrayLike(obj)){
					for(;i<l;i++){
						if(callback.call(obj[i],i,obj[i])===false){
							break;
						}
					}
				}else {
					for(i in obj){
						if(callback.call(obj[i],i,obj[i])===false){
							break;
						}
					}
				}
		},
		//获取内置对象类型
		type:function(obj){
			if(  obj == null) {
				return obj +'';
			}
			return typeof obj !=='object' ? typeof obj: 
					Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();

		},
		//把字符串转变成dom元素
		parseHTML:function(html){
			var i=0,
				node,
				art=[],
				div=document.createElement('div');
				div.innerHTML=html;
				for(node=div.firstChild; node;node=node.nextSibling){
					if(node.nodeType==1){
						art.push(node);
					}
				}
				return art;
		},
		//数组去重
		unique:function( arr ){
			var art=[];
			itcast.each(arr ,function (){
				if (art.indexOf(this)===-1 ) {
					art.push(this);

				}
			})
			return art;
		}
	})
	itcast.extend({
		//类型判断方法
		isString:function(obj){
			return typeof obj ==='string';
		},
		isHTML:function(obj){
			obj=obj+'';
			return   obj[0]==='<' && obj[obj.length-1]==='>' && obj.length>=3;
		},
		isDOM:function(obj){
			return !!obj && !!obj.nodeType;
		},
		isArrayLike:function(obj){
			var length = !!obj && 'length' in obj && obj.length;
			var type=itcast.type(obj);
			if(itcast.isFunction(obj) || itcast.isWindow(obj)){
				return false;
			}
			return type ==='array' || length===0 || 
				typeof length ==='number' && (length-1) in obj && length>0;

		},
		isFunction:function (obj){
			return typeof obj === 'function';
		},
		isWindow:function(obj){
			return !!obj && obj.window ==obj;
		}

	})
	//DOM模块
	itcast.fn.extend({
		//appendTo方法：将itcast对象上的所有dom元素，分别追加给目标元素。
		appendTo:function (target){
			target=itcast(target);
			var node,
				that=this,
				ret=[];
			target.each(function (i,elem) {
				that.each(function (){
					node=i===0 ? this : this.cloneNode(true);
					elem.appendChild(node);
					ret.push(node);

				})
			})
			return itcast(ret);
		},
		//将source上的所有元素，追加给itcast对象。
		append:function( source ){
			source=itcast(source);
			source.appendTo(this);
			return this;
		},

		//获取itcast对象上的所有dom元素的下一个兄弟元素节点，返回值为 itcast对象
		next:function (){
			var ret=[],
				node;
			this.each(function (i,elem){
				node=elem.nextSibling;
				while(node){
					if(node.nodeType===1){
						ret.push(node);
						break;
					}
					node=node.nextSibling;
				}
			});
			return itcast (ret);
		},
		nextAll:function(){
			var ret=[],
				node;
				this.each(function (i,elem) {
					node=elem.nextSibling;
					while (node){
						if(node.nodeType===1){
							ret.push(node);
						}
						node=node.nextSibling;
					}
				});
				return itcast(itcast.unique(ret));
		}

	})

	if ( typeof define === 'function' ){
    define( function (){
      return itcast;
    } );
  } else if ( typeof exports !== 'undefined' ) {
    module.exports = itcast;
  } else {
    global.$ = itcast;
  }
}(window))
