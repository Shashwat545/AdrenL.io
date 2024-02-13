'use client';

interface ContainerHomeProps {
    children: React.ReactNode;
}

const ContainerHome: React.FC<ContainerHomeProps> = ({children}) => {
    return (
        <div className="max-w-[2520px] mx-auto xl:px-8 md:px-4 sm:px-2 px-4">
            {children}
        </div>
    );
}

export default ContainerHome;