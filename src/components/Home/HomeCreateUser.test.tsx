import { render, screen } from "@testing-library/react";
import HomeCreateUser from "./HomeCreateUser";
import user from "@testing-library/user-event";

test("renders the component correctly with correct props", () => {
  const createUser = jest.fn();
  render(<HomeCreateUser createUser={createUser} />);
  expect(
    screen.getByRole("heading", {
      name: "No savings account found. Click below to create one.",
    })
  ).toBeInTheDocument();
});

test("on click of the button it calls the function", async () => {
  user.setup();
  const createUser = jest.fn();
  render(<HomeCreateUser createUser={createUser} />);
  const button = screen.getByRole("button");
  expect(button).toBeEnabled();
  await user.click(button);
  expect(createUser).toHaveBeenCalledTimes(1);
});
