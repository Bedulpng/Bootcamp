import { Input } from "@/components/ui/input"

type TraineeSearchProps = {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export default function TraineeSearch({ searchTerm, setSearchTerm }: TraineeSearchProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Search Trainees</h2>
      <Input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}

