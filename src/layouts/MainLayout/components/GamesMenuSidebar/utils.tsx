import { StarIcon } from "@/assets/icons";
import Medal1 from "@/assets/icons/medal1.svg";
import Medal2 from "@/assets/icons/medal2.svg";
import Medal3 from "@/assets/icons/medal3.svg";
import { menuRoutes } from "@/routes/routes";

export const getIcon = (path: string) => {
  switch (path) {
    case menuRoutes.main:
      return (
        <div className="relative size-6">
          <StarIcon
            className="absolute left-0 top-0 text-primary"
            style={{
              width: "16px",
              height: "18px",
            }}
          />
          <StarIcon
            className="absolute right-0"
            style={{
              width: "8px",
              height: "8px",
            }}
          />
          <StarIcon
            className="absolute bottom-0 right-0 text-primary"
            style={{
              width: "11.69px",
              height: "11.69px",
            }}
          />
        </div>
      );
    default:
  }
};

export function getRankMedal(number: number): React.ReactElement | string {
  switch (number) {
    case 1:
      return <Medal1 />;
    case 2:
      return <Medal2 />;
    case 3:
      return <Medal3 />;
    default:
      return `#${number}`;
  }
}
