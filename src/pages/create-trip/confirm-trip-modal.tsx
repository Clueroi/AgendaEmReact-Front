import { Mail, User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface ConfirmTripsModalProps {
    closeConfirmTripModal:() => void,
    createTrip:(event:FormEvent<HTMLFormElement>) => void
    setOwnerName:(name:string)=> void
    setOwnerEmail:(email:string)=>void
    destination: string
    eventStartEnd:DateRange | undefined
}

export function ConfirmTrip({closeConfirmTripModal, createTrip, setOwnerEmail, setOwnerName, destination, eventStartEnd}:ConfirmTripsModalProps ){

  const displayedDate = eventStartEnd && eventStartEnd.from && eventStartEnd.to
  ? format(eventStartEnd.from, "d 'de ' LLL").concat(' até ').concat( format(eventStartEnd.to, "d 'de' LLL") )
  : null

    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
         <div className='w-[640px] rounded-xl py-5 px-6 bg-zinc-900 space-y-5'>
           <div className='space-y-2'>
             <div className='flex items-center justify-between'>
               <h2 className=' text-lg font-semibold'>Confirmar criação de viagem</h2>
               <button onClick={closeConfirmTripModal}><X className='size-5 text-zinc-400'/></button>
             </div>
             <p className='text-sm text-zinc-400 text-start'>Para concluir a criação da viagem para <span className='text-zinc-100 font-semibold'>{destination}</span> nas datas de <span className='text-zinc-100 font-semibold'>{displayedDate}</span> preencha seus dados abaixo:</p>
           </div>

           <form onSubmit={createTrip} className='space-y-3'>
             <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
               <User className='text-zinc-400 size-5' />
               <input type="text" 
               name='nome' 
               placeholder='Seu nome completo' 
               className='bg-transparent text-lg outline-none placeholder-zinc-400 flex-1'
               onChange={event => setOwnerName(event.target.value)}
               />
             </div>
             
             <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
               <Mail className='text-zinc-400 size-5' />
               <input type="email" 
               name='email' 
               placeholder='Seu email pessoal' 
               className='bg-transparent text-lg outline-none placeholder-zinc-400 flex-1'
               onChange={event => setOwnerEmail(event.target.value)}
               />
             </div>

             <Button type='submit' size="full">
             Confirmar criação da viagem
             </Button>
           </form>
           
         </div>
       </div>
    )
}