export type HookWithMaps<State, Actions> = <
    SelectedState = State,
    SelectedActions = Actions
>(
    mapState: (state: State) => SelectedState,
    mapActions: (actions: Actions) => SelectedActions
) => [SelectedState, SelectedActions]

export type HookWithActionsMap<State, Actions> = <SelectedActions = Actions>(
    mapActions: (actions: Actions) => SelectedActions
) => [State, SelectedActions]

export type HookWithStateMap<State, Actions> = <SelectedState = State>(
    mapState: (state: State) => SelectedState
) => [SelectedState, Actions]

type HookWithNoMaps<State, Actions> = () => [State, Actions]

type Hook<State, Actions> = HookWithMaps<State, Actions> &
    HookWithActionsMap<State, Actions> &
    HookWithStateMap<State, Actions> &
    HookWithNoMaps<State, Actions>

export default Hook