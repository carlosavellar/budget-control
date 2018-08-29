

const budgetController = (() => {


})();


const uiController = (()=>{
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
        return{
            inputVals: ()=>{
                return{
                    getType: document.querySelector(domstrings.type).value,
                    getDesc: document.querySelector(domstrings.desc).value,
                    getValue: document.querySelector(domstrings.value).value
                };
            },
            globlaStrings:()=>{
                return domstrings;
            }
        };
    }
)();
const controller = ((budgetCtrl, uiCtrl)=>{
    let Dom, input;
    Dom = uiCtrl.globlaStrings();
    input = uiCtrl.inputVals();

    const controlAddItems = ()=>{
        console.log(`${Dom} Sao esses`);
        // console.log('Teste');
    };

    const eventListenners = ()=>{
        document.querySelector(Dom.btn).addEventListener('click', controlAddItems);
        document.addEventListener('keypress', evt=>{
            if(evt.keyCode === 13 || evt.which === 13){
                controlAddItems();
            }
        });
    };
    return{
        init:()=>{
            eventListenners();
        }
    }
}
)(budgetController, uiController);
controller.init();





// let domstrings = {
//     type: ".add__type",
//     desc: ".add__description",
//     valour: ".add__value",
//     btn: ".add__btn",
//     incList: ".income__list",
//     expList: ".expenses__list",
//     container: ".container",
//     budget: ".budget__value",
//     income_lable: ".budget__income--value",
//     expense_lable: ".budget__expenses--value",
//     month: ".budget__title--month",
//     percentage: ".budget__expenses--percentage"
// };