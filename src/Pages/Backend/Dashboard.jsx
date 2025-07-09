import Card from "../../Components/Backend/Card";
import LineChart from "../../Components/Backend/LineChart";
import PieChart from "../../Components/Backend/PieChart";
import Rader from "../../Components/Backend/Rader";
import Sidebar from "../../Components/Backend/Sidebar";

export default function Dashboard() {
  return (
    <>
      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
        <p className="text-gray-700">
          This is your main dashboard content area.
        </p>
        <Card></Card>
        <LineChart></LineChart>
        <div className="lg:flex">
          <PieChart></PieChart>
          <Rader></Rader>
          
        </div>
      </main>
    </>
  );
}
