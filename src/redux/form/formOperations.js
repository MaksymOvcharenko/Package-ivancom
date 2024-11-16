// formOperations.js
import {
  setSenderReceiverData,
  setParcelData,
  setSenderAddress,
  setDeliveryAddress,
  setStep,
} from "./formSlice";

export const saveSenderReceiverData = (data) => (dispatch) => {
  dispatch(setSenderReceiverData(data));
  dispatch(setStep(2)); // Перехід до наступного кроку
};

export const saveParcelData = (data) => (dispatch) => {
  dispatch(setParcelData(data));
  dispatch(setStep(3));
};

export const saveSenderAddress = (data) => (dispatch) => {
  dispatch(setSenderAddress(data));
  dispatch(setStep(4));
};

export const saveDeliveryAddress = (data) => (dispatch) => {
  dispatch(setDeliveryAddress(data));
  dispatch(setStep(5)); // Фінальний крок або підтвердження
};

export const goBack = () => (dispatch, getState) => {
  const currentStep = getState().form.step;
  if (currentStep > 1) {
    dispatch(setStep(currentStep - 1));
  }
};
