

const budgetController = (() =>{

    class Expense{
        constructor(id, description, value){
            this.id = id;
            this.description = description;
            this.value = value;
            this.percentages = -1;
        }
    }
    Expense.prototype.calcPercentages = (totalIncome)=>{
        if (totalIncome > 0){
            console.log(typeof totalIncome);
            console.log(this.value);
            this.percentages = Math.round((this.value / totalIncome) * 100);
        }else{
            this.percentages = -1;
        }
    };
    Expense.prototype.getPercentages = ()=>{
        return this.percentages;
    };
    class Income{
        constructor(id, description, value){
            this.id = id;
            this.description = description;
            this.value = value;
        }
    }

    

    const calcBudget = (type)=>{
        let sum = 0;
        data.allItems[type].forEach(err=>{
            return sum += err.value;
        });
        data.totais[type] = sum;
    };
    let data={
        allItems:{
            inc: [],
            exp: []
        },
        totais:{
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
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
        calculateBudget: ()=>{
            // calcatotals
            calcBudget('inc');
            calcBudget('exp');

            // calc budget
            data.budget = data.totais.inc - data.totais.exp;

            // calc percentage
            if(data.totais.inc > 0){
                data.percentage = Math.round((data.totais.exp / data.totais.inc) * 100);
            }else {
                data.percentage = -1;
            }
        },
        getBudget: ()=>{
            return{
                budget: data.budget,
                labelInc: data.totais.inc,
                labelExp: data.totais.exp,
                percentage: data.percentage
            };
        },
        testings:()=>{
            console.log(data);
        },
        deleteItem: (ID, type)=>{
            let index, item;
            item = data.allItems[type].map(curr=>{
                return curr.id;
            });
            index = item.indexOf(ID);
            if (index !== -1){
                data.allItems[type].splice(index, 1); 
            }
        },
        calculatePercentages: ()=>{
            data.allItems.exp.forEach(curr=>{
                return curr.calcPercentages(data.totais.inc);
            }); 
        },
        getPercentages: ()=>{
            let perce = data.allItems.exp.map(curr=>{
                return curr.getPercentages();
            });
            return perce;
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
        const  formatDigits = (num, type) => {
                let int, dec, splitnum;
                num = Math.abs(num);
                num = num.toFixed(2);
                splitnum = num.split('.');
                int = splitnum[0];
                if (int.length > 3) {
                    int = int.substr(int, int.length - 3) + "," + int.substr(int.length  - 3, 3);
                }
                dec = splitnum[1];

                return (type === "inc" ? "+" : "-") +  '  ' + int + ',' + dec;
        };
        return{
            inputVals: ()=>{
                return{
                    getType: document.querySelector(domstrings.type).value,
                    getDesc: document.querySelector(domstrings.desc).value,
                    getValue: parseInt(document.querySelector(domstrings.value).value)
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
                    html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description"> %desc%</div> <div class="right clearfix"> <div class="item__value">%val%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
                }
                newHtml = html.replace("%id%", obj.id);
                newHtml = newHtml.replace("%desc%", obj.description);
                newHtml = newHtml.replace("%val%", formatDigits(obj.value, type));
                document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            },
            displayBudget: (obj)=>{
                document.querySelector(domstrings.budget).textContent = obj.budget;
                document.querySelector(domstrings.income_lable).textContent = obj.labelInc;
                document.querySelector(domstrings.expense_lable).textContent = obj.labelExp;
                document.querySelector(domstrings.percentage).textContent = obj.percentage;
            },
            deleteItem: (item)=>{
                let el = document.getElementById(item);
                el.parentNode.removeChild(el);
            },
            
        };
    }
)();
const controller = ((budgetCtrl, uiCtrl)=>{
    let Dom = uiCtrl.globlaStrings();
    
    const updateBudget = ()=>{
        budgetCtrl.calculateBudget();
        let budget = budgetCtrl.getBudget();
        uiCtrl.displayBudget(budget);

    };
    // const updatePercentages = () => {
    //   budgetCtrl.calculatePercentages();

    //   let perce = budgetCtrl.getPercentages();
    //   console.log(perce);
    // };
    const controlDeleteItem = (e)=>{

        let item, splitItem, ID, type;
        item = e.target.parentNode.parentNode.parentNode.parentNode.id;
        if (item){
            splitItem = item.split('-');
            type = splitItem[0];
            ID = parseFloat(splitItem[1]);
            budgetCtrl.deleteItem(ID, type);
            updateBudget();
            uiCtrl.deleteItem(item);
            // updatePercentages();
        }
    };

    const eventListenners = ()=>{
        document.querySelector(Dom.btn).addEventListener('click', controlAddItems);
        document.addEventListener('keypress', evt=>{
            if(evt.keyCode === 13 || evt.which === 13){
                controlAddItems();
            }
        });
        document.querySelector(Dom.container).addEventListener('click', controlDeleteItem);
    };
    const controlAddItems = ()=>{
        let input, newItem;
        input = uiCtrl.inputVals();
        if(input.getDesc !== ' ' && !isNaN(input.getValue) || input.getValue > 0){
            newItem = budgetCtrl.addItem(input.getType, input.getDesc, input.getValue);
            uiCtrl.addItem(newItem, input.getType);
            // Clear Fields
            uiCtrl.clearFields(Dom.desc, Dom.value);
            updateBudget();
            console.log("SIM NESSA PORRA");
            // updatePercentages();
        }else{
            console.log('Nada nesse caralho');
        }
       

    };
    return{
        init:()=>{
            eventListenners();
            uiCtrl.displayBudget({
              budget: 0,
              labelInc: 0,
              labelExp: 0,
              percentage: 0
            });
        }
    }
}
)(budgetController, uiController);
controller.init();

