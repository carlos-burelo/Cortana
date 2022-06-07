export const md = (text: string): string => {
  const normalScape = /[\|\-\*\[\]\(\)\<\>]/g
  const specialScape = /[\_\!\.]/g
  return text.replace(normalScape, `\$&`).replace(specialScape, `\\$&`)
}