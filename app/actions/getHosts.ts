import prisma from "@/app/libs/prismadb";

const getHosts = () => {
    try {
        const hosts = prisma?.host.findMany({
            include: {
                user: true
            }
        });
        return hosts;
    } catch (error) {
        return []; 
    }
};

const getVerifiedHosts = () => {
    try {
        const hosts = prisma?.host.findMany({
            where: {
                isVerified: true,
            },
            include: {
                user: true
            }
        });
        return hosts;
    } catch (error) {
        return [];
    }
};

const getUnverifiedHosts = () => {
    try {
        const hosts = prisma?.host.findMany({
            where: {
                isVerified: false
            },
            include: {
                user: true
            }
        });
        return hosts;
    } catch (error) {
        return [];
    }
};

const getHostById = (hostId: string) => {
    try {
        const host = prisma?.host.findUnique({
            where: {
                id: hostId
            },
            include: {
                user: true
            }
        });
        return host;
    }catch (error) {
        return [];
    }
};

export { getHosts, getVerifiedHosts, getUnverifiedHosts, getHostById };