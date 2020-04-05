/*
@Azurlin 2020.4.5
*/

//读取json
window.onload = function(){
	$(function(){
		$.ajax({
			type: "GET",
			dataType: 'json',
			url: "data/data.json",
	　　　　　success: function(result){
				resInit(result);
			}
			});
		});
	function resInit(result){
		itemAll = result[0];
		initData();
	}
}
var item=[];//选中的物品
var addBtn = document.querySelector('.addBtn');
var calBtn = document.querySelector('.calBtn');
var reBtn = document.querySelector('.reBtn')
addBtn.onclick =function () {//添加 按钮监听
	let Table = document.getElementById('t1');
	//获取选中的项目
	let selectedElem = document.querySelector('select').options;//获取下拉列表
	for(let i=0;i<selectedElem.length;i++){
		let td = createTd();//创建td tr
		let tdInp = createTd();
		let input = createInput();
		let tr = createTr();
		if(selectedElem[i].selected){//判断是否选中
			if(!isRepeat(item,selectedElem[i].innerHTML)&&selectedElem[i].innerHTML!=''){ //判断重复
				td.innerHTML = selectedElem[i].innerHTML;
				item.push(td.innerHTML);
				tdInp.append(input);
				tr.append(td);
				tr.append(tdInp);
				Table.append(tr);
			}
		}
	}
	$("#sel").val("").trigger("chosen:updated");//重置搜索框
}
calBtn.onclick = function(){//计算
	calculate();//调用计算方法
}
reBtn.onclick = function(){ //重置
	location.reload();
}
//初始化
function initData(){
	let optionHtml = '<option value=""></option>';
	for(key in itemAll){//遍历所有物品添加到下拉框
		optionHtml += '<option>'+key+'</option>';
	}
	$('.my-chosen-select').html(optionHtml);
	$('.my-chosen-select').trigger("chosen:updated"); //更新
}
//创建新标签
function createInput(){
	let input = document.createElement('input');
	input.id="Num";
	input.value=1;
	return input;
}
function createTd(){
	return document.createElement('td');
}
function createTr(){
	return document.createElement('tr');
}
//判重
function isRepeat(arr,arrElement){     
	for(var i =0;i<arr.length;i++){
		if(arr[i]==arrElement)
			return true;//有重复
	}
	return false;//无重复
}
//计算并保存结果
function calculate(){
  	var objInput = document.getElementById("t1").getElementsByTagName("input");//获取input
    var itArr =new Array;
    var sumArr=new Array;
    var length = document.getElementById('t1').rows.length;
    for(var i=0;i<=length;i++){
        var itName = item[i];//物品名
		for(var key in itemAll[itName]){//itemAll[itName]材料 key：材料名
			if(isInteger(Number(objInput[i].value))){
				var dic = itemAll[itName][key]*Number(objInput[i].value);//材料数量 *物品个数  
				if(isRepeat(itArr,key)){//判重 itArr 存材料名 sumArr 所需数量
					sumArr[itArr.indexOf(key)]+=dic;                
				}
				else{
					itArr.push(key);
					sumArr.push(dic);
				}
			}
			else{
				alert("输入正确的数量哦~")
			}
        }
    }
    show(itArr,sumArr); 
}
//判整
function isInteger(obj) {
	return typeof obj === 'number' && obj%1 === 0
}
//显示结果
function show(item,sum){   
	let showDiv = document.querySelector('.show');
	let showContent="";
	//let select = document.querySelector('select');
	for(let l =0;l<item.length;l++)
		showContent +=item[l]+":"+sum[l]+"<br/>";
	showDiv.innerHTML = showContent;
}

