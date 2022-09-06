import React, { useMemo, useState, useContext, useEffect } from 'react';
import ModalContext from './ModalContext';

const Modal = () => {
  const { toppings, selectedItems, setSelectedItems, modalHandler } = useContext(ModalContext);

  const initialState = useMemo(
    () =>
      toppings.map((topping) => {
        if (selectedItems.some((selectedItem) => selectedItem.name === topping.name))
          return { ...topping, isSelected: true };
        else return { ...topping, isSelected: false };
      }),
    [toppings, selectedItems]
  );

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
    () => formState.reduce((acc, item) => (item.isSelected ? acc + item.value : acc), 0).toFixed(2),
    [formState]
  );

  useEffect(() => {
    let allSelected = true;
    formState.forEach((item) => {
      if (!item.isSelected) {
        allSelected = false;
      }
    });

    if (allSelected) setSelectAllItems(true);
    else setSelectAllItems(false);
  }, [formState]);

  return (
    <div className='Modal'>
      <h2>Pizza Toppings</h2>
      <p>Please select the toppings you want on your pizza.</p>
      <p style={{ height: '16px' }}>
        {finalPrice ? (
          <>
            There will be an upcharge of <strong>${finalPrice}</strong>
          </>
        ) : null}
      </p>

      <form style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
        <label>
          <input
            type='checkbox'
            value={selectAllItems}
            onChange={selectAllItemsHandler}
            checked={selectAllItems}
          />
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

      <button className='SuccessBtn' style={{ marginRight: '10px' }} onClick={submitHandler}>
        Save
      </button>
      <button className='ErrorBtn' onClick={modalHandler}>
        Cancel
      </button>
    </div>
  );
};

export default Modal;
