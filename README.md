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
2. _joinRef 对应一个 "priority" 项，表示 module之间连接的前后位置、优先级等。   
  如果为负数： 表示连接在模块之前 ，否者连接在模块之后。   
  priority 的值用于顺序排序，数值小的排在前面。  
4. _joinRef 指向的是数组([])   
#### 约定规则：  
1. 以 _joinRef 为后缀的名称，对应于 pipy 的一个内置全局变量  
比如： listeners_joinRef, 在 pipeline context上存在全局变量: \_\_listener    
这些以 "\_\_" 开头的全局变量，用于 module 之间的数据交互。   


