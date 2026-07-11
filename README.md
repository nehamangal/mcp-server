# mcp-server

# Currency Converter MCP Server

A simple [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that exposes a `convert_currency` tool, allowing MCP-compatible clients (like Claude Desktop) to convert an amount from one currency to another.

> **Note:** This is a learning/demo project. The conversion rate is currently a hardcoded placeholder (`1.2`) and not a live exchange rate.

## Features

- 🔌 Built with the official [`@modelcontextprotocol/sdk`](https://www.npmjs.com/package/@modelcontextprotocol/sdk)
- 🪙 Exposes one tool: `convert_currency`
- 📡 Communicates over stdio transport
- ✅ Input validation via [Zod](https://zod.dev/)

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

## Installation

```bash
git clone https://github.com/nehamangal/mcp-server.git
cd mcp-server
npm install
```

## Usage

### Run the server directly

```bash
node index.js
```

The server communicates over stdio, so running it standalone in a terminal won't show much — you'll just see:

```
MCP server running on stdio
```

It's meant to be launched by an MCP client, not run interactively.

### Connect it to Claude Desktop

Add the server to your Claude Desktop config file:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "currency-converter": {
      "command": "node",
      "args": ["/absolute/path/to/your/index.js"]
    }
  }
}
```

Restart Claude Desktop, and the `convert_currency` tool should appear in the tools list.

## Tool Reference

### `convert_currency`

Converts an amount from one currency to another.

| Parameter      | Type     | Description                                  |
|----------------|----------|-----------------------------------------------|
| `amount`       | `number` | The amount of money to convert                |
| `fromCurrency` | `string` | Currency code to convert from (e.g., `USD`)   |
| `toCurrency`   | `string` | Currency code to convert to (e.g., `EUR`)     |

**Example call:**

```json
{
  "amount": 100,
  "fromCurrency": "USD",
  "toCurrency": "EUR"
}
```

**Example response:**

```
100 USD is approximately 120.00 EUR
```

## Project Structure

```
.
├── index.js         # MCP server entry point
├── package.json
└── README.md
```

