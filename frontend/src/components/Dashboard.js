import { useState, useEffect } from 'react'
import axios from 'axios'

export function Dashboard () {
    
    const [blockchain, setBlockchain] = useState([])
    const [newBlockData, setNewBlockData] = useState('')

    useEffect(function getBlockchain () {
        axios.get(`http://192.168.1.95:8080`)
        .then(res => setBlockchain(res.data))
    }, [blockchain])

    function newBlock (e) {
        e.preventDefault()
        axios.post(`http://192.168.1.95:8080`, {
            data: {
                data: newBlockData
            }
        })
        .then()
    }
    
    return (
        <div className="container my-5 text-center">
            <h4>Blockchain</h4>
            <div className="row">
                { 
                    blockchain.map(block => {
                    return ( 
                    <div className="card col-lg my-2" style={{ width: "18rem", margin: 'auto' }}>
                        <div className="card-body">
                            <h5 className="card-title">Hash: { block.hash }</h5>
                            <p className="card-text">Data: { block.data }</p>
                            <p>Previous hash: { block.previousHash }</p>
                            <p className="btn btn-primary">Tutte le info</p>
                        </div>
                    </div>
                    )
                    }) 
                }
            </div>
            <input onChange={ e => { setNewBlockData(e.target.value); console.log(e.target.value) } } className="form-control my-2" />
            <button onClick={ e => newBlock(e) } className="btn">Nuovo blocco</button>
        </div>
    )

}