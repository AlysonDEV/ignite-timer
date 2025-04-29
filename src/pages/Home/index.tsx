import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'

import { CyclesContext } from '../../contexts/CyclesContext'
import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleForm'
import {
	HomeContainer,
	StartCountdownButton,
	StopCountdownButton,
} from './styles'

const newCycleFormValidationSchema = zod.object({
	task: zod.string().min(1, 'Informe a tarefa'),
	minutesAmount: zod
		.number()
		.min(1, 'O valor não pode ficar menor que 5')
		.max(60, 'O valor não pode ficar maior que 60'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
	const { createNewCycle, activeCycle, interruptCurrentCycle } =
		useContext(CyclesContext)

	const newCycleForm = useForm<NewCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: '',
			minutesAmount: 0,
		},
	})

	const { handleSubmit, watch, reset } = newCycleForm

	function handleCreateNewCycle(data: NewCycleFormData) {
		createNewCycle(data)
		reset()
	}

	const task = watch('task')
	const isSubmitDisabled = !task

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
				<FormProvider {...newCycleForm}>
					<NewCycleForm />
				</FormProvider>
				<Countdown />

				{activeCycle ? (
					<StopCountdownButton
						onClick={interruptCurrentCycle}
						type="button"
					>
						<HandPalm size={24} />
						Interromper
					</StopCountdownButton>
				) : (
					<StartCountdownButton
						disabled={isSubmitDisabled}
						type="submit"
					>
						<Play size={24} />
						Começar
					</StartCountdownButton>
				)}
			</form>
		</HomeContainer>
	)
}
