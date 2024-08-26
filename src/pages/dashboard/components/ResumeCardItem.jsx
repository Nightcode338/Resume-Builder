import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Edit, Trash, FileText } from 'lucide-react'
import { supabase } from "@/Database/supabaseClient"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

const ResumeCardItem = ({ resume, onDelete }) => {
    const [deleting, setDeleting] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const navigate = useNavigate()

    const handleEdit = () => {
        navigate(`/dashboard/resume/${resume.resumeID}/edit`)
    }

    const handleDelete = async () => {
        setDeleting(true)
        try {
            const { error } = await supabase
                .from('User Resume')
                .delete()
                .eq('resumeID', resume.resumeID)
            if (error) throw error
            onDelete() 
        } catch (error) {
            console.error('Error deleting resume:', error)
        } finally {
            setDeleting(false)
            setOpenDialog(false)
        }
    }

    return (
        <>
            <div 
                className="p-8 py-24  border  bg-gray-100 rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer"
                onClick={() => setOpenDialog(true)}
            >
                {/* <FileText size={56} className="mb-4 text-gray-600 self-center" /> */}
                <div className=' flex  gap-10 items-center  justify-between'>

                <h3 className="font-bold text-lg mb-2 text-center">{resume.title}</h3>
                <p className="text-sm text-gray-600">Created by: {resume.userName}</p>
                </div>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{resume.title}</DialogTitle>
                        <DialogDescription>
                            Created by: {resume.userName}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-5">
                        <Button variant="outline" onClick={handleEdit}>
                            <Edit size={16} className="mr-2" /> Edit
                        </Button>
                        <Button 
                            variant="destructive" 
                            onClick={handleDelete}
                            disabled={deleting}
                        >
                            {deleting ? 'Deleting...' : (
                                <>
                                    <Trash size={16} className="mr-2" /> Delete
                                </>
                            )}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ResumeCardItem