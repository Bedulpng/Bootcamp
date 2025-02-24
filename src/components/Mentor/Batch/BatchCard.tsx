    import { useState } from "react";
    import { Button } from "@/components/ui/button";
    import { Card, CardContent } from "@/components/ui/card";
    import { Settings } from "lucide-react";
    import { useNavigate } from "react-router-dom";
    import { Batch } from "@/types/Trainee";
    import { BatchCover } from "./BatchCover";
    import { ColorPickerModal } from "./EditCover";
    import { ImageCropModal } from "./ImageCrop";

    interface BatchCardsProps {
    batches: Batch[];
    }

    export default function BatchCards({ batches }: BatchCardsProps) {
    const navigate = useNavigate();
    const [isEditCoverOpen, setIsEditCoverOpen] = useState(false);
    const [editingBatchId, setEditingBatchId] = useState<string | null>(null);
    const [isImageCropOpen, setIsImageCropOpen] = useState(false);
    const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);

    // Handle image upload before cropping
    const handleImageUpload = (file: File) => {
        const imageUrl = URL.createObjectURL(file);
        setTempImageUrl(imageUrl);
        setIsImageCropOpen(true);
    };

    const handleCropComplete = () => {
        setIsEditCoverOpen(false);
        setIsImageCropOpen(false);
    };

    return (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {batches.map((batch) => (
            <Card
            key={batch.id}
            onClick={async () => {
                try {
                const response = await fetch(
                    `http://10.10.103.248:4000/admin/batchs/${batch.id}`
                );
                if (!response.ok) {
                    throw new Error(`Failed to fetch batch with ID: ${batch.id}`);
                }
                const data = await response.json();
                console.log("Fetched batch:", data);
                navigate(`/dashboard/class/${batch.id}`, {
                    state: { batchData: data },
                });
                } catch (error) {
                console.error(
                    "Error fetching batch:",
                    error instanceof Error ? error.message : error
                );
                }
            }}
            className="cursor-pointer relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
            {/* Batch Cover */}
            <BatchCover
                batchTitle={batch.batchTitle}
                coverImage={batch.cover?.filePath}
            />

            {/* Card Content */}
            <CardContent className="p-4 bg-white flex flex-col gap-3">
                <p className="text-sm font-semibold">{batch.batchTitle}</p>
                <p className="text-sm text-muted-foreground">{batch.batchDesc}</p>
            </CardContent>

            {/* Settings Button */}
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 bg-white shadow-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                e.stopPropagation();
                setEditingBatchId(batch.id); // Set the selected batch for editing
                setIsEditCoverOpen(true);
                }}
            >
                <Settings className="h-4 w-4 text-gray-700" />
            </Button>
            </Card>
        ))}

        {/* Edit Cover Modal */}
        {isEditCoverOpen && editingBatchId && (
            <ColorPickerModal
            isOpen={isEditCoverOpen}
            onClose={() => {
                setIsEditCoverOpen(false);
                setEditingBatchId(null);
            }}
            onImageUpload={handleImageUpload}
            currentCoverImage={
                batches.find((b) => b.id === editingBatchId)?.cover?.filePath || ""
            }
            batchTitle={
                batches.find((b) => b.id === editingBatchId)?.batchTitle || ""
            }
            batchId={editingBatchId}
            />
        )}

        {isImageCropOpen && tempImageUrl && (
            <ImageCropModal
            isOpen={isImageCropOpen}
            onClose={() => setIsImageCropOpen(false)}
            imageUrl={tempImageUrl}
            onCropComplete={handleCropComplete}
            batchId={batches.find((c) => c.id === editingBatchId)?.id || ""}
            />
        )}
        </div>
    );
    }
