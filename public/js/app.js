const budgetController = (() => {
    console.log('Budget');

    class Expense {
        constructor(id, description, value){
            this.id = id;
            this.idescriptiond = description;
            this.value = value;
        }
    }
    class Income {
        constructor(id, description, value){
            this.id = id;
            this.idescriptiond = description;
            this.value = value;
        }
    }
    let data={
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
    };

    return {
        addItem: (type, description, value)=>{
            let ID, newItem;
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length  - 1].id + 1;
            }else{
                ID = 0;
            }
            if(type === 'inc'){
                newItem = new Income(ID, description, value);
            }else if(type === 'exp'){
                newItem = new Income(ID, description, value);
            }
            data.allItems[type].push(newItem);
            return newItem;
        },
        testings: ()=>{
           return data;
        }
    };


})();
const uiController = (() => {
    let domstrings = {
        type: ".add__type",
        desc: ".add__description",
        value: ".add__value",
        btn: ".add__btn",
        incList: ".income__list",
        expList: ".expenses__list",
        container: ".container",
        budget: ".budget__value",
        income_lable: ".budget__income--value",
        expense_lable: ".budget__expenses--value",
        month: ".budget__title--month",
        percentage: ".budget__expenses--percentage"
    };
    return {
        inputVals: () => {
            return{
                getType:  document.querySelector(domstrings.type).value,
                getDesc:  document.querySelector(domstrings.desc).value,
                getValue:  document.querySelector(domstrings.value).value
            }
        },
        globalInput: ()=>{
            return domstrings;
        }
    };
})();
const controller = ((budgetCtrl, uiCtrl) => {
    let Dom = uiCtrl.globalInput();
    const controlAddItem = ()=>{
        let input, newItem;
        input = uiCtrl.inputVals();
        newItem = budgetCtrl.addItem(input.getType,input.getDesc,input.getValue);
    };
    const evtListeners = ()=>{
        document.querySelector(Dom.btn).addEventListener('click', controlAddItem);
        document.addEventListener("keypress", e=>{
            if(e.keycode === 13 || e.which === 13){
                controlAddItem();
            }
        });
        budgetCtrl.testings();
    };

    return{
        init: ()=>{
            evtListeners();
        }
    };


})(budgetController, uiController);
controller.init();