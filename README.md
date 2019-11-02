<h1 align="center">f-redux</h1>
<p align="center"><img width="300" src="./.github/logo.jpg"/></p>
<p align="center">keep it simple stupid</p>
----
## Usage
```tsx
import makeHook, { Store } from 'f-redux'

const initialState = {
    counter: 0,
}

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
```
