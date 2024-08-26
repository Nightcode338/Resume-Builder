import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import { supabase } from "@/Database/supabaseClient";
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'

const formField = {
  titles: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummary: '',
}

function Experience() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [experienceList, setExperienceList] = useState(resumeInfo?.Experience || []);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, event) => {
    const newEntries = [...experienceList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  }

  const AddNewExperience = () => {
    setExperienceList([...experienceList, { ...formField }]);
  }

  const RemoveExperience = () => {
    setExperienceList(experienceList.slice(0, -1));
  }

  const handleRichTextEditor=(e,name,index)=>{
    const newEntries=experienceList.slice();
    newEntries[index][name]=e.target.value;
  
    setExperienceList(newEntries);
}

  useEffect(() => {
    setResumeInfo(prevState => ({
      ...prevState,
      Experience: experienceList
    }));
  }, [experienceList, setResumeInfo]);

  const onSave = async () => {
    setLoading(true);
    try {
      const promises = experienceList.map(async (experience) => {
        const { error } = await supabase
          .from('User Resume')
          .upsert({
            resumeID: params.resumeId,
            companyName: experience.companyName,
            titles: experience.titles,
            city: experience.city,
            state: experience.state,
            startDate: experience.startDate,
            endDate: experience.endDate,
            workSummary: experience.workSummary,
          }, { onConflict: ['resumeID'] });

        if (error) {
          throw error;
        }
      });

      await Promise.all(promises);
      toast.success('Experience details updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
      toast.error('Failed to update experience data');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index} className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
              <div>
                <label className='text-xs'>Position Title</label>
                <Input
                  name="titles"
                  onChange={(event) => handleChange(index, event)}
                  value={item?.titles || ''}
                />
              </div>
              <div>
                <label className='text-xs'>Company Name</label>
                <Input
                  name="companyName"
                  onChange={(event) => handleChange(index, event)}
                  value={item?.companyName || ''}
                />
              </div>
              <div>
                <label className='text-xs'>City</label>
                <Input
                  name="city"
                  onChange={(event) => handleChange(index, event)}
                  value={item?.city || ''}
                />
              </div>
              <div>
                <label className='text-xs'>State</label>
                <Input
                  name="state"
                  onChange={(event) => handleChange(index, event)}
                  value={item?.state || ''}
                />
              </div>
              <div>
                <label className='text-xs'>Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(event) => handleChange(index, event)}
                  value={item?.startDate || ''}
                />
              </div>
              <div>
                <label className='text-xs'>End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(event) => handleChange(index, event)}
                  value={item?.endDate || ''}
                />
              </div>
              <div className='col-span-2'>
              <RichTextEditor
                           index={index}
                           defaultValue={item?.workSummary}
                           onRichTextEditorChange={(event)=>handleRichTextEditor(event,'workSummary',index)}  />
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More Experience</Button>
            <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button>
          </div>
          <Button disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Experience
