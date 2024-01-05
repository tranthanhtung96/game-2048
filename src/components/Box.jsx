function bgColorFromNumber(number) {
  switch (number) {
    case 2:
      return "bg-[#ede4d9] ";
    case 4:
      return "bg-[#eddfc4] ";
    case 8:
      return "bg-[#f4b17a] ";
    case 16:
      return "bg-[#f79663] ";
    case 32:
      return "bg-[#f67d60] ";
    case 64:
      return "bg-[#f45f35] ";
    case 128:
      return "bg-[#edce73] ";
    case 256:
      return "bg-[#edca64] ";
    case 512:
      return "bg-[#edc651] ";
    case 1024:
      return "bg-[#eec744] ";
    case 2048:
      return "bg-[#ecc22e] ";
    default:
      return "bg-[#cbbfb3] ";
  }
}

function textStyleFromNumber(number) {
  switch (number) {
    case 2:
    case 4:
      return "text-[#796f65] text-4xl ";
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
      return "text-white text-4xl ";
    case 1024:
    case 2048:
      return "text-white text-3xl ";
    default:
      return "text-transparent ";
  }
}

export default function Box({ number }) {
  return (
    <>
      <div
        className={
          "flex aspect-square w-full items-center justify-center rounded-sm font-bold " +
          bgColorFromNumber(number) +
          textStyleFromNumber(number)
        }
      >
        {number}
      </div>
    </>
  );
}
