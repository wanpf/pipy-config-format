# pipy-config-format
## 1. 说明 
用于讨论 pipy 通用配置格式，使得配置能兼容各种应用场景。满足通用性、扩展性、易用性。  

## 2. 设计要点  
a) 采用 json 数据格式  
b）采用扁平式数据结构，避免数据多层嵌套，便于快速查找模块对于的配置。    
c）主要有2种数据类型：  
   1. module chain （模块链条）  
   2. plain data （普通数据）     
#### 定义了2种“数据引用”类型：  
1. _joinRef  (链条引用，实现 module 的串联） 
2. _dataRef  (数据引用，根据数据名称定位数据）  
#### 定义了引用优先级，用于模块排序  
_joinRefPriority
默认优先级为 100，表示连接在模块的后面，排序编号为 100.  
如果优先级为负数，表示连接在模块的前面，排序编号为 100 - 优先级， 比如：优先级是 -100， 那么排序编号就是 200.  

#### 约束条件：    
_joinRef 指向的是数组([])   
#### 约定规则：  
1. 以 _joinRef 为后缀的名称，对应于 pipy 的一个内置全局变量  
比如： listeners_joinRef, 在 pipeline context上存在全局变量: \_\_listener    
这些以 "\_\_" 开头的全局变量，用于 module 之间的数据交互。   

## 3. pipy通用配置格式（示意图）
![pipy-config](https://raw.githubusercontent.com/wanpf/pipy-config-format/main/pipy-config-format.png)  

## 4. 配置格式预处理  
config.json 是演示配置文件，运行如下命令可以对config.json进行预处理，自动生成 pipy 调用链。  
bin/pipy main.js  
```bash
[listeners chain] {
    "inbound": [
        "tupleMatching",
        "tlsTerminations",
        "httpServices",
        "httpServiceRateLimit",
        "httpRoutes",
        "httpRouteRateLimit",
        "httpPolicies",
        "clusters",
        "endpoints"
    ],
    "outbound": [
        "tupleMatching",
        "clusters",
        "egresses",
        "tlsInitiations",
        "endpoints"
    ]
}
```
## 5. 模块及全局变量  
每个模块对于一个全局变量名， 比如： \_\_cluster,   
cluster 模块处理完成后，会将匹配到的配置项赋值给 \_\_cluster 全局变量，给后面的模块使用。  
整个 module chain , 类似决策树方式，每个模块选择一个匹配的数据，并通过全局变量名传递给后面的模块使用。  

## 6. 讨论
以上配置文件，采用扁平结构保存数据，使用 _joinRef 和 _dataRef 来关联各模块、数据。  
可以用来表示 service mesh、ingress、Gateway API 等多种场景下的配置。  
类似数据库中的表通过主键、外健来表达关系。  
由于数据格式没有嵌套层级，对于阅读配置文件增加了难度。  
