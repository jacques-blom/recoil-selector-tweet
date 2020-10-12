import React from 'react'
import {atom, DefaultValue, selector, useRecoilState, useResetRecoilState} from 'recoil'
import {AppContainer, Button, Input, InputLabel} from './ui'

const round = (n: number) => Math.round(n * 100) / 100
const fahrenheitToCelsius = (f: number) => round(((f - 32) * 5) / 9)
const celsiusToFahrenheit = (c: number) => round((c * 9) / 5 + 32)

const fahrenheitState = atom({
    key: 'fahrenheit',
    default: 32,
})

// ✨ Here we have a selector that derives °C from °F
const celsiusState = selector<number>({
    key: 'celsius',

    get: ({get}) => {
        // ✨ We get the °F atom value and convert it to °C
        return fahrenheitToCelsius(get(fahrenheitState))
    },

    // ✨ But we also allow you to set the °C selector
    set: ({set, reset}, celsius) => {
        if (celsius instanceof DefaultValue) {
            // ✨ We reset the °F atom if reset is called on the selector
            reset(fahrenheitState)
        } else {
            // ✨ Otherwise we convert backwards to °F, and set the °F atom
            set(fahrenheitState, celsiusToFahrenheit(celsius))
        }
    },
})

function App() {
    const [farenheit, setFarenheit] = useRecoilState(fahrenheitState)
    // ✨ We use our selector with useRecoilState just like we would with an atom
    const [celsius, setCelsius] = useRecoilState(celsiusState)
    const reset = useResetRecoilState(celsiusState)

    return (
        <AppContainer>
            {/* ✨ Now we can set and display the temperature in °F... */}
            <TemperatureInput label="Fahrenheit" value={farenheit} onChange={(f) => setFarenheit(f)} />

            {/* ✨ ...and get (AND SET!) the temperature in °C... */}
            <TemperatureInput label="Celsius" value={celsius} onChange={(c) => setCelsius(c)} />

            {/* ✨ ...and we even support useResetRecoilState ;) */}
            <Button onClick={() => reset()}>Reset Temperature</Button>
        </AppContainer>
    )
}

const TemperatureInput = ({value, onChange, label}: {value: number; onChange: (v: number) => void; label: string}) => {
    return (
        <div style={{marginBottom: 20}}>
            <InputLabel>{label}</InputLabel>
            <Input value={value} onChange={(e) => onChange(parseInt(e.target.value))} />
        </div>
    )
}

export default App
