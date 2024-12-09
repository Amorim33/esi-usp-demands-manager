import { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Implement logout logic
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Evaluation System</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-gray-100 text-gray-600">
        <div className="container mx-auto px-4 py-4 text-center">
          &copy; 2024 Evaluation System. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
