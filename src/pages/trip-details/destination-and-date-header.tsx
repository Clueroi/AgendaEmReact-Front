import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { UpdateLocalAndDateModal } from "./modal/update-local-and-date";

interface Trip {
    id: string
    destination: string
    starts_at: string
    ends_at: string
    confirmed: boolean
}


export function DestinationAndDateHeader() {

    const [openDateAndDestinationModal, setOpenAndDateDestinationModal] = useState(false)
    const { tripId } = useParams()
    const [trip, setTrip] = useState<Trip | undefined>()

    function openUpdateModal() {
        setOpenAndDateDestinationModal(true)
    }
    function closeUpdateModal(){
        setOpenAndDateDestinationModal(false)
    }

    useEffect(() => {
        api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
    }, [tripId])

    const displayedDate = trip
        ? format(trip.starts_at, "d 'de ' LLL").concat(' até ').concat(format(trip.ends_at, "d 'de' LLL"))
        : null

    return (
        <div className="bg-zinc-900 px-6 h-16 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MapPin className="size-5 text-zinc-400" />
                <span className="text-zinc-100">{trip?.destination}</span>
            </div>
            <div className="flex items-center gap-2">
                <Calendar className="size-5 text-zinc-400" />
                <span className="text-zinc-100">{displayedDate}</span>
                <div className='w-px h-6 bg-zinc-800'></div>
                <Button onClick={openUpdateModal} variant={'secondary'}>  Alterar local/data <Settings2 className="size-5" /></Button>
            </div>
            {openDateAndDestinationModal && (
                <UpdateLocalAndDateModal
                closeUpdateModal={closeUpdateModal}
                />
            )
            }
            
        </div>
    )
}



