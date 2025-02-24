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
import { useState, useEffect } from 'react'


type FormData = {
  email: string
  mobile: string
  dob: string
  pob: string
  password: string
  role: string
}

type UserModalFormProps = {
    open: boolean
    setOpen: (open: boolean) => void
}

export default function UserModalForm({ open, setOpen }: UserModalFormProps) {
  const [roles, setRoles] = useState<string[]>([])  // State to store roles
  const [selectedRole, setSelectedRole] = useState<string>('') 
  const form = useForm<FormData>({
    defaultValues: {
      email: '',
      mobile: '',
      dob: '',
      pob: '',
      password: '',
      role: ''
    },
  }) // State to store selected role

  // Fetch roles when component mounts
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://10.10.103.248:4000/admin/role/roles')
        setRoles(response.data.roles)  // Assuming the response has a roles array
      } catch (error) {
        console.error('Failed to fetch roles:', error)
      }
    }

    fetchRoles()
  }, [])

  const onSubmit = async (data: FormData) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken') // Get the refresh token from localStorage

      if (!refreshToken) {
        console.error('No refresh token found')
        return
      }

      // Sending the POST request with the form data and authorization header
      const response = await axios.post(
        'http://10.10.103.248:4000/admin/create-user',
        {
          email: data.email,
          dob: data.dob,
          pob: data.pob,
          mobile: data.mobile,
          password: data.password, 
          role: data.role,           
        },
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`, // Add refresh token to the Authorization header
          },
        }
      )

      console.log('User created successfully:', response.data)
      setOpen(false)
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className='mb-4'>Add New User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter valid email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input placeholder="YYYY-MM-DD" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place of Birth</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Bandung" {...field} />
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
                  <FormLabel>Mobile Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+62-08XX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Set User Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <div>
                      {roles.length > 0 ? (
                        roles.map((role, index) => (
                          <label key={index} className="flex items-center mb-2">
                            <input
                              type="radio"
                              name="role"
                              value={role}
                              checked={selectedRole === role}
                              onChange={() => {
                                setSelectedRole(role) 
                                field.onChange(role)  
                              }}
                              className="mr-2"
                            />
                            {role}
                          </label>
                        ))
                      ) : (
                        <p>Loading roles...</p>
                      )}
                    </div>
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
