import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  alumniCohorts,
  partnerUniversities,
  type AlumniCohort,
  type PartnerUniversity,
} from "@/data/partnerUniversities";

type Status = "loading" | "ready" | "error";

const MARKER_WITH_ALUMNI = "#dc3545";
const MARKER_PARTNER = "#17a2b8";

/** Builds the hover tooltip as DOM nodes so no data is ever parsed as HTML. */
function buildTooltip(uni: PartnerUniversity, cohort?: AlumniCohort) {
  const root = document.createElement("div");
  root.style.textAlign = "center";

  const name = document.createElement("strong");
  name.textContent = uni.name;
  const location = document.createElement("em");
  location.textContent = uni.location;
  location.style.display = "block";
  location.style.color = "#ccc";

  const detail = document.createElement("div");
  detail.style.marginTop = "8px";
  if (cohort) {
    detail.textContent = `ICAS alumni: ${cohort.total}`;
    detail.style.color = "#4fc3f7";
    detail.style.fontWeight = "bold";
  } else {
    detail.textContent = "ICAS Partner University";
    detail.style.color = MARKER_PARTNER;
  }

  root.append(name, location, detail);
  return root;
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-md border bg-background p-3 text-center">
      <div className="text-2xl font-bold text-primary">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

export default function UniversityMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    let map: LeafletMap | undefined;
    let cancelled = false;

    (async () => {
      try {
        // Leaflet is loaded on demand so it stays out of the main bundle.
        const [{ default: L }] = await Promise.all([
          import("leaflet"),
          import("leaflet/dist/leaflet.css"),
        ]);
        if (cancelled || !mapRef.current) return;

        map = L.map(mapRef.current, {
          center: [20, 0],
          zoom: 2,
          minZoom: 2,
          maxZoom: 18,
          worldCopyJump: true,
        });

        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }).addTo(map);

        for (const uni of partnerUniversities) {
          const cohort = alumniCohorts[uni.id];
          const color = cohort ? MARKER_WITH_ALUMNI : MARKER_PARTNER;
          const icon = L.divIcon({
            className: "custom-marker",
            html: `<div style="background-color:${color};width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 3px 6px rgba(0,0,0,0.4);"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          });

          L.marker([uni.lat, uni.lon], {
            icon,
            title: uni.name,
            alt: uni.name,
            keyboard: true,
          })
            .addTo(map)
            .bindTooltip(buildTooltip(uni, cohort), {
              direction: "top",
              offset: [0, -15],
              opacity: 0.95,
            })
            .on("click", () => setSelectedId(uni.id));
        }

        setStatus("ready");
      } catch (err) {
        console.error("Failed to load the partner map", err);
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  const selectedUni = selectedId
    ? partnerUniversities.find((u) => u.id === selectedId)
    : undefined;
  const cohort = selectedId ? alumniCohorts[selectedId] : undefined;

  return (
    <div className="relative">
      {status !== "ready" && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center"
          role={status === "error" ? "alert" : "status"}
        >
          <div className="rounded-lg border bg-background/95 p-6 text-center shadow-xl">
            {status === "loading" ? (
              <>
                <h3 className="text-base font-semibold">Loading partner universities…</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Initializing interactive world map
                </p>
              </>
            ) : (
              <>
                <h3 className="text-base font-semibold">Map unavailable</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  The map couldn't be loaded. The partner list below is still available.
                </p>
              </>
            )}
          </div>
        </div>
      )}
      <div className="overflow-hidden rounded-xl bg-slate-900 ring-1 ring-border">
        <div
          ref={mapRef}
          className="h-96 w-full"
          style={{ background: "#111" }}
          aria-label="World map of ICAS partner universities"
        />
      </div>

      <Dialog open={!!selectedUni} onOpenChange={(open) => !open && setSelectedId(null)}>
        <DialogContent className="max-w-[700px]">
          {selectedUni && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedUni.name}</DialogTitle>
                <DialogDescription>{selectedUni.location}</DialogDescription>
              </DialogHeader>
              {cohort ? (
                <div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <Stat value={cohort.total} label="ICAS alumni" />
                    <Stat value={cohort.cs} label="CS/CSE" />
                    <Stat value={cohort.mech} label="Mechanical" />
                    {cohort.other > 0 && <Stat value={cohort.other} label="Other" />}
                  </div>
                  {cohort.firstCohort && cohort.latestCohort && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      ICAS students have transferred here through the 2+2 pathway in cohorts
                      from {cohort.firstCohort} to {cohort.latestCohort}.
                    </p>
                  )}
                </div>
              ) : (
                <div className="rounded-md border bg-muted/40 p-5 text-center">
                  <div className="text-base font-semibold text-primary">
                    ICAS Partner University
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    This university is part of the ICAS network, offering academic collaboration
                    and exchange opportunities. There are currently no ICAS alumni recorded here.
                  </p>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
