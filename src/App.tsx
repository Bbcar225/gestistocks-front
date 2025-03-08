import './App.css'
import {Button, ConfigProvider} from "antd";
import {useCounterStore} from "./store/useCounterStore.ts";

function App() {
  const { count, increment, decrement } = useCounterStore();

  return <ConfigProvider
    theme={{
      token: {},
    }}
  >
    {count}
    <Button type="primary" onClick={increment}>Primary</Button>
    <Button type="primary" onClick={decrement}>Primary</Button>
  </ConfigProvider>
}

export default App
