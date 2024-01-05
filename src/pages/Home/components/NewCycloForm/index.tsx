import { FormContainer, MinutosAmountInput, TaskInput } from './styles'
import { useContext } from 'react'
import { CycleContext } from '../..'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext)
  const { register } = useFormContext()

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
        min={5}
        step={5}
        {...register('minutesAmount', { valueAsNumber: true })}
        disabled={!!activeCycle}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
