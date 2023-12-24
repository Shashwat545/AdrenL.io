import { getHostById } from "@/app/actions/getHosts";
import isAdminAuthenticated from "@/app/actions/isAdminAuthenticated";
import axios from "axios";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import HostVerificationClient from "./HostVerificationClient";

const VerifyHost = async ({ params }) => {
  const isAdmin = await isAdminAuthenticated();
  if (!isAdmin) {
    return redirect("/superadmin/login");
  }

  const host = await getHostById(params.hostId);
  const leftTableData = [
    { label: 'Name', value: host?.user.name },
    { label: 'Email', value: host?.user.email },
    { label: 'Phone Number', value: host?.user.phoneNumber },
    { label: 'Verified', value: host?.verified ? 'Yes' : 'No' },
    { label: 'Address', value: host?.user.address },
  ];

  // Right table data
  const rightTableData = [
    { label: 'Account Number', value: host?.accountNo },
    { label: 'IFSC Code', value: host?.ifscCode },
    { label: 'Banking Name', value: host?.bankingName },
  ];

  // Random PDF URLs for demonstration purposes
  const pdfUrls = [
    host?.aadharCard,
    host?.panCard,
  ];

 

  return (
    <HostVerificationClient pdfUrls={pdfUrls} leftTableData={leftTableData} rightTableData={rightTableData} host={host}/>
  );
};

export default VerifyHost;
