import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ConfirmTrip } from './confirm-trip-modal'
import { InviteGuestsModal } from './invite-guests-modal'
import { DestinationAndDateSteps } from './steps/destination-and-date-step'
import { InviteGuestStep } from './steps/invite-guest-step'
import { DateRange } from 'react-day-picker'
import { api } from '../../lib/axios'

export function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState([
    'eric@gmail.com'
  ])
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventStartEnd, setEventStartEnd] = useState<DateRange | undefined>()

  function openGuestInput(){
    setIsGuestsInputOpen(true)
  }

  function closeGuestInput(){
    setIsGuestsInputOpen(false)
  }

  function openGuestModal(){
    setIsGuestModalOpen(true)
  }

  function closeGuestModal(){
    setIsGuestModalOpen(false)
  }
  
  function addNewEmailToInvite(event:FormEvent<HTMLFormElement>){
    event.preventDefault()
    
    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()
    
    if(!email){
      return
    }
    if(emailsToInvite.includes(email)){
      return 
    }
    
    setEmailsToInvite([
      ...emailsToInvite,
      email
    ])
    
    event.currentTarget.reset()
  }
  
  function excludeEmailToInvite(emailToRemove:string){
    const newEmailList = emailsToInvite.filter((email)=>{
      return email !== emailToRemove
    })
    
    setEmailsToInvite(newEmailList)
  }
  
  function openConfirmTripModal(){
    setIsConfirmTripModalOpen(true)
  }
  function closeConfirmTripModal(){
    setIsConfirmTripModalOpen(false)
  }

  async function createTrip(event: FormEvent<HTMLFormElement>){
    
    event.preventDefault()

    if(!destination){
      return
    }
    if(!eventStartEnd?.from || !eventStartEnd?.to){
      return 
    }
    if(!ownerEmail || !ownerName){
      return
    }
    
      const response = await api.post('/trips', {
        destination,
        starts_at:eventStartEnd?.from,
        ends_at:eventStartEnd?.to,
        emails_to_invite:emailsToInvite,
        owner_name:ownerName,
        owner_email:ownerEmail
      })


    const {tripId} = response.data

    navigate(`/trips/${tripId}`)
  }
  

  return (
    <div className="h-screen flex items-center justify-center text-center bg-pattern bg-no-repeat bg-center">
      <div className="w-full max-w-3xl px-6 space-y-10">

        <div className='flex flex-col items-center gap-3'>
            <img src='/logo.svg' alt='plann.er'/>
            <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className='space-y-4'>

        <DestinationAndDateSteps
        closeGuestInput={closeGuestInput}
        isGuestsInputOpen={isGuestsInputOpen}
        openGuestInput={openGuestInput}
        setDestination={setDestination}
        setEventStartEnd={setEventStartEnd}
        eventStartEnd={eventStartEnd}
        />

        {isGuestsInputOpen && (
           <InviteGuestStep
           emailsToInvite={emailsToInvite}
           openConfirmTripModal={openConfirmTripModal}
           openGuestModal={openGuestModal}
           />
        )}
          
        </div>

            <p className="text-zinc-500">Ao planejar sua viagem pela plann.er você automaticamente concorda<br/>
            com nossos <a className="text-zinc-300" href='#'>termos de uso</a> e <a className="text-zinc-300" href='#'>políticas de privacidade</a>.</p>
      </div>

      {isGuestModalOpen && (
        <InviteGuestsModal
        addNewEmailToInvite={addNewEmailToInvite}
        closeGuestModal={closeGuestModal}
        emailsToInvite={emailsToInvite}
        excludeEmailToInvite={excludeEmailToInvite}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTrip 
        closeConfirmTripModal={closeConfirmTripModal}
        createTrip={createTrip}
        setOwnerName={setOwnerName}
        setOwnerEmail={setOwnerEmail}
        />
      )}
       

    </div>
  )

  

}

