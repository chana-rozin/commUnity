import { NextResponse } from "next/server";
import { 
  getAllDocuments, 
  insertDocument, 
  updateDocumentById, 
  deleteDocumentById 
} from "@/services/mongoDB/mongodb";

// Fetch all communities
export async function GET(
    request: Request,
    { params }: { params: { userId: string } }
  ) {
    try {
      // Get communities where the user is a member
      const query = {
        membersId: { $in: [params.userId] }
      };
      const communities = await getAllDocuments("community", query);
      return NextResponse.json(communities);
    } catch (error) {
      console.error("Error fetching user communities:", error);
      return NextResponse.json(
        { message: "Failed to fetch communities" },
        { status: 500 }
      );
    }
  }
// Create a new community
export async function POST(request: Request) {
    const body = await request.json(); // Parse request body

    // Validate required fields
    if (
        !body.name || 
        !Array.isArray(body.administratorIds) || 
        !Array.isArray(body.participantIds)
    ) {
        return NextResponse.json(
            { message: "Invalid input: 'name', 'administratorIds', and 'participantIds' are required." },
            { status: 400 } // Bad Request
        );
    }

    // Insert into the database
    const result = await insertDocument("communities", body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to create community" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { ...body, _id: result.insertedId }, 
        { status: 201 } // Created
    );
}

// Update a community by ID
export async function PUT(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Extract community ID from query string
    const body = await request.json(); // Parse request body

    if (!id) {
        return NextResponse.json(
            { message: "Community ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Update the community in the database
    const result = await updateDocumentById("communities", id, body);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to update community" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Community updated successfully" }
    );
}

// Delete a community by ID
export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Extract community ID from query string

    if (!id) {
        return NextResponse.json(
            { message: "Community ID is required" },
            { status: 400 } // Bad Request
        );
    }

    // Delete the community from the database
    const result = await deleteDocumentById("communities", id);

    if (!result) {
        return NextResponse.json(
            { message: "Failed to delete community" },
            { status: 500 } // Internal Server Error
        );
    }

    return NextResponse.json(
        { message: "Community deleted successfully" }
    );
}
