import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = (searchParams.get('address') || '').trim();

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }
  if (address.length > 200) {
    return NextResponse.json({ error: 'Address is too long' }, { status: 400 });
  }

  // The ECI Voter Portal does not expose a public REST API for booth lookup.
  // For the hackathon demo, we return helpful official ECI resources and
  // link voters to the official portals where they can find their booth.

  try {
    // Fallback: Return helpful Indian election guidance
    return NextResponse.json({
      locations: [],
      message: 'Please use official ECI resources to find your polling booth.',
      resources: [
        {
          name: 'ECI Voter Portal',
          url: 'https://voters.eci.gov.in',
          desc: 'Find your polling booth and verify voter registration'
        },
        {
          name: 'Voter Helpline 1950',
          url: 'tel:1950',
          desc: 'Call ECI Voter Helpline for booth information'
        },
        {
          name: 'Voter Information App',
          url: 'https://play.google.com/store/apps/details?id=com.eci.ci',
          desc: 'Download Voter Helpline App by ECI'
        }
      ]
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ locations: [], error: message }, { status: 200 });
  }
}
