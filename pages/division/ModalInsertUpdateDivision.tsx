import { Modal, Input, message } from "antd";
import useModalStore from "@/commons/store/modal";
import { useRouter } from "next/router";

const url_put = "/api/division/edit?id=";
const url_post = "/api/division/create";

const ModalInsertUpdateDivision = () => {
  const store = useModalStore((state) => state);
  const route = useRouter();
  const onOK = async () => {
    try {
      let res: any;
      if (store?.modalData?.isEdit) {
        res = await fetch(`${url_put}${store?.modalData?.id}`, {
          method: "PUT",
          body: JSON.stringify({ title: store?.modalData?.title }),
        });
      } else {
        res = await fetch(url_post, {
          method: "POST",
          body: JSON.stringify({ title: store?.modalData?.title }),
        });
      }

      if (res?.status !== 200) {
        throw Error;
      }

      message.success(
        `${
          store?.modalData?.isEdit ? "Edit" : "Insert"
        } Division Successfull !!!`
      );
      store.closeModal();
      route.push("/division");
    } catch (err) {
      message.error(
        `${store?.modalData?.isEdit ? "Edit" : "Insert"} Division Failed !!!`
      );
    }
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
          value={store?.modalData?.title ? store?.modalData?.title : ""}
          onChange={(env) => {
            store.setModalData({
              ...store?.modalData,
              title: env?.target.value,
            });
          }}
          placeholder="Input Division Title"
        />
      </div>
    </Modal>
  );
};

export default ModalInsertUpdateDivision;
