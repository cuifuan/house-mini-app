	//这里使用的接口呢都是自己模拟的，可以根据自己的需求进行添加
    module.exports={
        //开发环境的url
        dev:{
            baseUrl:"http://192.168.1.100:9999/house"
        },
        //线上环境url
        prod:{
            baseUrl:"https://www.zabbix.store/basic-api"
        }
    }
