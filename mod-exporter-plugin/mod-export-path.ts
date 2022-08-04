import * as tstl from "typescript-to-lua"
import * as path from "path"
import * as fs from "fs";



function findRequiredPaths(code: string): string[] {
  // Find all require("<path>") paths in a lua code string
  const paths: string[] = [];
  const pattern = /(^|\s|;|=|\()require\("(.+?)"\)/g;
  // eslint-disable-next-line @typescript-eslint/ban-types
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(code))) {
      paths.push(match[2]);
  }

  return paths;
}

function addExtraPathInCode(file: tstl.EmitFile, originalRequire: string, containerFolder: string): void {

  // Escape special characters to prevent the regex from breaking...
  const escapedRequire = originalRequire.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

  file.code = file.code.replace(
      new RegExp(`(^|\\s|;|=|\\()require\\("(${escapedRequire})"\\)`),
      `$1require("${containerFolder}.$2")`
  );
}

const plugin: tstl.Plugin = {
  beforeEmit(program, options, emitHost, result) {
    let outdir = program.getCompilerOptions().outDir;
    if (!outdir) {
      return;
    }

    let pkgPath = path.resolve(
      program.getCurrentDirectory(),
      program.getCompilerOptions().project ?? "."
    );

    if (pkgPath.endsWith(".json")) {
      pkgPath = path.dirname(pkgPath)
    }
    let project_name = path.basename(pkgPath)

    console.log(project_name)
    for (let file of result) {
      for (let r of findRequiredPaths(file.code)) {
        addExtraPathInCode(file, r, project_name)
      }
      let relpath = path.relative(outdir, file.outputPath)
      file.outputPath = path.join(outdir, project_name, relpath)
      console.error(file.outputPath)
    }

    fs.mkdirSync(outdir, {recursive: true})
    fs.writeFileSync(
      path.join(outdir, project_name + ".lua"),
      `require("${project_name}.${project_name}")`
    );
  },

};

export default plugin;