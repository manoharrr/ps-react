import { render, screen } from "../test-utils/index";
import HomeComponent from "./HomeComponent";

const SBUser = {
  category: "Regular",
  accBalance: 0,
  minBalance: 0,
  loading: false,
  error: "",
  modal: false,
  success: "",
};

describe("Home Page", () => {
  test("component renders error page with no props", async () => {
    // await act(() => {
    render(<HomeComponent />);
    // });
    const heading = await screen.findByRole("heading");
    expect(heading).toBeInTheDocument();
  });
  test("component renders correctly", async () => {
    // await act(() => {
    render(<HomeComponent />, {
      preLoadedState: {
        savingAcc: SBUser,
      },
    });
    // });
    const heading = await screen.findByRole("heading", {
      name: "Account Details",
    });
    expect(heading).toBeInTheDocument();
  });
  test("component renders new user component", async () => {
    // act(() => {
    render(<HomeComponent />, {
      preLoadedState: {
        savingAcc: { ...SBUser, error: "No savings" },
      },
    });
    // });
    const heading = await screen.findByRole("heading", {
      name: "No savings account found. Click below to create one.",
    });
    expect(heading).toBeInTheDocument();
  });
});
