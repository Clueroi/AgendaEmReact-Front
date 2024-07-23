import { UserRoundPlus, ArrowRight } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestStepProps{
    openGuestModal: () => void
    openConfirmTripModal: () => void
    emailsToInvite: string[]
}

export function InviteGuestStep({
    openGuestModal, 
    emailsToInvite, 
    openConfirmTripModal,
    }:InviteGuestStepProps)
    {
        return(
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3">
                <button type='button' onClick={openGuestModal} className='flex gap-2 flex-1'>
                    <UserRoundPlus className='size-5 text-zinc-400'/>
                    {emailsToInvite.length > 0 ? (
                    <span className='text-zinc-400'>{emailsToInvite.length} pessoa(s) convidada(s)</span> 
                    ): (
                    <span className='text-zinc-400'>Quem estará na viagem?</span> 
                    )}           
                </button>
        
                <Button onClick={openConfirmTripModal}>
                    Confirmar viagem! <ArrowRight className='size-5'/>
                </Button>
            </div>
        )
    }