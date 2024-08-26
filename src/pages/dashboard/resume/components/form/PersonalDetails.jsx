import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from "@/Database/supabaseClient";
import { toast } from 'sonner';

const PersonalDetail = ({ enabledNext }) => {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [formData, setFormData] = useState({
    firstName: resumeInfo?.firstName || '',
    lastName: resumeInfo?.lastName || '',
    jobTitle: resumeInfo?.jobTitle || '',
    address: resumeInfo?.address || '',
    phone: resumeInfo?.phone || '',
    email: resumeInfo?.email || '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Initial resume info:", resumeInfo);
  }, [resumeInfo]);

  const handleInputChange = (e) => {
    enabledNext(true);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setResumeInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('User Resume')
        .update({
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          email: formData.email,
          phone: formData.phone,
          jobTitle: formData.jobTitle,
        })
        .eq('resumeID', params.resumeId);
      if (error) {
        throw error;
      }

      if (data) {
        console.log('Record updated:', data[0]);
        toast.success('Details updated successfully');
        enabledNext(true);
      }
    } catch (error) {
      console.error('Error updating data:', error);
      toast.error('Failed to update data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Personal Detail</h2>
      <p>Get Started with the basic information</p>

      <form onSubmit={onSave}>
        <div className='grid grid-cols-2 mt-5 gap-3'>
          <div>
            <label className='text-sm'>First Name</label>
            <Input
              name="firstName"
              value={formData.firstName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className='text-sm'>Last Name</label>
            <Input
              name="lastName"
              value={formData.lastName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className='col-span-2'>
            <label className='text-sm'>Job Title</label>
            <Input
              name="jobTitle"
              value={formData.jobTitle}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className='col-span-2'>
            <label className='text-sm'>Address</label>
            <Input
              name="address"
              value={formData.address}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className='text-sm'>Phone</label>
            <Input
              name="phone"
              value={formData.phone}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className='text-sm'>Email</label>
            <Input
              name="email"
              value={formData.email}
              required
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='mt-3 flex justify-end'>
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetail;
