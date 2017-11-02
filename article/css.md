

穿透当前元素,使当前元素看得见摸不着  ,相当于海市蜃楼  ,把元素变成“幻影”
这属性曾经火过一阵，起因是国外某推主说在页面滚动时给body加上这个属性能够禁用hover从而有效提高FPS，
还给出了相关测试数据。但是在各位网友的质疑和测试下发现实际效果不如数据展示的那么美好，
一是各家浏览器都有针对滚动时指针hover的优化，二是这个属性会导致页面无法响应触屏，后来就不了了之了
。现在还在使用的场景大概只剩下通过pointer-event:none加上去除href属性来360度无死角的禁用a标签这一项了吧。
pointer-events: auto || none; 
pointer-events:  auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit 
    


伪元素获取自定义属性
<div class="demo" data-unit="元">18</div>
.demo:after {
    content: attr(data-unit);
    color: #f00;
}
demo:hover::after { //伪类配合伪元素来显示自定义内容
    content: attr(data-unit);
    color: #f00;
}




selection:可设置文字被选择时的样式
<div class="demo">asdbasdasdasd</div>
.demo::selection {
    background: #FE6E66;
    color: #ccc;
}



calc(); //做自适应
使用“+”、“-”、“*” 和 “/”四则运算；
可以使用百分比、px、em、rem等单位；
可以混合使用各种单位进行计算；
表达式中有“+”和“-”时，其前后必须要有空格，如"widht: calc(12%+5em)"这种没有空格的写法是错误的；
表达式中有“*”和“/”时，其前后可以没有空格，但建议留有空格。




filter


设置元素文字不可被选中，WebApp常用
-webkit-user-select: none;


/* 禁止长按链接与图片弹出菜单 */
a, img {
  -webkit-touch-callout: none; 
}


/*ios ipad去除自带阴影的样式*/
a, input{ 
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}


解决移动端滚动不回弹问题
-webkit-overflow-scrolling: touch




单行文本 多出部分省略号
overflow: hidden;
white-space: nowrap;
text-overflow:ellipsis


多行文本 多出部分省略号
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;


border  0.5像素
.demo {
    position: relative;
    width: 400px;
    height: 400px;
    
}
.demo:after {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    top:0;left:0;
    border:1px solid #ccc;
    transform-origin: 0 0;
    transform: scale(0.5);
}




fixed定位相对父级容器定位，不添加:top,bottom,left,right样式，通过margin定位
.demo {
    position: fixed;
    width: 300px;
    height: 400px;
    background: #ff0;
    margin: 50px 0 0 50px;
}



选择器
:valid  和 :invalid

必须加上  required 属性(必填的意思)
<input type="email" required placeholder="请输入邮箱">

input:valid  input值合法时触发
input:invalid  input值非法使触发