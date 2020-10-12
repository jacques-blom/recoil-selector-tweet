import React from 'react'
import logo from './logo.svg'
import './App.css'
import {selector, useRecoilValue} from 'recoil'

const passwordLengthSelector = selector({
    key: 'passwordLength',
    get: () => {
        return 10
    },
})

const PasswordLength = () => {
    const passwordLength = useRecoilValue(passwordLengthSelector)

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
