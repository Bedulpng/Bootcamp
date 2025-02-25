import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import axios from "axios";
  
  interface DeleteUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    fullName: string;
    id: string;
  }
  
  export function DeleteUserModal({
    isOpen,
    onClose,
    fullName,
    id,
  }: DeleteUserModalProps) {
    const onConfirm = async () => {
        try {
          // Send DELETE request to the backend to delete the user
          const response = await axios.delete(`http://10.10.103.248:4000/admin/user/${id}`);
      
          console.log("User deleted successfully:", response.data);
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
              Delete User
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete the user{" "}
            <strong className="font-bold">"{fullName}"</strong>? This action cannot be undone.
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
                Delete User
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  