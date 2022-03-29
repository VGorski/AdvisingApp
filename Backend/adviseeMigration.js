const { QueryInterface, Sequelize } = require("sequelize/types");

module.exports = {
    up: (QueryInterface, Sequelize) => {
        return QueryInterface.createTable('advisee', {
            advisee_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
              },
              advisor_id: {
                type: Sequelize.INTEGER,
                references: {
                  model: "Advisor",
                  key: "advisor_id",
                },
              firstName: Sequelize.STRING,
              lastName: Sequelize.STRING,
              discipline: Sequelize.CHAR(3),
            }
        }
        
        )
    },
    down: (QueryInterface, Sequelize) = {
        
    }
}