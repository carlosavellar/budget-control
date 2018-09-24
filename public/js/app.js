const budgetController = (() => {
    console.log('Budget');

    class Expense {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        }
        calculatePercentages (totalIncome){
            if(totalIncome > 0){
                this.percentages = Math.round((this.value / totalIncome) * 100);
            }else{
                this.percentages = -1;
            }
        }
        getPercentages (){
            return this.percentages;
        }
    }
    
    class Income {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        }
    }
    let data = {
        allItems: {
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

    const calcTotals = (type) => {
        let sum = 0;
        data.allItems[type].forEach(curr => sum += curr.value);

        data.totals[type] = sum;

        return sum;
    };

    return {
        addItem: (type, description, value) => {
            let ID, newItem;
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            if (type === 'inc') {
                newItem = new Income(ID, description, value);
            } else if (type === 'exp') {
                newItem = new Expense(ID, description, value);
            }
            data.allItems[type].push(newItem);
            return newItem;
        },
        testings: () => {
            return data;
        },
        calculateBudget: () => {
            //  calc Totlas
            calcTotals('inc');
            calcTotals('exp');
            // calc budget
            data.budget = data.totals.inc - data.totals.exp;
            console.log(data.totals.inc);
            // Calc percentage 
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }else {

                data.percentage = -1;
            }
        },
        getBudget: ()=>{
            return{
                 incLable: data.totals.inc,
                 expLable: data.totals.exp,
                 budget: data.budget,
                 percentage: data.percentage
            }
        },
        deleteItem: (type, ID)=>{
            let item, index;
            item = data.allItems[type].map(curr => curr.id);
            index = item.indexOf(ID);
            if(index !==  -1 ){
                data.allItems[type].splice(index, 1);
            }
        },
        calculatePercentages: () =>{
            data.allItems.exp.forEach(curr => curr.calculatePercentages(data.totals.inc));
        },
        getPercentages: ()=>{
            let perce = data.allItems.exp.map(curr=>curr.getPercentages());
            return perce;
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
        percentage: ".budget__expenses--percentage",
        item_perce: ".item__percentage"
    };
    const formarDigits = (num, type)=>{
        let int, dec, splitNum;
        num = Math.abs(num);
        num = num.toFixed(2);
        splitNum = num.split('.');
        int = splitNum[0];
        dec = splitNum[1];
        if(int.length > 3){
            int = int.substr(0, int.length - 3) + '.' + int.substr(int.length - 3, 3);
        }
        return (type === 'inc' ? '+' : '-') + ' ' + int + ',' + dec;
        // num = num
    };
    return {
        inputVals: () => {
            return {
                getType: document.querySelector(domstrings.type).value,
                getDesc: document.querySelector(domstrings.desc).value,
                getValue: parseInt(document.querySelector(domstrings.value).value)
            }
        },
        globalInput: () => {
            return domstrings;
        },
        addItem: (type, obj) => {
            let html, newHtml, element;
            if (type === 'inc') {
                element = domstrings.incList;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%desc%</div> <div class="right clearfix"> <div class="item__value">%val%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            } else if (type === 'exp') {
                element = domstrings.expList;
                html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%desc%</div> <div class="right clearfix"> <div class="item__value">%val%</div> <div class="item__percentage">%iPerce%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            }
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%desc%', obj.description);
            newHtml = newHtml.replace('%val%', obj.value);
            newHtml = newHtml.replace('%iPerce%', obj.percentages);
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        displayBudget: (obj)=>{
            let type;
            obj.budget > 0 ? type = 'inc' : type = 'exp'; 
            document.querySelector(domstrings.budget).textContent = formarDigits(obj.budget, type);
            document.querySelector(domstrings.income_lable).textContent = formarDigits(obj.incLable, '+' );
            document.querySelector(domstrings.expense_lable).textContent = formarDigits(obj.expLable, '-');
            document.querySelector(domstrings.percentage).textContent = obj.percentage;
        },
        
        
    }
})();
const controller = ((budgetCtrl, uiCtrl) => {
    let Dom = uiCtrl.globalInput();

    const updateBudget = () => {
        let budget;
        budgetCtrl.calculateBudget();
        budget = budgetCtrl.getBudget();

        uiCtrl.displayBudget(budget);
    };
    const updatepercentages = ()=>{


        // 1 . Calculate perce

        // 2 . Ready budget Controller

        // 3 . Update user inerface

    };
    const constrollDeleteItem = (e)=>{
        let item, splitedItem, type, ID;
        item = e.target.parentNode.parentNode.parentNode.parentNode.id;
        if(item){
            
            splitedItem = item.split('-');
            type = splitedItem[0];
            ID =  parseFloat(splitedItem[1]);

            budgetCtrl.deleteItem(type, ID);

            updateBudget();

        
        }
    };
    const controlAddItem = () => {
        let input, newItem;
        input = uiCtrl.inputVals();
        newItem = budgetCtrl.addItem(input.getType, input.getDesc, input.getValue);

        uiCtrl.addItem(input.getType, newItem);

        updateBudget();

        updatepercentages();
        
    };
    const evtListeners = () => {
        document.querySelector(Dom.btn).addEventListener('click', controlAddItem);
        document.addEventListener("keypress", e => {
            if (e.keycode === 13 || e.which === 13) {
                controlAddItem();
            }
        });
        debugger;
        budgetCtrl.testings();

        document.querySelector(Dom.container).addEventListener('click', constrollDeleteItem);
    };
   
    return {
        init: () => {
            evtListeners();
            uiCtrl.displayBudget({
                incLable: 0,
                expLable: 0,
                budget: 0,
                percentage: 0
            });
        }
    };
})(budgetController, uiController);
controller.init();

