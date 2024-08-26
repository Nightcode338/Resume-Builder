import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import PersonalDetails from '../components/form/PersonalDetails';
import Summary from '../components/form/Summary';
import Experience from '../components/form/Experience';
import Education from '../components/form/Education';
import Skills from '../components/form/Skills';
import { ToastContainer } from 'react-toastify';

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const { resumeId } = useParams();

  const handleNext = () => {
    if (enableNext) {
      setActiveFormIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setActiveFormIndex(prev => prev - 1);
  };

  const renderFormSection = () => {
    switch (activeFormIndex) {
      case 1:
        return <PersonalDetails enabledNext={setEnableNext} />;
      case 2:
        return <Summary enabledNext={setEnableNext} />;
      case 3:
        return <Experience />;
      case 4:
        return <Education />;
      case 5:
        return <Skills />;
      case 6:
        return <Navigate to={`/my-resume/${resumeId}/view`} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <ToastContainer />

      <div className='flex justify-between items-center'>
        <div className='flex gap-5'>
          <Link to="/dashboard">
            <Button className="bg-[#8910F1]"><Home /></Button>
          </Link>
        </div>
        <div className='flex gap-2'>
          {activeFormIndex > 1 && (
            <Button size="sm" onClick={handlePrevious} className="bg-[#8910F1] hover:bg-[#a247f3]">
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2 bg-[#8910F1] hover:bg-[#a247f3]"
            size="sm"
            onClick={handleNext}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {renderFormSection()}
    </div>
  );
};

export default FormSection;