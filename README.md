## 华盛通

### 准备

1. 预先打开好页面，必须拿chrome打开 

     比如：心通医疗
     https://hk.vbkr.com/ipo/hk/ipos/758/apply

     

2. 填好密码和多少手  
   
   * 打开`vbkr.js`
   
   * 替换上面的123456为自己的密码
   
   * `cnt`变量中最后的`li[X]`,  `X` 表示认购数量对应的位置号（索引从1开始），看自己的额度适当修改。
   
     > 另一个方法：获得目标选项的`XPath`,替换`cnt`变量的内容。
   
3. Chrome中安装 `Scripty`

    > https://chrome.google.com/webstore/detail/scripty-javascript-inject/milkbiaeapddfnpenedfgbfdacpbcbam?hl=en

4. 使用`Scripty`创建自动脚本

    **注意**：
    
    * 将修改好的`vbkr.js`，填入到下面的`javascript code` 中。
    * 条件URL，为目标网页的URL，同时将`https://`去掉。
    * 如需要最后手动确认，只需要将`vbkr.js` 中的`document.getElementById("jq_btn_ok").click();`删掉。
    
    ![scripty_vbk](images/scripty_vbkr.png)

5. 打开目标网页

    在未满足条件的情况下，网页会自动刷新，直到抢购成功。

    

## 华泰

网页版失效



## 方德

未发现网页版。



## 辉立

Todo

