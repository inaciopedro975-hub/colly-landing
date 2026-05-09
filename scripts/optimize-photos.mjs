import sharp from "sharp";
import { readdir, mkdir, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, parse } from "node:path";

const SRC = "C:/Users/pz/Downloads/galeria";
const OUT = "public/galeria";
const LOGO_OUT = "public/colly-logo.png";

async function run() {
  if (!existsSync(OUT)) await mkdir(OUT, { recursive: true });

  const files = (await readdir(SRC)).filter((f) =>
    /\.(jpe?g|png)$/i.test(f) && !f.toLowerCase().includes("logo")
  );

  console.log(`Otimizando ${files.length} fotos...`);

  let i = 1;
  for (const file of files) {
    const src = join(SRC, file);
    const slug = `foto-${String(i).padStart(2, "0")}`;
    const outFull = join(OUT, `${slug}.webp`);
    const outBlur = join(OUT, `${slug}-blur.webp`);

    await sharp(src)
      .rotate()
      .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(outFull);

    await sharp(src)
      .rotate()
      .resize({ width: 24 })
      .webp({ quality: 40 })
      .toFile(outBlur);

    console.log(`  ✓ ${file} → ${slug}.webp`);
    i++;
  }

  // Copia logo separadamente
  const logo = join(SRC, "colly-logo-ixRcGhxA.png");
  if (existsSync(logo)) {
    await sharp(logo).png({ quality: 95 }).toFile(LOGO_OUT);
    console.log(`  ✓ logo → ${LOGO_OUT}`);
  }

  console.log("✓ Concluído");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
