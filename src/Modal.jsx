import React, { useMemo, useState, useContext, useEffect } from 'react';
import ModalContext from './ModalContext';

const modalStyles = {
  backgroundColor: 'white',
  color: 'black',
  padding: '20px',
  width: '500px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: '1px solid black',
};

const Modal = () => {
  const { toppings, selectedItems, setSelectedItems, modalHandler } = useContext(ModalContext);

  const initialState = toppings.map((topping) => {
    if (selectedItems.some((selectedItem) => selectedItem.name === topping.name))
      return { ...topping, isSelected: true };
    else return { ...topping, isSelected: false };
  });

  const [selectAllItems, setSelectAllItems] = useState(false);
  const [formState, setFormState] = useState(initialState);

  const selectAllItemsHandler = () => {
    setSelectAllItems((allItemsState) => {
      setFormState((state) =>
        state.reduce((acc, item) => {
          item.isSelected = allItemsState ? false : true;
          acc.push(item);
          return acc;
        }, [])
      );
      return !allItemsState;
    });
  };

  const checkBoxValueHandler = (e) => {
    setFormState((state) =>
      state.map((item) => {
        if (item.name === e.target.name) {
          return { ...item, isSelected: !item.isSelected };
        } else return item;
      })
    );
  };

  const submitHandler = () => {
    setSelectedItems(
      formState.reduce((acc, item) => {
        if (item.isSelected) {
          acc.push({ name: item.name, value: item.value });
        }
        return acc;
      }, [])
    );

    modalHandler();
  };

  const finalPrice = useMemo(
    () =>
      Math.floor(
        formState.reduce((acc, item) => (item.isSelected ? acc + item.value : acc), 0) * 100
      ) / 100,
    [formState]
  );

  return (
    <div style={modalStyles}>
      <h2>Pizza Toppings</h2>
      <p>Please select the toppings you want on your pizza.</p>
      <p>There will be an upcharge of ${finalPrice}</p>

      <form style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
        <label>
          <input type='checkbox' value={selectAllItems} onChange={selectAllItemsHandler} />
          Select All
        </label>
        {formState.map(({ name, isSelected }) => {
          return (
            <label key={name}>
              <input
                type='checkbox'
                name={name}
                checked={selectAllItems || isSelected}
                value={isSelected}
                onChange={checkBoxValueHandler}
              />
              {name}
            </label>
          );
        })}
      </form>

      <button style={{ marginRight: '10px' }} onClick={submitHandler}>
        Confirm
      </button>
      <button onClick={modalHandler}>Cancel</button>
    </div>
  );
};

export default Modal;