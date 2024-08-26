import { useEffect, useState } from "react"
import { useUser } from "@clerk/clerk-react"
import AddResume from "./components/AddResume"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import { supabase } from "@/Database/supabaseClient"
import ResumeCardItem from "./components/ResumeCardItem"
import Footer from "./components/Footer"

const Dashboard = () => {
    const { user } = useUser()
    const [resumes, setResumes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            fetchResumes()
        }
    }, [user])

    const fetchResumes = async () => {
        try {
            const { data, error } = await supabase
                .from('User Resume')
                .select('*')
                .eq('userEmail', user.primaryEmailAddress.emailAddress)

            if (error) throw error
            setResumes(data || [])
        } catch (error) {
            console.error('Error fetching resumes:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Navbar />
            <Hero />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 px-16 gap-14 mt-10">
                <AddResume onResumeAdded={fetchResumes} />
                {loading ? (
                    <p>Loading resumes...</p>
                ) : (
                    resumes.map(resume => (
                        <ResumeCardItem key={resume.resumeID} resume={resume} onDelete={fetchResumes} />
                    ))
                )}
            </div>
            <Footer/>
        </div>
    )
}

export default Dashboard