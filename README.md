0.1 项目初始化
    - 清理项目
    - git
0.2 移动适配 采用rem yarn add amfe-flexible
    -1.让rem动起来 import 'amfe-flexible' (设置动态的rem改变根字号)
    -2.使用rem单位 
    --1.下载yarn add postcss-pxtorem 能把px 转成rem 告诉postcss 我要使用这个插件 .postcssrs.js 新建配置.postcssre.js
1.0 创建feature/login 分支
<!-- 登录页面 -->
1.1 新建文件
1.2 创建login组件 在route.js配置路由
    -路由懒加载，减少首屏加载时间，需要使用时再加载对应的页面(单页面缺点首屏加载时间长)
    - component: ()=> import('@/....')
1.3 登录页面布局修改样式 推荐使用自定义类名 修改样式
1.4 rules属性定义添加验证规则，单独抽离一个js文件存rules
1.5 封装登录请求API api/user.js
    -有api内的接口文件更具后端接口文档划分
    -post请求 axios会自动加上请求头参数默认为jaso 格式
    // 1.yarn add axios
    // 2.引入axios
    // 3.配置axios
1.6 目标需求 细分返回的error 给用户对应的提示 
    - 1、可能是js报错 2.axios封装的error对象 if(error.response)
    - error.response.data 后端返回的数据
    - error.response.status 后端返回的状态码 
    <!-- if(error.response && error.response.status === 400) -->
<!-- 9.9 -->
2.0 使用vuex state 持久化插件 存token
2.1 
