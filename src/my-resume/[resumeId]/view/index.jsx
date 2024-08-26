import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '../../../pages/dashboard/resume/components/ResumePreview'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RWebShare } from 'react-web-share'
import { supabase } from "@/Database/supabaseClient";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState(null);
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, [resumeId])

  const GetResumeInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('User Resume')
        .select('*')
        .eq('resumeID', resumeId)
        .single();

      if (error) throw error;

      console.log('Resume data:', data);
      setResumeInfo(data);
    } catch (error) {
      console.error('Error fetching resume:', error.message);
    }
  }

  const HandleDownload = () => {
    window.print();
  }

  if (!resumeInfo) {
    return <div>Loading...</div>;
  }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}} >
      <div id="no-print">
        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
          <h2 className='text-center text-2xl font-medium'>
            Congrats! Your Ultimate AI generated Resume is ready!
          </h2>
          <p className='text-center text-gray-400'>
            Now you are ready to download your resume and you can share unique resume url with your friends and family
          </p>
          <div className='flex justify-between px-44 my-10'>
            <Button onClick={HandleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Hello Everyone, This is my resume please open url to see it",
                url: `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeId}/view`,
                title: `${resumeInfo.firstName} ${resumeInfo.lastName} resume`,
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <div id="print-area" >
          <ResumePreview/>
        </div>
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume