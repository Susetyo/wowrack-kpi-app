import { Modal, Input } from "antd";
import useModalStore from "@/commons/store/modal";

const ModalInsertUpdateDivision = () => {
  const store = useModalStore((state) => state);
  const onOK = () => {
    console.log("fetch", store?.modalData);
  };
  return (
    <Modal
      title={store?.modalData?.modalTitle}
      open={store?.name === "modal-insert-update-division"}
      onOk={onOK}
      okText={store?.modalData?.okText}
      onCancel={store?.closeModal}
    >
      <div>
        <div className="my-2">Division title</div>
        <Input
          onChange={(env) => {
            store.setModalData({
              ...store?.modalData,
              title: env?.target.value,
            });
          }}
          placeholder="Input Division ID"
        />
      </div>
    </Modal>
  );
};

export default ModalInsertUpdateDivision;
