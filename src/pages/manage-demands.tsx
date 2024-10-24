import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Demand = {
  id: number;
  title: string;
  description: string;
  studentDeadline: string;
  advisorDeadline: string;
};

export default function ManageDemands() {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [newDemand, setNewDemand] = useState({
    title: "",
    description: "",
    studentDeadline: "",
    advisorDeadline: "",
  });

  useEffect(() => {
    // Fetch demands
    fetch("/api/demands")
      .then((res) => res.json())
      .then((data) => setDemands(data));
  }, []);

  const handleCreateDemand = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement demand creation logic
    console.log("Creating demand:", newDemand);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setDemands([...demands, { id: demands.length + 1, ...newDemand }]);
    setNewDemand({
      title: "",
      description: "",
      studentDeadline: "",
      advisorDeadline: "",
    });
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Manage Demands</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Demands</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {demands.map((demand) => (
                <li
                  key={demand.id}
                  className="flex justify-between items-center"
                >
                  <span>{demand.title}</span>
                  <span className="text-sm">
                    Student: {demand.studentDeadline}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Create New Demand</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateDemand} className="space-y-4">
              <Input
                placeholder="Demand Title"
                value={newDemand.title}
                onChange={(e) =>
                  setNewDemand({ ...newDemand, title: e.target.value })
                }
                required
              />
              <Textarea
                placeholder="Demand Description"
                value={newDemand.description}
                onChange={(e) =>
                  setNewDemand({ ...newDemand, description: e.target.value })
                }
                required
              />
              <Input
                type="date"
                placeholder="Student Deadline"
                value={newDemand.studentDeadline}
                onChange={(e) =>
                  setNewDemand({
                    ...newDemand,
                    studentDeadline: e.target.value,
                  })
                }
                required
              />
              <Input
                type="date"
                placeholder="Advisor Deadline"
                value={newDemand.advisorDeadline}
                onChange={(e) =>
                  setNewDemand({
                    ...newDemand,
                    advisorDeadline: e.target.value,
                  })
                }
                required
              />
              <Button type="submit">Create Demand</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
