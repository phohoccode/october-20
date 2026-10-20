import { mkdir, writeFile } from "node:fs/promises";

const target = new URL("../public/fonts/", import.meta.url);
await mkdir(target, { recursive: true });
const assets = {
  "be-vietnam-vietnamese.woff2": "https://fonts.gstatic.com/s/bevietnampro/v12/QdVPSTAyLFyeg_IDWvOJmVES_Hw4BXoKZA.woff2",
  "be-vietnam-latin.woff2": "https://fonts.gstatic.com/s/bevietnampro/v12/QdVPSTAyLFyeg_IDWvOJmVES_Hw3BXo.woff2",
  "cormorant-vietnamese.woff2": "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_v86KnvOiss4.woff2",
  "cormorant-latin.woff2": "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_v86KnTOig.woff2",
  "cormorant-italic-vietnamese.woff2": "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd58jD-h9M8Efs.woff2",
  "cormorant-italic-latin.woff2": "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd58jD-iNM8.woff2",
  "OFL-Be-Vietnam-Pro.txt": "https://raw.githubusercontent.com/google/fonts/main/ofl/bevietnampro/OFL.txt",
  "OFL-Cormorant-Garamond.txt": "https://raw.githubusercontent.com/google/fonts/main/ofl/cormorantgaramond/OFL.txt",
};
await Promise.all(Object.entries(assets).map(async ([name, url]) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
  await writeFile(new URL(name, target), Buffer.from(await response.arrayBuffer()));
  console.log(`Saved ${name}`);
}));
