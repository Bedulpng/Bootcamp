'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios from 'axios'


type FormData = {
  fullName: string
  nickname: string
  address: string
  mobile: string
  profileFilePath: string
  profileMimeType: string
  profileSize: number
}

type UserModalFormProps = {
    open: boolean
    setOpen: (open: boolean) => void
    id: string;
    fullName: string;
}

export default function UserModalEdit({ open, setOpen, id, fullName }: UserModalFormProps) {
  const form = useForm<FormData>({
    defaultValues: {
      fullName: '',
      nickname: '',
      address: '',
      mobile: '',
    },
  }) // State to store selected role

  const onSubmit = async (data: FormData) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken'); // Get the refresh token from localStorage
  
      if (!refreshToken) {
        console.error('No refresh token found');
        return;
      }
  
      // Sending the PUT request with the form data and authorization header
      const response = await axios.put(
       `http://192.168.254.104:4000/trainee/edit/${id}`,
        {
          fullName: data.fullName,
          nickname: data.nickname,
          address: data.address,
          mobile: data.mobile,
          profileFilePath: data.profileFilePath, // Optional: file path for profile
          profileMimeType: data.profileMimeType, // Optional: MIME type of the profile file
          profileSize: data.profileSize,         // Optional: size of the profile file
        },
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`, // Add refresh token to the Authorization header
          },
        }
      );
  
      console.log('User information updated successfully:', response.data);
      setOpen(false); // Close the modal or reset the form
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className='mb-4'>Edit {fullName}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter User Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter user address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile</FormLabel>
                  <FormControl>
                    <Input placeholder="+62-8**" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2">
              <Button type="submit" className="w-full">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )

}
