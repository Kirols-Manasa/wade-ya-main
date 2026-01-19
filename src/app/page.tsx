import Link from "next/link";
import Image from "next/image";

import { LatestPost } from "@/app/_components/post";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

// Dummy data for entrepreneurs (replace with actual URLs)
const entrepreneurs = [
  {
    name: "أحمد علي",
    role: "مؤسس شركة تكنولوجيا",
    image: "/images/entrepreneur1.jpg",
  },
  {
    name: "منى سمير",
    role: "مستثمرة ومبتكرة",
    image: "/images/entrepreneur2.jpg",
  },
  {
    name: "خالد محمد",
    role: "رائد أعمال في الشرق الأوسط",
    image: "/images/entrepreneur3.jpg",
  },
];

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        {/* Hero Section */}
        <section className="w-full py-20 px-6 text-center relative">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
            <span className="text-indigo-500">     </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
            
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-indigo-500 px-8 py-4 font-semibold text-lg transition hover:bg-indigo-600"
            >
              {session ? "تسجيل خروج" : "تسجيل دخول"}
            </Link>
            <Link
              href="#entrepreneurs"
              className="rounded-full border border-indigo-500 px-8 py-4 font-semibold text-lg transition hover:bg-indigo-700/20"
            >
              تعرف على رواد الأعمال
            </Link>
          </div>
        </section>

        {/* Entrepreneurs Section */}
        <section id="entrepreneurs" className="w-full py-16 px-6 bg-gray-850">
          <h2 className="text-4xl font-bold text-center mb-12">
          
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {entrepreneurs.map((e, idx) => (
              <div
                key={idx}
                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={e.image}
                    alt={e.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">{e.name}</h3>
                  <p className="text-gray-400">{e.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section className="w-full py-16 px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            موارد إضافية
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Link
              className="flex flex-col gap-4 rounded-xl bg-white/10 p-6 hover:bg-white/20 transition"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">أول خطوات →</h3>
              <p className="text-gray-300">
                كل ما تحتاجه للبدء في مشروعك من قاعدة البيانات والمصادقة.
              </p>
            </Link>
            <Link
              className="flex flex-col gap-4 rounded-xl bg-white/10 p-6 hover:bg-white/20 transition"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">التوثيق →</h3>
              <p className="text-gray-300">
                تعلم المزيد عن Create T3 App والمكتبات التي يستخدمها.
              </p>
            </Link>
          </div>
        </section>

        {/* tRPC & Session */}
        <section className="w-full py-16 px-6 text-center">
          <p className="text-2xl text-gray-200 mb-4">
            {hello ? hello.greeting : " "}
          </p>
          {session?.user && <LatestPost />}
        </section>
      </main>
    </HydrateClient>
  );
}
