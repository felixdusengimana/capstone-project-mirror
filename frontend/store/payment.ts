import {create} from 'zustand';
import {persist} from 'zustand/middleware';


interface PaymentStoreState {
    amount: number;
    currency: string;
    paymentProvider: string;
    phoneNumber: string;
    note: string;
    creatorUserName: string;
    createFullName?: string;
    donorUserName: string;
    email?: string;
    name?: string;
}

interface PaymentStoreActions {
    setPaymentDetails: (details: Partial<PaymentStoreState>) => void;
    setPhoneNumber: (phoneNumber: string) => void;
    clear: () => void;
}

export const usePaymentStore = create<PaymentStoreState & PaymentStoreActions>()(
  persist(
    (set) => ({
      amount: 0,
      currency: "",
      paymentProvider: "",
      phoneNumber: "",
      note: "",
      creatorUserName: "",
      donorUserName: "",
      setPaymentDetails: (details) => set((state) => ({ ...state, ...details })),
      setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
      clear: ()=>{
        set({
          amount: 0,
          currency: "",
          paymentProvider: "",
          phoneNumber: "",
          note: "",
          creatorUserName: "",
          donorUserName: "",
        });

        if(typeof window !== "undefined") {
          localStorage.removeItem("payment-storage");
        }
      }
    }),
    {
      name: "payment-storage", 
    }
  )
);