import HistoryTable from "../components/HistoryTable";

export default function HistoryPage() {
  return (
    <div>
      <div className="bg-[#F0F0F0] min-h-screen">
        <div className="pt-[80px] text-center mb-10">
          <h1 className="font-primary md:text-4xl text-xl text-[#4caf50] font-bold">History</h1>
        </div>
        <HistoryTable/>
      </div>  
    </div>
  );
}
