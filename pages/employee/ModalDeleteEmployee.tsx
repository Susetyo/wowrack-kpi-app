import { Modal, message } from "antd";
import useModalStore from "@/commons/store/modal";
import { useRouter } from "next/router";

const url_delete = "/api/employee/delete?id=";
const ModalDeleteEmployee = () => {
  const router = useRouter();
  const modalStore = useModalStore((state) => state);
  const onClickSubmit = async () => {
    try {
      const res = await fetch(`${url_delete}${modalStore?.modalData?.id}`, {
        method: "DELETE",
      });

      if (res?.status !== 200) {
        throw Error;
      }

      message.success("Delete employee Successfull !!!");
      modalStore.closeModal();
      router.push("/division");
    } catch (err) {
      message.error("Delete employee Failed !!!");
    }
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
