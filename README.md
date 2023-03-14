# pipy-config-format
## 1. 说明 
用于讨论 pipy 通用配置格式，使得配置能兼容各种应用场景。满足通用性、扩展性、易用性。  

## 2. 设计要点  
a) 采用 json 数据格式  
b）采用扁平式数据结构，避免数据多层嵌套  
c）主要有3种数据类型：  
   1. module chain （模块链条）  
   2. plain data （普通数据） 
   3. plugins    （自定义/扩展 插件）    
#### 定义了2种“数据引用”类型：  
1. _joinRef  (链条引用，实现 module 的串联） 
2. _dataRef  (数据引用，根据数据名称定位数据）  
#### 约束条件：   
1. 在一个 module 结构体里面，只能定义一个 _joinRef  
2. _joinRef 指向的是数组([])   

