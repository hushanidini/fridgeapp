const API_URL = "https://thefridge-api.karapincha.io/fridge";

export const fetchItems = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const addItem = async (itemData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(itemData)
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteItem = async (itemId) => {
  try {
    const response = await fetch(`${API_URL}/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

