import { Input } from '@/components/ui/input';
import { useContext, useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from "@/Database/supabaseClient";

const formField = {
  name: '',
  rating: 0,
};

function Skills() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [skillsList, setSkillsList] = useState(resumeInfo?.skills || [formField]);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, name, value) => {
    const newEntries = [...skillsList];
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  const AddNewSkills = () => {
    setSkillsList([...skillsList, { ...formField }]);
  };

  const RemoveSkills = () => {
    setSkillsList(skillsList.slice(0, -1));
  };

  const onSave = async () => {
    setLoading(true);
    try {
      const promises = skillsList.map(async (skill) => {
        const { error } = await supabase
          .from('User Resume')
          .upsert({
            resumeID: params.resumeId,
            name: skill.name,
            rating: skill.rating,
          }, { onConflict: ['resumeID'] });

          if (error) {
            throw error;
          }
        });

        await Promise.all(promises);
      toast.success('Skills updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
      toast.error('Failed to update skills');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    setResumeInfo(prevState => ({
      ...prevState,
      skills: skillsList,
    }));
  }, [skillsList, setResumeInfo]);

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Skills</h2>
      <p>Add Your top professional key skills</p>
      <div>
        {skillsList.map((item, index) => (
          <div key={index} className='flex justify-between mb-2 border rounded-lg p-3 '>
            <div>
              <label className='text-xs'>Name</label>
              <Input
                className="w-full"
                value={item.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v) => handleChange(index, 'rating', v)}
            />
          </div>
        ))}
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Button variant="outline" onClick={AddNewSkills} className="text-primary"> + Add More Skill</Button>
          <Button variant="outline" onClick={RemoveSkills} className="text-primary"> - Remove</Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  );
}

export default Skills;
