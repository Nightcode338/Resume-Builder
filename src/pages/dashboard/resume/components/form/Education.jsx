import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from "@/Database/supabaseClient";

const formField = {
  universityName: '',
  degree: '',
  major: '',
  startDate: '',
  endDate: '',
  description: '',
};

function Education() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [educationalList, setEducationalList] = useState(resumeInfo?.education || [formField]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event, index) => {
    const newEntries = [...educationalList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  const AddNewEducation = () => {
    setEducationalList([...educationalList, { ...formField }]);
  };

  const RemoveEducation = () => {
    setEducationalList(educationalList.slice(0, -1));
  };

  const onSave = async () => {
    setLoading(true);
    try {
      const promises = educationalList.map(async (education) => {
        const { error } = await supabase
          .from('User Resume')
          .upsert({
            resumeID: params.resumeId,
            universityName: education.universityName,
            degree: education.degree,
            major: education.major,
            // startDate: education.startDate,
            // endDate: education.endDate,
            description: education.description,
          }, { onConflict: ['resumeID'] });

        if (error) {
          throw error;
        }
      });

      await Promise.all(promises);
      toast.success('Education details updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
      toast.error('Failed to update education data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResumeInfo(prevState => ({
      ...prevState,
      education: educationalList,
    }));
  }, [educationalList, setResumeInfo]);

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Education</h2>
      <p>Add Your educational details</p>
      <div>
        {educationalList.map((item, index) => (
          <div key={index} className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
            <div className='col-span-2'>
              <label>University Name</label>
              <Input
                name="universityName"
                onChange={(e) => handleChange(e, index)}
                value={item?.universityName || ''}
              />
            </div>
            <div>
              <label>Degree</label>
              <Input
                name="degree"
                onChange={(e) => handleChange(e, index)}
                value={item?.degree || ''}
              />
            </div>
            <div>
              <label>Major</label>
              <Input
                name="major"
                onChange={(e) => handleChange(e, index)}
                value={item?.major || ''}
              />
            </div>
            <div>
              <label>Start Date</label>
              <Input
                type="date"
                name="startDate"
                onChange={(e) => handleChange(e, index)}
                value={item?.startDate || ''}
              />
            </div>
            <div>
              <label>End Date</label>
              <Input
                type="date"
                name="endDate"
                onChange={(e) => handleChange(e, index)}
                value={item?.endDate || ''}
              />
            </div>
            <div className='col-span-2'>
              <label>Description</label>
              <Textarea
                name="description"
                onChange={(e) => handleChange(e, index)}
                value={item?.description || ''}
              />
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Button variant="outline" onClick={AddNewEducation} className="text-primary"> + Add More Education</Button>
          <Button variant="outline" onClick={RemoveEducation} className="text-primary"> - Remove</Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  );
}

export default Education;
