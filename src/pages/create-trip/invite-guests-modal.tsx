import { X, AtSign, Plus } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/button"

interface InviteGuestsModalProps{
    closeGuestModal:() => void
    emailsToInvite: string[],
    excludeEmailToInvite:(email: string)=>void
    addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
}
export function InviteGuestsModal(props:InviteGuestsModalProps){


    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] rounded-xl py-5 px-6 bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className=' text-lg font-semibold'>Selecionar convidados</h2>
                <button onClick={props.closeGuestModal}><X className='size-5 text-zinc-400'/></button>
              </div>
            <p className='text-sm text-zinc-400 text-start'>Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
            </div>

            <div className='flex flex-wrap gap-2'>
                {props.emailsToInvite.map(email=>{
                  return(
                    <div key={email} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
                    <span className='text-zinc-300'>{email}</span>
                    <button type='button' onClick={()=>props.excludeEmailToInvite(email)}> <X className='text-zinc-400 size-4' /> </button>
                    </div>
                  )
                })}
            </div>

            <div className='w-full h-px bg-zinc-800'/>

            <form onSubmit={props.addNewEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <AtSign className='text-zinc-400 size-5' />
              <input type="email" name='email' placeholder='Digite o e-mail do convidado' className='bg-transparent text-lg outline-none placeholder-zinc-400 flex-1'/>
              <Button type='submit'>
              Convidar <Plus className='size-5'/>
              </Button>
            </form>
          </div>
        </div>
    )
}