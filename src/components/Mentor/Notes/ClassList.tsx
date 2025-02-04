import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Class } from "../../../types/Trainee";

type ClassListProps = {
  classes: Class[];
  onSelectClass: (cls: Class) => void;
};

export default function ClassList({ classes, onSelectClass }: ClassListProps) {
  return (
    <div className="flex flex-col mb-8">
      <h2 className="text-2xl font-semibold mb-6">Classes</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => (
          <Card key={cls.id} className="w-64 aspect-square flex flex-col justify-between items-center">
            <CardContent className="p-6 flex flex-col items-center justify-center h-full">
              <h3 className="font-semibold text-lg flex-grow flex items-center justify-center">{cls.className}</h3>
              <Button className="mt-4 w-full" onClick={() => onSelectClass(cls)}>
                Select Class
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
