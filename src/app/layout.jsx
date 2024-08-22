import "./globals.css";

export const metadata = {
  title: "창원시 폐기물 수거 서비스",
  description: "Created by JAEEUN SHIN",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className="min-h-screen bg-cover bg-center flex items-center justify-center vsc-initialized"
        style={{ backgroundImage: "url('/bg-image1.jpg')" }}
      >
        <div className="max-w-xl w-full bg-white p-6 rounded shadow-lg">
          {children}
        </div>
      </body>
    </html>
  );
}
