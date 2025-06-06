import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { CountdownContainer, Separator } from './styles'

export function Countdown() {
	const {
		activeCycle,
		markCurrentCycleAsFinished,
		amountSecondPassed,
		setSecondsPassed,
	} = useContext(CyclesContext)

	const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

	useEffect(() => {
		let interval: number

		if (activeCycle) {
			interval = setInterval(() => {
				const secondsDifference = differenceInSeconds(
					new Date(),
					activeCycle.startDate,
				)

				if (secondsDifference >= totalSeconds) {
					markCurrentCycleAsFinished()
					setSecondsPassed(totalSeconds)
					clearInterval(interval)
				} else {
					setSecondsPassed(secondsDifference)
				}
			}, 1000)
		}

		return () => {
			clearInterval(interval)
		}
	}, [
		activeCycle,
		totalSeconds,
		markCurrentCycleAsFinished,
		setSecondsPassed,
	])

	const currentSeconds = activeCycle ? totalSeconds - amountSecondPassed : 0

	const minutesAmount = Math.floor(currentSeconds / 60)
	const secondsAmount = currentSeconds % 60

	const minutes = minutesAmount.toString().padStart(2, '0')
	const seconds = secondsAmount.toString().padStart(2, '0')

	useEffect(() => {
		if (activeCycle) {
			document.title = `${minutes}:${seconds}`
		}
	}, [activeCycle, minutes, seconds])

	return (
		<CountdownContainer>
			<span>{minutes[0]}</span>
			<span>{minutes[1]}</span>
			<Separator>:</Separator>
			<span>{seconds[0]}</span>
			<span>{seconds[1]}</span>
		</CountdownContainer>
	)
}
