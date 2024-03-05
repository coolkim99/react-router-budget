import { Form, Link, useFetcher } from "react-router-dom";
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../helpers";
import {
  BanknotesIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

const BudgetItem = ({ budget, showDelete = false, isEdit = false }) => {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);

  const fetcher = useFetcher();

  return (
    <div
      className="budget"
      style={{
        "--accent": color,
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {/* percentage */}
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} 사용</small>
        <small>{formatCurrency(amount - spent)} 남음</small>
      </div>
      {showDelete && !isEdit ? (
        <div className="flex-sm">
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (!confirm("예산을 완전히 삭제하시겠습니까?")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn" style={{ float: "left" }}>
              <span>예산 삭제</span>
              <TrashIcon width={20} />
            </button>
          </Form>
          <fetcher.Form
            method="post"
            onSubmit={(event) => {
              if (!confirm("예산을 편집하시겠습니까?")) {
                event.preventDefault();
              }
            }}
          >
            <Link
              to={`/budget/${id}/edit`}
              className="btn"
              style={{ float: "left" }}
            >
              <span>예산 편집</span>
              <PencilSquareIcon width={20} />
            </Link>
          </fetcher.Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`/budget/${id}`} className="btn">
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default BudgetItem;
