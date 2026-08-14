"use client";

import ModalDialog from "./components/ModalDialog";
import Disclosure from "./components/Disclosure";
import Tabs from "./components/Tabs";

// shadcn/ui imports
import { Dialog } from "@/components/ui/dialog";
import { Tabs as ShadcnTabs } from "@/components/ui/tabs";

export default function PlaygroundPage() {
  return (
    <main className="bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold">Accessible Component Playground</h1>


      {/* Your versions */}
      <section>
        <h2 className="text-xl font-semibold">My Components</h2>
        <ModalDialog />
        <Tabs />
        <Disclosure />
      </section>

      {/* shadcn/ui versions */}
      <section>
        <h2 className="text-xl font-semibold">shadcn/ui Components</h2>
        <Dialog />
        <ShadcnTabs />
      </section>
    </main>
  );
}
