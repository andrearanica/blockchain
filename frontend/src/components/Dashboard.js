import { useState, useEffect } from 'react'
import axios from 'axios'

import add from '../images/add-icon.png'

export function Dashboard () {
    
    const [blockchain, setBlockchain] = useState([])
    const [newBlockData, setNewBlockData] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:8080`, {
            headers: {
                Authorization: `${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => { setBlockchain(res.data); console.log(blockchain) })
    }, [blockchain])

    function newBlock (e) {
        e.preventDefault()
        axios.get(`http://192.168.1.95:8080/newBlock?data=${ newBlockData }`, {
            headers: {
                Authorization: `${ window.localStorage.getItem('token') }`
            }
        })
        .then(res => console.log(res))
        .catch(res => console.log(res))
    }
    
    return (
        <div className="container my-5 text-center">
            <h4>Blockchain</h4>
            <center><img src={ add } onClick={ e => newBlock(e) } className="btn mx-4" id="button" /><img src={ add } onClick={ e => newBlock(e) } className="btn mx-4" id="button" /></center>
            <div className="row">
                { 
                    blockchain.length > 0 ? 
                    blockchain.map(block => {
                        return ( 
                        <div className="col">
                            <div className="card my-2" style={{ width: "18rem", margin: 'auto' }}>
                                <div className="card-body">
                                    <h5 className="card-title">Hash</h5>
                                    <p className="card-text">{ block.hash }</p>
                                    <p className="card-text">Data: { block.data }</p>
                                    <p>Previous hash: { block.previousHash }</p>
                                    <p className="btn btn-primary">Tutte le info</p>
                                </div>
                            </div>
                        </div>
                        )
                    }) 
                    : null
                }
            </div>
            <input onChange={ e => { setNewBlockData(e.target.value); console.log(e.target.value) } } className="form-control my-2" />
        </div>
    )

}