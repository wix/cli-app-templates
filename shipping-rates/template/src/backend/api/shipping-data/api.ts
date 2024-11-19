import { auth } from "@wix/essentials";
import { appInstances } from "@wix/app-management";
import { getAppData, updateAppDate } from "../../database";
import { getAppInstance, isPremiumInstance } from "../../appInstance";

export async function GET(req: Request) {
  const appInstance = await getAppInstance();
  const isPremium = appInstance && isPremiumInstance(appInstance);
  const appData = getAppData({ isPremium });

  return new Response(JSON.stringify(appData));
}

export async function POST(req: Request) {
  const data = await req.json();

  updateAppDate(data);

  return new Response(JSON.stringify(data));
}
