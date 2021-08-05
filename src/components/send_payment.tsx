import { useEffect, useState } from "react";
import Select from "react-select";
import { v4 as id } from "uuid";

const senderOptions = [
  { value: "rwc4hhcJ5FYt8fFvN5PQj9by5Rbna8smJ1", id: id(), label: "Account" },
  {
    value: "rhbT1CmosgPjTaaSYz7a4JdQtbTatWUMPR",
    id: id(),
    label: "Destination",
  },
  { value: "rEhgmoFh1S9CkwQra7X9mYwSMkHDTc56yk", id: id(), label: "Issuer" },
];

const receiverOptions = [
  { value: "rwc4hhcJ5FYt8fFvN5PQj9by5Rbna8smJ1", label: "Account" },
  { value: "rhbT1CmosgPjTaaSYz7a4JdQtbTatWUMPR", label: "Destination" },
  { value: "rEhgmoFh1S9CkwQra7X9mYwSMkHDTc56yk", label: "Issuer" },
];

const sendPayment = [
  { type: "SEND_PAYMENT" },
  {
    TransactionType: "Payment",
    Account: "rhbT1CmosgPjTaaSYz7a4JdQtbTatWUMPR",
    // Account: "rwc4hhcJ5FYt8fFvN5PQj9by5Rbna8smJ1",
    Amount: 100,
    Destination: "rwc4hhcJ5FYt8fFvN5PQj9by5Rbna8smJ1",
    // Destination: "rhbT1CmosgPjTaaSYz7a4JdQtbTatWUMPR",
  },
  { secret: "snCoikbR2qpb9WZeNA1UffPAQ2wzC" },
  // { secret: "snTatgM8rsxoYGEg4pMvFeGtyXmKx" },
];

// const options = [
//   { value: "rwc4hhcJ5FYt8fFvN5PQj9by5Rbna8smJ1", label: "Buyer" },
//   { value: "rhbT1CmosgPjTaaSYz7a4JdQtbTatWUMPR", label: "Seller" },
//   { value: "rEhgmoFh1S9CkwQra7X9mYwSMkHDTc56yk", label: "Issuer" },
// ];

const SendPayment = () => {
  // const [data, setData] = useState(sendPayment);
  const [senderData, setSenderData] = useState(senderOptions[0]);
  const [senderID, setSenderID] = useState(senderOptions[0]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Connected to Server");

      // ws.send(JSON.stringify(data));
    };
    ws.onclose = () => console.log("Disconnected from Server");

    ws.addEventListener("message", (e) => {
      // setData(JSON.parse(e.data));
    });

    console.log(senderData);

    return () => {
      ws.close();
    };
  }, [senderData]);

  function handleSenderInputChange(e: any) {
    setSenderData(e.value);
    setSenderID(e.id);
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div>
          <Select
            className="Select"
            options={senderOptions}
            style={styles.select}
            closeMenuOnSelect={true}
            // defaultValue={senderOptions[0]}
            placeholder="Select an account"
            onChange={(e) => handleSenderInputChange(e)}
          />
          <span>{JSON.stringify(senderData.id)}</span>
          <pre style={styles.senderAccount}>{senderData.value}</pre>
          <pre>{JSON.stringify(senderOptions, null, 2)}</pre>
        </div>
      </div>

      <div style={styles.card}>
        <div>
          <Select
            className="Select"
            options={senderOptions}
            style={styles.select}
            closeMenuOnSelect={true}
            defaultValue={senderOptions[1]}
            placeholder="Choose wallet..."
            onChange={(e) => handleSenderInputChange(e)}
          />
          <span>{JSON.stringify(senderData.id)}</span>
          <pre style={styles.senderAccount}>{senderData.value}</pre>
          <pre>{JSON.stringify(senderOptions, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    borderRadius: 5,
    backgroundColor: "#eee",
    padding: 0,
  },
  card: {
    margin: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    border: "1px solid green",
  },
  select: {
    width: 100,
    marginTop: 15,
  },
  senderAccount: {
    margin: 10,
    color: "#0099e5",
  },
};

export default SendPayment;
