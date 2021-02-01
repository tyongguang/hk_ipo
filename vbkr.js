javascript:
pwd = '123456';
cnt = '//*[@id="iposVue"]/div[2]/div[2]/div[2]/div[1]/ul[1]/li[3]/span[2]/div/ul/li[11]';

function getElementByXpath(path) {
     return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function sleep(time) {
     return new Promise((resolve) => setTimeout(resolve, time));
}
subscription_node = '//*[@id="iposVue"]/div[2]/div[2]/div[2]/div[1]/ul[1]/li[2]/span[2]/a[2]';
select_node = '//*[@id="iposVue"]/div[2]/div[2]/div[2]/div[1]/ul[1]/li[3]/span[2]/div/div';
buy_node = '//*[@id="iposVue"]/div[2]/div[2]/div[2]/a';


var ary = new Array()
ary.push(
     100, function () {
          subscription_ele = getElementByXpath(subscription_node);
          if (subscription_ele == null) {
               location.reload();
          }
     },
     200, function () {
          getElementByXpath(select_node).click();
     },
     300, function () {
          cnt_ele = getElementByXpath(cnt);
          if (cnt_ele.className == 'option-item' || cnt_ele.className == 'option-item red') {
               getElementByXpath(cnt).click();
          }
          else if (cnt_ele.className == 'c999') {
               location.reload();
          } else {
               alert("Unknown!");
               location.reload();
          }
     },
     100, function () {
          getElementByXpath(buy_node).click();
     },
     500, function () {
          pwd_ele = document.getElementById("jq_pop_pwd");
          pwd_ele.value = pwd;
          pwd_ele.dispatchEvent(new Event('input'));
          document.getElementById("jq_btn_ok").click();
     },
);

i = 0;
main_func = function () {
     if (i >= ary.length - 1) {
          return;
     }
     sleep(ary[i]).then(() => {
          ary[i + 1]();
          i += 2;
          main_func();
     });
}
main_func();