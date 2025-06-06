import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { FormContainer, MinutosAmountInput, TaskInput } from './styles'

export function NewCycleForm() {
	const { activeCycle } = useContext(CyclesContext)
	const { register } = useFormContext()

	return (
		<FormContainer>
			<label htmlFor="">Vou trabalhar em</label>
			<TaskInput
				id="task"
				type="text"
				list="task-suggestions"
				placeholder="Dê um nome para seu projeto"
				disabled={!!activeCycle}
				{...register('task')}
			/>

			<datalist id="task-suggestions">
				<option value="Projeto 1" />
				<option value="Projeto 2" />
			</datalist>

			<label htmlFor="minutesAmount">durante</label>
			<MinutosAmountInput
				type="number"
				id="minutes-amount"
				placeholder="00"
				step={1}
				min={1}
				max={60}
				disabled={!!activeCycle}
				{...register('minutesAmount', { valueAsNumber: true })}
			/>

			<span>minutos.</span>
		</FormContainer>
	)
}
