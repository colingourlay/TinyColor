/** @jsxImportSource https://esm.sh/preact */
import { ImageResponse } from "https://deno.land/x/og_edge/mod.ts";
import { h } from "https://esm.sh/preact";
import render from "https://esm.sh/preact-render-to-string";
import { serve } from "https://deno.land/std@0.126.0/http/server.ts";
import tinycolor from "../mod.js";

async function image_handler(req) {
  const { searchParams } = new URL(req.url);
  const fontSize = searchParams.get("fontSize") || 60;
  const backgroundColor = searchParams.get("backgroundColor") || "lavender";
  const width = searchParams.get("width") || 1200;
  const height = searchParams.get("height") || 627;
  const debug = searchParams.get("debug") || false;

  const color = tinycolor(backgroundColor);
  if (!color.isValid()) {
    return new Response("Invalid color", { status: 400 });
  }
  console.log(color, color.toHexString());
  let textColor = tinycolor.mostReadable(color, ["#333", "#ddd"]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          fontSize,
          color: textColor.toHexString(),
          backgroundColor: color.toHexString(),
        }}
      >
        {/* <div>{color.toString()}</div>
        <div>{color.toHexString()}</div> */}
        {/* <div>{text}</div> */}
        <div>{color.toHexString()}</div>
        <div>{color.toRgbString()}</div>
        <div>{color.toHslString()}</div>
        <div>{color.toHsvString()}</div>
      </div>
    ),
    {
      debug,
      width,
      height,
    }
  );
}

const port = 8080;
const handler = (req) => {
  return image_handler(req);
};

console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);
await serve(handler, { port });