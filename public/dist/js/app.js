"use strict";var _createClass=function(){function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var budgetController=function(){console.log("Budget");var c=function(){function i(e,t,n){_classCallCheck(this,i),this.id=e,this.description=t,this.value=n}return _createClass(i,[{key:"calculatePercentages",value:function(e){this.percentages=0<e?Math.round(this.value/e*100):-1}},{key:"getPercentages",value:function(){return this.percentages}}]),i}(),l=function e(t,n,i){_classCallCheck(this,e),this.id=t,this.description=n,this.value=i},r={allItems:{inc:[],exp:[]},totals:{inc:0,exp:0},budget:0,percentage:-1},e=function(e){var t=0;return r.allItems[e].forEach(function(e){return t+=e.value}),r.totals[e]=t};return{addItem:function(e,t,n){var i=void 0,a=void 0;return i=0<r.allItems[e].length?r.allItems[e][r.allItems[e].length-1].id+1:0,"inc"===e?a=new l(i,t,n):"exp"===e&&(a=new c(i,t,n)),r.allItems[e].push(a),a},testings:function(){return r},calculateBudget:function(){e("inc"),e("exp"),r.budget=r.totals.inc-r.totals.exp,console.log(r.totals.inc),0<r.totals.inc?r.percentage=Math.round(r.totals.exp/r.totals.inc*100):r.percentage=-1},getBudget:function(){return{incLable:r.totals.inc,expLable:r.totals.exp,budget:r.budget,percentage:r.percentage}},deleteItem:function(e,t){var n;-1!==(n=r.allItems[e].map(function(e){return e.id}).indexOf(t))&&r.allItems[e].splice(n,1)},calculatePercentages:function(){r.allItems.exp.forEach(function(e){return e.calculatePercentages(r.totals.inc)})},returnPercenatehs:function(){var e=r.allItems.exp.forEach(function(e){return e.getPercentages()});return console.log(e+", isso aqui"),e}}}(),uiController=function(){var c={type:".add__type",desc:".add__description",value:".add__value",btn:".add__btn",incList:".income__list",expList:".expenses__list",container:".container",budget:".budget__value",income_lable:".budget__income--value",expense_lable:".budget__expenses--value",month:".budget__title--month",percentage:".budget__expenses--percentage",item_perce:".item__percentage"},n=function(e,t){var n,i,a=void 0;return a=(i=(e=(e=Math.abs(e)).toFixed(2)).split("."))[0],n=i[1],3<a.length&&(a=a.substr(0,a.length-3)+"."+a.substr(a.length-3,3)),("inc"===t?"+":"-")+" "+a+","+n};return{inputVals:function(){return{getType:document.querySelector(c.type).value,getDesc:document.querySelector(c.desc).value,getValue:parseInt(document.querySelector(c.value).value)}},globalInput:function(){return c},addItem:function(e,t){var n=void 0,i=void 0,a=void 0;"inc"===e?(a=c.incList,n='<div class="item clearfix" id="inc-%id%"> <div class="item__description">%desc%</div> <div class="right clearfix"> <div class="item__value">%val%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'):"exp"===e&&(a=c.expList,n='<div class="item clearfix" id="exp-%id%"> <div class="item__description">%desc%</div> <div class="right clearfix"> <div class="item__value">%val%</div> <div class="item__percentage">%iPerce%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'),i=(i=(i=(i=n.replace("%id%",t.id)).replace("%desc%",t.description)).replace("%val%",t.value)).replace("%iPerce%",t.percentages),document.querySelector(a).insertAdjacentHTML("beforeend",i)},displayBudget:function(e){var t=void 0;t=0<e.budget?"inc":"exp",document.querySelector(c.budget).textContent=n(e.budget,t),document.querySelector(c.income_lable).textContent=n(e.incLable,"+"),document.querySelector(c.expense_lable).textContent=n(e.expLable,"-"),document.querySelector(c.percentage).textContent=e.percentage}}}(),controller=function(c,n){var e=n.globalInput(),l=function(){var e;c.calculateBudget(),e=c.getBudget(),n.displayBudget(e)},r=function(){c.calculatePercentages(),c.returnPercenatehs()},t=function(e){var t=void 0,n=void 0,i=void 0,a=void 0;(t=e.target.parentNode.parentNode.parentNode.parentNode.id)&&(i=(n=t.split("-"))[0],a=parseFloat(n[1]),c.deleteItem(i,a),l(),r())},i=function(){var e,t;e=n.inputVals(),t=c.addItem(e.getType,e.getDesc,e.getValue),n.addItem(e.getType,t),l(),r()};return{init:function(){document.querySelector(e.btn).addEventListener("click",i),document.addEventListener("keypress",function(e){13!==e.keycode&&13!==e.which||i()}),c.testings(),document.querySelector(e.container).addEventListener("click",t),n.displayBudget({incLable:0,expLable:0,budget:0,percentage:0})}}}(budgetController,uiController);controller.init();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJidWRnZXRDb250cm9sbGVyIiwiY29uc29sZSIsImxvZyIsIkV4cGVuc2UiLCJpZCIsImRlc2NyaXB0aW9uIiwidmFsdWUiLCJfY2xhc3NDYWxsQ2hlY2siLCJ0aGlzIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidG90YWxJbmNvbWUiLCJwZXJjZW50YWdlcyIsIk1hdGgiLCJyb3VuZCIsIkluY29tZSIsImRhdGEiLCJhbGxJdGVtcyIsImluYyIsImV4cCIsInRvdGFscyIsInBlcmNlbnRhZ2UiLCJjYWxjVG90YWxzIiwidHlwZSIsInN1bSIsImZvckVhY2giLCJjdXJyIiwibmV3SXRlbSIsIklEIiwibGVuZ3RoIiwicHVzaCIsInRlc3RpbmdzIiwiY2FsY3VsYXRlQnVkZ2V0IiwiZ2V0QnVkZ2V0IiwiZXhwTGFibGUiLCJidWRnZXQiLCJpbmRleCIsInNwbGljZSIsImNhbGN1bGF0ZVBlcmNlbnRhZ2VzIiwicmV0dXJuUGVyY2VuYXRlaHMiLCJnZXRQZXJjZW50YWdlcyIsImluY0xhYmxlIiwicGVyY2UiLCJ1aUNvbnRyb2xsZXIiLCJkb21zdHJpbmdzIiwiZGVsZXRlSXRlbSIsImRlc2MiLCJpdGVtIiwiaW5jTGlzdCIsImV4cExpc3QiLCJleHBlbnNlX2xhYmxlIiwibW9udGgiLCJmb3JtYXJEaWdpdHMiLCJudW0iLCJkZWMiLCJzcGxpdE51bSIsImludCIsInN1YnN0ciIsImdldFR5cGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJwYXJzZUludCIsImluY29tZV9sYWJsZSIsIm9iaiIsIml0ZW1fcGVyY2UiLCJuZXdIdG1sIiwiZWxlbWVudCIsInNwbGl0IiwicmVwbGFjZSIsImluc2VydEFkamFjZW50SFRNTCIsImRpc3BsYXlCdWRnZXQiLCJ0ZXh0Q29udGVudCIsImlucHV0VmFscyIsImNvbnRyb2xsZXIiLCJ1aUN0cmwiLCJEb20iLCJnbG9iYWxJbnB1dCIsInVwZGF0ZUJ1ZGdldCIsImh0bWwiLCJidWRnZXRDdHJsIiwicGFyZW50Tm9kZSIsImNhbGN1bGF0ZVBlcmNlbmF0YWdlcyIsImlucHV0IiwiYWRkSXRlbSIsImdldERlc2MiLCJnZXRWYWx1ZSIsImJ0biIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb250cm9sQWRkSXRlbSIsImNvbnN0cm9sbERlbGV0ZUl0ZW0iLCJlIiwid2hpY2giLCJzcGxpdGVkSXRlbSJdLCJtYXBwaW5ncyI6IjZYQUFBLElBQU1BLGlCQUFvQixXQUN0QkMsUUFBUUMsSUFBSSxVQURnQixJQUd0QkMsRUFIc0IsV0FJeEIsU0FBQUEsRUFBWUMsRUFBSUMsRUFBYUMsR0FBT0MsZ0JBQUFDLEtBQUFMLEdBQ2hDSyxLQUFLSixHQUFLQSxFQUxoQkosS0FBQUEsWUFBb0JLLEVBQ2RILEtBQUlJLE1BQVpBLEVBRDRCLE9BQUFHLGFBQUFOLEVBQUEsQ0FBQSxDQUFBTyxJQUFBLHVCQUFBSixNQUFBLFNBQUFLLEdBSVlILEtBQUFJLFlBQXBCUCxFQUFoQk0sRUFBb0NFLEtBQUFDLE1BQUFOLEtBQUFGLE1BQUFLLEVBQUEsTUFDaEMsSUFMb0IsQ0FBQUQsSUFBQSxpQkFBQUosTUFBQSxXQWlCcEIsT0FBT0UsS0FBS0ksZ0JBakJRVCxFQUFBLEdBVXBCWSxFQUNJLFNBQUFBLEVBQUFYLEVBQUFDLEVBQUFDLEdBQXdCUSxnQkFBQUEsS0FBQUEsR0FDM0JOLEtBRkRKLEdBQUFBLEVBR0lJLEtBQUFILFlBQUtPLEVBQ1JKLEtBQUFGLE1BQUFBLEdBZG1CVSxFQUFBLENBQUFDLFNBQUEsQ0FpQnBCQyxJQUFBLEdBQ0hDLElBQUEsSUFlREMsT0FBUSxDQWpDZ0JGLElBQUEsRUFBQUMsSUFBQSxHQXFCdEJKLE9BckJzQixFQXNCWU0sWUFBQSxHQUVoQ0MsRUFBS2pCLFNBQUxrQixHQUNBLElBQUFDLEVBQUEsRUFLQU4sT0E5Qm9CRixFQUFBQyxTQUFBTSxHQUFBRSxRQUFBLFNBQUFDLEdBQUEsT0FBQUYsR0FBQUUsRUFBQXBCLFFBNEJ4QlUsRUFBQUEsT0FBT08sR0FBQUMsR0FLUEosTUFBQUEsQ0FD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RUFBSTVCLFdBQWFaLEVBQWpCLElBRUFvQyxFQUFTQyxXQUFUckMsRUFBdUJxQixHQUV2QmUsSUFpQ0FzQixNQTNCTlIsRUFBZU0sV0FDYkosSUFBQUEsRUFBTUQsRUErQk5RLEVBQVFSLEVBQU9GLFlBN0JiSyxFQUFBQSxFQUFlTSxRQUFmTixFQUFBQSxRQUFxQkssRUFBQUUsUUFBQUYsRUFBQUcsVUFFdkJOLEVBQUFBLFFBQVcvQyxFQUFBQSxRQUFYTCxHQWdDQWtELElBbENKSSxLQW9EQSxNQUFPLENBaENDRixLQUFBQSxXQWJScEIsU0FBQUMsY0FBQWUsRUFBQVcsS0FBQUMsaUJBQUEsUUFBQUMsR0FJTUMsU0FBQUEsaUJBQXNCLFdBQXRCQSxTQUFBQSxHQUNGLEtBQUkxQyxFQUFBQSxTQUFKLEtBQUEyQyxFQUFBQyxPQUFVQyxNQUVWYixFQUFRaEQsV0FFSjZELFNBQUFBLGNBQW1CekIsRUFBQUEsV0FBbkJvQixpQkFBQSxRQUFBRSxHQU1BWixFQUFBQSxjQUFBQSxDQWtDSXBDLFNBQVUsRUFoQ2R3QyxTQUFBQSxFQUNIOUMsT0FBQSxFQWRMZCxXQUFBLE1BM0NldUIsQ0E2RFhzQyxpQkFBUVIsY0FDUi9DLFdBQUFBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGJ1ZGdldENvbnRyb2xsZXIgPSAoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdCdWRnZXQnKTtcblxuICAgIGNsYXNzIEV4cGVuc2Uge1xuICAgICAgICBjb25zdHJ1Y3RvcihpZCwgZGVzY3JpcHRpb24sIHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgY2FsY3VsYXRlUGVyY2VudGFnZXMgKHRvdGFsSW5jb21lKXtcbiAgICAgICAgICAgIGlmKHRvdGFsSW5jb21lID4gMCl7XG4gICAgICAgICAgICAgICAgdGhpcy5wZXJjZW50YWdlcyA9IE1hdGgucm91bmQoKHRoaXMudmFsdWUgLyB0b3RhbEluY29tZSkgKiAxMDApO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5wZXJjZW50YWdlcyA9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGdldFBlcmNlbnRhZ2VzICgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGVyY2VudGFnZXM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY2xhc3MgSW5jb21lIHtcbiAgICAgICAgY29uc3RydWN0b3IoaWQsIGRlc2NyaXB0aW9uLCB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBkYXRhID0ge1xuICAgICAgICBhbGxJdGVtczoge1xuICAgICAgICAgICAgaW5jOiBbXSxcbiAgICAgICAgICAgIGV4cDogW11cbiAgICAgICAgfSxcbiAgICAgICAgdG90YWxzOiB7XG4gICAgICAgICAgICBpbmM6IDAsXG4gICAgICAgICAgICBleHA6IDBcbiAgICAgICAgfSxcbiAgICAgICAgYnVkZ2V0OiAwLFxuICAgICAgICBwZXJjZW50YWdlOiAtMVxuICAgIH07XG5cbiAgICBjb25zdCBjYWxjVG90YWxzID0gKHR5cGUpID0+IHtcbiAgICAgICAgbGV0IHN1bSA9IDA7XG4gICAgICAgIGRhdGEuYWxsSXRlbXNbdHlwZV0uZm9yRWFjaChjdXJyID0+IHN1bSArPSBjdXJyLnZhbHVlKTtcblxuICAgICAgICBkYXRhLnRvdGFsc1t0eXBlXSA9IHN1bTtcblxuICAgICAgICByZXR1cm4gc3VtO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRJdGVtOiAodHlwZSwgZGVzY3JpcHRpb24sIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBsZXQgSUQsIG5ld0l0ZW07XG4gICAgICAgICAgICBpZiAoZGF0YS5hbGxJdGVtc1t0eXBlXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgSUQgPSBkYXRhLmFsbEl0ZW1zW3R5cGVdW2RhdGEuYWxsSXRlbXNbdHlwZV0ubGVuZ3RoIC0gMV0uaWQgKyAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBJRCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2luYycpIHtcbiAgICAgICAgICAgICAgICBuZXdJdGVtID0gbmV3IEluY29tZShJRCwgZGVzY3JpcHRpb24sIHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2V4cCcpIHtcbiAgICAgICAgICAgICAgICBuZXdJdGVtID0gbmV3IEV4cGVuc2UoSUQsIGRlc2NyaXB0aW9uLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRhLmFsbEl0ZW1zW3R5cGVdLnB1c2gobmV3SXRlbSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3SXRlbTtcbiAgICAgICAgfSxcbiAgICAgICAgdGVzdGluZ3M6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9LFxuICAgICAgICBjYWxjdWxhdGVCdWRnZXQ6ICgpID0+IHtcbiAgICAgICAgICAgIC8vICBjYWxjIFRvdGxhc1xuICAgICAgICAgICAgY2FsY1RvdGFscygnaW5jJyk7XG4gICAgICAgICAgICBjYWxjVG90YWxzKCdleHAnKTtcbiAgICAgICAgICAgIC8vIGNhbGMgYnVkZ2V0XG4gICAgICAgICAgICBkYXRhLmJ1ZGdldCA9IGRhdGEudG90YWxzLmluYyAtIGRhdGEudG90YWxzLmV4cDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEudG90YWxzLmluYyk7XG4gICAgICAgICAgICAvLyBDYWxjIHBlcmNlbnRhZ2UgXG4gICAgICAgICAgICBpZiAoZGF0YS50b3RhbHMuaW5jID4gMCkge1xuICAgICAgICAgICAgICAgIGRhdGEucGVyY2VudGFnZSA9IE1hdGgucm91bmQoKGRhdGEudG90YWxzLmV4cCAvIGRhdGEudG90YWxzLmluYykgKiAxMDApO1xuICAgICAgICAgICAgfWVsc2Uge1xuXG4gICAgICAgICAgICAgICAgZGF0YS5wZXJjZW50YWdlID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldEJ1ZGdldDogKCk9PntcbiAgICAgICAgICAgIHJldHVybntcbiAgICAgICAgICAgICAgICAgaW5jTGFibGU6IGRhdGEudG90YWxzLmluYyxcbiAgICAgICAgICAgICAgICAgZXhwTGFibGU6IGRhdGEudG90YWxzLmV4cCxcbiAgICAgICAgICAgICAgICAgYnVkZ2V0OiBkYXRhLmJ1ZGdldCxcbiAgICAgICAgICAgICAgICAgcGVyY2VudGFnZTogZGF0YS5wZXJjZW50YWdlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZUl0ZW06ICh0eXBlLCBJRCk9PntcbiAgICAgICAgICAgIGxldCBpdGVtLCBpbmRleDtcbiAgICAgICAgICAgIGl0ZW0gPSBkYXRhLmFsbEl0ZW1zW3R5cGVdLm1hcChjdXJyID0+IGN1cnIuaWQpO1xuICAgICAgICAgICAgaW5kZXggPSBpdGVtLmluZGV4T2YoSUQpO1xuICAgICAgICAgICAgaWYoaW5kZXggIT09ICAtMSApe1xuICAgICAgICAgICAgICAgIGRhdGEuYWxsSXRlbXNbdHlwZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2FsY3VsYXRlUGVyY2VudGFnZXM6ICgpID0+e1xuICAgICAgICAgICAgZGF0YS5hbGxJdGVtcy5leHAuZm9yRWFjaChjdXJyID0+IGN1cnIuY2FsY3VsYXRlUGVyY2VudGFnZXMoZGF0YS50b3RhbHMuaW5jKSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJldHVyblBlcmNlbmF0ZWhzOiAoKT0+e1xuICAgICAgICAgICAgbGV0IHBlcmNlID0gZGF0YS5hbGxJdGVtcy5leHAuZm9yRWFjaChjdXJyPT5jdXJyLmdldFBlcmNlbnRhZ2VzKCkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7cGVyY2V9LCBpc3NvIGFxdWlgKTtcbiAgICAgICAgICAgIHJldHVybiBwZXJjZTtcbiAgICAgICAgfVxuICAgIH07XG59KSgpO1xuY29uc3QgdWlDb250cm9sbGVyID0gKCgpID0+IHtcbiAgICBsZXQgZG9tc3RyaW5ncyA9IHtcbiAgICAgICAgdHlwZTogXCIuYWRkX190eXBlXCIsXG4gICAgICAgIGRlc2M6IFwiLmFkZF9fZGVzY3JpcHRpb25cIixcbiAgICAgICAgdmFsdWU6IFwiLmFkZF9fdmFsdWVcIixcbiAgICAgICAgYnRuOiBcIi5hZGRfX2J0blwiLFxuICAgICAgICBpbmNMaXN0OiBcIi5pbmNvbWVfX2xpc3RcIixcbiAgICAgICAgZXhwTGlzdDogXCIuZXhwZW5zZXNfX2xpc3RcIixcbiAgICAgICAgY29udGFpbmVyOiBcIi5jb250YWluZXJcIixcbiAgICAgICAgYnVkZ2V0OiBcIi5idWRnZXRfX3ZhbHVlXCIsXG4gICAgICAgIGluY29tZV9sYWJsZTogXCIuYnVkZ2V0X19pbmNvbWUtLXZhbHVlXCIsXG4gICAgICAgIGV4cGVuc2VfbGFibGU6IFwiLmJ1ZGdldF9fZXhwZW5zZXMtLXZhbHVlXCIsXG4gICAgICAgIG1vbnRoOiBcIi5idWRnZXRfX3RpdGxlLS1tb250aFwiLFxuICAgICAgICBwZXJjZW50YWdlOiBcIi5idWRnZXRfX2V4cGVuc2VzLS1wZXJjZW50YWdlXCIsXG4gICAgICAgIGl0ZW1fcGVyY2U6IFwiLml0ZW1fX3BlcmNlbnRhZ2VcIlxuICAgIH07XG4gICAgY29uc3QgZm9ybWFyRGlnaXRzID0gKG51bSwgdHlwZSk9PntcbiAgICAgICAgbGV0IGludCwgZGVjLCBzcGxpdE51bTtcbiAgICAgICAgbnVtID0gTWF0aC5hYnMobnVtKTtcbiAgICAgICAgbnVtID0gbnVtLnRvRml4ZWQoMik7XG4gICAgICAgIHNwbGl0TnVtID0gbnVtLnNwbGl0KCcuJyk7XG4gICAgICAgIGludCA9IHNwbGl0TnVtWzBdO1xuICAgICAgICBkZWMgPSBzcGxpdE51bVsxXTtcbiAgICAgICAgaWYoaW50Lmxlbmd0aCA+IDMpe1xuICAgICAgICAgICAgaW50ID0gaW50LnN1YnN0cigwLCBpbnQubGVuZ3RoIC0gMykgKyAnLicgKyBpbnQuc3Vic3RyKGludC5sZW5ndGggLSAzLCAzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHR5cGUgPT09ICdpbmMnID8gJysnIDogJy0nKSArICcgJyArIGludCArICcsJyArIGRlYztcbiAgICAgICAgLy8gbnVtID0gbnVtXG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgICBpbnB1dFZhbHM6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZ2V0VHlwZTogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihkb21zdHJpbmdzLnR5cGUpLnZhbHVlLFxuICAgICAgICAgICAgICAgIGdldERlc2M6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZG9tc3RyaW5ncy5kZXNjKS52YWx1ZSxcbiAgICAgICAgICAgICAgICBnZXRWYWx1ZTogcGFyc2VJbnQoZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihkb21zdHJpbmdzLnZhbHVlKS52YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2xvYmFsSW5wdXQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBkb21zdHJpbmdzO1xuICAgICAgICB9LFxuICAgICAgICBhZGRJdGVtOiAodHlwZSwgb2JqKSA9PiB7XG4gICAgICAgICAgICBsZXQgaHRtbCwgbmV3SHRtbCwgZWxlbWVudDtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnaW5jJykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBkb21zdHJpbmdzLmluY0xpc3Q7XG4gICAgICAgICAgICAgICAgaHRtbCA9ICc8ZGl2IGNsYXNzPVwiaXRlbSBjbGVhcmZpeFwiIGlkPVwiaW5jLSVpZCVcIj4gPGRpdiBjbGFzcz1cIml0ZW1fX2Rlc2NyaXB0aW9uXCI+JWRlc2MlPC9kaXY+IDxkaXYgY2xhc3M9XCJyaWdodCBjbGVhcmZpeFwiPiA8ZGl2IGNsYXNzPVwiaXRlbV9fdmFsdWVcIj4ldmFsJTwvZGl2PiA8ZGl2IGNsYXNzPVwiaXRlbV9fZGVsZXRlXCI+IDxidXR0b24gY2xhc3M9XCJpdGVtX19kZWxldGUtLWJ0blwiPjxpIGNsYXNzPVwiaW9uLWlvcy1jbG9zZS1vdXRsaW5lXCI+PC9pPjwvYnV0dG9uPiA8L2Rpdj4gPC9kaXY+IDwvZGl2Pic7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdleHAnKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGRvbXN0cmluZ3MuZXhwTGlzdDtcbiAgICAgICAgICAgICAgICBodG1sID0gJzxkaXYgY2xhc3M9XCJpdGVtIGNsZWFyZml4XCIgaWQ9XCJleHAtJWlkJVwiPiA8ZGl2IGNsYXNzPVwiaXRlbV9fZGVzY3JpcHRpb25cIj4lZGVzYyU8L2Rpdj4gPGRpdiBjbGFzcz1cInJpZ2h0IGNsZWFyZml4XCI+IDxkaXYgY2xhc3M9XCJpdGVtX192YWx1ZVwiPiV2YWwlPC9kaXY+IDxkaXYgY2xhc3M9XCJpdGVtX19wZXJjZW50YWdlXCI+JWlQZXJjZSU8L2Rpdj4gPGRpdiBjbGFzcz1cIml0ZW1fX2RlbGV0ZVwiPiA8YnV0dG9uIGNsYXNzPVwiaXRlbV9fZGVsZXRlLS1idG5cIj48aSBjbGFzcz1cImlvbi1pb3MtY2xvc2Utb3V0bGluZVwiPjwvaT48L2J1dHRvbj4gPC9kaXY+IDwvZGl2PiA8L2Rpdj4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3SHRtbCA9IGh0bWwucmVwbGFjZSgnJWlkJScsIG9iai5pZCk7XG4gICAgICAgICAgICBuZXdIdG1sID0gbmV3SHRtbC5yZXBsYWNlKCclZGVzYyUnLCBvYmouZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgbmV3SHRtbCA9IG5ld0h0bWwucmVwbGFjZSgnJXZhbCUnLCBvYmoudmFsdWUpO1xuICAgICAgICAgICAgbmV3SHRtbCA9IG5ld0h0bWwucmVwbGFjZSgnJWlQZXJjZSUnLCBvYmoucGVyY2VudGFnZXMpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIG5ld0h0bWwpO1xuICAgICAgICB9LFxuICAgICAgICBkaXNwbGF5QnVkZ2V0OiAob2JqKT0+e1xuICAgICAgICAgICAgbGV0IHR5cGU7XG4gICAgICAgICAgICBvYmouYnVkZ2V0ID4gMCA/IHR5cGUgPSAnaW5jJyA6IHR5cGUgPSAnZXhwJzsgXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGRvbXN0cmluZ3MuYnVkZ2V0KS50ZXh0Q29udGVudCA9IGZvcm1hckRpZ2l0cyhvYmouYnVkZ2V0LCB0eXBlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZG9tc3RyaW5ncy5pbmNvbWVfbGFibGUpLnRleHRDb250ZW50ID0gZm9ybWFyRGlnaXRzKG9iai5pbmNMYWJsZSwgJysnICk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGRvbXN0cmluZ3MuZXhwZW5zZV9sYWJsZSkudGV4dENvbnRlbnQgPSBmb3JtYXJEaWdpdHMob2JqLmV4cExhYmxlLCAnLScpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihkb21zdHJpbmdzLnBlcmNlbnRhZ2UpLnRleHRDb250ZW50ID0gb2JqLnBlcmNlbnRhZ2U7XG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBcbiAgICB9XG59KSgpO1xuY29uc3QgY29udHJvbGxlciA9ICgoYnVkZ2V0Q3RybCwgdWlDdHJsKSA9PiB7XG4gICAgbGV0IERvbSA9IHVpQ3RybC5nbG9iYWxJbnB1dCgpO1xuXG4gICAgY29uc3QgdXBkYXRlQnVkZ2V0ID0gKCkgPT4ge1xuICAgICAgICBsZXQgYnVkZ2V0O1xuICAgICAgICBidWRnZXRDdHJsLmNhbGN1bGF0ZUJ1ZGdldCgpO1xuICAgICAgICBidWRnZXQgPSBidWRnZXRDdHJsLmdldEJ1ZGdldCgpO1xuXG4gICAgICAgIHVpQ3RybC5kaXNwbGF5QnVkZ2V0KGJ1ZGdldCk7XG4gICAgfTtcbiAgICBjb25zdCBjYWxjdWxhdGVQZXJjZW5hdGFnZXMgPSAoKT0+e1xuICAgICAgICBidWRnZXRDdHJsLmNhbGN1bGF0ZVBlcmNlbnRhZ2VzKCk7IFxuICAgICAgICBidWRnZXRDdHJsLnJldHVyblBlcmNlbmF0ZWhzKCk7XG4gICAgfTtcbiAgICBjb25zdCBjb25zdHJvbGxEZWxldGVJdGVtID0gKGUpPT57XG4gICAgICAgIGxldCBpdGVtLCBzcGxpdGVkSXRlbSwgdHlwZSwgSUQ7XG4gICAgICAgIGl0ZW0gPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmlkO1xuICAgICAgICBpZihpdGVtKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc3BsaXRlZEl0ZW0gPSBpdGVtLnNwbGl0KCctJyk7XG4gICAgICAgICAgICB0eXBlID0gc3BsaXRlZEl0ZW1bMF07XG4gICAgICAgICAgICBJRCA9ICBwYXJzZUZsb2F0KHNwbGl0ZWRJdGVtWzFdKTtcblxuICAgICAgICAgICAgYnVkZ2V0Q3RybC5kZWxldGVJdGVtKHR5cGUsIElEKTtcblxuICAgICAgICAgICAgdXBkYXRlQnVkZ2V0KCk7XG5cbiAgICAgICAgICAgIGNhbGN1bGF0ZVBlcmNlbmF0YWdlcygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBjb250cm9sQWRkSXRlbSA9ICgpID0+IHtcbiAgICAgICAgbGV0IGlucHV0LCBuZXdJdGVtO1xuICAgICAgICBpbnB1dCA9IHVpQ3RybC5pbnB1dFZhbHMoKTtcbiAgICAgICAgbmV3SXRlbSA9IGJ1ZGdldEN0cmwuYWRkSXRlbShpbnB1dC5nZXRUeXBlLCBpbnB1dC5nZXREZXNjLCBpbnB1dC5nZXRWYWx1ZSk7XG5cbiAgICAgICAgdWlDdHJsLmFkZEl0ZW0oaW5wdXQuZ2V0VHlwZSwgbmV3SXRlbSk7XG5cbiAgICAgICAgdXBkYXRlQnVkZ2V0KCk7XG5cbiAgICAgICAgY2FsY3VsYXRlUGVyY2VuYXRhZ2VzKCk7XG4gICAgICAgIFxuICAgIH07XG4gICAgY29uc3QgZXZ0TGlzdGVuZXJzID0gKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKERvbS5idG4pLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29udHJvbEFkZEl0ZW0pO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgZSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5rZXljb2RlID09PSAxMyB8fCBlLndoaWNoID09PSAxMykge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xBZGRJdGVtKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgYnVkZ2V0Q3RybC50ZXN0aW5ncygpO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoRG9tLmNvbnRhaW5lcikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb25zdHJvbGxEZWxldGVJdGVtKTtcbiAgICB9O1xuICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogKCkgPT4ge1xuICAgICAgICAgICAgZXZ0TGlzdGVuZXJzKCk7XG4gICAgICAgICAgICB1aUN0cmwuZGlzcGxheUJ1ZGdldCh7XG4gICAgICAgICAgICAgICAgaW5jTGFibGU6IDAsXG4gICAgICAgICAgICAgICAgZXhwTGFibGU6IDAsXG4gICAgICAgICAgICAgICAgYnVkZ2V0OiAwLFxuICAgICAgICAgICAgICAgIHBlcmNlbnRhZ2U6IDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn0pKGJ1ZGdldENvbnRyb2xsZXIsIHVpQ29udHJvbGxlcik7XG5jb250cm9sbGVyLmluaXQoKTtcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
