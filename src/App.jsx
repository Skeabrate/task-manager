import { useState, useMemo, useEffect } from 'react';
import ModalContext from './ModalContext';
import Modal from './Modal';

const toppings = [
  { name: 'cheese', value: 0.99 },
  { name: 'meat', value: 1.29 },
  { name: 'bacon', value: 0.5 },
  { name: 'spinach', value: 0.99 },
];

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const modalHandler = () => setModalOpen((state) => !state);

  return (
    <ModalContext.Provider
      value={{
        toppings,
        selectedItems,
        setSelectedItems,
        modalHandler,
      }}
    >
      <div>
        <button onClick={modalHandler}>Select toppings</button>

        <div>
          You have selected:
          {selectedItems.map((item) => (
            <div key={item.name}>
              {item?.name} for ${item?.value}
            </div>
          ))}
        </div>

        {modalOpen ? <Modal /> : null}
      </div>
    </ModalContext.Provider>
  );
}

export default App;
