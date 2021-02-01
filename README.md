## 华盛通

### 准备

1. 预先打开好页面，必须拿chrome打开 

     比如心通医疗
     https://hk.vbkr.com/ipo/hk/ipos/758/apply

     

2. 填好密码和多少手  
   
   * 打开`vbkr.js`
   
   * 替换上面的123456为自己的密码
   
   * `cnt`变量中最后的`li[11]`,  `11` 表示认购数量对应的位置号（索引从1开始），看自己的额度适当修改。
   
     
   

###    半自动

1. 将修改好的`vbkr.js`，多行换转换成一行  

   使用`Notepad++` 打开`vbkr.js`， 全部选择，使用快捷键`Ctrl +j`

   

2. 创建或修改书签  

   在chrome浏览器新建一个书签，随便建。编译书签的URL，将URL替为步骤1的内容。



3. 手动循环刷

    * 进入打新页面，单击上面书签，如果没额度，JS会自动刷新页面，发现页面刷新后，要手动再单击书签，这是没额度或者时间未到的情况，就是需要手动刷。 
    * 有满足额度，会直接自动交易。

    * 如需要手动确认，只需要将`vbkr.js` 中的`document.getElementById("jq_btn_ok").click();`删掉。

      > 是删掉，千万别注释，在多行变一行的过程中，使用 `//` 注释会坑得怀疑人生。



### 全自动

 1. Chrome中安装 `Scripty`

    > https://chrome.google.com/webstore/detail/scripty-javascript-inject/milkbiaeapddfnpenedfgbfdacpbcbam?hl=en

 2. 使用`Scripty`创建自动脚本

    **注意**：
    
    * 将修改好的`vbkr.js`，填入到下面的`javascript code` 中，不需要带开头的`javascript:`。
    * 条件URL，为目标网页的URL，同时将`https://`去掉。
    * 如需要最后手动确认，只需要将`vbkr.js` 中的`document.getElementById("jq_btn_ok").click();`删掉。
    
    ![scripty_vbk](images/scripty_vbkr.png)

3. 打开目标网页

4. 躺着

   

## 辉立

Todo

