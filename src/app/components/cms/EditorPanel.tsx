// src/components/cms/EditorPanel.tsx
"use client";

import { useEditorStore } from "@/lib/useContent";
import { isAuthenticated, logout } from "@/lib/auth";
import LoginModal from "./LoginModal";
import { useEffect, useState } from "react";
import { CheckCircle, RotateCcw, DoorClosedIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditorPanel() {
  const { pending, publish, reset } = useEditorStore();
  const [showLogin, setShowLogin] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const router = useRouter()

  const handlePanelButtonClick = () => {

    console.log("Clicked: ", {
      isAuthenticated: isAuthenticated(),
      pending,
      publish,
      reset,
      showLogin
    });
    if (!isAuthenticated()) {
       setShowLogin(true);
    } else {
      setShowPanel(true)
    }
  };


  function handleLogOut() {
    const success = logout();
    if (success) {
      router.push('/kenyacreates');
      router.refresh();
    }
  }

  useEffect(()=> {
        console.log("PANEL DEETS: ", {
      isAuthenticated: isAuthenticated(),
      pending,
      publish,
      reset,
      showLogin
    });
    if(isAuthenticated()) {
      setShowPanel(true)
              console.log("PANEL DEETS: ", {
      isAuthenticated: isAuthenticated(),
      pending,
      publish,
      reset,
      showLogin
    });
    }
  }
  , [isAuthenticated])

  if (isAuthenticated() && !showPanel) {
    return (
            <button
        onClick={handlePanelButtonClick}
        className="fixed flex items-center justify-center gap-2 bottom-6 left-6 z-100 rounded-full bg-indigo-600 p-4 text-white shadow-xl hover:bg-indigo-700"
        title="Admin CMS"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Open CMS Panel
      </button>
    );
  }

  return (
    <>
      {showLogin && <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} />}

      {/* Editor Drawer - Only shows if authenticated */}
      {isAuthenticated() && showPanel && (
        <div className="sticky inset-y-0 left-0 z-100 w-full h-[40vh] overflow-y-auto bg-white shadow-2xl text-black">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-bold">
              CMS Editor
              {pending.length > 0 && (
                <span className="ml-2 inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                  {pending.length} pending
                </span>
              )}
            </h2>
            <button onClick={()=> setShowPanel(false)} className="text-red-600 hover:underline text-xs">
             close
            </button>
          </div>

          <div className="p-4">
            <p className="text-sm text-gray-600 mb-4">
              Click fields to edit. Use Save/Cancel per field. <strong>Publish All</strong> to save to files.
            </p>
            {pending.length > 0 && (
              <ul className="text-xs text-gray-500 mb-4 space-y-1">
                {pending.map((change, i) => (
                  <li key={i} className="flex items-center gap-1">
                    <span className="text-blue-600">{change.section}.{change.path.join(".")}</span>
                    <span className="truncate flex-1">{String(change.value).slice(0, 20)}...</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t p-4 space-y-2 w-full flex items-center justify-between">
            <button
              onClick={publish}
              disabled={pending.length === 0}
              className={`flex w-100 items-center justify-center gap-2 rounded px-4 py-2 font-medium transition-all ${
                pending.length > 0
                  ? "bg-green-600 text-white hover:bg-green-700 shadow-md"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              <CheckCircle className="h-4 w-4" />
              Publish All ({pending.length})
            </button>

            <button
              onClick={reset}
              className="flex w-100 items-center justify-center gap-2 rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <RotateCcw className="h-4 w-4" />
              Discard All Changes
            </button>

            <button
              onClick={handleLogOut}
              className="flex w-100 items-center justify-center gap-2 rounded border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <DoorClosedIcon className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}