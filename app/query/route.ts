import { db } from "@vercel/postgres";
import { fetchRevenue } from "../lib/data";
import { Revenue } from "../lib/definitions";

const client = await db.connect();

async function listInvoices() {
	const data = await client.sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data.rows;
}

async function mytest() {
	const data = await client.sql<Revenue>`SELECT * FROM revenue`;

	return data.rows;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
  	// return Response.json(await listInvoices());
  	return Response.json(await mytest());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
