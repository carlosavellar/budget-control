

const budgetController = (() =>{



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
            },
            clearFields:(desc, value)=>{
                let item = document.querySelectorAll(desc + "," + value);
                item.forEach(curr=>{
                    curr.value = '';
                });
                
            }
        };
    }
)();
const controller = ((budgetCtrl, uiCtrl)=>{
    let Dom, input;
    Dom = uiCtrl.globlaStrings();
    input = uiCtrl.inputVals();

    
    const eventListenners = ()=>{
        document.querySelector(Dom.btn).addEventListener('click', controlAddItems);
        document.addEventListener('keypress', evt=>{
            if(evt.keyCode === 13 || evt.which === 13){
                controlAddItems();
            }
        });
    };
    const controlAddItems = ()=>{
        if(input.getDesc !== ' ' && !isNaN(input.getValue) || input.getValue > 0){
           
            // Clear Fields
            uiCtrl.clearFields(Dom.desc, Dom.value);
            console.log("SIM NESSA PORRA");

        }else{
            console.log('Nada nesse caralho');
        }

    };
    return{
        init:()=>{
            eventListenners();
        }
    }
}
)(budgetController, uiController);
controller.init();

