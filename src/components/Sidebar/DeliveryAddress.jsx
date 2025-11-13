import React, { useState } from 'react';
import AddressModal from '../Modal/AddressModal';

const DeliveryAddress = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({
    id: 1,
    name: 'Home',
    address: 'H/12, 24 Battalion Road, Behind Police Academy, Lalghati Bhopal, Madhya Pradesh - 462030',
    estimatedDelivery: '25 August 2025'
  });

  const handleAddressChange = (newAddress) => {
    setCurrentAddress({
      ...currentAddress,
      name: newAddress.name,
      address: newAddress.address,
      estimatedDelivery: newAddress.estimatedDelivery
    });
    setShowModal(false);
  };

  return (
    <>
      <div className="delivery-address">
        <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
          Your Delivery Address
        </div>
        <div className="address-text">{currentAddress.address}</div>
        <span className="delivery-date">
          Estimated Time of Arrival: {currentAddress.estimatedDelivery}
        </span>
        <button className="change-btn" onClick={() => setShowModal(true)}>
          Change
        </button>
      </div>

      <AddressModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAddressChange}
        currentAddress={{
          id: currentAddress.id,
          name: currentAddress.name,
          fullAddress: currentAddress.address
        }}
      />
    </>
  );
};

export default DeliveryAddress;
