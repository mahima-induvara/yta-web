import { useState } from "react";
import "@styles/contact-drawer.scss";
interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
}
export default function ContactDrawer() {
  const [open, setOpen] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });

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

  const saveToAirtable = async (data: any, baseName: string) => {
    const response = await fetch("/api/airtable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ baseName, data }),
    });

    const result = await response.json();
    return result.id || null;
  };

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted:", form);
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
    <>

    <button
        onClick={() => setOpen(true)}
        className="cta-btn cursor-pointer mt-6 inline-flex items-center justify-center"
      >
        Get a free quote <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
        <path d="M4.16669 10.5H15.8334"  strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 4.66663L15.8333 10.5L10 16.3333" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`off-canvas fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-[#111827]">Contact us</h2>
          <button
            onClick={() => setOpen(false)}
            className=" cursor-pointer text-2xl leading-none text-[#111827] hover:opacity-70"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M9.16992 14.83L14.8299 9.17001" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M14.8299 14.83L9.16992 9.17001" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
          </button>
        </div>
        <div className="off-canvas-wrapper p-6">
        <div className="off-canvas-body  overflow-y-auto text-left">
          <h3 className="text-2xl font-bold text-[#5271FF] mb-2">
            We make it easy to recruit globally
          </h3>
          <p className="text-[#111827]/80 text-sm mb-6">
            Remote eliminates barriers to international hiring so great
            companies can work with great people, no matter where those people
            are.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Work email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                placeholder="Enter your work email address"
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                placeholder="Enter your phone number"
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                placeholder="Please describe your requirements"
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <label className="flex items-start text-[14px] gap-2 text-[#fff]/70">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
              />
              <span>
                I consent to receiving information and/or materials from Your Team in Asia (YTA) about its products, services, events and/or information, including latest information on hiring and employment trends. I have read and accept for my personal data to be processed in accordance with YTA's  See{" "}
                <a href="/privacy" className="underline">
                  Privacy Policy
                </a>
              </span>
            </label>

            <button
              type="submit"
              className="w-full cursor-pointer flex justify-center items-center gap-2 bg-[#fff] text-[#5271FF] py-3 rounded-lg font-semibold hover:opacity-85 transition"
            >
              Send message <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
  <path d="M4.66699 10H16.3337" stroke="#5271FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M10.5 4.16699L16.3333 10.0003L10.5 15.8337" stroke="#5271FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            </button>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && (
              <p className="text-md text-[#111827]/80 text-center flex items-start justify-center gap-2">
                Message sent successfully!
              </p>
            )}
          </form>
        </div>
        </div>
      </aside>
    </>
  );
}
