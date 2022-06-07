export function md(text: string): string {
  text = text
    .replace(/\_/g, `\_`)
    .replace(/\!/g, `\\!`)
    .replace(/\./g, `\\.`)
    .replace(/\|/g, `\|`)
    .replace(/\-/g, `\-`)
    .replace(/\*/g, `\*`)
    .replace(/\[/g, `\[`)
    .replace(/\]/g, `\]`)
    .replace(/\(/g, `\(`)
    .replace(/\)/g, `\)`)
    .replace(/\</g, `\<`)
    .replace(/\>/g, `\>`)
  return text
}
