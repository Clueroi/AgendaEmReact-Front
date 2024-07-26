import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { CreateLinkModal } from "./modal/create-link-modal";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface Link {
    id: string;
    title: string;
    url: string;
}


export function ImportantLinks() {
    const [openLinkModal, setOpenLinkModal] = useState(false)
    const { tripId } = useParams();
    const [links, setLinks] = useState<Link[]>([]);

    useEffect(() => {
        api.get(`/trips/${tripId}/links`)
            .then(response => setLinks(response.data.links))
    }, [tripId]);

    function openCreateLinkModal() {
        setOpenLinkModal(true);
    }

    function closeCreateLinkModal() {
        setOpenLinkModal(false);
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Links importantes</h2>
            <div className="space-y-5">
                {links.map(link => (
                    <div key={link.id} className="flex items-center justify-between gap-4">
                        <div className="space-y-1.5 flex-1">
                            <span className="block font-medium text-zinc-100">{link.title}</span>
                            <a href={link.url} className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                                {link.url}
                            </a>
                        </div>
                        <Link2 className="size-5 text-zinc-400" />
                    </div>
                ))}
            </div>
            <Button onClick={openCreateLinkModal} variant="secondary">
                <Plus className="size-5" />Cadastrar novo link
            </Button>
                {openLinkModal && (
                    <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />
                )}
        </div>
    );
}
