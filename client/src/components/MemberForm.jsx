import React, { useState } from "react";

export default function MemberForm({ isNew }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    district: "",
    municipality: "",
    ward: "",
    school_name: "",
    school_address: "",
    school_appointment_date: "",
    appointment_type: "",
    phone_number: "",
    email: "",
    membership_number: "",
    membership_date: "",
    voucher: null,
    membership_certificate: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData({ ...formData, [id]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("isNew", isNew);
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch("/api/members", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Member successfully registered!");
      } else {
        alert("Error registering member.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error creating member.");
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center gap-4 h-full w-full my-10 mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {isNew ? "New Member Form" : "Existing Member Form"}
      </h2>
      <form
        className="w-full max-w-lg bg-gray-200 text-black p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="first_name">
            First Name
          </label>
          <input
            className="w-full p-2"
            id="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="last_name">
            Last Name
          </label>
          <input
            className="w-full p-2"
            id="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Address</label>
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="district"
          >
            District
          </label>
          <input
            className="w-full p-2 mb-2"
            id="district"
            type="text"
            value={formData.district}
            onChange={handleChange}
          />
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="municipality"
          >
            Municipality
          </label>
          <input
            className="w-full p-2 mb-2"
            id="municipality"
            type="text"
            value={formData.municipality}
            onChange={handleChange}
          />
          <label className="block text-sm font-semibold mb-2" htmlFor="ward">
            Ward No.
          </label>
          <input
            className="w-full p-2"
            id="ward"
            type="text"
            value={formData.ward}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="school_name">
            School Name
          </label>
          <input
            className="w-full p-2"
            id="school_name"
            type="text"
            value={formData.school_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="school_address"
          >
            School Address
          </label>
          <input
            className="w-full p-2"
            id="school_address"
            type="text"
            value={formData.school_address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="school_appointment_date"
          >
            Date of Appointment
          </label>
          <input
            className="w-full p-2"
            id="school_appointment_date"
            type="date"
            value={formData.school_appointment_date}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="appointment_type"
          >
            Type of Appointment
          </label>
          <input
            className="w-full p-2"
            id="appointment_type"
            type="text"
            value={formData.appointment_type}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="phone_number"
          >
            Phone Number
          </label>
          <input
            className="w-full p-2"
            id="phone_number"
            type="text"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-2"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {isNew ? (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="voucher">
              Payment Voucher Upload
            </label>
            <input
              className="w-full p-2"
              id="voucher"
              type="file"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="membership_number"
              >
                Membership Number
              </label>
              <input
                className="w-full p-2"
                id="membership_number"
                type="text"
                value={formData.membership_number}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="membership_date"
              >
                Membership Date
              </label>
              <input
                className="w-full p-2"
                id="membership_date"
                type="date"
                value={formData.membership_date}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="membership_certificate"
              >
                Membership Certificate Upload
              </label>
              <input
                className="w-full p-2"
                id="membership_certificate"
                type="file"
                onChange={handleFileChange}
              />
            </div>
          </>
        )}
        <button
          type="submit"
          className="w-full p-2 bg-gray-500 text-white font-bold mt-4 hover:bg-gray-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
