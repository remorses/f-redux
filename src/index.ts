import React from 'react'

function setState(store, newState, afterUpdateCallback) {
    store.state = { ...store.state, ...newState }
    store.listeners.forEach((listener) => {
        listener.run(store.state)
    })
    afterUpdateCallback && afterUpdateCallback()
}

function useCustom(store, mapState, mapActions) {
    const [, originalHook] = React.useState(Object.create(null))
    const state = mapState ? mapState(store.state) : store.state
    const actions = React.useMemo(
        () => (mapActions ? mapActions(store.actions) : store.actions),
        [mapActions, store.actions],
    )

    React.useEffect(() => {
        const newListener: Listener = { oldState: {} }
        newListener.run = mapState
            ? (newState) => {
                  const mappedState = mapState(newState)
                  if (mappedState !== newListener.oldState) {
                      newListener.oldState = mappedState
                      originalHook(mappedState)
                  }
              }
            : originalHook
        store.listeners.push(newListener)
        newListener.run(store.state)
        return () => {
            store.listeners = store.listeners.filter(
                (listener) => listener !== newListener,
            )
        }
    }, []) // eslint-disable-line
    return [state, actions]
}

type Listener = any

export interface Store<State = any, Actions = any> {
    state: State
    actions: Actions
    listeners: Listener[]
    setState: (update: Partial<State>, callback?: () => void) => void
}

export type Hook<State, Actions> = <
    SelectedState = State,
    SelectedActions = Actions
>(
    mapState?: (state: State) => SelectedState,
    mapActions?: (actions: Actions) => SelectedActions,
) => [SelectedState, SelectedActions]

const makeHook = <
    State,
    ActionsMaker extends (store: Store<State, any>) => any
>(
    initialState: Partial<State>,
    actions: ActionsMaker,
    initializer?: (store: Store<State, ActionsMaker>) => void,
): Hook<State, ReturnType<ActionsMaker>> => {
    const store = { state: initialState, listeners: [] } as Store<
        State,
        ReturnType<ActionsMaker>
    >
    store.setState = setState.bind(null, store)
    store.actions = actions(store)
    if (initializer) initializer(store)
    return useCustom.bind(null, store)
}

export default makeHook
