import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'
import api from '../../services/api'

export default function Logon() {
    const [id, setId] = useState('')

    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await api.post('/sessions', { id })

            localStorage.setItem('ongName', response.data.name)
            localStorage.setItem('ongId', id)

            history.push('/profile')
        } catch (err) {
            alert('Erro ao efetuar o login.')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="logo"/>

                <form action="" onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input
                        type="text"
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                        />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={15} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="heroes"/>
        </div>
    )
}