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

subscription_ele = getElementByXpath(subscription_node);
if (subscription_ele == null) {
     location.reload();
}

subscription_ele.click();
sleep(200).then(() => {
     getElementByXpath(select_node).click();
     sleep(300).then(() => {
          cnt_ele = getElementByXpath(cnt);
          if (cnt_ele.className == 'option-item' || cnt_ele.className == 'option-item red') {
               getElementByXpath(cnt).click();
               sleep(100).then(() => {
                    getElementByXpath(buy_node).click();
                    sleep(500).then(() => {
                         pwd_ele = document.getElementById("jq_pop_pwd");
                         pwd_ele.value = pwd;
                         pwd_ele.dispatchEvent(new Event('input'));
                         document.getElementById("jq_btn_ok").click();
                    });
               });
          } else if (cnt_ele.className == 'c999') {
               location.reload();
          }
     });
});