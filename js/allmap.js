﻿//baidu map obj
var map = new BMap.Map("allmap");
//node list
var nodeList = new Array;
//get the current city and set the map center
var myCity = new BMap.LocalCity();
myCity.get(myLoca);
function myLoca(result){
console.log('myloca');
    var cityName = result.name;
    console.log(cityName)
	if(cityName){
		map.setCenter(cityName);
	}
}

//move
//var move = self.setInterval("movee(20,15)",1400);

//map over and out
//overAndOut();

function movee(x,y){
	console.log('move');
	map.panBy(x,y);
}
//initialize map	
var point = new BMap.Point("上海市"); // 创建点坐标；这个点是由经度和纬度构成的，点可以随意选取 
map.centerAndZoom(point, 15);  //here is the center of map location
map.addControl(new BMap.NavigationControl());        // 添加平移缩放控件
map.addControl(new BMap.OverviewMapControl());       //添加缩略地图控件
map.enableScrollWheelZoom(); 

//add tags
//调用api
//调用api ajax

var useCfApi = function (objPrm, successCallback, errorCallback, completeCallback) {
    $.ajax({
        type: 'get',
        url: 'http://cusflo.com/dev/api_c01.php',
        data: objPrm,
        dataType: 'jsonp',
        jsonp: "callback",
        success: function (data) {
            if (successCallback) {
                successCallback(data);
				console.log('success');
            }
        },
        error: function (data) {
            if (errorCallback) {
                errorCallback(data);
            }

        },
        complete: function (data) {
            if (completeCallback) {
                completeCallback(data);
            }
        }
    });
}
useCfApi({ api: "301"}, succ, err, com);


//add tag events
function addTagEvents(){
	var divimg = document.getElementsByName('maptag');
	for(var i = 0; i < divimg.length; i++){
		addEvents(divimg[i]);
	}
}

function addTag(x,y,num){
	//x -- first location
	//y -- second location
	//num -- money on map
	
	var divtag = '<div name="maptag" class="maptag" style="position: absolute; margin: 0pt; padding: 0pt; width: 80px; height: 26px; left: -10px; top: -35px; overflow: hidden;">'
                +     '<img style="border:none;left:0px; top:0px; position:absolute;" src="images/back1.png">'
				+ 	  '<label unselectable="on" style="position: absolute; -moz-user-select: none; display: inline; cursor: inherit; border: 0px none; padding: 2px 1px 1px; white-space: nowrap; font: 12px arial,simsun; z-index: 80; color: rgb(255, 102, 0); left: 28px; top: 1px;">￥' + num + '</label>'
				+ '</div>';    //tag object
	var maptag = new BMapLib.RichMarker(divtag,  new BMap.Point(x, y),{
                                                  "anchor" : new BMap.Size(-4,8), //anchor
												  "enableDragging" : false});
	//add the tag to map
	map.addOverlay(maptag);
}

//add over and out event
function addEvents(sender){
	var target = sender.getElementsByTagName("img")[0];
	//target is first img element
	sender.addEventListener("mouseover", function(e) {
		target.src = "images/back2.png";
	},false);
	sender.addEventListener("mouseout",function(e){
		target.src = "images/back1.png";
	},false);
}

function succ(result){
	var list = result.data;
	console.log(result);
	for(var i = 0; i < list.length; i++){
		var point = list[i];
		console.log(point.lng + " " + point.lat + " " + point.earning_all);
		//insert tags
		addTag(point.lng,point.lat,point.earning_all);
	}
	
	//then add tag events
	addTagEvents();
}

function err(data){
	console.log(data);
}

function com(data){
	console.log('api complete');
}

//map mouseover and mouseout
function overAndOut(){
	map.addEventListener("mouseover",function(e){
		console.log("mouse enter the map");
		window.clearInterval(move);
	},false);
	map.addEventListener("mouseout",function(e){
		move = self.setInterval("movee(20,15)",1400);

	})
}