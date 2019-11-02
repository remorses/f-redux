import { strict as assert } from 'assert'
import DOM from 'react-dom'
import useStore, { Store } from '../src'
import React from 'react'

const initialState = {
    counter: 0,
}

const actions = (store: Store<typeof initialState>) => ({
    addToCounter: async (amount) => {
        const newCounterValue = store.state.counter + amount
        store.setState({ counter: newCounterValue })
    },
})

const useGlobal = useStore(initialState, actions)

const App = () => {
    const [globalState, globalActions] = useGlobal()
    return (
        <div>
            <p>
                counter:
                {globalState.counter}
            </p>
            <button type='button' onClick={() => globalActions.addToCounter(1)}>
                +1 to global
            </button>
        </div>
    )
}

DOM.render(<App />, document.getElementById('root'))
