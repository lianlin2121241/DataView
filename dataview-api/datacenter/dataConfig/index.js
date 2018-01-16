var filters = require('../filters');
var MLConfig = require('../config');
var storage = MLConfig.dbInfo;

module.exports = {
	//获取项目排名
	"getObjectOrder": {
		type: "database",
		config: {
			sql: `
				SELECT
					object_name AS name,
					object_value AS value
				
				FROM
					award_object_order
      			`,
			storage: storage
		},
		filters: [
			filters.baseResult
		]
	},
	//获取表扬信息
	"getPraise": {
		type: "database",
		config: {
			sql: `
				SELECT
					content AS value
				FROM
					award_praise
				ORDER BY
					field_order DESC
      			`,
			storage: storage
		},
		filters: [
			filters.baseResult
		]
	},
	//获取批评信息
	"getCriticism": {
		type: "database",
		config: {
			sql: `
				SELECT
					content AS value
				FROM
					award_criticism
				ORDER BY
					field_order DESC
      			`,
			storage: storage
		},
		filters: [
			filters.baseResult
		]
	},
	//获取日程信息
	"getAgenda": {
		type: "database",
		config: {
			sql: `
				SELECT
					content AS value
				FROM
					award_agenda
				ORDER BY
					field_order DESC
      			`,
			storage: storage
		},
		filters: [
			filters.baseResult
		]
	},
	//获取消息信息
	"getNotice": {
		type: "database",
		config: {
			sql: `
				SELECT
					content AS value
				FROM
					award_notice
				ORDER BY
					field_order DESC
      			`,
			storage: storage
		},
		filters: [
			filters.baseResult
		]
	},
	//获取所有消息信息
	"getAllNotice": {
		type: "database",
		config: {
			sql: `
				SELECT
					t1.type,
					t1.content,
					t1.updatetime
				FROM
					(
						(
							SELECT
								'表扬信息' AS 'type',
								content,
								updatetime,
								field_order,
								data_type
							FROM
								award_praise
							WHERE
								isshow IS NULL
							OR isshow <> 'N'
						)
						UNION ALL
							(
								SELECT
									'批评信息' AS 'type',
									content,
									updatetime,
									field_order,
									data_type
								FROM
									award_criticism
								WHERE
									isshow IS NULL
								OR isshow <> 'N'
							)
						UNION ALL
							(
								SELECT
									'通知信息' AS 'type',
									content,
									updatetime,
									field_order,
									data_type
								FROM
									award_notice
								WHERE
									isshow IS NULL
								OR isshow <> 'N'
							)
					) AS t1
				ORDER BY
					t1.data_type ASC,
					t1.updatetime DESC
      			`,
			storage: storage
		},
		filters: [
			filters.formatAllNotice,
			filters.baseResult
		]
	},

	/*获取近三年列装数量，及数据统计*/
	"getThreeYearDeclareData":{
		type:"database",
		config:{
			sql:`SELECT years,redeclarenum,newdeclarenum,(redeclarenum+newdeclarenum) AS 'declareCount',datasum FROM award_data_statistics ORDER BY years`,
			storage:storage
		},
		filters:[
			filters.formatThreeYearDeclareData,
			filters.baseResult
		]
	},
	/*获取近三年各手段申报器材统计*/
	"getThreeYearMeansDeclareData":{
		type:"database",
		config:{
			sql:`SELECT means as 'name',beforelastyearnum,lastyearnum,thisyearnum FROM award_means_statistics`,
			storage:storage
		},
		filters:[
			filters.formatThreeYearMeansDeclareData,
			filters.baseResult
		]
	},
	/*2018年全国各使用单位试用情况统计*/
	"getTrialStatus":{
		type:"database",
		config:{
			sql:`SELECT unit,team,equipmentnum,success,unsuccess FROM award_map_statistics ORDER BY equipmentnum ASC`,
			storage:storage
		},
		filters:[
			filters.formatTrialStatus,
			filters.baseResult
		]
	},
	/*2018年全国各使用单位试用通过情况统计*/
	"getTrialPassStatus":{
		type:"database",
		config:{
			sql:`SELECT unit,team,percentage FROM award_map_statistics ORDER BY percentage ASC`,
			storage:storage
		},
		filters:[
			filters.formatTrialPassStatus,
			filters.baseResult
		]
	},
	/*2018年省级单位申报数量排名前七——总量*/
	"getProvinceUnitAll":{
		type:"database",
		config:{
			sql:`SELECT province,declarenum FROM award_map_distribution ORDER BY declarenum DESC LIMIT 7`,
			storage:storage
		},
		filters:[
			filters.formatProvinceUnitNum,
			filters.baseResult
		]
	},
	/*2018年省级单位申报数量排名前七——124手段*/
	"getProvinceUnit124":{
		type:"database",
		config:{
			sql:`SELECT province,declarenum from award_means124_statistics ORDER BY declarenum DESC,id asc LIMIT 7`,
			storage:storage
		},
		filters:[
			filters.formatProvinceUnitNum,
			filters.baseResult
		]
	},
	/*2018年省级单位申报数量排名前七——3手段*/
	"getProvinceUnit3":{
		type:"database",
		config:{
			sql:`SELECT province,declarenum from award_means933_statistics ORDER BY declarenum DESC,id asc LIMIT 7`,
			storage:storage
		},
		filters:[
			filters.formatProvinceUnitNum,
			filters.baseResult
		]
	},
	/*2018年省级单位申报数量排名前七——5手段*/
	"getProvinceUnit5":{
		type:"database",
		config:{
			sql:`SELECT province,declarenum from award_means935_statistics ORDER BY declarenum DESC,id asc LIMIT 7`,
			storage:storage
		},
		filters:[
			filters.formatProvinceUnitNum,
			filters.baseResult
		]
	},
	/*2018年省级单位申报数量排名前七——6手段*/
	"getProvinceUnit6":{
		type:"database",
		config:{
			sql:`SELECT province,declarenum from award_means936_statistics ORDER BY declarenum DESC,id asc LIMIT 7`,
			storage:storage
		},
		filters:[
			filters.formatProvinceUnitNum,
			filters.baseResult
		]
	},
	/*2018年省级单位申报数量排名前七——7手段*/
	"getProvinceUnit7":{
		type:"database",
		config:{
			sql:`SELECT province,declarenum from award_means937_statistics ORDER BY declarenum DESC,id asc LIMIT 7`,
			storage:storage
		},
		filters:[
			filters.formatProvinceUnitNum,
			filters.baseResult
		]
	},
	/*2018年省级单位申报数量排名前七——其他手段*/
	"getProvinceUnitOther":{
		type:"database",
		config:{
			sql:`SELECT province,declarenum from award_meansother_statistics ORDER BY declarenum DESC,id asc LIMIT 7`,
			storage:storage
		},
		filters:[
			filters.formatProvinceUnitNum,
			filters.baseResult
		]
	}
}
