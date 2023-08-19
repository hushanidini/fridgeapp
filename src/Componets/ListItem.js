import React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ListItem = ({ item }) => {
  const expiryDate = moment(item.expiry);
  const isExpiringSoon = expiryDate.diff(moment(), "days") <= 30;
  const isExpired = expiryDate.isBefore(moment());

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
        {isExpired ? (
          <div className='delete-icon delete-icon--expired'>
            <FontAwesomeIcon icon={faTrash} />
          </div>
        ) : (
          <div className='delete-icon delete-icon--notexpired'>
            <FontAwesomeIcon icon={faTrash} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListItem;
