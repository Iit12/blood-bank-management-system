import { useState } from 'react';
import * as XLSX from 'xlsx';

const Reports = () => {
  const [reportType, setReportType] = useState('inventory');

  const exportToExcel = () => {
    let data = [];

    if (reportType === 'inventory') {
      data = [
        { BagID: "BAG-001", BloodGroup: "O+", Quantity: 350, ExpiryDate: "2026-06-20", Status: "Available" },
        { BagID: "BAG-002", BloodGroup: "A+", Quantity: 350, ExpiryDate: "2026-06-15", Status: "Available" },
      ];
    } else if (reportType === 'donors') {
      data = [
        { DonorID: "DON-001", Name: "Rahul Sharma", BloodGroup: "O+", Phone: "9876543210", LastDonation: "2026-04-10" },
      ];
    } else {
      data = [
        { RequestID: "REQ-001", Hospital: "City Hospital", BloodGroup: "O+", Quantity: 350, Status: "Pending" },
      ];
    }

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, reportType.toUpperCase());
    XLSX.writeFile(wb, `${reportType}_report.xlsx`);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Reports & Analytics</h1>
      <p className="text-gray-600 mb-8">Generate and export detailed reports</p>

      <div className="flex gap-4 mb-10">
        {['inventory', 'donors', 'requests'].map((t) => (
          <button
            key={t}
            onClick={() => setReportType(t)}
            className={`px-8 py-4 rounded-2xl font-medium transition ${reportType === t ? 'bg-red-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
        <h3 className="text-2xl font-semibold mb-6">Generate {reportType.toUpperCase()} Report</h3>
        <button
          onClick={exportToExcel}
          className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 rounded-3xl text-xl font-semibold transition-all active:scale-95"
        >
          📥 Download Excel Report
        </button>
        <p className="text-gray-500 mt-6">File will be downloaded automatically</p>
      </div>
    </div>
  );
};

export default Reports;