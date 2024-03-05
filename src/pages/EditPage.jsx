import { redirect, useFetcher, useLoaderData } from "react-router-dom";
import { editBudget, getAllMatchingItems } from "../helpers";
import BudgetItem from "../components/BudgetItem";
import EditBudgetForm from "../components/EditBudgetForm";
import { toast } from "react-toastify";

//loader
export async function editLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  if (!budget) {
    throw new Error("The budget you're trying to find doesn't exist.");
  }
  return { budget };
}

//action
export async function editAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  console.log(values);

  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: values.budgetId,
  })[0];

  console.log(budget);

  if (_action === "editBudget") {
    let name, amount;
    if (values.editBudget === "") {
      name = budget.name;
    } else {
      name = values.editBudget;
    }
    if (values.editBudgetAmount === "") {
      amount = budget.amount;
    } else {
      amount = values.editBudgetAmount;
    }
    try {
      editBudget({
        budgetId: values.budgetId,
        name: name,
        amount: amount,
      });
      return toast.success("예산이 성공적으로 수정되었습니다!");
    } catch (e) {
      throw new Error("There was a problem editing your expense.");
    }
  }
}

const EditPage = () => {
  const { budget } = useLoaderData();
  console.log(budget);

  return (
    <div
      className="grid-lg"
      style={{
        "--accent": budget.color,
      }}
    >
      <h1 className="h2">
        <span className="accent">{budget.name} </span>
        편집
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} isEdit={true} />
        <EditBudgetForm budget={budget} />
      </div>
    </div>
  );
};

export default EditPage;
