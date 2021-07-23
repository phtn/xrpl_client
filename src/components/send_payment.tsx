import { useEffect, useState } from "react";


const options = [
    { value: 'rwc4hhcJ5FYt8fFvN5PQj9by5Rbna8smJ1', label: 'Buyer' },
    { value: 'rhbT1CmosgPjTaaSYz7a4JdQtbTatWUMPR', label: 'Seller' },
    { value: 'rEhgmoFh1S9CkwQra7X9mYwSMkHDTc56yk', label: 'Issuer' }
  ]

const SendPayment = () => {

    const [wallet, setWallet] = useState(null)

    const [data, setData] = useState(null)

    const pair: any = []

    useEffect(() => {
    
        const ws = new WebSocket("ws://localhost:8081")
    
        ws.onopen = () => {
            console.log('Connected to Server');
        //   wallet !== null ? ws.send( wallet || '') : ws.send('test')
            // if (wallet !== null){
            //     pair.push(wallet)
            // }

            // ws.send(pair)


            
          
        }
        ws.onclose = () => console.log('Disconnected from Server');
    
        ws.addEventListener('message', e => {
          setData(JSON.parse(e.data))
        })
    
        return () => {
          ws.close()
        }
    
      }, [wallet]);


    return (
        <div style={styles.container}>
            test
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        margin: 5,
        // border: '1px solid gray',
        height: 250,
        borderRadius: 5,
        backgroundColor: 'lightgray',
        padding: 10
    }
}

export default SendPayment