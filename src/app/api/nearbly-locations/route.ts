import { NextResponse } from "next/server";
import { getDocumentByQuery, createMinyan } from "@/services/mongodb";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lat = parseFloat(searchParams.get("lat") || "0");
    const lon = parseFloat(searchParams.get("lon") || "0");
    const radius = parseInt(searchParams.get("radius") || "300");

    if (!lat || !lon || !radius) {
        return NextResponse.json(
            { error: "Missing latitude, longitude, or radius" },
            { status: 400 }
        );
    }

    // MongoDB Query for Nearby Events
    const query = {
        location: {
            $geoWithin: {
                $centerSphere: [[lon, lat], radius / 6378137], // Convert meters to radians
            },
        },
    };

    const events = await getDocumentByQuery("events", query);
    return NextResponse.json(events);
}



export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { name, description, location } = body;

        // Validate input
        if (!name || !Array.isArray(location) || location.length !== 2) {
            return NextResponse.json(
                { error: "'name' and 'location' (as [lat, lon]) are required." },
                { status: 400 }
            );
        }

        // Create event
        const event = await createMinyan({
            name,
            description,
            location,
        });

        return NextResponse.json(
            { message: "Event created successfully", event },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error in POST /api/events:", error);
        return NextResponse.json(
            { error: "Failed to create event" },
            { status: 500 }
        );
    }
}
