import React from 'react';

const AddressCard = ({ address, isSelected, onSelect }) => {
  return (
    <div
      className={`address-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="address-card-header">
        <input
          type="radio"
          name="address"
          checked={isSelected}
          onChange={onSelect}
          onClick={(e) => e.stopPropagation()}
        />
        <span className="address-card-name">{address.name}</span>
      </div>
      <div className="address-card-text">{address.fullAddress}</div>
    </div>
  );
};

export default AddressCard;
