"use client"

import axios from "axios";
import toast from "react-hot-toast";
import { Host } from "@prisma/client";
import { useRouter } from "next/navigation";

interface TableItem {
  label: string;
  value: string | number | boolean | null | undefined;
}

interface HostVerificationClientProps {
  pdfUrls: (string | null | undefined)[];
  leftTableData: TableItem[];
  rightTableData: TableItem[];
  host: Host;
}

const HostVerificationClient:React.FC<HostVerificationClientProps> = async ({pdfUrls, leftTableData, rightTableData, host}) => {
    const router = useRouter();
    const handleSubmit = async (e: any) => {
        if(host?.isVerified) {
          toast.error("Already verified!");
        }
        axios.post('/api/hosting/verify', {hostId: host.id})
        .then(() =>{
            return toast.success("Host Verified");
        })
        .catch(() => {
            return toast.error("Something went wrong! Could not verify host");
        })
        .finally(() => {
          router.refresh();
        })
    }
    return(
        <div className="bg-gray-100 min-h-screen p-4">
        <h1 className="text-4xl font-bold mb-8">Host Details</h1>
  
        {/* Host Card */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Host Information</h2>
            {host?.isVerified ? null :<button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>Verify Host</button>}
          </div>
  
          <div className="flex space-x-8 mb-8">
            {/* Left Table */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
              <table className="w-full border-collapse border border-gray-300">
                <tbody>
                  {leftTableData.map((row, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2 font-semibold">{row.label}</td>
                      <td className="border border-gray-300 p-2">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
  
            {/* Right Table */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4">Account Details</h3>
              <table className="w-full border-collapse border border-gray-300">
                <tbody>
                  {rightTableData.map((row, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2 font-semibold">{row.label}</td>
                      <td className="border border-gray-300 p-2">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
  
          <div className="flex space-x-4">
            {pdfUrls.map((url, index) => (
              <div key={index} className="flex-1 bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">PDF Viewer {index + 1}</h3>
                <iframe
                  title={` ${index + 1}`}
                  src={url ?? ""}
                  width="100%"
                  height="400px"
                  frameBorder="0"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
}

export default HostVerificationClient;