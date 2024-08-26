import { PlusSquare } from "lucide-react"
import { LoaderCircle } from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/Database/supabaseClient"
import { useUser } from "@clerk/clerk-react"
import { useNavigate } from 'react-router-dom'

const AddResume = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const [resumeTitle, setResumeTitle] = useState('');
    const { user } = useUser();
    const [loading, setLoading] = useState(false)
    const navigation=useNavigate();

    const onCreate = async () => {
        setLoading(true);
        if (!resumeTitle) {
            console.error('Resume title is required');
            setLoading(false);
            return;
        }
        const uuid = uuidv4();
        const newRecord = {
            title: resumeTitle,
            resumeID: uuid,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName
        }
    
        try {
            const { data, error } = await supabase
                .from('User Resume') 
                .insert([newRecord])
                .select();  
    
            if (error) {
                console.error('Supabase error:', error);
                throw error;
            }
    
            if (data) {
                console.log('New record added:', data[0]);
                setOpenDialog(false);
                setResumeTitle('');
                navigation('/dashboard/resume/'+data[0].resumeID+"/edit");
            }
        } catch (error) {
            console.error('Error adding new record:', error);
            if (error.message) console.error('Error message:', error.message);
            if (error.details) console.error('Error details:', error.details);
            if (error.hint) console.error('Error hint:', error.hint);
        } finally {
            setLoading(false);
           
        }
    }

    return (
        <>
            <div className="p-14 py-24 px-44 border items-center flex justify-center bg-gray-100 rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed" onClick={() => setOpenDialog(true)}>
                <PlusSquare/>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription>
                            <p>Add a title for your new resume</p>
                            <Input 
                                className="my-2" 
                                placeholder="Ex. FullStack Resume" 
                                onChange={(e) => setResumeTitle(e.target.value)} 
                                value={resumeTitle} 
                            />
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-5">
                        <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button 
                            disabled={!resumeTitle||loading}
                            onClick={onCreate}
                        >
                            { loading? <LoaderCircle/> : 'Create'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddResume