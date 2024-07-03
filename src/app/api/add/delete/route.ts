import { connectToDB } from "@/app/config/mongodb";
import Enregistrement from "@/app/models/EnregistrementModel";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { id } = reqBody;

  try {
    await connectToDB();
    const entry = await Enregistrement.findByIdAndDelete(id);
    if (entry) {
      return NextResponse.json({
        message: "Entrée supprimée",
        success: true,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
