import { Form } from "react-router-dom";

import { UserPlusIcon } from "@heroicons/react/24/solid";

const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1 className="h2">
          <span className="accent">예산</span>을 관리해보세요
        </h1>
        <p>개인 예산 관리를 HomeBudget과 함께 시작해보세요.</p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="이름을 입력해주세요"
            autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser" />
          <button type="submit" className="btn btn--dark">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Intro;
