import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSession } from "@/lib/session";

type User = {
  id: number;
  name: string;
  role: "STUDENT" | "ADVISOR" | "ADMIN";
};

type Report = {
  id: number;
  title: string;
  status: "PENDING" | "SUBMITTED" | "EVALUATED" | "UNSATISFACTORY";
};

type Demand = {
  id: number;
  title: string;
  description: string;
  studentDeadline: string;
  advisorDeadline: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [demands, setDemands] = useState<Demand[]>([]);

  useEffect(() => {
    const user = JSON.parse(getSession() || "{}");

    fetch(`/api/demands`)
      .then((res) => res.json())
      .then((data) => {
        setDemands(data);
      });

    setUser(user);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Demands</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {demands.map((demand) => (
                <li
                  key={demand.id}
                  className="flex justify-between items-center"
                >
                  <span>{demand.title}</span>
                  <span className="text-sm font-medium">
                    {demand.studentDeadline}
                  </span>

                  <Button className="mt-4" asChild>
                    <Link href="/submit-report">Submit New Report</Link>
                  </Button>
                </li>
              ))}
            </ul>
            {user.role === "ADMIN" && (
              <Button className="mt-4" asChild>
                <Link href="/manage-demands">Manage Demands</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
