import Select from 'react-select'
import { useEffect, useState } from 'react'
import { CircleLoader } from 'react-spinners'



const options = [
  { value: 'rwc4hhcJ5FYt8fFvN5PQj9by5Rbna8smJ1', label: 'Buyer' },
  { value: 'rhbT1CmosgPjTaaSYz7a4JdQtbTatWUMPR', label: 'Seller' },
  { value: 'rEhgmoFh1S9CkwQra7X9mYwSMkHDTc56yk', label: 'Issuer' }
]

const Account = () => {

    const [account, setAccount] = useState(null)
    const [data, setData] = useState(null)

    const ws = new WebSocket("ws://localhost:8080")

    

  useEffect(() => {
    
    ws.onopen = () => {
      console.log('Connected to Server');
      account !== null ? ws.send( account || '') : ws.send('')
      
      // ws.send(account)
    }
    ws.onclose = () => console.log('Disconnected from Server');


    ws.addEventListener('message', e => {
      setData(JSON.parse(e.data))
    })


    return () => {
      ws.close()
    }

  }, [account]);

    // const sendMessage = (msg: string) => {
    //   if (msg !== null){
    //     ws.send(msg)
    //   }
    // }
    const handleInputChange = (e: any) => {
        console.log(e.value)
        setAccount(e.value)
        // sendMessage(e.value)
        
    }


    return (
        <div style={styles.container}>
            <span style={styles.title}>XRP</span>

            <Select 
                options={options} 
                style={styles.select} 
                closeMenuOnSelect={true} 
                // defaultValue={options[0]}
                placeholder="Choose wallet..."
                onChange={(e)=> handleInputChange(e)}
                />

            <pre style={styles.account}>{account}</pre>
            {data !== null ? 
              <pre style={styles.result} id="result">{JSON.stringify(data, null, 2)}</pre> : 
              <div style={styles.loader}>
                <CircleLoader color="#0099e5" loading={true} />
              </div>
            }
            
        </div>
    )
}

const styles = {
    container: {
      margin: 20
    },
    title: {
        fontSize: 12,
        fontWeight: 700,
      },
    select: {
        width: 100,
        marginTop: 15
    },
    account: {
        margin: 10,
        color: '#0099e5'
    },
    result: {
        padding: 10
    },
    loader: {
      width: 200,
      height: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
}

export default Account