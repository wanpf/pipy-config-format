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

## 2. 模块之间的数据交互/对接  
以这个示意图为例   
![pipy-config](https://raw.githubusercontent.com/wanpf/pipy-config-format/main/pipy-config-format.png)  
每一个模块都可以获取到它的前置模块的 输入(input)、输出(output) 数据  
比如： tlsTerminations 模块，就可以获取到它的前置模块 listerner、tupleMatching 的输入和输出。  
对应的全局变量名是 \_\_listerner 和 \_\_tupleMatching 

## 3. 其他  
a) 扁平化的 json 配置，保证了模块名称的唯一，也保证了全局变量名称的唯一性  
b）数据项名称命名，注意单复数形式要统一。比如： listener, listeners 的使用场景   
c）变量命名用首字母小写的驼峰形式，还是 下划线 “\_” 连接方式  
d)  js 里面变量的命名规范参照 pipy文档  
