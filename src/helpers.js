export const wait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

const generateRandomColor = () => {
  const existingBudgetsLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetsLength * 34} 76% 63%`;
};

//Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

//create budget
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };
  console.log(newItem);
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

//create expense
export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  console.log(newItem);
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

//edit Budget
export const editBudget = ({ name, amount, budgetId }) => {
  const existingBudgets = fetchData("budgets") ?? [];

  const editedBudgets = existingBudgets.map((budget) => {
    if (budget.id === budgetId) {
      return {
        ...budget,
        name: name,
        amount: amount,
      };
    }
    return budget;
  });

  localStorage.setItem("budgets", JSON.stringify(editedBudgets));

  return editedBudgets;
};

//total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    //check if expense.id === budgetId I passed in
    if (expense.budgetId !== budgetId) {
      return acc;
    }
    //add the current amount to my total
    return (acc += expense.amount);
  }, 0);

  return budgetSpent;
};

//formatting
export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();

//formatting percentaget
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

//format currenct
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "KRW",
  });
};
