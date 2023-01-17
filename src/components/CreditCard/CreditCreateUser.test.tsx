import { render, screen } from "../test-utils/index";
import CreditCreateUser from "./CreditCreateUser";
import user from "@testing-library/user-event";

test("component renders correctly", async () => {
  const createUser = jest.fn();
  render(<CreditCreateUser createUser={createUser} />);
  const heading = screen.getByRole("heading");
  expect(heading).toBeInTheDocument();
  const button = screen.getByRole("button");
  expect(button).toBeEnabled();
  await user.click(button);
  expect(createUser).toBeCalled();
});
