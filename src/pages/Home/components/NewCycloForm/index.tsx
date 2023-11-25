import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormContainer, MinutosAmountInput, TaskInput } from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'Numero pode ser no mínimo 5')
    .max(60, 'Numero pode ser no máximo 60'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para seu projeto"
        {...register('task')}
        disabled={!!activeCycle}
      />

      <datalist id="task-suggestions">
        <option value="Desenvolvimento Web" />
        <option value="Desenvolvimento Mobile" />
        <option value="Desenvolvimento de Sistemas" />
        <option value="Desenvolvimento de Aplicações" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutosAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        max={60}
        min={1}
        step={5}
        {...register('minutesAmount', { valueAsNumber: true })}
        disabled={!!activeCycle}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
