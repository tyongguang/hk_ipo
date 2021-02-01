javascript:
pwd = '123456';
cnt = 10;

function getElementByXpath(path) {
     return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function sleep(time) {
     return new Promise((resolve) => setTimeout(resolve, time));
}

comfirm_node = '//*[@id="3"]/div[2]/form[2]/table/tbody/tr[8]/td/input[1]';
sleep(200).then(() => {
    select_ele = document.getElementById("BQty");
    comfirm_ele = getElementByXpath(comfirm_node);
    select_ele.selectedIndex  = cnt;
    comfirm_ele.click();
});