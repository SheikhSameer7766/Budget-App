document.getElementById('budget-form').addEventListener('submit', addBudget);
document.getElementById('expense-form').addEventListener('submit', addExpense);

var monthlyBudget = 0;
var expenses = [];

function addBudget(e) {
    e.preventDefault();

    var budgetInput = document.getElementById('monthly-budget');
    monthlyBudget = parseFloat(budgetInput.value);
    budgetInput.value='';

    updateRemainingBudget();
};

function addExpense(e) {
    e.preventDefault();

    var descriptionInput = document.getElementById('expense-description');
    var amountInput = document.getElementById('expense-amount');
    var dateInput = document.getElementById('expense-date');

    var expense = {
        id: Date.now(), // Unique identifier for each expense
        description: descriptionInput.value,
        amount: parseFloat(amountInput.value),
        date: dateInput.value
    };

    expenses.push(expense);

    descriptionInput.value = '';
    amountInput.value = '';
    dateInput.value = '';

    updateExpenseList();
    updateRemainingBudget();
}


  function updateExpenseList() {
    var expenseTableBody = document.getElementById('expense-table-body');
    expenseTableBody.innerHTML = '';

    expenses.forEach(function(expense) {
        var row = document.createElement('tr')
        row .innerHTML = '<td>' + expense.description + '</td>' +
                         '<td>$' + expense.amount + '</td>' +
                         '<td>' + expense.date + '</td>' +
                         '<td><button class="edit" data-id="' + expense.id + '">Edit</button></td>' +
                         '<td><button class="delete" data-id="' + expense.id + '">Delete</button></td>';
                         
              row.querySelector('.delete').addEventListener('click', deleteExpense);
              row.querySelector('.edit').addEventListener('click', editExpense);

              expenseTableBody.appendChild(row);
    });
  };

  function updateRemainingBudget() {
    var totalExpenses = expenses.reduce(function(acc, expense) {
        return acc + expense.amount;
    }, 0);

    var remainingBudget = monthlyBudget - totalExpenses;
    document.getElementById('remaining-budget').textContent = 'Remaining Budget: $' + remainingBudget;
  };


function deleteExpense() {
    var expenseId = parseInt(this.dataset.id);
    expenses = expenses.filter(function(expense) {
        return expenseId !== expense.id;
    });

    updateExpenseList();
    updateRemainingBudget();
};

function editExpense() {
    var expenseId = parseInt(this.dataset.id);
    var expense = expenses.find(function(expense) {
        return expense.id === expenseId;
    });

    if (expense) {
        var descriptionInput = document.getElementById('expense-description');
        var amountInput = document.getElementById('expense-amount');
        var dateInput = document.getElementById('expense-date');

        descriptionInput.value = expense.description;
        amountInput.value = expense.amount;
        dateInput.value = expense.date;

        expenses = expenses.filter(function(expense) {
            return expense.id !== expenseId;
        });

        updateExpenseList();
       updateRemainingBudget();
    };
};





  



