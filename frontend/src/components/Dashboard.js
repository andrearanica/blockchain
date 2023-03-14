import { useState, useEffect } from 'react'
import axios from 'axios'

export function Dashboard () {
    
    const [blockchain, setBlockchain] = useState([])
    const [newBlockData, setNewBlockData] = useState('')

    const [accountInfo, setAccountInfo] = useState({})

    const [loading, setLoading] = useState(0)

    useEffect(() => {
        axios.get(`http://localhost:8080`, {
            headers: {
                Authorization: `${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => { setBlockchain(res.data); console.log(blockchain) })
        getAccountInfo()
    }, [blockchain])

    function newBlock (e) {
        e.preventDefault()
        setLoading(1)
        setNewBlockData('')
        axios.get(`http://192.168.1.95:8080/newBlock?data=${ newBlockData }`, {
            headers: {
                Authorization: `${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => { console.log(res); setLoading(0); })
        .catch(res => { console.log(res); setLoading(1); } )
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
            <h4>Soldi: { accountInfo.coins }🪙</h4>
            <form onSubmit={ e => newBlock(e) } className="my-5">
                <input onChange={ e => { setNewBlockData(e.target.value); console.log(e.target.value) } } className="form-control my-2" value={ newBlockData } placeholder="Inserisci i dati" />
                { newBlockData !== '' ? <button className="btn" style={{ color: 'white', fontSize: '120%' }} onClick={ e => newBlock(e) }>Crea nuovo blocco</button> : null }
            </form>
            { loading ? <div className="spinner-border text-white my-2" role="status"><span className="visually-hidden">Loading...</span></div> : null }
            { // <h4 className="my-4">Blockchain ⛓️</h4>
            }
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
                    : null
                }
            </div>
        </div>
    )

}