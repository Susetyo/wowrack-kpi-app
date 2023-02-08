import { Modal, message } from "antd";
import useModalStore from "@/commons/store/modal";

const ModalDeleteEmployee = () => {
  const modalStore = useModalStore((state) => state);
  const onClickSubmit = () => {
    message.success("Success delete employee");
    modalStore.closeModal();
  };

  return (
    <Modal
      title="Are you sure delete this employee?"
      open={modalStore?.name === "modal-delete-employee"}
      onOk={onClickSubmit}
      onCancel={modalStore.closeModal}
    >
      <p>
        All the <b>Employee record</b> will be <b>deleted</b> permanently and{" "}
        {`can't `}
        restore
      </p>
    </Modal>
  );
};

export default ModalDeleteEmployee;
