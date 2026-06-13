/* =========================
   INSTALL APP LOGIC
========================= */
const API_BASE = "https://neetlession.onrender.com/ai";

let deferredPrompt = null;

/* Capture install prompt */
window.addEventListener("beforeinstallprompt", (e) => {

    e.preventDefault();

    deferredPrompt = e;

    console.log("✅ PWA Install Ready");

});

/* Install button */
document.addEventListener("DOMContentLoaded", () => {

    const installBtn =
    document.getElementById("installBtn");

    if (!installBtn) return;

    installBtn.addEventListener("click", async () => {

        if (!deferredPrompt) {

            alert(
                "📲 Open this website in Chrome and wait a few seconds to install the app."
            );

            return;

        }

        deferredPrompt.prompt();

        const choice =
        await deferredPrompt.userChoice;

        if (choice.outcome === "accepted") {

            console.log("🎉 App Installed");

        } else {

            console.log("❌ Install Cancelled");

        }

        deferredPrompt = null;

    });

});

/* =========================
   SERVICE WORKER
========================= */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./service-worker.js")

            .then(() => {

                console.log(
                    "✅ Service Worker Registered"
                );

            })

            .catch((err) => {

                console.log(
                    "❌ Service Worker Error:",
                    err
                );

            });

    });

}

/* =========================
   EXTERNAL LINKS
========================= */

function openLink(url) {

    window.open(url, "_blank");

}
