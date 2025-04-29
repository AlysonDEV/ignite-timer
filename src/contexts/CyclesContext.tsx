import { differenceInSeconds } from 'date-fns'
import {
	type ReactNode,
	createContext,
	useEffect,
	useReducer,
	useState,
} from 'react'
import {
	addNewCycleAction,
	interruptCurrentCycleAction,
	markCurrentCycleAsFinishedAction,
} from '../reducers/cycle/actions'
import { type Cycle, cycleReducers } from '../reducers/cycle/reducer'

interface CreateCycleData {
	task: string
	minutesAmount: number
}

interface CycleContextType {
	cycles: Cycle[]
	activeCycle: Cycle | undefined
	activeCycleId: string | null
	amountSecondPassed: number
	markCurrentCycleAsFinished: () => void
	setSecondsPassed: (seconds: number) => void
	createNewCycle: (data: CreateCycleData) => void
	interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CycleContextType)

interface CyclesContextProviderProps {
	children: ReactNode
}

export function CyclesContextProvider({
	children,
}: CyclesContextProviderProps) {
	const [cyclesState, dispatch] = useReducer(
		cycleReducers,
		{
			cycles: [],
			activeCycleId: null,
		},
		(initialState) => {
			const stateAsJSON = localStorage.getItem(
				'@ignite-timer:cycles-state-1.0.0',
			)
			if (stateAsJSON) {
				return JSON.parse(stateAsJSON)
			}

			return initialState
		},
	)

	const { cycles, activeCycleId } = cyclesState
	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

	const [amountSecondPassed, setAmountSecondPassed] = useState(() => {
		if (activeCycle) {
			return differenceInSeconds(new Date(), activeCycle.startDate)
		}

		return 0
	})

	useEffect(() => {
		const stateJSON = JSON.stringify(cyclesState)

		localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
	}, [cyclesState])

	function setSecondsPassed(seconds: number) {
		setAmountSecondPassed(seconds)
	}

	function markCurrentCycleAsFinished() {
		dispatch(markCurrentCycleAsFinishedAction())
	}

	function createNewCycle(data: CreateCycleData) {
		const id = new Date().getTime().toString()
		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		}

		dispatch(addNewCycleAction(newCycle))

		setAmountSecondPassed(0)
	}

	function interruptCurrentCycle() {
		dispatch(interruptCurrentCycleAction())
	}

	return (
		<CyclesContext.Provider
			value={{
				cycles,
				activeCycle,
				activeCycleId,
				markCurrentCycleAsFinished,
				amountSecondPassed,
				setSecondsPassed,
				createNewCycle,
				interruptCurrentCycle,
			}}
		>
			{children}
		</CyclesContext.Provider>
	)
}
