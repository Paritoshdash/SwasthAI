import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
        doctorId, 
        doctorName, 
        date, 
        time,
        patientName,
        patientContact,
        consultationType // <-- New field
    } = body;

    // --- Basic Validation ---
    if (!doctorId || !date || !time || !patientName || !patientContact || !consultationType) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // --- Server-side Logic (Simulated) ---
    // In a real application, you would save all this information to your database.
    console.log('--- New Appointment Booked (Simulated) ---');
    console.log('Doctor:', doctorName, `(ID: ${doctorId})`);
    console.log('Patient:', patientName, `(Contact: ${patientContact})`);
    console.log('Date:', date);
    console.log('Time:', time);
    console.log('Consultation Type:', consultationType); // <-- Log the new field
    console.log('------------------------------------------');


    // Simulate a successful booking after a short delay.
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ message: 'Appointment booked successfully!' }, { status: 201 });

  } catch (error) {
    console.error('API Booking Error:', error);
    return NextResponse.json({ message: 'An error occurred while booking the appointment.' }, { status: 500 });
  }
}