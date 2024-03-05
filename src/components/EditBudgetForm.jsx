import { useEffect, useRef } from "react";
import {
  CurrencyDollarIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { Form, useFetcher } from "react-router-dom";

const EditBudgetForm = ({ budget }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">예산 편집</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="editBudget">예산명</label>
          <input
            type="text"
            name="editBudget"
            id="editBudget"
            placeholder={budget.name}
            ref={focusRef}
          ></input>
        </div>
        <div className="grid-xs">
          <label htmlFor="editBudgetAmount">총액</label>
          <input
            type="number"
            step="1"
            name="editBudgetAmount"
            id="editBudgetAmount"
            placeholder={budget.amount}
            inputMode="decimal"
          ></input>
          <input type="hidden" name="budgetId" value={budget.id} />
          <input type="hidden" name="_action" value="editBudget" />
        </div>
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>예산 편집 중...</span>
          ) : (
            <>
              <span>예산 편집</span>
              <PencilSquareIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default EditBudgetForm;
