/*
@Azurlin 2020.4.5
*/
//读取json
window.onload = function(){
		$.ajax({
			type: "GET",
			dataType: 'json',
			url: "data/data.json",
	　　　　　success: function(result){
				resInit(result);
			}
			});
	function resInit(result){
		itemAll = result[0];
		initData();
	}
}
var item=[];//选中的物品
var addBtn = document.querySelector('.addBtn');
var calBtn = document.querySelector('.calBtn');
var reBtn = document.querySelector('.reBtn');
var delBtn = document.querySelector('.delBtn');
var adjIndex = 0;
addBtn.onclick =function () {//添加 按钮监听
	let Table = document.getElementById('t1');
	//获取选中的项目
	let selectedElem = $('.my-chosen-select').val();
	for(let i=0;i<selectedElem.length;i++){
		adjIndex++;
		let td = createTd();//创建td tr
		let tdInp = createTd();
		let input = createInput();
		input.className = adjIndex;
		let tr = createTr();
		let add = createDelTd(adjIndex);
		let sub = createDelTd(adjIndex);
		add.innerHTML='+';
		sub.innerHTML='-';
		add.className='add';
		sub.className='sub';
		add.onclick = function(){
			let temp= getInput(add.id);
			temp[0].value = Number(temp[0].value)+1;
		}
		sub.onclick = function(){
			let temp= getInput(add.id);
			if(Number(temp[0].value)>0)
				temp[0].value = Number(temp[0].value)-1; 
		}
		let adjTd = createTd();
		if(!isRepeat(item,selectedElem[i])&&selectedElem[i]!=''){ //判断重复
			td.innerHTML = selectedElem[i];
			item.push(td.innerHTML);
			tdInp.append(input);
			tr.append(td);
			tr.append(tdInp);
			adjTd.append(add);
			adjTd.append(sub);
			tr.append(adjTd);
			Table.append(tr);
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
function createDelTd(index){
	let adj = document.createElement('button');
	adj.type='button';
	adj.id = index;
	return adj;
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
			let number = Number(objInput[i].value);
			if(isInteger(number)&&number>0){
				var dic = itemAll[itName][key]*number;//材料数量 *物品个数  
				if(isRepeat(itArr,key)){//判重 itArr 存材料名 sumArr 所需数量
					sumArr[itArr.indexOf(key)]+=dic;                
				}
				else{
					itArr.push(key);
					sumArr.push(dic);
				}
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
		if(sum[l]!=0)
			showContent +=item[l]+":"+sum[l]+"<br/>";
	showDiv.innerHTML = showContent;
}
function getInput(index){
	var objInput = document.getElementById("t1").getElementsByClassName(index);
	return objInput;
}
