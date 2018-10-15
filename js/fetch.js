fetch("https://www.baidu.com/search/error.html?a=1&b=2")
 .then((res)=>{
 	return res.text();
 }).then((res)=>{
 	console.log(res);
 })
//在rul中写上传递的参数
 fetch("http://172.18.168.110:9002/v1/sku/image?skuIdList=303780",{
 	method:"GET",
 	  headers: {
      'Accept': 'application/json',
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
 }).then((res)=>{
 	return res.text();
 }).then((res)=>{
 	console.log(res);
 })
 
http://172.18.168.110:9002/v1/sku/image?skuIdList=303780
 //GET请求中如果需要传递参数怎么办，
 //只能把参数写在URL上来进行传递了

Fetch.fetchData({url:"http://172.18.168.110:9002/v1/sku/image?skuIdList=303780"})
 // POST请求参数的传递

 fetch("https://www.baidu.com/search/error.html",{
 	method: "POST",
 	body: new URLSearchParams(["foo",1],["bar",2]).toString()
 }).then((res)=>{
 	return res.text();
 }).then((res)=>{
 	 console.log(res);
 })

 //设置请求的头信息。
 //在post提交的过程中，一般是表单提交，可是，经过查询，发现默认的提交方式是
 // Content-Type:text/plain;charset=UTF-8，这个显然是不合理的。

fetch("https://www.baidu.com",{
	method:"POST",
	headers:new Headers({
		"Content-Type":"application/x-www-form-urlencoded" //指定提交方式为表单提交
	}),
	body: new URLSearchParams([["foo",1],["bar",2]]).toString()
}).then((res)=>{
	console.log(res);
 
	return res.text();
}).then((res)=>{

	console.log(res);
})

// 将对象专程a=1&b=2的形式
function obj2String(obj, arr = [], idx = 0){
	 for (let item in obj){
	 	arr[idx++] = [item, obj[item]]
	 	console.log([item, obj[item]]);
	 };
	 return  new URLSearchParams(arr).toString();
}


function commonFetcdh(url, options, method = "GET"){
	const searchStr = obj2String(options);
	let initObj = {};
	if (method === "GET"){
		url += "?"+searchStr;
		initObj = {
			method: method,
			credentials: "include"
		}
	} else {
		initObj = {
			method: method,
			credentials: "include",
			headers: new Headers({
				"Accept":"application/json",
				"Content-Type":"application/x-www-form-urlencoded"
			}),
			body:searchStr
		}
	}
	fetch(url,initObj).then((res)=>{
		return res.json();
	}).then((res)=>{
		return res
	})
}

function GET (url, options) {
	return commonFetcdh(url,options,"GET");
}
function POST (url, options) {
	return commonFetcdh(url, options, "POST");
}



URLSearchParams()构造并返回一个实例，开始的”?”字符将被忽略。

append：添加给定的key/value参数
delete：删除查询参数
entries：返回一个迭代器(iterator)，可以遍历得到值为[key, value]的元素
get：返回第一个匹配到的值
getAll：返回所有的查询参数的值
has：判断给定的参数是否存在，存在返回true，否在false
keys：返回一个iterator用于遍历所有的key
set: 为给定的参数设置value，如果给参数不存在则创建并设置值；如果存在则多个相同参数，匹配第一个，删除其他的。
sort：按key对所有的参数进行排序，并返回undefined，如果存在相同的key，则保留它们原来的顺序。
toString：返回在适合在url中使用的字符串
values：返回一个iterator遍历可得到所有的value值
