/*
* @Author: Administrator
* @Date:   2017-03-17 22:21:24
* @Last Modified by:   Administrator

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
		//将itcast对象上的所有dom元素，追加到目标元素的最前边
		prependTo:function(target){
			target=itcast(target);
			var ret=[],
				node,
				that=this,
				firstChild;
			target.each(function (i,elem) {
				firstChild=elem.firstChild;
				that.each(function (){
					node=i==0? this:this.cloneNode(true);
					ret.push(node);
					elem.insertBefore(this,firstChild);
				})
			});
			return itcast(ret);
		},
		//将source上的所有元素，追加到itcast对象上所有目标元素的最前边
		prepend:function(source){
			source=itcast(source);
			source.prependTo(this);
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
		//获取itcast对象上的所有dom元素的下面所有兄弟元素节点，返回值为 itcast对象
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
		},
		remove : function (){
			return this.each(function (index, elem) {
				elem.parentNode.removeChild(this);
			});
		},
		//将itcast对象上所有dom元素清空
		empty:function(){
			return this.each(function ( i, elem){
				elem.innerHTML='';
			})
		},
		//在itcast对象所有元素的前面添加node节点
		before:function(node){
			return this.each(function (i,elem){
				node = itcast(itcast.isString(node)? document.createTextNode(node):node);
				node.each(function (j ,cur){
					elem.parentNode.insertBefore(i===0? cur : cur.cloneNode(true),elem);
				})
			})
		},
		//在itcast对象所有元素的后面面添加node节点
		after:function (node){
			return this.each(function (i,elem){
				var nextSibling=elem.nextSibling;
				node = itcast(itcast.isString(node)? document.createTextNode(node):node);
				node.each(function (j ,cur){
					elem.parentNode.insertBefore(i===0? cur : cur.cloneNode(true),nextSibling);
				})
			})

		},
		prev :function(){
			var ret=[];
			 this.each(function (i,elem){
				var node=elem.previousSibling;//获取上一个同级元素
				while(node){
					if(node.nodeType===1){
						ret.push(node);
						break;
					}
					node=node.previousSibling;
				}
			} )
			 return itcast(ret);
		},
		prevAll:function(){
			var ret=[];
			this.each(function(){
				var node=this.previousSibling;
				while(node){
					if(node.nodeType===1){
						ret.push(node);
					}
					node=node.previousSibling;
				}
			});
			return itcast(itcast.unique(ret));
		},
		parent:function(){
			var ret=[];
			this.each(function(){
				var node=this.parentNode;
				while(node){
					if(node.nodeType!==11){
						ret.push(node);
						break;
					}
					node=node.parentNode;
				}
			});
			return itcast( itcast.unique( ret ) );
		},
		parents:function(){
			var ret=[];
			this.each(function(){
				var parents=this.parentNode;
				while(parents){
					if(parents.nodeType===1){
						ret.push(parents);
					}
					parents=parents.parentNode;
				}
			});
			return itcast(itcast.unique(ret));
		},
		siblings:function(next){
			var ret=[];
			// next=itcast(next).;
			// console.log(next);
			this.each(function (i,elem){
				// console.log(this);
				//得到itcast对象中的元素的父元素的第一个子元素
				var n=(elem.parentNode || {}).firstChild;
				console.log(n);
				for(;n;n=n.nextSibling){
					// a=itcast(n).attr();
					if(n.nodeType===1 && n!==next){
						console.log(n);
						ret.push(n);
					}
				}
				;
			});
			return itcast(itcast.unique(ret));
		}

	})
//处理保留词和不是驼峰命名法的属性
itcast.propFix={
	'class':'className',
	'for':'htmlFor'
};
itcast.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"rowSan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEdotable"
	],function(){//this.toLowerCase()数组中的元素转化成小写作为对象propFix的属性，
					//this为属性值
		itcast.propFix[this.toLowerCase()]=this;
	});
//属性模块
itcast.fn.extend({
	//获取和设置DOM元素的属性节点值
	attr:function(name ,value){
		//判断value的值是否为undefined如果是则传入一个参数否则是两个
		if(value == undefined){
			if(typeof name === 'object'){
				this.each(function(){
					for(var k in name){
						this.setAttribute(k, name[k]);
					}
				});
			}else{//获取itcast对象的第一个元素的属性节点值
				return this.length ===0 ? undefined : this[0].getAttribute(name);
			}
		}else{
			this.each(function(){
				this.setAttribute(name, value);
			})
		}
		return this;
	},
	//获取和设置DOM对象的属性值
	prop:function(name,value){
		var propName;//用来存储propFix对象上的属性值
		if(value == undefined){
			if(name === 'object'){
				this.each(function (i,elem){
					for(var k in name){
						//给遍历到的dom对象，设置当前遍历的属性值；
						elem[k]=name[k];
					}
				});
			}else{
				return this.length ===0 ? undefined : this[0][name];
			}
		}else{
			this.each(function(){
				this[name]=value;
			})
		 }
		},
		val :function(value){
			if(value ==undefined){
				return this.length ===0? undefined : this[0].value;
			}else{
			return this.each(function (){
					this.value=value;
				})
			}

		},
		html:function(html){
			if(html == undefined){
				return this.length ===0 ? undefined : this[0].innerHTML;
			}else{
				return this.each(function(){
					this.innerHTML=html;
				})
			}
		},
		text:function(txt){
			if(txt == undefined){
				if(this.length===0){
					return undefined;
				}else{
					this.each(function(index, elem) {
						elem.textContent;
					});
				}
			}else{
				this.each(function(){
					this.textContent=txt;
				})
			}
			return this;
		}
});
//样式模块
itcast.fn.extend({
	//只要在itcast对象上有一个DOM元素具有指定的样式类，该方法就返回true；否则就返回false
	hasClass:function(className){
		var ret=false;
		this.each(function (i,elem){
			if(elem.classList.contains(className)){
				ret=true;
				return false;
			}
		})
		return ret;
	},
	//给itcast对象上所有DOM元素添加样式类
	addClass:function( className ){
		this.each(function(){
			if( !this.classList.contains(className)){
				this.classList.add(className);
			}
		})
		return this;
	},
	removeClass:function(className){
		if(className == undefined){
			return this.each(function(){
				this.className="";
			})

		}else{
			return this.each(function(){
			if(this.classList.contains(className)){
				this.classList.remove(className);
			}
		})
		}
	},
	toggleClass:function(className){
		/*if(className == undefined){
				this.each(function(){

				})
		}else{*/
			return this.each(function(){
			if(this.classList.contains(className)){
				this.classList.toggle(className);
			}else{
				this.classList.toggle(className);
				}
			})
		// }
		
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
