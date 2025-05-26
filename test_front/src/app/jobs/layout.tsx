const title = "Jobs";

export const metadata = {
  title,
  openGraph: {
    title,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
