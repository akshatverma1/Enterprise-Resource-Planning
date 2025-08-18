import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Wifi, WifiOff } from "lucide-react";

export default function Aksht() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [signalStrength, setSignalStrength] = useState(0);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    if (connection) {
      const updateSignal = () => {
        const speed = connection.downlink || 0;
        if (speed > 10) setSignalStrength(4); // Excellent
        else if (speed > 5) setSignalStrength(3); // Good
        else if (speed > 2) setSignalStrength(2); // Weak
        else if (speed > 0) setSignalStrength(1); // Very Weak
        else setSignalStrength(0);
      };

      updateSignal();
      connection.addEventListener("change", updateSignal);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
        connection.removeEventListener("change", updateSignal);
      };
    }
  }, []);

  return (
    <div className="flex gap-6 md:gap-10 items-center">
      {/* Existing Code */}
      <Link to="/" className="hidden items-center space-x-2 md:flex">
        <span className="hidden font-bold sm:inline-block">
          Application / Dashboard
        </span>
      </Link>

      <nav className="hidden gap-6 md:flex">
        <Link
          to="/"
          className="flex items-center text-sm font-medium text-muted-foreground"
        >
          Home
        </Link>
      </nav>

      {/* ✅ New Wi-Fi Signal Indicator */}
      <div className="flex items-center gap-2">
        {!isOnline ? (
          <div className="flex items-center gap-1 text-red-500">
            <WifiOff className="w-5 h-5" />
            <span className="text-xs">Offline</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-green-600">
            <Wifi className={`w-5 h-5 ${signalStrength < 2 ? "opacity-50" : ""}`} />
            <span className="text-xs">
              {signalStrength === 4
                ? "Excellent"
                : signalStrength === 3
                ? "Good"
                : signalStrength === 2
                ? "Weak"
                : "Very Weak"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
