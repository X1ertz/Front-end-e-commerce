import React, { useEffect, useState } from "react";
import { getDiscounts, deleteDiscount, updateDiscount, createDiscount, getUsedDiscounts, deleteUsedDiscount, updateUsedDiscount,addUsedDiscount } from "../services/api";

const Discount = () => {
  const [discounts, setDiscounts] = useState([]);
  const [usedDiscounts, setUsedDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [editingUsedDiscount, setEditingUsedDiscount] = useState(null); // Fix: Initialize state with null
  const [formData, setFormData] = useState({ discount_name: "", percentage: "", userid: "", discountcode: "" });
  const [isUsedDiscountModalOpen, setIsUsedDiscountModalOpen] = useState(false);


  useEffect(() => {
    fetchDiscounts();
    fetchUsedDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    setLoading(true);
    try {
      const data = await getDiscounts();
      setDiscounts(data);
    } catch (error) {
      console.error("Error fetching discounts", error);
    }
    setLoading(false);
  };

  const handleAddUsedDiscount = () => {
    setEditingUsedDiscount(null);
    setFormData({ userid: "", discountcode: "" });
    setIsUsedDiscountModalOpen(true);
  };

  const fetchUsedDiscounts = async () => {
    setLoading(true);
    try {
      const data = await getUsedDiscounts();
      setUsedDiscounts(data);
    } catch (error) {
      console.error("Error fetching used discounts", error);
    }
    setLoading(false);
  };

  const handleDeleteDiscount = async (id) => {
    try {
      await deleteDiscount(id);
      fetchDiscounts();
    } catch (error) {
      console.error("Error deleting discount", error);
    }
  };

  const handleEditUsedDiscount = (record) => {
    setEditingUsedDiscount(record);
    setFormData({
      userid: record.userid,
      discountcode: record.discountcode,
    });
    setIsUsedDiscountModalOpen(true);
    setIsModalOpen(false);
  };
  const handleUsedDiscountFormSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);  // ตรวจสอบข้อมูลที่ส่งไป
    try {
      if (editingUsedDiscount) {
        await updateUsedDiscount(editingUsedDiscount.id, formData);
      }else{
        await addUsedDiscount(formData);
      }
      fetchUsedDiscounts();
      setIsUsedDiscountModalOpen(false);  // ปิด Modal
    } catch (error) {
      console.error("Error saving used discount", error);
    }
  };
  

  const handleDeleteUsedDiscount = async (id) => {
    try {
      await deleteUsedDiscount(id);
      fetchUsedDiscounts();
    } catch (error) {
      console.error("Error deleting used discount", error);
    }
  };

  const handleEditDiscount = (record) => {
    setEditingDiscount(record);
    setFormData({
      discount_name: record.discount_name,
      percentage: record.percentage,
    });
    setIsModalOpen(true); 
    setIsUsedDiscountModalOpen(false);
  };

  const handleAddDiscount = () => {
    setEditingDiscount(null);
        setFormData({ discount_name: "", percentage: "" });
        setIsModalOpen(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingDiscount) {
                await updateDiscount(editingDiscount.id, formData);
            } else {
                await createDiscount(formData);
            }
            fetchDiscounts();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving discount", error);
        }
    };

    return (
        <div>
        <h2>Discount Management</h2>
        <button onClick={handleAddDiscount}>Add Discount</button>
  
        {/* Discount Table */}
        <h3>Discounts</h3>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Percentage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr key={discount.id}>
                <td>{discount.id}</td>
                <td>{discount.discount_name}</td>
                <td>{discount.percentage}%</td>
                <td>{discount.usageCount ? discount.usageCount : 0} ครั้ง</td>
                <td>
                  <button onClick={() => handleEditDiscount(discount)}>Edit</button>
                  <button onClick={() => handleDeleteDiscount(discount.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <h3>Used Discounts</h3>
        <button onClick={handleAddUsedDiscount}>Add Used Discount</button>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Discount Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          
          <tbody>
            {usedDiscounts.map((usedDiscount) => (
              <tr key={usedDiscount.id}>
                <td>{usedDiscount.id}</td>
                <td>{usedDiscount.userid}</td>
                <td>{usedDiscount.discountcode}</td>
                <td>
                  <button onClick={() => handleEditUsedDiscount(usedDiscount)}>Edit</button>
                  <button onClick={() => handleDeleteUsedDiscount(usedDiscount.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div className="modal">
            <h3>{editingDiscount ? "Edit Discount" : "Add Discount"}</h3>
            <form onSubmit={handleFormSubmit}>
              <label>
                Discount Name:
                <input
                  type="text"
                  name="discount_name"
                  value={formData.discount_name}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <label>
                Percentage:
                <input
                  type="number"
                  name="percentage"
                  value={formData.percentage}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </form>
          </div>
        )}
  
        {isUsedDiscountModalOpen && (
          <div className="modal">
            <h3>{editingUsedDiscount ? "Edit Used Discount" : "Add Used Discount"}</h3>
            <form onSubmit={handleUsedDiscountFormSubmit}>
              <label>
                User ID:
                <input
                  type="number"
                  name="userid"
                  value={formData.userid}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <label>
                Discount Code:
                <input
                  type="text"
                  name="discountcode"
                  value={formData.discountcode}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsUsedDiscountModalOpen(false)}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    );
  };

export default Discount;

