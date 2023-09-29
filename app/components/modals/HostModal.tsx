import useHostModal from "@/app/hooks/useHostModal";
import Modal from "./Modal";

const HostModal = () => {
    const HostModalHook=useHostModal();
    return (
        <Modal isOpen={HostModalHook.isOpen} onClose={HostModalHook.onClose} onSubmit={HostModalHook.onClose} actionLabel="Submit" title="Host your adventure!"/>
    )
};

export default HostModal;