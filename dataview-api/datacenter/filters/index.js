var moment = require('moment');

function getOne(value) {
	return value.pop();
}
function value2Array(value) {
	value.forEach(function (v) {
		if (typeof v.y != 'array') {
			//v.x = v.x.substr(8, 2)+":"+v.x.substr(10, 2)
			v.x = v.x.substr(0, 4) + '-' + v.x.substr(4, 2) + '-' + v.x.substr(6, 2) + ' ' + v.x.substr(8, 2) + ":" + v.x.substr(10, 2) + ':00';
			v.y = [v.y]
		}
	})
	return value;
}
function random(x) {
	return function (value) {
		value.forEach(function (v) {
			v[x] = parseInt(1000 * Math.random())
		})
		return value;
	}
}
function configConvert(value) {
	var aaa = [];
	value.forEach(function (v) {
		try {
			aaa.push(JSON.parse(v.config))
		} catch (e) { }
	})
	return aaa;
}
function areaValidate(value) {
	var aaa = []
	value.forEach(function (v) {
		try {
			if (v.type == 'rect' && v.latlngs.length) aaa.push(v)
			if (v.type == 'polygon' && v.latlngs.length) aaa.push(v)
			if (v.type == 'circle' && v.center && v.radius) aaa.push(v)
			if (v.type == 'circle' && v.latlngs && v.radius) { v.center = v.latlngs[0]; aaa.push(v) }
		} catch (e) { }
	})
	return aaa;
}
function rect2polygon(value) {
	value.forEach(function (v) {
		if (v.type == 'rect') {
			var p1 = v.latlngs[0]
			var p2 = v.latlngs[1]
			v.type = "polygon";
			v.latlngs = [
				p1,
				{
					lng: p2.lng,
					lat: p1.lat
				},
				p2,
				{
					lng: p1.lng,
					lat: p2.lat
				}
			]
		}
	})
	return value;
}

function formatYJXX(value) {
	var aaa = [];
	value.forEach(function (v) {
		var result = v.show_result;
		try {
			result = JSON.parse(result);

			for (var op in result.constant) {
				var constant = result.constant[op]


				try {
					aaa.push({
						"时间": moment(v.action_time).format('HH:mm:ss'),
						//"时间": moment(result["connection.capture_time"]*1>1000000000?result["connection.capture_time"]*1000 : v.action_time).format('HH:mm:ss'),
						"预警信息": (constant.header + ' ' + constant.text).replace(/{([\w\._\d:]+)}/g, function (a, v) {
							return result.tags[v]
						})
					});
				} catch (e) {
					console.log(e)
				}
			}

		} catch (e) {
			console.log(e)
			result = {};
		}
	});
	aaa.reverse();
	return aaa;
}

function formatTime(field) {
	return function (value) {
		value.forEach(function (v) {
			v[field] = moment(v[field] * 1000).format('HH:mm:ss');
		});
		return value;
	}
}

function formatRYXXXX(value) {
	var aaa = [];
	var rules = [
		{
			label: "身份证号",
			value: "cert_id"
		},
		{
			label: "姓名",
			value: "name"
		},
		{
			label: "性别",
			value: "gender"
		},
		{
			label: "年龄",
			value: function (v) {
				if (v.cert_id.length != 18) return;
				return (new Date()).getFullYear() - parseInt(v.cert_id.substr(6, 4));
			}
		},
		{
			label: "民族",
			value: "ethnicity"
		},
		{
			label: "文化程度",
			value: "culture"
		},
		{
			label: "手机",
			value: "msisdn"
		},
		{
			label: "户籍地",
			value: "detailaddress"
		}
	]
	rules.forEach(function (v) {
		try {
			var tmp = typeof v.value == 'string' ? value[v.value] : v.value(value);
		} catch (e) { }
		tmp = tmp || " ";
		aaa.push({
			label: v.label,
			value: tmp
		})
	});
	return aaa;
}

function formatLabel() {
	var args = arguments;
	return function (value) {
		var aaa = [];
		if (!value && args.length) return Array.prototype.map.call(args, function (field) { return { content: field, type: '' } });
		if (typeof value != 'object') return aaa;
		var keys = Object.keys(value);
		keys.forEach(function (key) {
			aaa.push({
				content: key,
				type: value[key] ? "series1" : ""
			})
		});
		return aaa;
	}
}

function formatQYCZRK(value) {
	var aaa = [{}];
	if (!value || !value[0]) return aaa;
	var val = value[0];
	//var num = (34524 / 10000).toFixed(2);
	var num = (val['常驻人口数'] / 10000).toFixed(2);

	aaa[0]['区域面积'] = (val['区域面积'] / 1000000).toFixed(2) + '平方公里';
	//aaa[0]['常驻人口数'] = num  + '万人';
	aaa[0]['基站数量'] = val['基站数量'];
	//aaa[0]['行政区划'] = '杭州市'; by jiuli at 20161115
	aaa[0]['人口密度'] = (num / (val['区域面积'] / 1000000)).toFixed(2) + '万人/平方公里';

	return aaa;
}

function formatRYNRQBQ(value) {
	//  console.log('yoyo--value:', value);
	var aaa = [{}];
	if (!value || !value[0]) return aaa;
	var val = value[0];
	for (var key in val) {
		if (val[key] !== 0 && val[key] !== '0') {
			aaa[0][key] = val[key];
		}
	}
	return aaa;
}

function formatNodeType(value){
	return value.map(function(item){
		return {
			content:item.content,
			params:{
				id:item.id
			}
		}
	})
}
function baseResult(data){
	return {
		success:true,
		data:data,
		message:""
	}
}
/*获取近三年列装数量，及数据统计*/
function formatThreeYearDeclareData(data){
	var arr=[];
	data.forEach(function(item){
		arr.push({
			name:item.years+"年",
			value:item.redeclarenum,
			legend:"重新申报数"
		})
		arr.push({
			name:item.years+"年",
			value:item.newdeclarenum,
			legend:"新申报数"
		})
		arr.push({
			name:item.years+"年",
			value:item.declareCount,
			legend:"申报总数"
		})
		arr.push({
			name:item.years+"年",
			value:item.datasum,
			legend:"资料数据总量",
			secondAxis:1
		})
	})
	return arr;
}

/*获取近三年各手段申报器材统计*/
function formatThreeYearMeansDeclareData(data){
	var arr=[];
	data.forEach(function(item){
		arr.push({
			name:item.name,
			value:item.beforelastyearnum,
			legend:"2016年"
		})
		arr.push({
			name:item.name,
			value:item.lastyearnum,
			legend:"2017年"
		})
		arr.push({
			name:item.name,
			value:item.thisyearnum,
			legend:"2018年"
		})
	})
	return arr;
}

/*2018年全国各使用单位试用情况统计*/
function formatTrialStatus(data){
	var arr=[];
	data.forEach(function(item){
		arr.push({
			name:item.unit+item.team,
			value:item.equipmentnum,
			legend:"试用器材数"
		})
		arr.push({
			name:item.unit+item.team,
			value:item.success,
			legend:"通过数"
		})
		arr.push({
			name:item.unit+item.team,
			value:item.unsuccess,
			legend:"不通过数"
		})
	})
	return arr;
}

/*2018年全国各使用单位试用通过情况统计*/
function formatTrialPassStatus(data){
	var arr=[];
	data.forEach(function(item){
		arr.push({
			name:item.unit+item.team,
			value:(item.percentage*100).toFixed(2)
		})
	})
	return arr;
}

/*2018年省级单位申报数量排名前七过滤*/
function formatProvinceUnitNum(data){
	var arr=[];
	data.forEach(function(item){
		arr.push({
			name:item.province,
			value:item.declarenum
		})
	})
	return arr;
}

/*获取所有消息*/
function formatAllNotice(data){
	var arr=[];
	data.forEach(function(item){
		arr.push({
			value:"【"+item.type+"】"+"("+new Date(item.updatetime).pattern('yyyy-MM-dd HH:mm')+")"+item.content
		})
	})
	return arr;
}

module.exports = {
	formatAllNotice:formatAllNotice,
	formatProvinceUnitNum:formatProvinceUnitNum,
	formatTrialPassStatus:formatTrialPassStatus,
	formatTrialStatus:formatTrialStatus,
	formatThreeYearMeansDeclareData:formatThreeYearMeansDeclareData,
	formatThreeYearDeclareData:formatThreeYearDeclareData,
	baseResult:baseResult,
	formatNodeType:formatNodeType,
	getOne: getOne,
	value2Array: value2Array,
	random: random,
	configConvert: configConvert,
	areaValidate: areaValidate,
	rect2polygon: rect2polygon,
	formatYJXX: formatYJXX,
	formatTime: formatTime,
	formatRYXXXX: formatRYXXXX,
	formatLabel: formatLabel,
	formatQYCZRK: formatQYCZRK,
	formatRYNRQBQ: formatRYNRQBQ,
	geo: function (value) {
		var result = [];
		value.forEach(function (row) {
			result.push({
				from: {
					lat: row.lat,
					lng: row.lng
				},
				to: {
					lat: row.to_lat,
					lng: row.to_lng
				}
			})
		});
		return result;
	},
	makeId: function () {
		var args = arguments
		return function (value) {
			value.forEach(function (row) {
				var id = [];
				Array.prototype.forEach.call(args, function (fx) {
					id.push(row[fx]);
				})
				row.id = id.join('-');
			});
			return value;
		}
	},
	groupConcat: function (field) {
		return function (value) {
			var result = [];
			var concat = {}
			value.forEach(function (row) {
				var key = makeKey(row);
				if (!concat[key]) {
					concat[key] = {};
					result.push(row);
				}
				concat[key][row[field]] = true;
			});
			result.forEach(function (row) {
				var key = makeKey(row);
				row[field] = Object.keys(concat[key]);
			});
			function makeKey(row) {
				var key = "";
				for (var i in row) {
					if (Object.hasOwnProperty.call(row, i)) {
						if (i !== field) {
							key += row[i] + '-';
						}
					}
				}
				return key;
			}
			return result;
		}
	},
	worldToMarth: function (lat, lng) {
		return function (value) {
			value.forEach(function (v) {
				var f = wtm(v[lat], v[lng]);
				v['_' + lat] = v[lat];
				v['_' + lng] = v[lng];
				v[lat] = f.lat;
				v[lng] = f.lng;
			});
			return value;
		}
	},
	forcemap: function (key) {
		return function (value, query) {
			var linkes = [];
			var nodes = [];
			var concat = {}
			value.forEach(function (row) {
				nodes.push({
					imgPath: "",
					name: show(row.name, row.label)
				})
				linkes.push({
					source: query[key],
					target: row.label,
					value: row.value
				})
			});
			nodes.unshift({
				imgPath: "",
				name: query[key]
			})
			return [{ nodes: nodes, links: linkes }];
		}
	},
	reverse: function (value) {
		return value.reverse();
	},
	dtboost: function (value) {
		return value.data || [];
	},
	forceMapLimit: function (limit) {
		return function (value) {
			if (!value.links || !value.nodes) return [];
			try {
				var hold = {};
				var links = [];
				var nodes = [];
				var types = {};
				var tindex = 1;
				function genType(name) {
					return types[name] = "group" + tindex++;
				}
				value.links.sort(function (a, b) { return b.value - a.value; })
				value.links.forEach(function (link) {
					if (nodes.length < limit) {
						var node = value.nodes[link.source];
						var target = value.nodes[link.target]
						if (node && node.name.length >= 2 && target.name >= 2 && node.type && target.type) {
							nodes.push({
								name: node.name,
								type: types[node.class_name] ? types[node.class_name] : genType(node.class_name)
							});
							hold[link.target] = true;
							links.push({
								source: node.name,
								target: target.name,
								value: link.value
							})
						}
					}
				})
				for (var i in hold) {
					nodes.unshift({
						name: value.nodes[i].name,
						type: "fixed " + types[value.nodes[i].class_name] ? types[value.nodes[i].class_name] : genType(value.nodes[i].class_name)
					})
				}
				console.log(links.length, nodes.length)
				return [{ links: links, nodes: nodes }];
			} catch (e) { console.log(e); console.log(e.stack) }
			return [{ links: [], nodes: [] }];
		};
	},
	transformType: function (value) {
		console.log(value)
		var result = [];
		value.forEach(function (v) {
			result.push({
				x: moment(v.capture_time * 1000).format('HH:mm'),
				y: [v.in_flux, v.out_flux]
			})
		})
		console.log(result)
		return result;
	}
}
function show(a, b) {
	if (a === 0) return a;
	if (!a) return b;
	if (a == 'null') return b;
	if (typeof a == 'string' && !a.trim()) return b;
	return a;
}
