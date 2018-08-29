

const budgetController = (() =>{

    class Expense{
        constructor(id, description, value){
            this.id = id;
            this.description = description;
            this.value = value;
        }
    }
    class Income{
        constructor(id, description, value){
            this.id = id;
            this.description = description;
            this.value = value;
        }
    }
    let data={
        allItems:{
            inc: ['2'],
            exp: []
        },
        totais:{
            exp: 0,
            inc: 0
        },
    };
    return{
        addItem: (type, description, value)=>{
            let newitem, ID;
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else {
                ID = 0;
            }
            if(type === 'inc'){
                newitem = new Income(ID, description, value);
            }else if(type === 'exp'){
                newitem = new Expense(ID, description, value);
            }
            data.allItems[type].push(newitem);
            return newitem;
        },
        testings:()=>{


        }
    };
})();
budgetController.testings();

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
           
            budgetCtrl.addItem(input.getType, input.getDesc, input.getValue);

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

