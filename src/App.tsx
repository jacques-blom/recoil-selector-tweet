import React, {useState} from 'react'
import logo from './logo.svg'
import './App.css'
import {atom, selector, useRecoilState, useRecoilValue} from 'recoil'

const passwordState = atom({
    key: 'password',
    default: '',
})

const passwordLengthState = selector({
    key: 'passwordLength',
    get: ({get}) => {
        // ✨ Use the passwordState value
        const password = get(passwordState)
        return password.length
    },
})

const PasswordLength = () => {
    const passwordLength = useRecoilValue(passwordLengthState)

    return <div>Password length: {passwordLength}</div>
}

const PasswordInput = () => {
    const [password, setPassword] = useRecoilState(passwordState)

    return <input value={password} onChange={(e) => setPassword(e.target.value)} />
}

function App() {
    return (
        <div className="App">
            <PasswordInput />
            <PasswordLength />
        </div>
    )
}

export default App
