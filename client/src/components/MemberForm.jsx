import React, { useState, useEffect, useRef } from "react";

const server_url = import.meta.env.VITE_SERVER_URL;

export default function MemberForm({ isNew }) {
  const [formData, setFormData] = useState({
    isNew: isNew,
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
    voucher: null,
    membership_number: "",
    membership_date: "",
    membership_certificate: null,
  });

  useEffect(() => {
    setFormData({
      isNew: isNew,
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
      voucher: null,
      membership_number: "",
      membership_date: "",
      membership_certificate: null,
    });
  }, [isNew]);

  const appdatepickerRef = useRef(null);
  const memdatepickerRef = useRef(null);

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
    for (const key in formData) {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(server_url + "/api/members", {
        method: "POST",
        body: data,
      });

      const res = await response.json();

      if (response.ok) {
        alert("Member successfully registered!");
        setFormData({
          isNew: isNew,
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
          voucher: null,
          membership_number: "",
          membership_date: "",
          membership_certificate: null,
        });
        e.target.reset();
      } else {
        alert("Error registering member. Error: " + res.message);
      }
    } catch (err) {
      alert("Error creating member. Error : " + err.message);
    }
  };

  useEffect(() => {
    const appDatepickerElement = appdatepickerRef.current;
    const memDatepickerElement = memdatepickerRef.current;

    if (appDatepickerElement) {
      appDatepickerElement.nepaliDatePicker({
        ndpYear: true,
        ndpMonth: true,
        unicodeDate: true,
        ndpYearCount: 100,
        onChange: (date) => {
          setFormData({
            ...formData,
            school_appointment_date: date.bs,
          });
        },
      });
    }

    if (memDatepickerElement) {
      memDatepickerElement.nepaliDatePicker({
        ndpYear: true,
        ndpMonth: true,
        unicodeDate: true,
        ndpYearCount: 100,
        onChange: (date) => {
          setFormData({
            ...formData,
            membership_date: date.bs,
          });
        },
      });
    }
  }, [formData]);

  return (
    <div className="container flex flex-col items-center justify-center gap-4 h-full w-full my-10 mx-auto">
      <h2 className="text-2xl font-bold mb-4 mukta-bold">
        {isNew ? "नयाँ सदस्यता फारम" : "पुरानो सदस्यता फारम"}
      </h2>
      <form
        className="w-full max-w-lg bg-gray-200 text-black p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-lg mukta-regular mb-2"
            htmlFor="first_name"
          >
            नाम
          </label>
          <input
            className="w-full p-2"
            id="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-lg mukta-regular mb-2"
            htmlFor="last_name"
          >
            थर
          </label>
          <input
            className="w-full p-2"
            id="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mukta-regular mb-2">ठेगाना</label>
          <label
            className="block text-sm mukta-regular mb-2"
            htmlFor="district"
          >
            जिल्ला
          </label>
          <input
            className="w-full p-2 mb-2"
            id="district"
            type="text"
            value={formData.district}
            onChange={handleChange}
            required
          />
          <label
            className="block text-sm mukta-regular mb-2"
            htmlFor="municipality"
          >
            नगरपालिका/गाउँपालिका
          </label>
          <input
            className="w-full p-2 mb-2"
            id="municipality"
            type="text"
            value={formData.municipality}
            onChange={handleChange}
            required
          />

          <label className="block text-sm mukta-regular mb-2" htmlFor="ward">
            वडा नं
          </label>
          <input
            className="w-full p-2"
            id="ward"
            type="text"
            value={formData.ward}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-lg mukta-regular mb-2"
            htmlFor="school_name"
          >
            विद्यालयको नाम
          </label>
          <input
            className="w-full p-2"
            id="school_name"
            type="text"
            value={formData.school_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-lg mukta-regular mb-2"
            htmlFor="school_address"
          >
            विद्यालयको ठेगाना
          </label>
          <input
            className="w-full p-2"
            id="school_address"
            type="text"
            value={formData.school_address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-lg mukta-regular mb-2 "
            htmlFor="school_appointment_date"
          >
            नियुक्ति मिति
          </label>
          <input
            className="w-full p-2 nepali-datepicker"
            id="school_appointment_date"
            type="text"
            value={formData.school_appointment_date}
            onChange={handleChange}
            ref={appdatepickerRef}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-lg mukta-regular mb-2"
            htmlFor="appointment_type"
          >
            नियुक्तिको प्रकार (स्थायी, अस्थायी, राहत, करार, निजी आदि)
          </label>
          <input
            className="w-full p-2"
            id="appointment_type"
            type="text"
            value={formData.appointment_type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-lg mukta-regular mb-2"
            htmlFor="phone_number"
          >
            फोन नं
          </label>
          <input
            className="w-full p-2"
            id="phone_number"
            type="text"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mukta-regular mb-2" htmlFor="email">
            इमेल
          </label>
          <input
            className="w-full p-2"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {isNew ? (
          <div className="mb-4">
            <label
              className="block text-lg mukta-regular mb-2"
              htmlFor="voucher"
            >
              पेमेन्ट भाउचर अपलोड गर्नुहोस् (jpg/jpeg/png)
            </label>
            <input
              className="w-full p-2"
              id="voucher"
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              onChange={handleFileChange}
              required
            />
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label
                className="block text-lg mukta-regular mb-2"
                htmlFor="membership_number"
              >
                सदस्यता नं
              </label>
              <input
                className="w-full p-2"
                id="membership_number"
                type="text"
                value={formData.membership_number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-lg mukta-regular mb-2"
                htmlFor="membership_date"
              >
                सदस्यता मिति
              </label>
              <input
                className="w-full p-2 nepali-datepicker"
                id="membership_date"
                type="text"
                value={formData.membership_date}
                onChange={handleChange}
                ref={memdatepickerRef}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-lg mukta-regular mb-2"
                htmlFor="membership_certificate"
              >
                सदस्यता प्रमाणपत्र अपलोड गर्नुहोस् (jpg/jpeg/png)
              </label>
              <input
                className="w-full p-2"
                id="membership_certificate"
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                onChange={handleFileChange}
                required
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
