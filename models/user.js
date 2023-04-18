// This file defines the user model for the database
module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define ('users', {
    username: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    token:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    originalResume: {
      type: DataTypes.STRING,
    },
    generatedResumes:{
      type: DataTypes.JSON,
      
    }
  });
}