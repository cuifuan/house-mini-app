	//这里使用的接口呢都是自己模拟的，可以根据自己的需求进行添加
    module.exports={
        //开发环境的url
        dev:{
            baseUrl:"http://192.168.0.111:9999/house"
        },
        //测试环境url
        test:{
            // baseUrl:"http://www.test.com"
        },
        //线上环境url
        prod:{
            // baseUrl:'https://api.it120.cc'
            baseUrl:"https://www.zabbix.store/basic-api"
        }
    }
