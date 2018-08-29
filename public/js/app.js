
const budgetController = (()=>{
    
    class Expense{
        constructor(id, description, valour){
            this.id = id;
            this.description = description;
            this.valour = valour;
            this.percentage = -1;
        }
    }

    Expense.prototype.updatePercentage = (totalIncome)=>{
        let item;
        data.allitems.exp.map(curr=>{
            return item = (curr.valour / totalIncome) * 100;
        });
        return item;
    };
    Expense.prototype.getPercentages = ()=>{
        this.percentage = percentage;
    }; 
    class Income {
        constructor (id, description, valour) {
            this.id = id;
            this.description = description;
            this.valour = valour;
        }
    }
    const calcTotals = (type)=>{
        let sum = 0;
        data.allitems[type].forEach(el => {
            return sum += el.valour;
        });
        data.totals[type] = sum;
    };
    let data = {
        allitems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        budget: 0,
        percentage: -1
    };
    return{
        addItem: (type, description, valour)=>{
            let newItem, ID;
            
            if(data.allitems[type].length > 0){
                ID = data.allitems[type][data.allitems[type].length - 1].id +1;
            
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

        deleteItem: (id, type)=>{
            let item, index;
            item = data.allitems[type].map(curr=>{
                return curr.id;
            });
            index = item.indexOf(id);
            if (index !== -1){
                data.allitems[type].splice(index, 1);
           }

            
        },
        calculateBudget: ()=>{
            // calca totlas
            calcTotals('inc');
            calcTotals('exp');
            // calc budget
            // calc percentages
            data.budget  = data.totals.inc - data.totals.exp;
            
            if(data.totals.inc > 0){
                data.percentage =(data.totals.exp / data.totals.inc) * 100;
            }else{
                data.percentage = -1;
            }
  
        },
        testings: ()=>{
            debugger;
            console.log(data);
        },
        getBudget:()=>{
            return{  
                budget: data.budget,
                percentage: data.percentage,
                inc: data.totals.inc,
                exp: data.totals.exp
            };
        },
        updatePercentages:()=>{
            
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
        container: ".container",
        budget: ".budget__value",
        income_lable: ".budget__income--value",
        expense_lable: ".budget__expenses--value",
        month: ".budget__title--month",
        percentage: ".budget__expenses--percentage"
    };
    const formtNumbers =  (num, type) => {
        let int, dec, splititem;
        num = Math.abs(num);
        num = num.toFixed(2);
        splititem = num.split(".");
        int = splititem[0];
        if (int > 3) {
            int = int.substr(0, int.length - 3) + '.' + int.substr(3, 3 + int.length);
        }
        dec = splititem[1];
        return (type === 'inc' ? '+' : '-') + ' ' + int + ',' + dec;
    };
    return{
        inputVals:()=>{
            return{
                getType: document.querySelector(domstrings.type).value,
                getDesc: document.querySelector(domstrings.desc).value,
                getValue: parseInt(document.querySelector(domstrings.valour).value)
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
        displayBudget: (obj)=>{
            let type;
            obj.budget > 0 ? type = '+' : type = '-';
            document.querySelector(domstrings.income_lable).textContent = formtNumbers(obj.inc, 'inc');
            document.querySelector(domstrings.expense_lable).textContent = formtNumbers(obj.exp, 'exp');
            document.querySelector(domstrings.budget).textContent = formtNumbers(obj.budget, type);
            document.querySelector(domstrings.percentage).textContent = obj.percentage + ' %'; 
        },
        deleteItem:(e)=>{
            let el = document.getElementById(e);
            el.parentNode.removeChild(el);
        },
        globalStrings:()=>{
            return domstrings;
        },
        
    }

})();
const controller = ((budgetCtrl, uiCtrl)=>{
    let Dom = uiCtrl.globalStrings();

    const updateBudget = ()=>{
        budgetCtrl.calculateBudget();
    };

    const updatePercentages = ()=>{

    };

    const controlDeleleItem = (e)=>{
        let item, splitItem, type, ID;
        item = e.target.parentNode.parentNode.parentNode.parentNode.id;
        if(item){
            splitItem = item.split("-");
            type = splitItem[0];
            ID = parseFloat(splitItem[1]);

            budgetCtrl.deleteItem(ID, type);

            uiCtrl.deleteItem(item);

            updateBudget();
        }
    };

    // TODO: Terminar essa porra

    const controlAddItem = ()=>{
        let input, newItem, budget;
        input = uiCtrl.inputVals();
        newItem = budgetCtrl.addItem(input.getType, input.getDesc, input.getValue);
        console.log(newItem);

        uiCtrl.addItem(input.getType, newItem);
        
        updateBudget();

        budget = budgetCtrl.getBudget();

        uiCtrl.displayBudget(budget);


    };
    const eventListenners = ()=>{
        document.querySelector(Dom.btn).addEventListener('click', controlAddItem);
        document.addEventListener('keypress', e=>{
            if(e.keyCode === 13 || e.which === 13){
                controlAddItem();
            }
        });
        document.querySelector(Dom.container).addEventListener('click', controlDeleleItem);
    };
    return{
        init: ()=>{
            eventListenners();
            uiCtrl.displayBudget( {
                    budget: 0,
                    percentage: 0,
                    inc: 0,
                    exp: 0
            });
        }
    };
})(budgetController, uiController);
controller.init();