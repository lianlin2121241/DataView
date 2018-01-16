module.exports = {
	port: 9998,
	dev: true,
	dbInfo: {
		name: "bigscreen",
		auth: {
			user: "root",
			pass: "1111111"
		},
		extra: {
			database: "bigscreen"
		},
		type: "mysql",
		host: "192.168.65.167",
		port: "3306"
	},
	mockUrl:"http://192.168.65.247:3000/api/getMockData"
}
