

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
            inc: [],
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
            console.log(data);
        }
    };
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
                
            },
            addItem: (obj, type)=>{
                let html, newHtml, element;
                if(type === 'inc'){
                    element = domstrings.incList;
                    html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description"> %desc%</div> <div class="right clearfix"> <div class="item__value">%val%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
                }else if(type === 'exp'){
                    element = domstrings.expList;
                    html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description"> %desc%</div> <div class="right clearfix"> <div class="item__value">%val%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
                }
                newHtml = html.replace("%id%", obj.id);
                newHtml = newHtml.replace("%desc%", obj.description);
                newHtml = newHtml.replace("%val%", obj.value);
                document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

            }

        };
    }
)();
const controller = ((budgetCtrl, uiCtrl)=>{
    let Dom = uiCtrl.globlaStrings();
    
    const eventListenners = ()=>{
        document.querySelector(Dom.btn).addEventListener('click', controlAddItems);
        document.addEventListener('keypress', evt=>{
            if(evt.keyCode === 13 || evt.which === 13){
                controlAddItems();
            }
        });
    };
    const controlAddItems = ()=>{
        let input, newItem;
        input = uiCtrl.inputVals();
        if(input.getDesc !== ' ' && !isNaN(input.getValue) || input.getValue > 0){
            newItem = budgetCtrl.addItem(input.getType, input.getDesc, input.getValue);

            uiCtrl.addItem(newItem, input.getType);
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

