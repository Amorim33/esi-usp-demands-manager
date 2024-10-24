import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type User = {
  id: number;
  name: string;
  role: "STUDENT" | "ADVISOR" | "CCP";
};

type Report = {
  id: number;
  title: string;
  status: "PENDING" | "SUBMITTED" | "EVALUATED" | "UNSATISFACTORY";
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    // Fetch user data
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setUser(data));

    // Fetch reports data
    fetch("/api/reports")
      .then((res) => res.json())
      .then((data) => setReports(data));
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
            <CardTitle>Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {reports.map((report) => (
                <li
                  key={report.id}
                  className="flex justify-between items-center"
                >
                  <span>{report.title}</span>
                  <span className="text-sm font-medium">{report.status}</span>
                </li>
              ))}
            </ul>
            {user.role === "STUDENT" && (
              <Button className="mt-4" asChild>
                <Link href="/submit-report">Submit New Report</Link>
              </Button>
            )}
            {user.role === "ADVISOR" && (
              <Button className="mt-4" asChild>
                <Link href="/evaluate-reports">Evaluate Reports</Link>
              </Button>
            )}
            {user.role === "CCP" && (
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
