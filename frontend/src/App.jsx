import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";

import NotifyContainer from "./utils/NotifyContainer";
import useAuthCheck from "./hooks/useAuthCheck";
import FullPageLoader from "./components/loader/FullPageLoader";

function App() {
  const authChecked = useAuthCheck();
  if (!authChecked) {
    return <FullPageLoader />;
  }

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <NotifyContainer></NotifyContainer>
    </>
  );
}

export default App;
