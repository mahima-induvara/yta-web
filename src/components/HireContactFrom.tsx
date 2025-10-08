import { useState } from "react";
interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
}
export default function HireContactForm() {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement) {
      const { type, checked } = e.target;

      if (type === "checkbox") {
        setForm({ ...form, [name]: checked });
        return;
      }
    }
    setForm({ ...form, [name]: value });
  };

  const saveToAirtable = async (data: any, baseName: string) => {
    const response = await fetch("/api/airtable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ baseName, data }),
    });

    const result = await response.json();
    return result.id || null;
  };

  const transformToAirtable = (airtableData: any) => {
    return {
      records: [
        {
          fields: {
            Name: airtableData.name,
            WorkEmail: airtableData.email,
            Mobile: airtableData.phone,
            Description: airtableData.message,
            Consent: airtableData.consent ? "Yes" : "No",
          },
        },
      ],
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    const airtableResultId = await saveToAirtable(
      transformToAirtable(form),
      "Contact_Leads"
    );
    if (!airtableResultId) {
      setError("Something went wrong. Please try again.");
      throw new Error("Failed to save to Airtable");
    } else {
      setSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        consent: false,
      });
      console.log(airtableResultId);
    }
  };
  


  return (
    <form className="yta-form space-y-5" onSubmit={handleSubmit}>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="flex-col items-start">
          Full name
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            className="yta-input"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label className="flex-col items-start">
          Work email
          <input
            type="email"
            name="email"
            placeholder="Enter your work email address"
            className="yta-input"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="grid sm:grid-cols-1 gap-4">
        <label className="flex-col items-start">
          Phone number
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            className="yta-input"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex-col items-start">
          Message
          <textarea
            name="message"
            rows={4}
            placeholder="Please describe your requirements"
            className="yta-input"
            value={form.message}
            onChange={handleChange}
          ></textarea>
        </label>
      </div>
      <label className="flex-col items-start">
        <input
          type="checkbox"
          name="consent"
          className="mt-1 ml-[8px]"
          checked={form.consent}
          onChange={handleChange}
        />
        <span className="contact-terms mt-2 ml-[8px]">
          I consent to receiving information and/or materials from Your Team in
          Asia (YTA) about its products, services, events and/or information,
          including latest information on hiring and employment trends. I have
          read and accept for my personal data to be processed in accordance
          with YTA’s Privacy Policy.
        </span>
      </label>

      <button type="submit" className="btn cta-btn w-full cursor-pointer">
        Send message{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
        >
          <path
            d="M4.66797 10H16.3346"
            stroke="white"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.5 4.16699L16.3333 10.0003L10.5 15.8337"
            stroke="white"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
            {success && (
              <p className="text-md text-[#111827]/80 text-center flex items-start justify-center gap-2">
                Message sent successfully!
              </p>
            )}
    </form>
  );
}
