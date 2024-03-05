//rrd imports
import { Link, useLoaderData } from "react-router-dom";

//helper functions
import {
  createBudget,
  fetchData,
  wait,
  createExpense,
  deleteItem,
} from "../helpers";

import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import { toast } from "react-toastify";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

//loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

//action
export async function dashboardAction({ request }) {
  await wait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  //new User submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`환영합니다, ${values.userName}님`);
    } catch (e) {
      throw new Error("There was a problem creating your account.");
    }
  }

  if (_action === "createBudget") {
    try {
      //create budget
      createBudget({ name: values.newBudget, amount: values.newBudgetAmount });

      return toast.success("예산이 생셩되었습니다.");
    } catch (e) {
      throw new Error("There was a problem create your budget.");
    }
  }

  if (_action === "createExpense") {
    try {
      //create expense
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });

      return toast.success(`소비 ${values.newExpense}가 생성되었습니다!`);
    } catch (e) {
      throw new Error("There was a problem create your expense.");
    }
  }

  if (_action === "deleteExpense") {
    try {
      //create expense
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });

      return toast.success("소비가 삭제되었습니다!");
    } catch (e) {
      throw new Error("There was a problem delete your expense.");
    }
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            환영합니다 <span className="accent">{userName} </span>님
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>예산</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>최근 소비</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 8)}
                    />
                    {expenses.length > 8 && (
                      <Link to="expenses" className="btn btn--dark">
                        모든 소비 보기
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>예산을 생성해보세요!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
