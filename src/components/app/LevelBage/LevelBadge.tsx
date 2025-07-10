interface ILevelBadgeProps {
  level: number;
  size?: "default" | "sm";
}

const LevelBadge: React.FC<ILevelBadgeProps> = ({
  level,
  size = "default",
}) => {
  const sizeClasses = size === "sm" ? "size-6" : "size-10 text-h3";

  return (
    <div
      className={`flex ${sizeClasses} flex-shrink-0 items-center justify-center rounded-full bg-primary font-th text-foreground text-white`}
    >
      <span>{level}</span>
    </div>
  );
};

export { LevelBadge };
