import { auth } from "@wix/essentials";
import { appInstances } from "@wix/app-management";

export async function GET() {
  try {
    const { instance: appInstance } = await auth.elevate(
      appInstances.getAppInstance
    )();

    return Response.json(appInstance);
  } catch (error) {
    console.error("Failed to fetch app instance:", error);
    return new Response("Failed to fetch app instance", { status: 500 });
  }
}
