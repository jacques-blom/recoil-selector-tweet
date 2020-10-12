import styled from 'styled-components'

export const AppContainer = styled.div`
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #061626;
`

export const InputLabel = styled.div`
    font-size: 18px;
    margin-bottom: 5px;
`

export const Input = styled.input`
    appearance: none;
    border: none;
    padding: 10px;
    border-radius: 4px;
    font-size: 14px;
    width: 200px;
    box-sizing: border-box;
`

export const Button = styled.button`
    appearance: none;
    border: none;
    padding: 10px;
    border-radius: 4px;
    font-size: 14px;
    width: 200px;
    box-sizing: border-box;
`
