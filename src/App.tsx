import "./App.css";
import Select from "react-select";

import Account from "./components/get_account_info";
import { useState, useEffect } from "react";
import SendPayment from "./components/send_payment";
import TimeHeldEscrow from "./components/time_held_escrow";
import CreateAccount from "./components/create_account";

const options = [
  { value: "get_account_info", label: "Get Account Info" },
  { value: "send_payment", label: "Send Payment" },
  { value: "time_held_escrow", label: "Time Held Escrow" },
];

function App() {
  const [action, setAction] = useState(options[0].value);

  const handleInputChange = (e: any) => {
    // console.log(e.value)
    setAction(e.value);
  };

  const renderComponent = (c: String) => {
    switch (c) {
      case "get_account_info":
        return <Account />;
      case "send_payment":
        return <SendPayment />;
      case "time_held_escrow":
        return <TimeHeldEscrow />;
    }
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      // console.log('Connected to Server');
      // ws.send(action)
    };
    ws.onclose = () => console.log("Disconnected from Server");

    return () => {
      ws.close();
    };
  }, [action]);

  return (
    <div className="App">
      <CreateAccount />
      <header className="App-header">
        <span className="App-title">
          <pre>Tx Type</pre>
        </span>

        <div style={styles.actions}>
          <Select
            options={options}
            placeholder="Select Action..."
            defaultValue={options[0]}
            onChange={handleInputChange}
          />
        </div>
      </header>

      <div style={styles.container}>{renderComponent(action)}</div>
    </div>
  );
}

const styles = {
  container: {
    // width: '30%',
    padding: 10,
    border: "1px solid bluegray",
    overflow: "visible",
  },
  actions: {
    margin: 10,
    width: 200,
  },
};

export default App;
