import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import CardDisplay from "./components/Card";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#301c4d"
        }
      }}
    >
      <div>
        <CardDisplay />
      </div>
    </ConfigProvider>
  );
}

export default App;
