//孖展：10倍=10，20倍=20， 优先20倍，次之10倍=30
margin = 30; 
need_confirm = true;
// 目前的本金有多少
save = 45000

// 一般URL, 关键要修改6601为目标股票代码
// https://trading.poems.com.hk/POEMS2/ProductPlatform/LStock/IPO_New/InputIpo.asp?SCTYCode=6601&WebSite=&Popup=N

function getElementByXpath(path) {
     return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function sleep(time) {
     return new Promise((resolve) => setTimeout(resolve, time));
}

function main() {
     test_node = getElementByXpath('//*[@id="3"]/div[1]')

     if (test_node == null) {
          console.log("还没开始？");
          location.reload();
          return;
     }
     test_node_txt = test_node.outerText[0];
     if (test_node_txt == '新') {
          alert("已经认购？");
          return;   
     }
     if (test_node_txt != '認') {
          alert("有异常");
          return;   
     }

     price_node = '//*[@id="2"]/div[2]/form[2]/table/tbody/tr[2]/td[2]';
     price_ele = getElementByXpath(price_node);
     price = parseFloat(price_ele.innerText.replace(/,/g, ''))     
     select_ele = document.getElementById("BQty");
     target_range = new Array();
     for(i = 1; i < select_ele.options.length;i++) {
          target_range.push(parseFloat(select_ele.options[i].text.replace(/,/g, '')))
     }


     function select_hands(margin_value) {
          max_hands = -1;
          for (j = 0; j < target_range.length;j++) {
               if (target_range[j] * price  > save * margin_value) {
                    max_hands = j;
                    console.log("max hands:", target_range[j], "margin:", margin_value )
                    break
               }
          }
          if (max_hands > 0) {
               select_ele.selectedIndex = max_hands; //前后错一位，正好不用补
               select_ele.dispatchEvent(new Event('change'));
          }
     }
     valid_margin = -100;
     var ary = new Array()
     ary.push(
          100, function () {
               if (margin == 30 || margin == 20) {
                    select_hands(20);
               } else if (margin == 10) {
                    select_hands(10);
               } else {
                    console.log("invalid margin");
                    return false;
               }
               return true;
          },
          500, function () {
               OrderSide = document.getElementById("OrderSide");
               target_index = -100;
               
               for(i = 0; i < OrderSide.options.length;i++) {
                    if (margin == 30) {
                         if (OrderSide.options[i].text == '95% 孖展') {
                              target_index = i;
                              valid_margin = 20;
                              console.log("get margin 20");
                              break;
                         }
                         if (OrderSide.options[i].text == '90% 孖展') {
                              target_index = i;
                              valid_margin = 10;
                              console.log("get margin 10");
                         }
                    } else if ( (OrderSide.options[i].text == '95% 孖展' && margin == 20)  ||
                         (OrderSide.options[i].text == '90% 孖展' && margin == 10) 
                    ) {
                         target_index = i;
                    }
               }
               if (target_index > 0) {
                    if (margin == 30 && valid_margin == 10) {
                         select_hands(10);
                    }
                    OrderSide.selectedIndex  = target_index;
                    OrderSide.dispatchEvent(new Event('change'));
                    return true;
               }
               console.log("需要的孖展套餐不满足，准备刷新...");
               location.reload();
               return false;
          },
          100, function () {
               comfirm_node = '//*[@id="2"]/div[2]/form[2]/table/tbody/tr[7]/td/input[1]';
               comfirm_ele = getElementByXpath(comfirm_node);
               if (comfirm_ele == null) {
                    alert("提示按钮不存在？多分析这种CASE的情况");
                    return false;
               }

               if (need_confirm) {
                    if (confirm('确认打新, ' + valid_margin.toString() + "倍扛杆？")) {
                         console.log("click.....");
                         console.log(comfirm_ele);
                         comfirm_ele.click();
                         return true;
                    }else {
                         console.log("取消打新");
                    }
               } else {
                    console.log("click.....");
                    console.log(comfirm_ele);
                    comfirm_ele.click();
                    return true;
               }
               
               return false;
          }
     );

     main_idx = 0;
     main_func = function () {
          if (main_idx >= ary.length - 1) {
               return;
          }
          sleep(ary[main_idx]).then(() => {
               if (false == ary[main_idx + 1]()) {
                    return;
               }
               main_idx += 2;
               main_func();
          });
     }
     main_func();
}
main();


