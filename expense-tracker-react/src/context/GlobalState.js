import React, { createContext, useReducer } from "react";
import AppReducer from './AppReducer'
import axios from 'axios'

const intialeState = {
    transactions: [],
    error: null,
    loading: true
}

export const GlobalContext = createContext(intialeState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, intialeState)

    async function getTransactions() {
        try {
            const res = await axios.get('/v1/transacations')

            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            })

        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`/v1/transacations/${id}`)

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            })

        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function addTransaction(transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post(`/v1/transacations/`, transaction, config)

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            })

        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }
    }

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            error: state.error,
            loading: state.loading,
            getTransactions,
            deleteTransaction,
            addTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    )
}