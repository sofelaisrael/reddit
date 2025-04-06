import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import "../styles/CreateCommunityModal.css";

const CommunityModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const subreddit = useMutation(api.subreddit.create);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name) {
      setError("Community name is required");
      return;
    }
    if (name.length < 3 || name.length > 21) {
      setError("Community name must be between 3 and 21 characters");
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(name)) {
      setError("Community name can only contain letters, numbers, and underscores");
      return;
    }

    setIsLoading(true);
    try {
      await subreddit({ name, description });
      onClose(); // ✅ Only close after successful submission
    } catch (err) {
      // console.log(await subreddit({ name, description })) 
      setError(`Failed to create community. ${err?.data?.message || err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create a Community</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <div className="input-prefix">r/</div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="community_name"
              maxLength={21}
              disabled={isLoading}
            />
            <p className="input-help">Community names including capitalization cannot be changed.</p>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description <span>(Optional)</span></label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your community"
              maxLength={100}
              disabled={isLoading}
            ></textarea>
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="modal-footer">
            <button className="cancel-button" type="button" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
            <button className="create-button" type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Community"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunityModal;
