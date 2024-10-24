import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/router";

type Report = {
  id: number;
  title: string;
  content: string;
  studentName: string;
};

export default function EvaluateReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [evaluation, setEvaluation] = useState("");
  const [status, setStatus] = useState<
    "ADEQUATE" | "ADEQUATE_WITH_RESERVATIONS" | "UNSATISFACTORY"
  >("ADEQUATE");
  const router = useRouter();

  useEffect(() => {
    // Fetch reports to evaluate
    fetch("/api/reports-to-evaluate")
      .then((res) => res.json())
      .then((data) => setReports(data));
  }, []);

  const handleSubmitEvaluation = async () => {
    if (!selectedReport) return;

    // TODO: Implement evaluation submission logic
    console.log("Submitting evaluation:", {
      reportId: selectedReport.id,
      evaluation,
      status,
    });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setReports(reports.filter((report) => report.id !== selectedReport.id));
    setSelectedReport(null);
    setEvaluation("");
    setStatus("ADEQUATE");
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Evaluate Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Reports to Evaluate</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {reports.map((report) => (
                <li key={report.id}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setSelectedReport(report)}
                  >
                    {report.title} - {report.studentName}
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        {selectedReport && (
          <Card>
            <CardHeader>
              <CardTitle>{selectedReport.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{selectedReport.content}</p>
              <Textarea
                placeholder="Enter your evaluation"
                value={evaluation}
                onChange={(e) => setEvaluation(e.target.value)}
                rows={5}
              />
              <Select
                value={status}
                onValueChange={(
                  value:
                    | "ADEQUATE"
                    | "ADEQUATE_WITH_RESERVATIONS"
                    | "UNSATISFACTORY"
                ) => setStatus(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADEQUATE">Adequate</SelectItem>
                  <SelectItem value="ADEQUATE_WITH_RESERVATIONS">
                    Adequate with Reservations
                  </SelectItem>
                  <SelectItem value="UNSATISFACTORY">Unsatisfactory</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleSubmitEvaluation}>
                Submit Evaluation
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
