import { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import CreatableSelect from "react-select/creatable";
import { Card, Skeleton, Tooltip } from "antd";
import {
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
  HourglassOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";

import XRP from "cryptocurrency-icons/svg/color/xrp.svg";

const { Meta } = Card;

const defaultOptions = [
  { value: "rwc4hhcJ5FYt8fFvN5PQj9by5Rbna8smJ1", label: "Adam" },
  { value: "rhbT1CmosgPjTaaSYz7a4JdQtbTatWUMPR", label: "Eve" },
  { value: "rEhgmoFh1S9CkwQra7X9mYwSMkHDTc56yk", label: "God" },
];

const Account = () => {
  const [account, setAccount] = useState(defaultOptions[0]);
  const [data, setData] = useState({ xrpBalance: 0 });
  const [clientPayload, setClientPayload] = useState([
    { type: "GET_ACCOUNT_INFO" },
    defaultOptions[0].value,
  ]);

  const createOption = (label: string) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ""),
  });

  const [options, setOptions] = useState(defaultOptions);

  const ws = new WebSocket("ws://localhost:8080");

  useEffect(() => {
    ws.onopen = () => {
      console.log("Connected to Server");

      ws.send(JSON.stringify(clientPayload));
    };
    ws.onclose = () => console.log("Disconnected from Server");

    ws.addEventListener("message", (e) => {
      setData(JSON.parse(e.data));
    });

    return () => {
      ws.close();
    };
  }, [data, account, clientPayload, ws]);

  const createPayload = (payload: any) => {
    return [{ type: "GET_ACCOUNT_INFO" }, payload];
  };

  const handleCreate = (inputValue: any) => {
    const newOption = createOption(inputValue);
    setOptions([...options, newOption]);
    setAccount(newOption);
    setClientPayload(createPayload(account));
    console.log(newOption);
  };

  const handleChange = (e: any) => {
    setAccount({ value: e.value, label: e.value });
    setClientPayload(createPayload(e.value));
    console.log(clientPayload);
  };

  return (
    <div style={styles.container}>
      <span style={styles.title}>XRP ACCOUNT</span>

      <CreatableSelect
        isClearable
        options={options}
        style={styles.select}
        closeMenuOnSelect={true}
        value={account}
        placeholder="Paste address here..."
        onChange={(e) => handleChange(e)}
        onCreateOption={handleCreate}
      />

      <pre style={styles.account}>{account.value}</pre>

      <Card
        style={{ width: "100%", marginTop: 16 }}
        actions={[
          <Tooltip placement="bottom" title="Receive">
            <VerticalAlignBottomOutlined key="receive" />
          </Tooltip>,
          <Tooltip placement="bottom" title="Send">
            <VerticalAlignTopOutlined key="send" />
          </Tooltip>,
          <Tooltip placement="bottom" title="Swap">
            <SwapOutlined key="swap" />
          </Tooltip>,
          <Tooltip placement="bottom" title="Escrow">
            <HourglassOutlined key="escrow" />
          </Tooltip>,
        ]}
        hoverable
      >
        <Skeleton loading={false} avatar active>
          <Meta
            avatar={<Avatar src={XRP} />}
            title="Balance"
            description={data.xrpBalance}
          />
        </Skeleton>
      </Card>

      {data !== null ? (
        <div>
          <pre style={styles.result} id="result">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      ) : (
        <div style={styles.loader}>
          <CircleLoader color="#0099e5" loading={true} />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    margin: 20,
  },
  title: {
    fontSize: 12,
    fontWeight: 700,
    color: "#666",
  },
  select: {
    width: 100,
    marginTop: 15,
  },
  account: {
    margin: 10,
    color: "#0099e5",
  },
  result: {
    padding: 10,
  },
  loader: {
    width: 200,
    height: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default Account;
