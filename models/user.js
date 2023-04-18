// This file defines the user model for the database
module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define ('users', {
    email: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    token:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    originalResume: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    generatedResumes:{
      type: DataTypes.JSONB,
      allowNull: true
      
    }
  });
}