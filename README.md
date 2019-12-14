# topNavigation_Anchor
顶部导航栏(锚点)
******
### 1.描述
###### h5页面导航(锚点)
    导航栏初始位置存在于页面中,滑过导航栏后将导航栏置顶.

    导航项根据页面滚动的位置同步变动,点击导航项页面跳转至相应位置.
### 2.使用
###### html文件中导入js文件、css文件
    其中Jquery文件当前使用版本为3.4.0
    
    导航项的对应内容处需要加自定义属性data-anchor="true"
    
    导航栏的class和id最好固定为以下示例,尤其是class
```
<div class="nav_bar" id="nav_bar">
    <div class="nav_bar_content">
        <a class="nav_bar_item linkActive">index-1</a>
        <a class="nav_bar_item">index-2</a>
        <a class="nav_bar_item">index-3</a>
        <a class="nav_bar_item">index-4</a>
        <a class="nav_bar_item">index-5</a>
        <a class="nav_bar_item">index-6</a>
    </div>
</div>
```
###### js文件使用
```
var nav = new navigation({
    container: "#container",
    nav_bar: "#nav_bar",
    ele_width: 150
});
```
###### navigation.css说明
    .nav_bar    /* 导航栏class */
    .nav_bar_content    /* 导航栏内层容器class */
    .nav_bar_item    /* 导航项class */
    .linkActive    /* 当前项class */
    .hidden_nav    /* 虚拟锚点class */
###### navigation.js说明
    .hidden_nav    // 给自定义属性data-anchor="true"所在元素加的class
    #nav_link_xxx    // 给虚拟锚点加的id(xxx从0开始计数)
    data-navIndex    // 给导航项.nav_bar_item加的class
    #nav_link_xxx    // 给导航项.nav_bar_item加的锚链接href(xxx从0开始计数,与虚拟锚点相对应)
### 3.原理
    监听滚动事件,滚动过导航条所在位置时改变导航条position
    通过自定义属性data-anchor记录页面内容的位置,滚动至该位置时导航栏通过查找相对应的自定义属性data-navIndex滚动至可视区域
    
    导航项绑定点击事件,通过锚链接直接跳转至锚点所在位置
### 4.思考
    使用锚点在用户体验上较滚动差
    
    点击跳转时容易出错,可能是页面未完全加载所致
    
    总之, 不 讨 喜!!!
