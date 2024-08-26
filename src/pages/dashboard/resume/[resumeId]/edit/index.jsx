import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import Dummy from "@/data/dummy";
import Navbar from "@/pages/dashboard/components/Navbar";


const EditResume = () => {
  const [resumeInfo, setResumeInfo] = useState();
  const params = useParams();

  useEffect(() => {
    setResumeInfo(Dummy)
  }, [params]);
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
        <Navbar/>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <FormSection />
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
