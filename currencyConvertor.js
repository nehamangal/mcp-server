import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// ---- Server setup ----
const server = new McpServer({
  name: "Currency Convertor",
  version: "1.0.0",
});

// ---- Tool registration ----
server.registerTool(
  "convert_currency",
  {
    title: "Convert Currency",
    description: "Convert an amount from one currency to another",
    inputSchema: {
      amount: z.number().describe("The amount of money to convert"),
      fromCurrency: z.string().describe("The currency code to convert from (e.g., USD)"),
      toCurrency: z.string().describe("The currency code to convert to (e.g., EUR)"),
    },
  },
  async ({ amount, fromCurrency, toCurrency }) => {
    const conversionRate = 1.2; // placeholder rate
    const convertedAmount = amount * conversionRate;
    return {
      content: [
        {
          type: "text",
          text: `${amount} ${fromCurrency} is approximately ${convertedAmount.toFixed(2)} ${toCurrency}`,
        },
      ],
    };
  }
);

// ---- Transport setup ----
async function startServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // IMPORTANT: don't console.log on stdio servers — stdout is reserved for
  // the MCP JSON-RPC protocol messages. Use console.error instead.
  console.error("MCP server running on stdio");
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
  process.exit(1);
});