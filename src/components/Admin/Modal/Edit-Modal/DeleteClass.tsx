import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import axios from "axios";
  const apiUrl = import.meta.env.VITE_API_URL;
  
  interface DeleteClassModalProps {
    isOpen: boolean;
    onClose: () => void;
    classTitle: string;
    id: string;
  }
  
  export function DeleteClassModal({
    isOpen,
    onClose,
    classTitle,
    id,
  }: DeleteClassModalProps) {
    const onConfirm = async () => {
        try {
          // Send DELETE request to the backend to delete the user
          await axios.delete(`http://${apiUrl}/admin/class/${id}`);
                onClose(); // Close the modal after successful deletion
        } catch (error) {
            if (axios.isAxiosError(error)) {
              // Handle Axios-specific error
              console.error("Axios error:", error.response?.data || error.message);
            } else if (error instanceof Error) {
              // Handle generic error
              console.error("Error:", error.message);
            } else {
              console.error("Unexpected error:", error);
            }
          }
        };
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold mb-4">
              Delete Class
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete class {" "}
            <strong className="font-bold">"{classTitle}"</strong>? This action cannot be undone.
          </p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={onConfirm}
              >
                Delete Class
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  