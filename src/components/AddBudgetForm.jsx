import { useEffect, useRef } from "react";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { Form, useFetcher } from "react-router-dom";

const AddBudgetForm = () => {
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
      <h2 className="h3">예산 생성</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">예산명</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="ex) 식비"
            required
            ref={focusRef}
          ></input>
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">총액</label>
          <input
            type="number"
            step="1"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="ex) 300,000₩"
            required
            inputMode="decimal"
          ></input>
          <input type="hidden" name="_action" value="createBudget" />
        </div>
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>예산 생성 중...</span>
          ) : (
            <>
              <span>예산 생성</span>
              <CurrencyDollarIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
