import { X, Tag, Calendar } from "lucide-react"
import { Button } from "../../../components/button"
import { FormEvent, useState } from "react"
import { api } from "../../../lib/axios"
import { useParams } from "react-router-dom"
import { DateRange, DayPicker } from "react-day-picker"
import { format } from "date-fns"

interface UpdateLocalAndDateProps {
  closeUpdateModal: () => void

}


export function UpdateActivityModal({
  closeUpdateModal,
}: UpdateLocalAndDateProps) {

  const { tripId } = useParams()

  const [eventStartEnd, setEventStartEnd] = useState<DateRange | undefined>()
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker() {
    return setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    return setIsDatePickerOpen(false)
  }


  async function updateTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const destination = data.get('destination')?.toString()

    await api.put(`/trips/${tripId}`, {
      destination,
      starts_at:eventStartEnd?.from,
      ends_at:eventStartEnd?.to
    })

    window.document.location.reload()

    closeUpdateModal()
  }

  const displayedDate = eventStartEnd && eventStartEnd.from && eventStartEnd.to
    ? format(eventStartEnd.from, "d 'de ' LLL").concat(' até ').concat(format(eventStartEnd.to, "d 'de' LLL"))
    : null

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
      <div className='w-[640px] rounded-xl py-5 px-6 bg-zinc-900 space-y-5'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className=' text-lg font-semibold'>Atualizar atividade</h2>
            <button onClick={closeUpdateModal}><X className='size-5 text-zinc-400' /></button>
          </div>
        </div>

        <form onSubmit={updateTrip} className='space-y-3'>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className='text-zinc-400 size-5' />
            <input type="text"
              name='destination'
              placeholder='Atualize para onde será a viagem'
              className='bg-transparent text-lg outline-none placeholder-zinc-400 flex-1' />
          </div>

          <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
            <button onClick={openDatePicker} className='flex gap-2 items-center outline-none text-left w-60'>
              <Calendar className='size-5 text-zinc-400'/>
              <span className=' text-zinc-400 w-40 flex-1'>
                {displayedDate || 'Quando?'}
              </span>
            </button>
          </div>

          <Button size="full" type='submit'>
            Atualizar viagem
          </Button>
        </form>

      </div>

      {isDatePickerOpen && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className=' rounded-xl py-5 px-6 bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className=' text-lg font-semibold'>Selecione a data</h2>
                <button onClick={closeDatePicker}><X className='size-5 text-zinc-400' /></button>
              </div>
            </div>

            <DayPicker mode="range" selected={eventStartEnd} onSelect={setEventStartEnd} />

          </div>
        </div>
      )}
    </div>
  )
}