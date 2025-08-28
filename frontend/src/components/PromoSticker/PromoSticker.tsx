import { labelColor } from "./utils/stickerColours";

type PromoStickerProps = {
  label: string;
  className?: string;
};

export function PromoSticker({ label }: PromoStickerProps) {
  const { bgClass, borderClass } = labelColor(label);

  return (
    <div className="absolute top-0 left-0">
      <div
        className={`${bgClass} text-white text-xs font-bold px-3 py-1 relative`}
      >
        {label}
        <div
          className={`absolute top-full left-0 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] ${borderClass}`}
        />
      </div>
    </div>
  );
}
