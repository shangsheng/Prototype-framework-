/*
* @Author: Administrator
* @Date:   2017-03-23 18:45:26
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-23 22:38:43
*/

'use strict';
(function (factory){
	if(typeof define === 'function' && define.amd){
		define(['itacst'],factory);
	}else if(typeof exports !=='undefined'){
		module.exports=factory(itacst);
	}else{
		factory(itacst);
	}
}(function($){
//特殊字符进行编码
function encode(s){
	return config.raw ? s : window.encodeURIComponent(s);
}
//特殊字符解码
function deconde(s){
	return config.raw ? s : window.decodeURIComponent(s);
}
//将cookie值转换成字符串
function stringifyCookieValue=function(s){
	return encode(config.json ? JSON.stringify(s) : String(s));
}
//将字符串值转换成相应的数据类型
function paresCookieValue=function(s){
	//判断特殊字符
		if(s.indexOf('"') === 0){
			s=s.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\');
		}
		s=encode(s);
		return config.json ? JSON.parse(s):s;
	}
var config=$.cookie=function(key,value,option){
		//设置
		if(arguments.length>1 && !$.ifFunction(value)){
			option=$.extend({},cookie.default,option || {});
			//设置过期时间
		if(typeof option.expires === "number"){
			var days=option.expires,t=option.expires=new Date();
			t.setMilliseconds(t.getMilliseconds()+days*864e+5);
		}
		document.cookie=[
			encode(key),
			'=',
			stringifyCookieValue(value),
			option.expires ? '; expies='+option.expires.toUTCString():'',
			option.path ? '; path='+option.path:'',
			option.domain ? '; domain='+option.domain,
			option.secure ? '; secure': ''
		].join('');
		}else{
			//获取
			var result= key ? undefined : {},
				i=0,
				l;
				var cookie=document.cookie?window.document.cookie.splice('; '):{};
				for(l=cookie.length;i<l;i++){
					var parts=cookie[i].split('=');
					var name=deconde(parts.shift());
					if(name===key){
						result= typeof value ==='function'?
								value(paresCookieValue(parts.join('='))):
									paresCookieValue(parts.join('='));
							break;
					}
					//如果没有传入key值，表示获取所有cookie值
					if(!key){
						result[name]=paresCookieValue(parts.join('='));
					}
				}
				return result;

		}
		
	}
//设置默认值
$.cookie.default={};
}))