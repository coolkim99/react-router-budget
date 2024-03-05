import { useLoaderData } from "react-router-dom";

import Table from "../components/Table";
import { deleteItem, fetchData } from "../helpers";
import { toast } from "react-toastify";

//loader
export async function expensesLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
}

//action
export async function expensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

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

const ExpensesPage = () => {
  const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h1>모든 소비</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            최근 소비
            <small>(총 {expenses.length}개)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>보여줄 소비가 없습니다.</p>
      )}
    </div>
  );
};

export default ExpensesPage;
