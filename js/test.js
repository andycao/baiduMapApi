//baidu map obj
var map = new BMap.Map("allmap");
//node list
var nodeList = new Array;
//get the current city and set the map center
var myCity = new BMap.LocalCity();

var currNode = 0;

//initialize map
var point = new BMap.Point(116.402544,39.913385); 				 // 创建点坐标 
map.centerAndZoom(point, 13);  						 //here is the center of map location
map.addControl(new BMap.NavigationControl());        // 添加平移缩放控件
map.addControl(new BMap.OverviewMapControl());       //添加缩略地图控件
map.enableScrollWheelZoom(); 

//map style
var styleJson = [
          {
              "featureType": "all",
              "elementType": "all",
              "stylers": {
                  "lightness": 10,
                  "saturation": -100
              }
          }
];
map.setMapStyle({ styleJson: styleJson });
