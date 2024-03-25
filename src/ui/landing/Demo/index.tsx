import demo from "../../../../assets/demo.svg";
import Image from "next/image";

export default function Demo() {
  return (
    <div className="mt-4">
      <Image
        className="w-auto"
        src={demo}
        width={946}
        height={480}
        alt="Satcom Demo"
      />
    </div>
  );
}
