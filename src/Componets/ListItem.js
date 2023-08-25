import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteFridgeItem } from "../store/fridgeSlice";

const ListItem = ({ item }) => {
  const dispatch = useDispatch();
  const expiryDate = moment(item.expiry);
  const isExpiringSoon = expiryDate.diff(moment(), "days") <= 30;
  const isExpired = expiryDate.isBefore(moment());

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteFridgeItem(item._id));
    }
  };

  return (
    <div className='list-item'>
      <div className='column1'>
        <b>{item?.title}</b>
      </div>
      <div className='column2'>
        Expire Date - {moment(item?.expiry).format("YYYY/MM/DD")}
      </div>
      <div className='column3'>
        {isExpired ? (
          <span className='label label--expired'>Expired</span>
        ) : isExpiringSoon ? (
          <span className='label label--expiring-soon'>Expiring Soon</span>
        ) : (
          <span className='label label--healthy'>Healthy</span>
        )}
      </div>
      <div className='column4'>
        <div
          className={
            isExpired
              ? "delete-icon delete-icon--expired"
              : "delete-icon delete-icon--notexpired"
          }
          onClick={handleDelete}
        >
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
    </div>
  );
};

export default ListItem;
