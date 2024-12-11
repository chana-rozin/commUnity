import { NextResponse } from "next/server";
import {
    insertDocument,
    getDocumentByQuery,
} from "@/services/mongodb";

// Fetch events within a radius
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const radius = searchParams.get("radius");

    if (!lat || !lng || !radius) {
        return NextResponse.json(
            { message: "Missing required fields: lat, lng, radius" },
            { status: 400 }
        );
    }

    const query = {
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [parseFloat(lng), parseFloat(lat)], // [longitude, latitude]
                },
                $maxDistance: parseInt(radius), // Radius in meters
            },
        },
    };

    try {
        const events = await getDocumentByQuery("events", query);
        return NextResponse.json(events); // Return events as JSON
    } catch (error) {
        console.error("Error fetching events:", error);
        return NextResponse.json(
            { message: "Failed to fetch events", error },
            { status: 500 }
        );
    }
}

// Add a new event
export async function POST(request: Request) {
    const body = await request.json(); // Parse request body

    if (!body || !body.name || !body.location) {
        return NextResponse.json(
            { message: "Missing required fields: name, location" },
            { status: 400 } // Bad Request
        );
    }

    // Ensure location follows GeoJSON format
    if (
        !body.location.type ||
        body.location.type !== "Point" ||
        !Array.isArray(body.location.coordinates) ||
        body.location.coordinates.length !== 2
    ) {
        return NextResponse.json(
            { message: "Invalid location format. Expected GeoJSON Point" },
            { status: 400 }
        );
    }

    try {
        const result = await insertDocument("events", body);

        if (!result) {
            return NextResponse.json(
                { message: "Failed to create event" },
                { status: 500 } // Internal Server Error
            );
        }

        return NextResponse.json(
            { ...body, _id: result.insertedId },
            { status: 201 } // Created
        );
    } catch (error) {
        console.error("Error inserting event:", error);
        return NextResponse.json(
            { message: "Failed to create event", error },
            { status: 500 }
        );
    }
}
