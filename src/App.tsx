import React from 'react'
import logo from './logo.svg'
import './App.css'
import {atom, selector, useRecoilValue} from 'recoil'

const passwordLengthState = selector({
    key: 'passwordLength',
    get: () => {
        return 10
    },
})

const PasswordLength = () => {
    const passwordLength = useRecoilValue(passwordLengthState)

    return (
        <div>
            <div>Password length:</div>
            <div>{passwordLength}</div>
        </div>
    )
}

function App() {
    return (
        <div className="App">
            <PasswordLength />
        </div>
    )
}

export default App
