import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import CommunityModal from "./CommunityModal";
import "../styles/createDropdown.css";

const Dropdown = ({ isOpen, onClose }) => {
  const [modal, setModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const match = location.pathname.match(/^\/r\/([^/]+)/);
  const current = match ? match[1] : null;

  if (!isOpen) return null;

  const createPost = () => {
    if (current) {
      navigate(`/r/${current}/submit`);
      onClose();
    }
  };

  const createCommunity = () => {
    setModal(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="create-dropdown" onClick={(e) => e.stopPropagation()}>
        <div className="dropdown-header">
          <h3>Create</h3>
        </div>
        <div className="dropdown-options">
          {current && (
            <button className="dropdown-option" onClick={createPost}>
              <div className="option-icon">
                <FaPlus />
              </div>
              <div className="option-content">
                <span className="option-title">Post</span>
                <div className="option-description">Share to r/{current}</div>
              </div>
            </button>
          )}
          <button className="dropdown-option" onClick={createCommunity}>
            <div className="option-icon">
              <FaPlus />
            </div>
            <div className="option-content">
              <span className="option-title">Community</span>
              <div className="option-description">Create a new Community</div>
            </div>
          </button>
        </div>
      </div>
      {modal && (
        <CommunityModal
          isOpen={modal}
          onClose={() => {
            setModal(false);
            onClose();
          }}
        />
      )}
    </div>
  );
};

export default Dropdown;
