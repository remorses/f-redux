import { strict as assert } from 'assert'
import DOM from 'react-dom'
import makeHook, { Store } from '../src'
import React from 'react'


const initialState = {
    counter: 0,
}

type State = typeof initialState

const actions = (store: Store<typeof initialState>) => ({
    addToCounter: (amount) => {
        const newCounterValue = store.state.counter + amount
        store.setState({ counter: newCounterValue })
    },
})

const useSharedState = makeHook(initialState, actions)

const App = () => {
    const [globalState, globalActions] = useSharedState()
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
