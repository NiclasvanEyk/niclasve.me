export function article(slug: string): string {
  return `/blog/${slug}`;
}

export function project(slug: string): string {
  return `/projects/${slug}`;
}
