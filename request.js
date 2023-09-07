require('dotenv').config()

const pool = require('../connection')

const executeQuery = async (query) => {
	
	return new Promise((resolve, reject) => {
		
		pool.getConnection(function (error, connection) {
			
			if (error) {
				console.log("\n" + error + " | " + pool.config.connectionConfig.host)
			} 
			else {
				connection.changeUser({
					database: process.env.DB_NAME1
				});
				
				
				connection.query(query, (error, elements) => {
					if (error) {
						connection.release();
						console.log(query)
						console.log("\n" + error)
					} 
					else {
						connection.release();
						return resolve(elements)
					}
				})
			
			}
		})
	})
}

exports.init = async (content) => {

    let orderQuery = "SELECT empname,mdescription,qty FROM `request`"

    const orderData = await executeQuery(orderQuery)

    return orderData
}