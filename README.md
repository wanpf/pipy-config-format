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

