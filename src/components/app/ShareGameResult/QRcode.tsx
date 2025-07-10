import QRCodeStyling from "qr-code-styling";
import { useEffect, useMemo } from "react";

import { useBreakpoint } from "@/hooks/useBreakpoint";

interface Props {
  data: string;
}

const QRcode = ({ data }: Props) => {
  const { isAboveMd } = useBreakpoint("md");

  const qrCode = useMemo(
    () =>
      new QRCodeStyling({
        width: isAboveMd ? 108 : 58,
        height: isAboveMd ? 108 : 58,
        data,
        dotsOptions: {
          type: "extra-rounded",
        },
        cornersDotOptions: {
          type: "extra-rounded",
        },
        cornersSquareOptions: {
          type: "extra-rounded",
        },
      }),
    [data, isAboveMd],
  );

  useEffect(() => {
    const element = document.getElementById("qr-code");

    if (element) {
      qrCode.append(element);
    } else {
      console.log("No element with id 'qr-code'");
    }
  }, [qrCode]);

  return (
    <div
      className="flex w-fit min-w-[58px] justify-start overflow-hidden rounded-3"
      id="qr-code"
    />
  );
};

export default QRcode;
