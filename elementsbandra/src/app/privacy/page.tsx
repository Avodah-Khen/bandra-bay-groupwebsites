export const metadata = { title: "Privacy Policy | Elements Realty" };

export default function PrivacyPage() {
  return (
    <section className="section-pad mx-auto max-w-3xl pt-32">
      <h1 className="font-display text-5xl">Privacy Policy</h1>
      <p className="mt-6 text-[var(--stone)] leading-relaxed">
        Information submitted via Inquire Now / Contact forms (name, mobile,
        email, message, project interest) is stored securely in our PostgreSQL
        database and used only to respond to your inquiry and improve our
        services. We do not sell personal data. Access is limited to authorised
        CRM users.
      </p>
    </section>
  );
}
