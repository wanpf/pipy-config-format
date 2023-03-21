# 基于通用config.json的开发规范  
说明：
以下文档所说的模块(module)、插件（plugin），指的是同一概念，代表一个 pjs 文件。  
## 1. 命名规范  
config.json 里面的每一个 module 都对应一个 js 文件  
比如：httpServices 模块的配置项  
```bash
  "httpServices": {
    "inbound-httpServices": {
      "virtualHost": [
        "bookstore-v1.bookstore",
        "bookstore-v1.bookstore.svc",
        "bookstore-v1.bookstore.svc.cluster",
        "bookstore-v1.bookstore.svc.cluster.local"
      ],
      "tlsTerminations_joinRef": [
        "inbound-tlsTerminations"
      ]
    }
  },
```
**a** ) 这个模块（module）对应的 js 文件是 httpServices.js  
**b** ) 这个模块，必须导出一个 pipeline全局变量，变量的名称是：\_\_httpServices  
**c** ）导出的变量是一个结构体/对象类型，如下：  
```bash
{
  "name": "inbound-httpServices",
  "output": {
    "virtualHost": "bookstore-v1.bookstore.svc.cluster.local",
    ...... // 其他的输出数据，取决于业务定义 
  }
}
```
其中：name 和 output 变量是必选项。  
*name* ：是 httpServices 模块所使用输入数据，对应的配置项名称。  
*output* ：是 httpServices 模块的输出数据，具体的输出数据项和业务相关，可以灵活定义。  


