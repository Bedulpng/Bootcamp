"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchUsers } from "@/Api/FetchUsers";
import { fetchCB } from "@/Api/FetchingBatches&Classes";
import { Trainee, Batch, Class } from "@/types/Trainee";
import { jwtDecode } from "jwt-decode";

type CertificateFormData = {
  traineeId: string;
  classId: string;
  batchId: string;
  file: FileList;
};

interface CertificateModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function CertificateModal({ isOpen, setIsOpen }: CertificateModalProps) {
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [classes, setClasses] = useState<Class[]>([]); // Initialize classes as an empty array
  const [batches, setBatches] = useState<Batch[]>([]);

  const refreshToken = localStorage.getItem("refreshToken");
  const decodedToken: any = jwtDecode(refreshToken as string);
  const userId = decodedToken.id;


  useEffect(() => {
    const getUsers = async () => {
      try {
        const trainees = await fetchUsers();
        setTrainees(trainees);
      } catch (error) {
        console.error("Failed to fetch trainees:", error);
      } finally {
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const data = await fetchCB(userId);
          setClasses(data.classes); // Set fetched classes
          setBatches(data.batches); // Set fetched batches
        } catch (error) {
          console.error('Error fetching classes and batches:', error);
        }
      };

      fetchData();
    }
  }, [userId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CertificateFormData>();

  const onSubmit = async (data: CertificateFormData) => {
    try {
      const formData = new FormData();
      formData.append("traineeId", data.traineeId);
      formData.append("classId", data.classId);
      formData.append("batchId", data.batchId);
      formData.append("file", data.file[0]);

      // Replace this with your actual API endpoint
      const response = await fetch("/api/certificates", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Certificate posted successfully");
        setIsOpen(false);
        reset();
      } else {
        console.error("Failed to post certificate");
      }
    } catch (error) {
      console.error("Error posting certificate:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Post New Certificate</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="traineeId">Trainee</Label>
            <Select
              onValueChange={(value) =>
                register("traineeId").onChange({ target: { value } })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select trainee" />
              </SelectTrigger>
              <SelectContent>
                {trainees.map((trainee) => (
                  <SelectItem key={trainee.id} value={trainee.id}>
                    {trainee.fullName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.traineeId && (
              <p className="text-red-500 text-sm">Trainee is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="classId">Class</Label>
            <Select
              onValueChange={(value) =>
                register("classId").onChange({ target: { value } })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.className}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.classId && (
              <p className="text-red-500 text-sm">Class is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="batchId">Batch</Label>
            <Select
              onValueChange={(value) =>
                register("batchId").onChange({ target: { value } })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select batch" />
              </SelectTrigger>
              <SelectContent>
                {batches.map((batch) => (
                  <SelectItem key={batch.id} value={batch.id}>
                    {`${batch.batchNum} - ${batch.batchTitle}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.batchId && (
              <p className="text-red-500 text-sm">Batch is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Certificate File</Label>
            <Input
              type="file"
              id="file"
              {...register("file", { required: true })}
            />
            {errors.file && (
              <p className="text-red-500 text-sm">
                Certificate file is required
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Post Certificate
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
