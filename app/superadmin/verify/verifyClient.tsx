'use client';

import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, Typography, Button, CardBody, CardFooter, Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import TableRow from "./tableRow";
import { useState } from "react";
import { Host, User } from "@prisma/client";
import { format } from "date-fns";

const TABS = [
    {
        label: "All Hosts",
        value: "all"
    },
    {
        label: "Verified",
        value: "verified"
    },
    {
        label: "Not Verified",
        value: "notVerified"
    }
];

const TABLE_HEAD = ["Host", "Details", "Status", "KYC Verification Date", "More Info"];

interface HostsIncludeProps extends Host {
    user?: User | undefined;
}

interface VerifyClientProps {
    verifiedHosts: HostsIncludeProps[];
    notVerifiedHosts: HostsIncludeProps[];
    hosts: HostsIncludeProps[];
}

const VerifyClient: React.FC<VerifyClientProps> = async ({ verifiedHosts, notVerifiedHosts, hosts }) => {
    const [activeTab, setActiveTab] = useState<string>("all");

    const getData = (activeTab: any) => {
        if (activeTab === "all") {
            return hosts;
        } else if (activeTab === "verified") {
            return verifiedHosts;
        } else if (activeTab === "notVerified") {
            return notVerifiedHosts;
        } else {
            return [];
        }
    };

    const TABLE_ROWS: HostsIncludeProps[] = await getData(activeTab);

    return (
        <>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Hosts list
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Check out information about all the hosts and approve their KYC from here.
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs value="all" className="w-full md:w-max">
                            <TabsHeader className="min-w-[372px]">
                                {TABS.map(({ label, value }) => (
                                    <Tab key={value} value={value} onClick={() => setActiveTab(value)}>
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                        {/* <div className="w-full md:w-72">
                                <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} crossOrigin="" />
                        </div> */}
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, index) => (
                                    <th key={head} className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                                            {head}{" "}
                                            {index !== TABLE_HEAD.length - 1 && (
                                                <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                            )}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {TABLE_ROWS?.map((data) => {
                                return (
                                    <TableRow key={data.id} img={data?.user?.image ?? ""} name={data?.user?.name ?? ""} email={data?.user?.email ?? ""}
                                    verified={data?.isVerified ?? false} date={format(data?.verificationDate ?? new Date(), 'dd-MM-yyyy') ?? ""} id={data?.id ?? ""} />
                                );
                            })}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </>
    );
};

export default VerifyClient;