import { render, screen, waitFor } from "./test-utils/index";
import LoginComponent from "./LoginComponent";
import user from "@testing-library/user-event";
import { graphql } from "msw";
import { server } from "../mocks/server";

describe("Login component to check the form validation", () => {
  // test("with valid input credentials", async () => {
  //   server.resetHandlers(
  //     graphql.query("getToken", (req, res, ctx) => {
  //       const { email, password } = req.variables;
  //       // if (email === "manoharmanu95@gmail.com" && password === "dummytext")
  //       return res(
  //         ctx.data({
  //           getToken: {
  //             login: {
  //               user: {
  //                 name: "TestUser",
  //                 email: "dummy",
  //               },
  //               auth: {
  //                 token:
  //                   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2JiYzllYzUxNjhiNzc0NzVmYzIyZWIiLCJlbWFpbCI6Im1hbm9oYXJtYW51OTVAZ21haWwuY29tIiwiaWF0IjoxNjczODUwMzAwLCJleHAiOjE2NzM4NTM5MDB9.Qgw00JVNb-KAB8cN0fLR2ac5gg8gwXpnbn_3Q0fI_OI",
  //               },
  //             },
  //           },
  //         }),
  //         ctx.delay(150),
  //         ctx.status(200)
  //       );
  //     })
  //   );
  //   render(<LoginComponent />);
  //   const emailInput = screen.getByLabelText("Email");
  //   await user.type(emailInput, "test@test.com");
  //   const passwordInput = screen.getByLabelText("Password");
  //   await user.type(passwordInput, "dummy123");
  //   const errorEmail = screen.queryByText("Email is a required field");
  //   expect(errorEmail).not.toBeInTheDocument();
  //   const errorPassword = screen.queryByText("Password is a required field");
  //   expect(errorPassword).not.toBeInTheDocument();
  //   const button = screen.getByRole("button");
  //   await user.click(button);
  //   await waitFor(async () => {
  //     expect(await screen.findByRole("alert")).toBeInTheDocument();
  //   });
  // });
  test("with invalid email and get the email validation error", async () => {
    user.setup();
    render(<LoginComponent />);
    const emailInput = screen.getByLabelText("Email");
    await user.type(emailInput, "dummy text");
    const error = await screen.findByText("Email is a required field");
    expect(error).toBeInTheDocument();
  });
  test("with invalid password and get the password validation error", async () => {
    user.setup();
    render(<LoginComponent />);
    const passwordInput = screen.getByLabelText("Password");
    await user.type(passwordInput, "dummy");
    await user.tab();
    const error = await screen.findByText("Password is a required field");
    expect(error).toBeInTheDocument();
  });
  // test("with invalid credentials", async () => {
  //   server.resetHandlers(
  //     graphql.query("getToken", async (req, res, ctx) => {
  //       return res(
  //         ctx.status(500),
  //         // ctx.errors([{ message: "User does not exist!" }]),
  //         await Promise.reject(new Error("User does not exist!")),
  //         ctx.data({
  //           login: {
  //             user: {
  //               name: "TestUser",
  //               email: "dummy",
  //             },
  //             auth: {
  //               token:
  //                 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2JiYzllYzUxNjhiNzc0NzVmYzIyZWIiLCJlbWFpbCI6Im1hbm9oYXJtYW51OTVAZ21haWwuY29tIiwiaWF0IjoxNjczODUwMzAwLCJleHAiOjE2NzM4NTM5MDB9.Qgw00JVNb-KAB8cN0fLR2ac5gg8gwXpnbn_3Q0fI_OI",
  //             },
  //           },
  //         })
  //       );
  //     })
  //   );
  //   render(<LoginComponent />);
  //   const emailInput = screen.getByLabelText("Email");
  //   await user.type(emailInput, "test@test.com");
  //   const passwordInput = screen.getByLabelText("Password");
  //   await user.type(passwordInput, "dummy123");
  //   const errorEmail = screen.queryByText("Email is a required field");
  //   expect(errorEmail).not.toBeInTheDocument();
  //   const errorPassword = screen.queryByText("Password is a required field");
  //   expect(errorPassword).not.toBeInTheDocument();
  //   const button = screen.getByRole("button");
  //   await user.click(button);
  //   await waitFor(async () => {
  //     expect(
  //       await screen.findByText("Invalid credentials. Please try again")
  //     ).toBeInTheDocument();
  //   });
  // });
});
