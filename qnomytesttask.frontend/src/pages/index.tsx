import ClientsInLine from "@/components/clientsInLine";
import ClientsInService from "@/components/clientsInService";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <title>Q-nomy test task</title>
      <Navbar />

      {/* Main content */}
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <ClientsInService />
        <ClientsInLine />
      </div>
    </div>
  );
}