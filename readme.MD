### 普通项目开启eslint（本质）demo
```
 1、创建文件demo, 包初始化： npm init -y,依赖安装 npm i eslint --save-dev （仅仅是开发时候依赖的包所以使用--save-dev）

 2、创建一个eslint 配置文件，eslint就会根据eslint 的规则来进行检查工作
    配置文件经历了很多次变更，
    规则：一 、如果有多个配置文件同一层级存在，优先级如下，如果是配置文件在不同层级，就会合并规则
         二、 文件校验查找配置规则是：先找同一级目录的配置，在往上找，直到根目录里的配置文件合并规则，如果配置root:true,自己就是最顶层， 那么不会往上找了
    2.1 .eslintrc.js（推荐）
    2.2 .eslintrc.json
    2.3 .eslintrc 
    2.4 package.json -- {"eslintConfig":{rules:xx}}

 --------- 命名行汇总  npx eslint [option] [file|dir|glob]*   ---------------------- 
 ----------查看所有命令：npx eslint -h ----------------------------------
 3、测试：使用命令行进行检查 （npx 等价于执行 node-modules/.bin/ 下的命令  https://www.ruanyifeng.com/blog/2019/02/npx.html）
   3.1 检查文件               ：  npx eslint src/a.js （npm v5.2以上） == node-modules/.bin/eslint yourfile.js(可能会报错)
   3.2 检查一个文件夹下所有文件  ：  npx eslint src
   3.3 检查所有文件            ：  npx eslint *
   
 4、修复：修复只能修复你规则里面大部分规则，有些不能修复，比如定义变量没有使用
   4.1  修复一个文件   ： npx eslint --fix src/a.js
   4.2  修复一个文件夹 ： npx  elsint --fix src

 5、配置文件的配置项说明
    项目里面我声明了两个配置文件，他们会合并覆盖起作用，其实配置一个好，只是测试
   {
       root:true //停止在父目录中找
       rules:{ // 代码检测规则
          "quotes":["error","double"], //字符串使用双引号
          "quotes":[2,"double"], //也可以写成这样，下面是说明
          "semi":"error" //代码结尾使用分号
       },
        "extends": "eslint:recommended", //继承默认规则，就是已经写好的
        "env": { // 启用的环境
        "browser": true
        "node":true
        },
        "parserOptions": { //支持的语言选项
        "ecmaVersion": 6 
        },
        "plugins": ["vue"] // 支持的第三方插件
   }
   规则补充：
    "off" 或 0 - 关闭规则
    "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
    "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出）
```

### vue项目开启eslint demo1

```
 1、上面的第二步是手动安装配置文件和写入规则，官网里面直接使用命令行来初始化配置文件 
    1.1 npx init @eslint/config 接下来你就有很多选项需要选择了
    1.2 一个一个依赖安装知道每一个包的作用
 2、这里我使用webpack从0-1来配置vue项目，这里涉及到webpack 知识
 3、默认情况下，eslint 只能处理js文件，如果需要处理其他文件就需要添加拓展名 npx eslint --ext .js,.vue src
 4、安装 eslint-plugin-vue || @vue/cli-plugin-eslint 插件来检测vue的template，script 里面的语法错误问题
 5、修复：npx eslint --fix --ext .js,.vue src 也是只能修复一部分的语法错误
 
```
### vue-cli项目开启依赖 demo2
```
1、写在开始，vue-cli 里面已经帮你安装好了eslint依赖和写好了一部分配置文件，你只需要添加就可以，
  如果觉得有些需要增加，那么可以增加一个配置文件，他会合并你新的配置，覆盖vue-cli里面的
```

## 与webpack 配合