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
__a__) 这个模块（module）对应的 js 文件是 httpServices.js
__b__) 这个模块，必须导出一个 pipeline全局变量
