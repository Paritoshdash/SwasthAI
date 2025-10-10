import { AppointmentForm } from "@/components/appointment-form"

export default function ContactPage() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold">Contact & Appointments</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl">
        Reach out for teleconsultations or general inquiries. For emergencies, dial 112 immediately.
      </p>
      <div className="mt-6">
        <AppointmentForm />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-medium">Helpline</h2>
        <p className="text-muted-foreground">
          Phone:{" "}
          <a className="underline" href="tel:112">
            112
          </a>{" "}
          • Email: care@healthease.example
        </p>
      </div>
    </section>
  )
}
