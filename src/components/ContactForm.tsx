import { useState, useEffect } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
}
export default function ContactForm() {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const url = new URL(window.location.href);
    const s = url.searchParams.get("subject") || "";
    const a = url.searchParams.get("getStarted") || "";
    const jr = url.searchParams.get("searchFor") || "";
    if (s) setForm({ ...form, subject: s });
    if (jr) setForm({ ...form, subject: `I am looking for a ${jr} role.` });
    if (a === "true") window.scrollTo({ top: 750, left: 0, behavior: 'smooth' });

  }, []);

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
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
            Subject: airtableData.subject,
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mobilenum = e.target.value.toLowerCase();
    const sanitized = mobilenum.replace(/[^0-9]/g, '');
    setForm({ ...form, phone: sanitized });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log("Form submitted:", form);
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
        subject: "",
        message: "",
        consent: false,
      });
      //console.log(airtableResultId);
    }
  };
  return (
    <div className="contact-area relative max-w-7xl mx-auto text-white py-[32px] grid lg:grid-cols-2 gap-10">
      {/* Left content */}
      <div className="px-6 sm:pl-12 flex flex-col justify-between">
        <div className="title-wrapper">
          <h2 className="yta-contact-title">
            We make it easy <br /> to recruit globally
          </h2>
          <p className="mt-[16px] text-white/90 max-w-md contact-desc">
            Remote eliminates barriers to international hiring so great
            companies can work with great people, no matter where those people
            are.
          </p>
        </div>

        <div className="mt-8 space-y-6 text-sm flex gap-4 flex-col sm:flex-row">
          <div className="bottom-box">
            <p className="bottom-title">Email Us</p>
            <p className="text-white/80 mt-1 bottom-desc mb-16">
              If you prefer email, please contact us at the following address.
            </p>
            <a
              href="mailto:hello@yourteaminasia.com"
              className="block mt-2 text-white underline underline-offset-2"
            >
              hello@yourteaminasia.com
            </a>
          </div>
          <div className="bottom-box">
            <p className="bottom-title">Call us</p>
            <p className="text-white/80 mt-1 bottom-desc mb-16">
              If you prefer call us, please contact us at the following phone
              number.
            </p>
            <a
              href="tel:+447440207973"
              className="block mt-2 text-white underline underline-offset-2"
            >
              +44 7440 207973
            </a>
          </div>
        </div>
      </div>

      {/* Right form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 px-6 sm:px-12 lg:px-16"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm/6 font-medium text-gray-900 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your work email address"
              value={form.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm/6 font-medium text-gray-900 mb-2"
            >
              Phone
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              maxLength={11}
              onChange={handlePhoneChange}
              className="form-input"
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-sm/6 font-medium text-gray-900 mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Enter the subject"
              value={form.subject}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm/6 font-medium text-gray-900 mb-2"
          >
            Message
          </label>
          <textarea
            name="message"
            placeholder="Please describe your requirements"
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="form-input"
          ></textarea>
        </div>
        <label className="flex items-start gap-2 text-sm text-white/80">
          <input
            type="checkbox"
            name="consent"
            checked={form.consent}
            onChange={handleChange}
            className="mt-1"
            required
          />
          <span>
            I consent to receiving information and/or materials from Your Team
            in Asia (YTA) about its products, services, events and/or
            information, including latest information on hiring and employment
            trends. I have read and accept for my personal data to be processed
            in accordance with YTA's{" "}
            <a href="/privacy" className="underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        <button
          type="submit"
          className="submit-btn w-full bg-white text-[#5271FF] py-3 rounded-lg font-semibold hover:opacity-85 transition flex items-center justify-center gap-2"
        >
          Send message <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
  <path d="M4.66699 10H16.3337" stroke="#5271FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M10.5 4.16699L16.3333 10.0003L10.5 15.8337" stroke="#5271FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && (
          <p className="text-md text-white/80 text-center flex items-start justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="20"
              height="20"
              x="0"
              y="0"
              viewBox="0 0 295.996 295.996"
            >
              <g>
                <path
                  d="M147.998 0C66.392 0 0 66.392 0 147.998s66.392 147.998 147.998 147.998 147.998-66.392 147.998-147.998S229.605 0 147.998 0zm0 279.996c-36.256 0-69.143-14.696-93.022-38.44a132.713 132.713 0 0 1-23.934-32.42C21.442 190.847 16 170.047 16 147.998 16 75.214 75.214 16 147.998 16c34.523 0 65.987 13.328 89.533 35.102 12.208 11.288 22.289 24.844 29.558 39.996 8.27 17.239 12.907 36.538 12.907 56.9 0 72.784-59.214 131.998-131.998 131.998z"
                  fill="#ffffff"
                  opacity="1"
                  data-original="#000000"
                ></path>
                <circle
                  cx="99.666"
                  cy="114.998"
                  r="16"
                  fill="#ffffff"
                  opacity="1"
                  data-original="#000000"
                ></circle>
                <circle
                  cx="198.666"
                  cy="114.998"
                  r="16"
                  fill="#ffffff"
                  opacity="1"
                  data-original="#000000"
                ></circle>
                <path
                  d="M147.715 229.995c30.954 0 60.619-15.83 77.604-42.113l-13.439-8.684c-15.597 24.135-44.126 37.604-72.693 34.308-22.262-2.567-42.849-15.393-55.072-34.308l-13.438 8.684c14.79 22.889 39.716 38.409 66.676 41.519 3.461.399 6.917.594 10.362.594z"
                  fill="#ffffff"
                  opacity="1"
                  data-original="#000000"
                ></path>
              </g>
            </svg>{" "}
            Thanks for submitting your message. Our team will get back to you
            shortly.
          </p>
        )}
      </form>
    </div>
  );
}
