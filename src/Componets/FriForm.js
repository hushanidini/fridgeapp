import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addFridgeItem } from "../store/fridgeSlice";

const schema = yup.object().shape({
  itemName: yup.string().required("Item Name is required"),
  expiryDate: yup.date().required("Expiry date is required")
});

const FriForm = (props) => {
  const { setInsertedFrides, insertedFrides } = props;
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  // include data onSubmit
  const onSubmit = async (data) => {
    const submitData = {
      title: data?.itemName,
      expiry: data?.expiryDate
    };
    if (submitData) {
      dispatch(addFridgeItem(submitData)).then((res) => {
        if (res?.payload) {
          setInsertedFrides([...insertedFrides, res?.payload]);
          alert("successfully added !.");
          reset();
        }
      });
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <div className='form-field'>
        <label>Item Name</label>
        <input
          type='text'
          {...register("itemName")}
          placeholder='Item Name'
          className={errors && errors.itemName ? "error" : ""}
        />
        {errors && errors.itemName && (
          <p className='error-message'>{errors.itemName.message}</p>
        )}
      </div>

      <div className='form-field'>
        <label>Expiry Date</label>
        <input
          type='date'
          {...register("expiryDate")}
          placeholder='Expiry Date'
          className={errors && errors.expiryDate ? "error" : ""}
        />
        {errors && errors.expiryDate && (
          <p className='error-message'>{errors.expiryDate.message}</p>
        )}
      </div>
      <div className='form-field'>
        <button type='submit'>Add To Fride</button>
      </div>
    </form>
  );
};

export default FriForm;
