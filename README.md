# SHOPPING一个从零开始的基于Vue2的购物前后台项目



## 参考建议

一定要手敲，纯手敲，从零开始搭！这样才能熟悉一些常见的业务逻辑，而且对一些巧妙的功能实现真正手操。

如果你想使用一下俺的项目，可以参考以下操作：

1. 在你的本地某文件夹中打开CMD
2. 键入`git clone https://github.com/Ra-Liz/SHOPPING.git`
3. 使用VSC打开项目文件，新建终端，键入`pnpm install`下载各依赖包
4. 运行项目：`pnpm run serve`

如果你想贡献一些代码（乐观且不切实际的想法）

1. fork一下，在你的仓库中新建一个仓库分支
2. clone你仓库的这个项目
3. `git checkout -b yourBranch`
4. （省略各位佬的操作）
5. `git add .`  `git commit -m "(commit message)"` `git push -f origin yourBranch`
6. 提一下pr

commit mesage规范详见：https://www.conventionalcommits.org/zh-hans/v1.0.0/



## 文档地址

俺的项目功能实现经验全都写好放在这里了！请看！

https://ra-liz.github.io/SHOPPING/#/



## 文档生成工具

问了一下chatGPT，它推荐我使用docute

官方文档地址：https://docute.egoist.dev/zh/

搭建方式：我才用的方式是在`docs`目录中，写一个静态页面`index.html`

搭建教程网址：https://juejin.cn/post/7114493190110969869



## 如何在github项目仓库中使用pages对静态文档进行托管

你的项目页面 => Settings => 左侧栏 => Pages => Build and deployment => Branch => 选择分支（我的是main/docs) => 点击Save

等待生成完毕，网页键入网址：`https://你的用户名.github.io/你的仓库名` => 就成啦！



