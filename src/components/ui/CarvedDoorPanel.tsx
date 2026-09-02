import {
  DoorSvgDefs,
  DoorBorder,
  DoorTopArch,
  DoorJali,
  DoorApsara,
  DoorElephant,
  DoorLotusPanel,
  DoorKalash,
  DoorCentrePillar,
  DoorBands,
} from "./MandirDoorArt";

type CarvedDoorPanelProps = {
  side: "left" | "right";
  panelId: string;
};

/**
 * One leaf of the original carved mandir gate SVG.
 * Left & right panels mirror each other at the centre seam.
 */
export function CarvedDoorPanel({ side, panelId }: CarvedDoorPanelProps) {
  const isLeft = side === "left";
  const seamId = `${panelId}-seam`;

  return (
    <svg
      viewBox="0 0 220 480"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <DoorSvgDefs id={panelId} />
      <defs>
        <linearGradient id={seamId} x1={isLeft ? "100%" : "0%"} y1="0" x2={isLeft ? "0%" : "100%"} y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>
      </defs>

      <DoorBorder prefix={panelId} />
      <DoorBands prefix={panelId} />
      <DoorTopArch prefix={panelId} mirror={!isLeft} />

      {isLeft ? (
        <>
          <DoorJali prefix={panelId} x={168} />
          <DoorApsara prefix={panelId} x={130} facing="right" />
        </>
      ) : (
        <>
          <DoorJali prefix={panelId} x={16} />
          <DoorApsara prefix={panelId} x={60} facing="left" />
        </>
      )}

      <DoorCentrePillar prefix={panelId} side={side} />
      <DoorElephant prefix={panelId} facing={side} />
      <DoorLotusPanel prefix={panelId} />
      <DoorKalash prefix={panelId} x={isLeft ? 175 : 45} />

      {/* Shadow along centre seam for carved depth */}
      <rect x={isLeft ? 195 : 5} y="0" width="25" height="480" fill={`url(#${seamId})`} />
    </svg>
  );
}
