import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Log the received data
    console.log('📧 Contact form submission received:', body);
    
    // Validate required fields
    const { firstName, lastName, email, message } = body;
    
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM system
    // 4. Send auto-reply email
    
    // For now, just simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // TODO: Replace this with your actual backend logic
    // Examples:
    // - Send email via SendGrid, Mailgun, etc.
    // - Save to database (PostgreSQL, MongoDB, etc.)
    // - Add to CRM (HubSpot, Salesforce, etc.)
    // - Send to webhook or external API
    
    console.log('✅ Contact form processed successfully');
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        id: `contact_${Date.now()}` // Generate a simple ID
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('❌ Contact form submission error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
