import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_ENDPOINT } from '../../utils/constant'
import { toast } from 'sonner'


function CompanyCreate() {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("")
    const registerNewCompany = async() => {
        try {
           const res = await axios.post(`${COMPANY_API_ENDPOINT}/register`, {companyName}, {
            headers: {
                "Content-Type": "application/json",   
              },
            withCredentials: true
           })
           console.log("response of company creation", res);
           if(res.data.success) {
            toast.success(res.data.message);
            const CompanyId =res?.data?.company?._id;
            navigate(`/admin/companies/${CompanyId}`);
           }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
    <Navbar />
    <div className='max-w-4xl mx-auto'>
        <div className='my-10'>
            <h1 className='font-bold text-2xl'>Your Company Name</h1>
            <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
        </div>

        <Label>Company Name</Label>
        <Input
            type="text"
            className="my-2"
            placeholder="JobHunt, Microsoft etc."
            onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className='flex items-center gap-2 my-10'>
            <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
            <Button onClick={registerNewCompany}>Continue</Button>
        </div>
    </div>
</div>
  )
}

export default CompanyCreate