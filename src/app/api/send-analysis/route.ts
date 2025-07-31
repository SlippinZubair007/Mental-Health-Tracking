export async function POST(req: Request) {
  const { analysis } = await req.json();

  await fetch("https://flarerprepp.app.n8n.cloud/webhook/send-analysis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ analysis }),
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}
