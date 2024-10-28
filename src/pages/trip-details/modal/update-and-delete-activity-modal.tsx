import { X, Tag } from "lucide-react"
import { Button } from "../../../components/button"
import { FormEvent } from "react"
import { api } from "../../../lib/axios"
import { useParams } from "react-router-dom"

interface UpdateLocalAndDateProps {
  closeUpdateModal: () => void
  activityId: string;
}


export function UpdateAndDeleteActivityModal({
  closeUpdateModal,
  activityId,
}: UpdateLocalAndDateProps) {

  const { tripId } = useParams()

  async function updateTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await api.put(`/trips/${tripId}/activities`, {
        params:{
          id: activityId,
        }
    })

    window.document.location.reload()

    closeUpdateModal()
  }
  

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
              name='title'
              placeholder='Atualizar o nome da atividade'
              className='bg-transparent text-lg outline-none placeholder-zinc-400 flex-1' />
          </div>

          <Button size="full" type='submit'>
            Atualizar viagem
          </Button>
        </form>

      </div>
    </div>
  )
}