export interface NextAppPage<T extends string> {
  params: { slug: string };
  searchParams: Partial<Record<T, string | string[] | undefined>>;
}
