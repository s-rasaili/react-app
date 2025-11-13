import React, { useState, useEffect, useRef } from 'react';
import AddressCard from './AddressCard';

const AddressModal = ({ isOpen, onClose, onSave, currentAddress }) => {
  const [showNewForm, setShowNewForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(currentAddress);
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      name: 'Home',
      fullAddress: 'H/12, 24 Battalion Road, Behind Police Academy, Lalghati Bhopal, Madhya Pradesh - 462030'
    },
    {
      id: 2,
      name: 'Office',
      fullAddress: 'Plot 45, Industrial Area, Govindpura, Bhopal, Madhya Pradesh - 462023'
    },
    {
      id: 3,
      name: 'Farm',
      fullAddress: 'Village Kolar Road, Near Water Tank, Bhopal, Madhya Pradesh - 462042'
    }
  ]);

  const [newAddress, setNewAddress] = useState({
    label: '',
    fullName: '',
    phone: '',
    pincode: '',
    state: '',
    city: '',
    district: '',
    houseNo: '',
    roadName: '',
    landmark: ''
  });

  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Mobile touch gestures for bottom sheet
  const handleTouchStart = (e) => {
    if (window.innerWidth <= 768) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (window.innerWidth <= 768) {
      const newY = e.touches[0].clientY - startY;
      if (newY > 0) {
        setCurrentY(newY);
        if (modalRef.current) {
          modalRef.current.style.transform = `translateY(${newY}px)`;
        }
      }
    }
  };

  const handleTouchEnd = () => {
    if (window.innerWidth <= 768) {
      if (currentY > 100) {
        onClose();
      }
      if (modalRef.current) {
        modalRef.current.style.transform = '';
      }
      setCurrentY(0);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newAddress.label.trim()) {
      newErrors.label = 'Address label is required';
    }
    if (!newAddress.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!newAddress.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(newAddress.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!newAddress.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(newAddress.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }
    if (!newAddress.state) {
      newErrors.state = 'State is required';
    }
    if (!newAddress.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!newAddress.district.trim()) {
      newErrors.district = 'District is required';
    }
    if (!newAddress.houseNo.trim()) {
      newErrors.houseNo = 'House number is required';
    }
    if (!newAddress.roadName.trim()) {
      newErrors.roadName = 'Road name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (showNewForm) {
      // Validate and save new address
      if (!validateForm()) {
        alert('Please fill all required fields correctly');
        return;
      }

      const fullAddress = `${newAddress.houseNo}, ${newAddress.roadName}${
        newAddress.landmark ? ', ' + newAddress.landmark : ''
      }, ${newAddress.city}, ${newAddress.district}, ${newAddress.state} - ${newAddress.pincode}`;

      const newAddressData = {
        id: savedAddresses.length + 1,
        name: newAddress.label,
        fullAddress: fullAddress,
        phone: newAddress.phone,
        fullName: newAddress.fullName
      };

      // Add to saved addresses
      setSavedAddresses([...savedAddresses, newAddressData]);

      // Call onSave callback
      onSave({
        name: newAddress.label,
        address: fullAddress,
        estimatedDelivery: '25 August 2025'
      });

      // Reset form
      setNewAddress({
        label: '',
        fullName: '',
        phone: '',
        pincode: '',
        state: '',
        city: '',
        district: '',
        houseNo: '',
        roadName: '',
        landmark: ''
      });
      setShowNewForm(false);
      alert('New address added successfully!');
    } else {
      // Save selected address
      if (selectedAddress) {
        onSave({
          name: selectedAddress.name,
          address: selectedAddress.fullAddress,
          estimatedDelivery: '25 August 2025'
        });
        alert('Address updated successfully!');
      } else {
        alert('Please select an address');
      }
    }
  };

  const handleCancel = () => {
    setShowNewForm(false);
    setErrors({});
    setNewAddress({
      label: '',
      fullName: '',
      phone: '',
      pincode: '',
      state: '',
      city: '',
      district: '',
      houseNo: '',
      roadName: '',
      landmark: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal show" onClick={(e) => {
      if (e.target.className.includes('modal')) {
        handleCancel();
      }
    }}>
      <div
        className="modal-content"
        ref={modalRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="modal-header">
          <div className="drag-handle"></div>
          <h2>Change Delivery Address</h2>
          <button className="close-modal" onClick={handleCancel}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          {!showNewForm && (
            <div className="saved-addresses">
              <h3 style={{ marginBottom: '15px', fontSize: '16px' }}>
                Select a saved address
              </h3>

              {savedAddresses.map(address => (
                <AddressCard
                  key={address.id}
                  address={address}
                  isSelected={selectedAddress?.id === address.id}
                  onSelect={() => setSelectedAddress(address)}
                />
              ))}
            </div>
          )}

          <div className="add-new-address">
            <a
              className="add-new-link"
              onClick={() => {
                setShowNewForm(!showNewForm);
                setErrors({});
              }}
            >
              <i className="fas fa-plus"></i>{' '}
              {showNewForm ? 'Show saved addresses' : 'Add a new address'}
            </a>
          </div>

          {showNewForm && (
            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #ddd' }}>
              <h3 style={{ marginBottom: '15px', fontSize: '16px' }}>
                Add New Address
              </h3>

              <div className="form-group">
                <label>Address Label *</label>
                <input
                  type="text"
                  name="label"
                  value={newAddress.label}
                  onChange={handleInputChange}
                  placeholder="e.g., Home, Office, Farm"
                  style={errors.label ? { borderColor: 'red' } : {}}
                />
                {errors.label && <span style={{ color: 'red', fontSize: '12px' }}>{errors.label}</span>}
              </div>

              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={newAddress.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  style={errors.fullName ? { borderColor: 'red' } : {}}
                />
                {errors.fullName && <span style={{ color: 'red', fontSize: '12px' }}>{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={newAddress.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  style={errors.phone ? { borderColor: 'red' } : {}}
                />
                {errors.phone && <span style={{ color: 'red', fontSize: '12px' }}>{errors.phone}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={newAddress.pincode}
                    onChange={handleInputChange}
                    placeholder="6-digit pincode"
                    maxLength="6"
                    style={errors.pincode ? { borderColor: 'red' } : {}}
                  />
                  {errors.pincode && <span style={{ color: 'red', fontSize: '12px' }}>{errors.pincode}</span>}
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <select
                    name="state"
                    value={newAddress.state}
                    onChange={handleInputChange}
                    style={errors.state ? { borderColor: 'red' } : {}}
                  >
                    <option value="">Select State</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                  {errors.state && <span style={{ color: 'red', fontSize: '12px' }}>{errors.state}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={newAddress.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    style={errors.city ? { borderColor: 'red' } : {}}
                  />
                  {errors.city && <span style={{ color: 'red', fontSize: '12px' }}>{errors.city}</span>}
                </div>
                <div className="form-group">
                  <label>District *</label>
                  <input
                    type="text"
                    name="district"
                    value={newAddress.district}
                    onChange={handleInputChange}
                    placeholder="Enter district"
                    style={errors.district ? { borderColor: 'red' } : {}}
                  />
                  {errors.district && <span style={{ color: 'red', fontSize: '12px' }}>{errors.district}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>House No., Building Name *</label>
                <input
                  type="text"
                  name="houseNo"
                  value={newAddress.houseNo}
                  onChange={handleInputChange}
                  placeholder="Enter house number and building name"
                  style={errors.houseNo ? { borderColor: 'red' } : {}}
                />
                {errors.houseNo && <span style={{ color: 'red', fontSize: '12px' }}>{errors.houseNo}</span>}
              </div>

              <div className="form-group">
                <label>Road Name, Area, Colony *</label>
                <textarea
                  name="roadName"
                  value={newAddress.roadName}
                  onChange={handleInputChange}
                  placeholder="Enter complete address details"
                  style={errors.roadName ? { borderColor: 'red' } : {}}
                ></textarea>
                {errors.roadName && <span style={{ color: 'red', fontSize: '12px' }}>{errors.roadName}</span>}
              </div>

              <div className="form-group">
                <label>Landmark (Optional)</label>
                <input
                  type="text"
                  name="landmark"
                  value={newAddress.landmark}
                  onChange={handleInputChange}
                  placeholder="E.g., Near police station"
                />
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="modal-btn btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="modal-btn btn-save" onClick={handleSave}>
            {showNewForm ? 'Add Address' : 'Save Address'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
