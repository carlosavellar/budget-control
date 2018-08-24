const budgetController = (()=>{
    
    class Expense{
        constructor(id, description, valour){
            this.id = id;
            this.description = description;
            this.valour = valour;
        }
    }
    class Income {
        constructor(id, description, valour) {
            this.id = id;
            this.description = description;
            this.valour = valour;
        }
    }
    let data = {
        allitems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        }
    };
    return{
        addItem: (type, description, valour)=>{
            let newItem, ID;
            
            if(data.allitems[type].length > 0){
                ID = data.allitems[type][data.allitems[type].length - 1].id +1;
                console.log(ID);
            }else{
                ID = 0;
            }
            if(type === 'inc'){
                newItem = new Income(ID, description, valour);
            } else if (type === 'exp'){
                newItem = new Expense(ID, description, valour);
            }
            data.allitems[type].push(newItem);
            return newItem;
        },
        testings: ()=>{
            console.log(data);
        }
    };
   

})();
const uiController = (()=>{
    let domstrings = { 
        type: ".add__type", 
        desc: ".add__description",
        valour: ".add__value",
        btn: ".add__btn",
        incList: ".income__list",
        expList: ".expenses__list",
        container: "container",
        budget: ".budget__value",
        income_lable: ".budget__income--value",
        expense_lable: ".budget__expenses--value",
        month: ".budget__title--month"
    };
    return{
        inputVals:()=>{
            return{
                getType: document.querySelector(domstrings.type).value,
                getDesc: document.querySelector(domstrings.desc).value,
                getValue: document.querySelector(domstrings.valour).value,
            };
        },
        addItem:(type, obj)=>{
            let html, newHtml, element;
            if(type === 'inc'){
                element = domstrings.incList;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%desc%</div> <div class="right clearfix"> <div class="item__value">%val%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            } else if (type === 'exp'){
                element = domstrings.expList;
                html = '<div class="item clearfix" id="expense-0"> <div class="item__description">%desc%</div> <div class="right clearfix"> <div class="item__value">%val%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            }
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace("%desc%", obj.description);
            newHtml = newHtml.replace("%val%", obj.valour);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },
        globalStrings:()=>{
            return domstrings;
        }
    }

})();
const controller = ((budgetCtrl, uiCtrl)=>{
    let Dom = uiCtrl.globalStrings();
    const controlAddItem = ()=>{
        let input, newItem;
        input = uiCtrl.inputVals();
        newItem = budgetCtrl.addItem(input.getType, input.getDesc, input.getValue);
        console.log(newItem);

        uiCtrl.addItem(input.getType, newItem);
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