import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ImgMascotInCircle, ImgMascotInCircleError } from "@/assets/img";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  message?: string;
  status?: "default" | "error";
}

const Notification: React.FC<Props> = ({
  status = "default",
  title,
  message,
}) => {
  const { t } = useTranslation("DATA_NOTIFICATION");

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <img
        src={status === "error" ? ImgMascotInCircleError : ImgMascotInCircle}
        alt="mascot in circle"
      />
      <div>
        <p className="mb-2 text-center text-p font-bold leading-[19px]">
          {title}
        </p>
        {message ? (
          <p className="leading-1 text-center text-normal leading-[19px]">
            {message}
          </p>
        ) : (
          <p className="leading-1 text-center text-normal leading-[19px]">
            {status === "default"
              ? t(`subscriptionEmpty`)
              : t("subscriptionError")}
          </p>
        )}
      </div>
      {status !== "error" && (
        <Link to="/">
          <Button className="min-w-[155px] max-lg:w-full">
            {status === "default" ? t(`buttonEmpty`) : t("buttonError")}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Notification;
