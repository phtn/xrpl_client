import { useEffect, useState } from "react";
import Select from "react-select";
// import { v4 as id } from "uuid";

// const ws_action = {
//   name: "send_pay",
//   id: id(),
//   sender: {
//     address: "rwc4hhcJ5FYt8fFvN5PQj9by5Rbna8smJ1",
//     secret: "snTatgM8rsxoYGEg4pMvFeGtyXmKx",
//   },
//   receiver: "rhbT1CmosgPjTaaSYz7a4JdQtbTatWUMPR",
// };

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
  // const [wallet, setWallet] = useState(null);

  const [data, setData] = useState(sendPayment);

  // const pair: any = [];

  // const json: object = {
  //   test: 1,
  //   name: 2,
  // };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Connected to Server");
      //   wallet !== null ? ws.send( wallet || '') : ws.send('test')
      // if (wallet !== null){
      //     pair.push(wallet)
      // }

      // ws.send(JSON.stringify(json));
      // ws.send(JSON.stringify(data));
    };
    ws.onclose = () => console.log("Disconnected from Server");

    ws.addEventListener("message", (e) => {
      // setData(JSON.parse(e.data));
    });

    return () => {
      ws.close();
    };
  }, [data]);

  return (
    <div style={styles.container}>
      <Select />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    // margin: 5,
    // border: '1px solid gray',
    // height: 250,
    borderRadius: 5,
    backgroundColor: "#eee",
    padding: 0,
  },
};

export default SendPayment;
