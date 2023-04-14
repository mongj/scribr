import Image from "next/image";
import { Inter } from "next/font/google";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Search } from "lucide-react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-slate-50">
      <div className="flex flex-col p-6 items-center w-full h-full justify-center">
        <div className="flex flex-col self-center w-full max-w-md">
          <div
            className={`${inter.className} text-slate-700 font-bold text-3xl mb-3`}
          >
            Supercharge YouTube videos
          </div>
          <div className="text-slate-500 text-sm mb-8">
            AI-powered transcription, summarisation, and generative Q&A
          </div>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Search color="gray" strokeWidth={1.5} />}
            />
            <Input
              className="text-sm pl-14 bg-white h-14 text-base"
              placeholder="YouTube URL"
              size="md"
            />
          </InputGroup>
        </div>
      </div>
    </main>
  );
}
