// src/aws-config.js
const awsConfig = {
    region: 'ap-south-1',
    credentials: {
      accessKeyId: process.env.AKIAW5WU4ZDVUYJCIVER,
      secretAccessKey: process.env.tGSrXxYWQU7eJhDN3mBxVlwx0pOdZYYJOGDUlL2G
    },
    s3: {
      bucketName: 'sharda-nursery-images'
    },
    dynamoDB: {
      tableName: 'plants'
    }
  };
  
  export default awsConfig;