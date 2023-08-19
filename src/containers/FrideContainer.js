import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsStart, fetchItemsSuccess } from "../store/fridgeSlice";
import { fetchItems } from "../utils/api";
import FriForm from "../Componets/FriForm";
import LoadingSpinner from "../Componets/LoadingSpinner";
import ListItem from "../Componets/ListItem";

const FrideContainer = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.fridge);

  const [insertedFrides, setInsertedFrides] = useState(items);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchItemsStart()); // Start fetching, set loading to true
      try {
        const data = await fetchItems(); // Fetch data using your fetchItems function
        dispatch(fetchItemsSuccess(data)); // Update the store with fetched data
        setInsertedFrides(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, [dispatch]);

  // const sortedItemArray = insertedFrides
  //   .map((item) => ({ ...item }))
  //   .sort((a, b) => moment(b.createdAt) - moment(a.createdAt));

  return (
    <div className='container'>
      <div className='content-container'>
        <div className='form-section'>
          {/* form componet  */}
          <FriForm
            setInsertedFrides={setInsertedFrides}
            insertedFrides={insertedFrides}
          />
        </div>

        {/* item list componet  */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className='item-section'>
            <div className='item-section-content'>
              <p>
                <b>Total Items - {insertedFrides?.length}</b>
              </p>

              {insertedFrides.map((item) => (
                <ListItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default FrideContainer;
