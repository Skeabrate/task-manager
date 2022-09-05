import { useState } from 'react';
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
      <div className='ToppingsList'>
        <div>
          <h1>You have selected:</h1>
          <ul>
            {selectedItems.map((item) => (
              <li key={item.name}>
                {item?.name}
                <span>${item?.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <button className='SuccessBtn' onClick={modalHandler}>
          Select toppings
        </button>
      </div>

      {modalOpen ? <Modal /> : null}
    </ModalContext.Provider>
  );
}

export default App;
