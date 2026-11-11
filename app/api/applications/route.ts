import { ApplicationInputError, deleteApplication, readApplication, recordDelivery, saveApplication } from "@/lib/applications";
import { companyInbox } from "@/lib/inbox";
import { sendApplicationEmail } from "@/lib/mail";

function errorResponse(error: unknown) {
  if (error instanceof ApplicationInputError) {
    return Response.json({ error: error.message }, { status: 400 });
  }
  return Response.json({ error: "Could not save the application." }, { status: 500 });
}

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id") ?? "";
  try {
    const application = await readApplication(id);
    if (!application) return Response.json({ error: "That application could not be found." }, { status: 404 });
    return Response.json(application);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const application = await saveApplication(body);
    try {
      const delivery = await sendApplicationEmail(application);
      return Response.json(await recordDelivery(application.id, delivery));
    } catch {
      console.error("Career application email failed");
      return Response.json(
        await recordDelivery(application.id, {
          emailed: false,
          inbox: companyInbox,
          emailError: `Saved on the server. The email to ${companyInbox} could not be sent.`,
        }),
      );
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      return Response.json({ error: "The application could not be read." }, { status: 400 });
    }
    console.error("Career application save failed", error instanceof Error ? error.message : error);
    return errorResponse(error);
  }
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).searchParams.get("id") ?? "";
  try {
    await deleteApplication(id);
    return Response.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
