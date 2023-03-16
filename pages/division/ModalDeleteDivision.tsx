import { Modal, message } from "antd";
import useModalStore from "@/commons/store/modal";
import { useRouter } from "next/router";
const url_delete = "/api/division/delete?id=";

const ModalDeleteDivision = () => {
  const modalStore = useModalStore((state) => state);
  const route = useRouter();
  const onClickSubmit = async () => {
    try {
      const res = await fetch(`${url_delete}${modalStore?.modalData?.id}`, {
        method: "DELETE",
      });

      if (res?.status !== 200) {
        throw Error;
      }

      message.success("Delete Division Successfull !!!");
      modalStore.closeModal();
      route.push("/division");
    } catch (err) {
      message.error("Delete Division Failed !!!");
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

export default ModalDeleteDivision;
