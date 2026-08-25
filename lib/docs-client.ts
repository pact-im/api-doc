export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? ""
}

export function withBasePath(pathName: string): string {
  const base = getBasePath()
  if (!base) return pathName
  if (pathName.startsWith(base)) return pathName
  return `${base}${pathName.startsWith("/") ? pathName : `/${pathName}`}`
}
