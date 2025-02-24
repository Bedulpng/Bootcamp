"use client";

import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
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
import { fetchTrainees } from "@/Api/FetchUsersByRole";
import { fetchCB } from "@/Api/FetchingBatches&Classes";
import { Trainee, Batch, Class } from "@/types/Trainee";

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
  const [traineeId, setTraineeId] = useState<string>("");
  const [classes, setClasses] = useState<Class[]>([]); // Initialize classes as an empty array
  const [batches, setBatches] = useState<Batch[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const trainees = await fetchTrainees();
        setTrainees(trainees);
      } catch (error) {
        console.error("Failed to fetch trainees:", error);
      } finally {
      }
    };

    getUsers();
  }, []);

  const handleSelectTrainee = (id: string) => {
    setTraineeId(id);
    console.log("Selected Trainee ID:", id); // Optional: log for debugging
  };

  useEffect(() => {
    if (traineeId) {
      const fetchData = async () => {
        try {
          const data = await fetchCB(traineeId);
          setClasses(data.classes); // Set fetched classes
          setBatches(data.batches);
        } catch (error) {
          console.error("Error fetching classes and batches:", error);
        }
      };

      fetchData();
    } else {
      setClasses([]); // Reset classes to an empty array
      setBatches([]);
    }
  }, [traineeId]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CertificateFormData>();

  const onSubmit = async (data: CertificateFormData) => {
    try {
      console.log("data: ", data);
      const formData = new FormData();
      formData.append("traineeId", data.traineeId);
      formData.append("classId", data.classId);
      formData.append("batchId", data.batchId);
      formData.append("certificate", data.file[0]);

      const response = await axios.post(
        "http://10.10.103.248:4000/uploads/certificate",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200 || response.status === 201) {
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
          {/* Trainee Field */}
          <div className="space-y-2">
            <Label htmlFor="traineeId">Trainee</Label>
            <Controller
              name="traineeId"
              control={control}
              rules={{ required: "Trainee is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleSelectTrainee(value);
                  }}
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
              )}
            />
            {errors.traineeId && (
              <p className="text-red-500 text-sm">{errors.traineeId.message}</p>
            )}
          </div>

          {/* Class Field */}
          <div className="space-y-2">
            <Label htmlFor="classId">Class</Label>
            <Controller
              name="classId"
              control={control}
              rules={{ required: "Class is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.length > 0 ? (
                      classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.className}
                        </SelectItem>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm px-4 py-2">
                        This trainee doesn't have a class yet
                      </p>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.classId && (
              <p className="text-red-500 text-sm">{errors.classId.message}</p>
            )}
          </div>

          {/* Batch Field */}
          <div className="space-y-2">
            <Label htmlFor="batchId">Batch</Label>
            <Controller
              name="batchId"
              control={control}
              rules={{ required: "Batch is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select batch" />
                  </SelectTrigger>
                  <SelectContent>
                    {batches.length > 0 ? (
                      batches.map((batch) => (
                        <SelectItem key={batch.id} value={batch.id}>
                          {`${batch.batchNum} - ${batch.batchTitle}`}
                        </SelectItem>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm px-4 py-2">
                        This trainee doesn't have a batch yet
                      </p>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.batchId && (
              <p className="text-red-500 text-sm">{errors.batchId.message}</p>
            )}
          </div>

          {/* Certificate File Field */}
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
