import { NextRequest, NextResponse } from 'next/server';

// TODO: Integrate with email service (Resend, ConvertKit, or Supabase)
// For now, we just log to console and return success

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, mission } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Validate mission (optional but good to have)
    if (!mission || typeof mission !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'Mission is required' },
        { status: 400 }
      );
    }

    // Log the signup (replace with actual email service integration)
    console.log('[Waitlist Signup]', {
      email,
      mission,
      timestamp: new Date().toISOString(),
    });

    // TODO: Add to email service
    // Example with Resend:
    // await resend.contacts.create({
    //   email,
    //   audienceId: process.env.RESEND_AUDIENCE_ID,
    //   tags: [`mission:${mission}`],
    // });

    // Example with Supabase:
    // await supabase.from('waitlist').insert({ email, mission });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[Waitlist API Error]', error);
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
