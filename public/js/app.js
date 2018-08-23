const budgetController = (()=>{
    console.log("é nóis de novo");
})();
const uiController = (()=>{
    let domstrings = { 
        type: "add__type", 
        desc: "add__description",
        valour: ".add__value",
        btn: ".add__btn",
        incList: ".income__list",
        expList: ".expenses__list",
        container: "container",
        budget: ".budget__value",
        income_lable: ".budget__income--value",
        expense_lable: ".budget__expenses--value",
        month: "budget__title--month"
    };
    return{
        inputVals:()=>{
            return{
                getType: document.querySelector(domstrings.type).value,
                getDesc: document.querySelector(domstrings.desc).value,
                getValue: document.querySelector(domstrings.valour).value,
            };
        },
        globalStrings:()=>{
            return domstrings;
        }
    }

})();
const controller = ((budgetCtrl, uiCtrl)=>{
    let Dom = uiCtrl.globalStrings();

    const controlAddItem = ()=>{
        console.log('Tester');
    };
    const eventListenners = ()=>{
        document.querySelector(Dom.btn).addEventListener('click', controlAddItem);
        document.addEventListener('keypress', e=>{
            if(e.keyCode === 13 || e.which === 13){
                controlAddItem();
            }
        });
    };
    return{
        init: ()=>{
            eventListenners();
        }
    };
})(budgetController, uiController);
controller.init();