import { create } from "zustand";

interface ModalState {
  name: string;
  modalData: any;
  setModalData: (data: any) => void;
  openModal: (param: string) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  name: "",
  modalData: {},
  setModalData: (data) => set({ modalData: data }),
  openModal: (param) => set({ name: param }),
  closeModal: () => set({ name: "", modalData: {} }),
}));

export default useModalStore;
