import { useState, useEffect } from 'react'
import axios from 'axios'

export function Dashboard () {
    
    const [blockchain, setBlockchain] = useState([])
    const [newBlockData, setNewBlockData] = useState('')

    const [accountInfo, setAccountInfo] = useState({})

    const [valid, setValid] = useState(true)
    const [created, setCreated] = useState(false)
 
    // 1 OK, 2 invalid

    const [loading, setLoading] = useState(0)

    useEffect(() => {
        axios.get(`http://localhost:8080/blockchain`, {
            headers: {
                Authorization: `${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => { 
            setBlockchain(res.data.blockchain); console.log(blockchain); setValid(1); 
            if (!res.data.valid) {
                setValid(0)
            } else {
                setValid(1)
            }
        })
        .catch(res => setValid(0))
        getAccountInfo()
    }, [blockchain])

    function newBlock (e) {
        e.preventDefault()
        if (newBlockData === '') {
            return
        }
        setLoading(1)
        setNewBlockData('')

        axios({
            method: 'post',
            url: 'http://localhost:8080/blockchain',
            headers: {
                'Authorization': window.localStorage.getItem('token')
            },
            data: {
                data: newBlockData
            }
        })
        .then(res => { console.log(res); setLoading(0); setCreated(1); setTimeout(() => { setCreated(0) }, 5000); })
        .catch(res => { console.log(res); setLoading(0); setValid(0); } )
        /*  */
    }

    function getAccountInfo () {
        axios.get(`http://localhost:8080/users`, {
            headers: {
                Authorization: `${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => setAccountInfo(res.data))
        .catch(res => console.error(res.data))
    }
    
    return (
        <div className="container my-5 text-center">
            <h2>Benvenuto { accountInfo.username }</h2>
            <h4>Portafoglio: { accountInfo.coins }🪙</h4>
            
            { /* console.log(valid) */ }
            { valid === 0 ? <div className="alert alert-danger my-5"><b>Blockchain non valida</b></div> : <form onSubmit={ e => newBlock(e) } className="my-5"><input onChange={ e => { setNewBlockData(e.target.value); console.log(e.target.value) } } className="form-control my-2 text-center" value={ newBlockData } placeholder="Inserisci i dati" />{ newBlockData !== '' ? <button className="btn" style={{ color: 'white', fontSize: '120%' }} onClick={ e => newBlock(e) }>Crea nuovo blocco</button> : null }</form> }
            { created === 1 ? <div className="alert alert-success my-5"><b>Blocco aggiunto</b></div> : null }
            { loading ? <div className="spinner-border text-white my-2" role="status"><span className="visually-hidden">Loading...</span></div> : null }
            
            <div className="row my-5">    
            { 
                blockchain.length > 0 ? 
                blockchain.map(block => {
                    return ( 
                    <div className="col">
                        <div className="card my-2" style={{ width: "18rem", margin: 'auto' }}>
                            <div className="card-body">
                                <h5 className="card-title">Hash { block.hash }</h5>
                                <p className="card-text">Data: { block.data }</p>
                                { block.previousHash ? <p>Previous hash: { block.previousHash }</p> : <b>Questo è il blocco di partenza </b> }
                            </div>
                        </div>
                    </div>
                    )
                }) 
                : <div className="alert alert-success"><b>La blockchain è vuota</b>: inizia minare il primo blocco!</div>
            }
            </div>
            { /*/ <h4 className="my-4">Blockchain ⛓️</h4> */ }
        </div>
    )

}