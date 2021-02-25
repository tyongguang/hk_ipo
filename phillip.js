//孖展：现金=0，10倍=10，20倍=20，100%=-1, 优先20倍，次之10倍=30
margin = 20; 
cnt = 10; //hand index

function getElementByXpath(path) {
     return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function sleep(time) {
     return new Promise((resolve) => setTimeout(resolve, time));
}

function main() {
     var ary = new Array()
     ary.push(
          200, function () {
               select_ele = document.getElementById("BQty");
               select_ele.selectedIndex  = cnt;
               select_ele.dispatchEvent(new Event('change'));
               return true;
          },
          500, function () {
               OrderSide = document.getElementById("OrderSide");
               target_index = -100;
               for(i = 0; i < OrderSide.options.length;i++) {
                    if (margin == 30) {
                         if (OrderSide.options[i].text == '95% 孖展') {
                              target_index = i;
                              break;
                         }
                         if (OrderSide.options[i].text == '90% 孖展') {
                              target_index = i;
                         }
                    } else if ((OrderSide.options[i].text == '現金全數' && margin == 0)  ||
                         (OrderSide.options[i].text == '95% 孖展' && margin == 20)  ||
                         (OrderSide.options[i].text == '90% 孖展' && margin == 10) ||
                         (OrderSide.options[i].text == '100% 孖展' && margin == -1)
                    ) {
                         target_index = i;
                    }

               }
               if (target_index > 0) {
                    OrderSide.selectedIndex  = target_index;
                    OrderSide.dispatchEvent(new Event('change'));
                    return true;
               }

               console.log("需要的孖展套餐不满足，准备刷新...");
               location.reload();
               return false;
          },
          200, function () {
               comfirm_node = '//*[@id="2"]/div[2]/form[2]/table/tbody/tr[7]/td/input[1]';
               comfirm_ele = getElementByXpath(comfirm_node);
               console.log("click.....");
               console.log(comfirm_ele);
               comfirm_ele.click();
               return true;
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


