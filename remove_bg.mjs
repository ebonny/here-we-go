import fs from "node:fs";

async function removeBg(blob) {
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_file", blob);

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": "5iWEXA7i63YhdAKx44qByQGs" },
    body: formData,
  });

  if (response.ok) {
    return await response.arrayBuffer();
  } else {
    throw new Error(`${response.status}: ${response.statusText} - ${await response.text()}`);
  }
}

async function main() {
  try {
    const inputPath = "public/images/samurai.png";
    const fileBlob = await fs.openAsBlob(inputPath)
    const rbgResultData = await removeBg(fileBlob);
    fs.writeFileSync("public/images/samurai-nobg.png", Buffer.from(rbgResultData));
    console.log("Background removed successfully!");
  } catch(e) {
    console.error(e);
  }
}

main();
