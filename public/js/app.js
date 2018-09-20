const budgetController = (() => {
    console.log('Budget');

    class Expense {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
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
                newItem = new Income(ID, description, value);
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
                data.percentage = (data.totals.exp / data.totals.inc) * 100;
            }
            data.percentage = -1;
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
                html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%desc%</div> <div class="right clearfix"> <div class="item__value">%val%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            }
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%desc%', obj.description);
            newHtml = newHtml.replace('%val%', obj.value);
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        }
    }
})();
const controller = ((budgetCtrl, uiCtrl) => {
    let Dom = uiCtrl.globalInput();

    const updateBudget = () => {
        budgetCtrl.calculateBudget();
    };
    const controlAddItem = () => {
        let input, newItem;
        input = uiCtrl.inputVals();
        newItem = budgetCtrl.addItem(input.getType, input.getDesc, input.getValue);

        uiCtrl.addItem(input.getType, newItem);

        updateBudget();
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
    };

    return {
        init: () => {
            evtListeners();
        }
    };


})(budgetController, uiController);
controller.init();