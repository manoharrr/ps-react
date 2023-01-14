import {
  render as rtlrender,
  RenderResult,
  RenderOptions,
} from "@testing-library/react";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import { RootState, setupStore } from "../../redux/app/store";
import { initialState as createUserIS } from "../../redux/features/createUserSlice";
import { initialState as creditIS } from "../../redux/features/creditSlice";
import { initialState as loginIS } from "../../redux/features/loginSlice";
import { initialState as savingIS } from "../../redux/features/savingSlice";
import { initialState as transactionIS } from "../../redux/features/transactionSlice";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
// import { createMemoryHistory } from "history";
// import { Router } from "react-router-dom";
interface Props {
  children?: ReactElement;
}

type CustomRenderOptions = {
  preLoadedState?: any;
  renderOptions?: Omit<RenderOptions, "wrapper">;
  routeHistory?: Array<string>;
  initialRouteIndex?: number;
};

function render(
  ui: ReactElement,

  {
    preLoadedState = {
      createUser: createUserIS,
      creditCard: creditIS,
      login: loginIS,
      savingAcc: savingIS,
      transaction: transactionIS,
    },
    // routeHistory,
    // initialRouteIndex,
    ...renderOptions
  }: CustomRenderOptions = {}
): RenderResult {
  const Wrapper: React.FC<Props> = ({ children }) => {
    const store = setupStore(preLoadedState);
    // const history = createMemoryHistory({
    //   initialEntries: routeHistory,
    //   initialIndex: initialRouteIndex,
    // });
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  };
  return rtlrender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render };
