const AWS = require('aws-sdk');
const proxyAgent = require('proxy-agent');
const appSettings = require('node-app-settings');

let settings = appSettings.create('config.yml', 'YAML');//Absolute path or relative path
let config = settings.config; //Get the setting data object
let proxy = config.proxy;

if(proxy && proxy.enabled){
    let proxyTarget = `http://${proxy.host}:${proxy.port}`;
    AWS.config.update({
        httpOptions: { agent: proxyAgent(proxyTarget)}
    })
    console.info('Config http proxy!');
    console.log(`Proxy target: ${proxyTarget}`);
}

var s3 = new AWS.S3();

// Bucket names must be unique across all S3 users

var myBucket = 'discover-0907-1-bucket';

var myKey = 'myBucketKey';

s3.createBucket({Bucket: myBucket}, function(err, data) {

if (err) {

   console.log(err);

   } else {

     params = {Bucket: myBucket, Key: myKey, Body: 'Hello!'};

     s3.putObject(params, function(err, data) {

         if (err) {

             console.log(err)

         } else {

             console.log(`Successfully uploaded data to ${myBucket}/myKey`);

         }

      });

   }

});
