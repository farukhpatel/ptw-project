import Form from "./Form";
import Todos from "./Todos";
import Array from "./Array";
import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Form />
        <Todos />
        <Array />
      </QueryClientProvider>
    </div>
  );
}

export default App;
