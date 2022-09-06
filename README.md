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