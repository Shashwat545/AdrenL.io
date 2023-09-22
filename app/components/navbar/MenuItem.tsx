'use client';

interface MenuItemProps {
    onClick: () => void;
    label: String;
    fontSemiBold?: boolean;
    fontBold?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({onClick, label, fontSemiBold, fontBold}) => {
    return (
        <div onClick={onClick} className={`px-4 py-3 hover:bg-neutral-100 transition ${fontSemiBold?"font-semibold":""}
         ${fontBold?"font-bold":""}`}>
            {label}
        </div>
    );
}

export default MenuItem;